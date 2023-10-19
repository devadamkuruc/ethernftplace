"use client";

import { ReactNode, useEffect, useState } from "react";
import { ethers, BigNumberish } from "ethers";
import Web3Modal from "web3modal";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import {
  ICollectionFromInput,
  INFTFormInput,
  IFormattedCollection,
  INFTContext,
  IRawCollection,
  IFormattedNFT,
  IRawNFT,
} from "@/types/INFTContext";
import { createCtx } from "@/utils";
import { MarketAddress, MarketAddressABI } from "./constants";

export const [useCurrentNFTContext, NFTContextProvider] =
  createCtx<INFTContext>();

const fetchContract = (
  signerOrProvider: ethers.JsonRpcSigner | ethers.JsonRpcProvider
) => new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

export const NFTProvider = ({ children }: { children: ReactNode }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const nftCurrency = "ETH";

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found.");
      }
    } catch (error) {
      console.log("Something went wrong while connecting to wallet: ", error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);

      window.location.reload();
    } catch (error) {
      console.log("Something went wrong while connecting to wallet: ", error);
    }
  };

  const uploadToIPFS = async (file: File, type: string) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    let data = new FormData();
    data.append("file", file);

    const metadata = JSON.stringify({
      name: `Image`,
    });
    data.append("pinataMetadata", metadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    data.append("pinataOptions", pinataOptions);

    return axios
      .post(url, data, {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": `multipart/form-data`,
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
        },
      })
      .then(function (response) {
        console.log("Image uploaded", response.data.IpfsHash);
        return {
          success: true,
          message:
            "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
        };
      })
      .catch(function (error) {
        console.log(error);
        return {
          success: false,
          message: error.message,
        };
      });
  };

  const createCollection = async (
    formInput: ICollectionFromInput,
    fileUrl: string,
    router: AppRouterInstance
  ) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();

    const contract = fetchContract(signer);

    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    const { name, description, nfts } = formInput;

    console.log(formInput);

    if (!name || !description || !fileUrl) {
      console.log("Missing input parameters!");
      return;
    }

    const dataContent = { name, description, image: fileUrl };

    let data = {
      pinataContent: dataContent,
      pinataMetadata: {
        name: `collection/${Date.now()}`,
      },
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
        },
      });

      const ipfsHash = response.data.IpfsHash;
      const urlWithHash = "https://gateway.pinata.cloud/ipfs/" + ipfsHash;

      const transaction = await contract.createCollection(urlWithHash, nfts);

      await transaction.wait();

      router.push("/");
    } catch (error) {
      console.error("Something went wrong creating collection:", error);
    }
  };

  const fetchMyCollections = async (): Promise<IFormattedCollection[]> => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();

    const contract = fetchContract(signer);

    const data = await contract.fetchMyCollections();

    const collections = await Promise.all(
      data.map(
        async ({ collectionId, owner, collectionURI }: IRawCollection) => {
          const {
            data: { image, name, description },
          } = await axios.get(collectionURI, {
            headers: {
              Accept: "text/plain",
            },
          });

          return {
            collectionId: Number(collectionId),
            owner,
            image,
            name,
            description,
          };
        }
      )
    );

    return collections;
  };

  const fetchCollectionById = async (
    collectionId: number
  ): Promise<IFormattedCollection | null> => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();

      const contract = fetchContract(signer);

      const { owner, collectionURI } = await contract.fetchCollectionById(
        collectionId
      );

      const {
        data: { image, name, description },
      } = await axios.get(collectionURI, {
        headers: {
          Accept: "text/plain",
        },
      });

      return {
        collectionId: Number(collectionId),
        owner,
        image,
        name,
        description,
      };
    } catch (error) {
      console.error("Error fetching collection by ID", error);
      return null;
    }
  };

  const createNFT = async (
    formInput: INFTFormInput,
    fileUrl: string,
    router: AppRouterInstance
  ) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();

    const contract = fetchContract(signer);

    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    const { name, description, collectionId, formInputPrice } = formInput;

    if (!name || !description || !formInputPrice || !fileUrl) return;

    const price = ethers.parseUnits(formInputPrice, "ether");

    const data = { name, description, image: fileUrl };

    try {
      const response = await axios.post(url, data, {
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
        },
      });

      const ipfsHash = response.data.IpfsHash;
      const urlWithHash = "https://gateway.pinata.cloud/ipfs/" + ipfsHash;

      const transaction = await contract.createToken(
        urlWithHash,
        collectionId,
        price
      );

      await transaction.wait();

      router.push("/");
    } catch (error) {
      console.error("Error uploading file to IPFS");
      console.error("Actual Error: ", error);
    }
  };

  const fetchNFTsByCollection = async (
    collectionId: number
  ): Promise<IFormattedNFT[]> => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();

    const contract = fetchContract(signer);

    const data = await contract.fetchMyNFTsByCollection(collectionId);

    const nfts = await Promise.all(
      data.map(async ({ tokenId, owner, collectionId }: IRawNFT) => {
        const tokenURI = await contract.tokenURI(tokenId);
        const {
          data: { image, name, description },
        } = await axios.get(tokenURI, {
          headers: {
            Accept: "text/plain",
          },
        });

        return {
          tokenId,
          tokenURI,
          collectionId: Number(collectionId),
          owner,
          image,
          name,
          description,
        };
      })
    );

    return nfts;
  };

  const listNFTForSale = async (
    formInputPrice: string,
    isReselling?: boolean,
    id?: string
  ) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();

    const price = ethers.parseUnits(formInputPrice, "ether");
    const contract = fetchContract(signer);
    const listingPrice = await contract.getListingPrice();

    const transaction = !isReselling
      ? await contract.listNFTForSale(id, price, {
          value: listingPrice.toString(),
        })
      : await contract.resellToken(id, price, {
          value: listingPrice.toString(),
        });

    await transaction.wait();
  };

  const fetchListedNFTs = async (): Promise<IFormattedNFT[]> => {
    const provider = new ethers.JsonRpcProvider();
    const contract = fetchContract(provider);

    const data = await contract.fetchMarketItems();

    const items = await Promise.all(
      data.map(
        async ({
          tokenId,
          seller,
          owner,
          price: unformattedPrice,
          collectionId,
        }: IRawNFT) => {
          const tokenURI = await contract.tokenURI(tokenId);

          const {
            data: { image, name, description },
          } = await axios.get(tokenURI, {
            headers: {
              Accept: "text/plain",
            },
          });

          const price = ethers.formatUnits(
            unformattedPrice.toString(),
            "ether"
          );

          return {
            price,
            tokenId: Number(tokenId),
            seller,
            owner,
            image,
            name,
            description,
            tokenURI,
            collectionId,
          };
        }
      )
    );
    return items;
  };

  const fetchNFTDetails = async (tokenId: number): Promise<IFormattedNFT> => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();

    const contract = fetchContract(signer);

    const { owner, collectionId, price } = await contract.fetchNFTDetails(
      tokenId
    );
    const tokenURI = await contract.tokenURI(tokenId);

    const {
      data: { image, name, description },
    } = await axios.get(tokenURI, {
      headers: {
        Accept: "text/plain",
      },
    });

    const formattedPrice = ethers.formatUnits(price.toString(), "ether");

    return {
      tokenId: Number(tokenId),
      owner,
      collectionId: collectionId,
      price: formattedPrice,
      image,
      name,
      description,
      tokenURI,
    };
  };

  const makeOffer = async (
    tokenId: number,
    amount: string,
    expirationDays: number
  ) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();

    const contract = fetchContract(signer);

    const parsedAmount = ethers.parseUnits(amount, "ether");

    const transaction = await contract.makeOffer(
      tokenId,
      parsedAmount,
      expirationDays,
      {
        value: parsedAmount.toString(),
      }
    );

    await transaction.wait();
  };

  const fetchOffersByTokenId = async (tokenId: number) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();

    const contract = fetchContract(signer);

    const offers = await contract.getOffersByTokenId(tokenId);

    return offers;
  };

  const fetchOffersByAddress = async (address: string) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();

    const contract = fetchContract(signer);

    const offers = await contract.getOffersByTokenId(address);

    return offers;
  };

  const removeExpiredOffers = async (tokenId: number) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();

    const contract = fetchContract(signer);

    await contract.removeExpiredOffers(tokenId);
  };

  const getWalletBalance = async (): Promise<string> => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();

      const balance = await provider.getBalance(signer);
      const balanceInEther = ethers.formatEther(balance);

      return balanceInEther;
    } catch (error) {
      console.error("Error fetching wallet balnce: ", error);
      return "0";
    }
  };

  return (
    <NFTContextProvider
      value={{
        nftCurrency,
        currentAccount,
        connectWallet,
        uploadToIPFS,
        createCollection,
        fetchMyCollections,
        fetchCollectionById,
        createNFT,
        fetchNFTsByCollection,
        listNFTForSale,
        fetchListedNFTs,
        fetchNFTDetails,
        makeOffer,
        fetchOffersByTokenId,
        fetchOffersByAddress,
        removeExpiredOffers,
        getWalletBalance,
      }}
    >
      {children}
    </NFTContextProvider>
  );
};
