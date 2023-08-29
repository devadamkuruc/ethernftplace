"use client";

import { ReactNode, useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import {
  IFormInput,
  IFormattedNFT,
  INFTContext,
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

  const uploadToIPFS = async (file: File) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    let data = new FormData();
    data.append("file", file);

    const metadata = JSON.stringify({
      name: "NFT",
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

  const createNFT = async (
    formInput: IFormInput,
    fileUrl: string,
    router: AppRouterInstance
  ) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    const { name, description, price } = formInput;

    if (!name || !description || !price || !fileUrl) return;

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
      await createSale(urlWithHash, price);

      router.push("/");
    } catch (error) {
      console.error("Error uploading file to IPFS");
      console.error("Actual Error: ", error);
    }
  };

  const createSale = async (
    url: string,
    formInputPrice: string,
    isReselling?: boolean,
    id?: string
  ) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();

      const price = ethers.parseUnits(formInputPrice, "ether");
      const contract = fetchContract(signer);
      const listingPrice = await contract.getListingPrice();

      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          });

      await transaction.wait();
    } catch (error) {
      console.log("Something went wrong while creating sale: ", error);
    }
  };

  const fetchNFTs = async (): Promise<IFormattedNFT[] | undefined> => {
    try {
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
            };
          }
        )
      );

      return items;
    } catch (error) {
      console.log("Something went wrong while fetching NFTs: ", error);
    }
  };

  const fetchMyNFTsOrListedNFTs = async (
    type: string
  ): Promise<IFormattedNFT[] | undefined> => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();

      const contract = fetchContract(signer);

      const data =
        type === "fetchItemsListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFTs();

      const items = await Promise.all(
        data.map(
          async ({
            tokenId,
            seller,
            owner,
            price: unformattedPrice,
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
            };
          }
        )
      );

      return items;
    } catch (error) {
      console.log("Something went wrong while fetching NFTs: ", error);
    }
  };

  const buyNFT = async (nft: IFormattedNFT) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();

      const contract = fetchContract(signer);

      const price = ethers.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });

      await transaction.wait();
    } catch (error) {
      console.log("Something went wrong while buying NFT: ", error);
    }
  };

  return (
    <NFTContextProvider
      value={{
        nftCurrency,
        currentAccount,
        connectWallet,
        uploadToIPFS,
        createNFT,
        createSale,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
      }}
    >
      {children}
    </NFTContextProvider>
  );
};
