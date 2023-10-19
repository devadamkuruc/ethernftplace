"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";

import { images } from "@/assets/images";
import { useCurrentNFTContext } from "@/context/NFTContext";
import { Button, Input, NFTCard, Pagination } from "@/components";
import {
  ICollectionFromInput,
  IFormattedCollection,
  IFormattedNFT,
} from "@/types/INFTContext";
import { ThrashIcon } from "@/assets/icons";

const nfts = [
  {
    name: "Editorial.. #1395",
    price: "0.245",
    currency: "ETH",
    image: images.painting1,
  },
  {
    name: "Editorial.. #1395",
    price: "0.245",
    currency: "ETH",
    image: images.painting2,
  },
  {
    name: "Editorial.. #1395",
    price: "0.245",
    currency: "ETH",
    image: images.painting3,
  },
  {
    name: "Editorial.. #1395",
    price: "0.245",
    currency: "ETH",
    image: images.painting4,
  },
  {
    name: "Editorial.. #1395",
    price: "0.245",
    currency: "ETH",
    image: images.painting5,
  },
  {
    name: "Editorial.. #1395",
    price: "0.245",
    currency: "ETH",
    image: images.painting6,
  },
  {
    name: "Editorial.. #1395",
    price: "0.245",
    currency: "ETH",
    image: images.tc3,
  },
  {
    name: "Editorial.. #1395",
    price: "0.245",
    currency: "ETH",
    image: images.painting8,
  },
  {
    name: "Editorial.. #1395",
    price: "0.245",
    currency: "ETH",
    image: images.painting9,
  },
  {
    name: "Editorial.. #1395",
    price: "0.245",
    currency: "ETH",
    image: images.painting10,
  },
];

const CreateCollection = () => {
  const [formInput, setFormInput] = useState<ICollectionFromInput>({
    name: "",
    description: "",
    nfts: [],
  });
  const [fileUrl, setFileUrl] = useState<string>("");
  const [myNFTs, setMyNFTs] = useState<IFormattedNFT[]>([]);
  const [collectionNFTs, setCollectionNFTs] = useState<IFormattedNFT[]>([]);
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    uploadToIPFS,
    removeFromIPFS,
    createCollection,
    nftCurrency,
    fetchNFTsByCollection,
  } = useCurrentNFTContext();
  const router = useRouter();

  useEffect(() => {
    fetchNFTsByCollection(0).then((nfts) => {
      setMyNFTs(nfts);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setFormInput((prevFormInput) => ({
      ...prevFormInput,
      nfts: tokenIds,
    }));
  }, [tokenIds]);

  const handleAddNFTToCollection = (clickedNFT: IFormattedNFT) => {
    setCollectionNFTs((prevCollectionNFTs) => [
      ...prevCollectionNFTs,
      clickedNFT,
    ]);

    setMyNFTs((prevMyNFTs) => prevMyNFTs.filter((nft) => nft !== clickedNFT));

    setTokenIds((prevTokenIds) => [...prevTokenIds, clickedNFT.tokenId]);
  };

  const handleRemoveNFTFromCollection = (clickedNFT: IFormattedNFT) => {
    setCollectionNFTs((prevCollectionNFTs) =>
      prevCollectionNFTs.filter((nft) => nft !== clickedNFT)
    );

    setMyNFTs((prevMyNFTs) => [...prevMyNFTs, clickedNFT]);

    setTokenIds((prevTokenIds) =>
      prevTokenIds.filter((tokenId) => tokenId !== clickedNFT.tokenId)
    );
  };

  const onDrop = useCallback(
    async (acceptedFile: File[]) => {
      if (uploadToIPFS) {
        const response = await uploadToIPFS(acceptedFile[0], "collection");

        if (response.success) {
          setFileUrl(response.message);
        } else {
          console.log(response.message);
        }
      }
    },
    [uploadToIPFS]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxSize: 5000000,
  });

  const fileStyle = useMemo(
    () =>
      `flexCenter w-full border-ether-grey-5 border-2 flex flex-col items-center p-5 rounded-md border-dashed cursor-pointer
              ${isDragActive ? "border-file-active" : ""}
              ${isDragAccept ? "border-file-accept" : ""}
              ${isDragReject ? "border-file-reject" : ""}
              `,
    [isDragActive, isDragAccept, isDragReject]
  );

  const handleRemoveFileUrl = () => {
    const ipfsHash = fileUrl.split("/").pop();

    if (ipfsHash) removeFromIPFS(ipfsHash);

    setFileUrl("");
  };

  return (
    <div className="flex flex-col items-center px-28 py-4 mt-28 mb-16 w-full">
      <div className="mb-4 w-4/5">
        <h1 className="text-white text-3xl font-semibold mb-2">
          Create new collection
        </h1>
        <div className="text-white text-sm">
          Once your item is minted you will not be able to change name or
          description
        </div>
      </div>

      <div className="flex gap-28 w-4/5">
        <div className="flex justify-center w-[45%] h-screen">
          <div className="relative flex w-full h-[65%] rounded-md overflow-hidden">
            {fileUrl ? (
              <div className="relative w-full h-full group">
                <Image
                  src={fileUrl}
                  alt="asset_file"
                  fill
                  className="object-cover"
                />
                <div className="absolute w-full h-full z-20 group-hover:bg-black group-hover:opacity-50 cursor-pointer transition duration-300" />
                <div className="cursor-pointer" onClick={handleRemoveFileUrl}>
                  <ThrashIcon classStyles="absolute hidden group-hover:block top-4 right-4 z-30" />
                </div>
              </div>
            ) : (
              <div {...getRootProps()} className={fileStyle}>
                <input {...getInputProps()} />
                <div className="flexCenter flex-col text-center">
                  <div className="my-12 w-full flex justify-center items-center">
                    <Image
                      src={images.upload}
                      width={100}
                      height={100}
                      alt="upload"
                      className="object-contain"
                    />
                  </div>

                  <p className="text-white font-semibold text-2xl">
                    Drag and Drop File
                  </p>
                  <p className="text-white font-normal text-sm mt-2">
                    or Browse media on your device
                  </p>
                  <p className="text-white font-normal text-sm mt-2">
                    JPG, PNG, GIF, SVG, WEBM, Max 100mb.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col w-[55%] h-full justify-start">
          <Input
            inputType="input"
            title="Name*"
            placeholder="NFT Collection Name"
            handleClick={(e) =>
              setFormInput({ ...formInput, name: e.target.value })
            }
          />
          <Input
            inputType="textarea"
            title="Description*"
            placeholder="NFT Collection Description"
            classStyles="mt-4"
            handleClick={(e) =>
              setFormInput({ ...formInput, description: e.target.value })
            }
          />

          <div className="mt-4 w-full">
            <div className="text-white font-semibold text-lg">Add NFTs</div>
            <div className="text-ether-grey-5 text-sm">
              Choose NFTs from your wallet and add them to the collection
            </div>

            <div className="flex flex-col w-full bg-ether-grey-1 rounded-2xl mt-4">
              <div className="border-b border-b-ether-grey-3 px-6 py-4">
                <h3 className="text-white">
                  NFTs <span>({myNFTs.length})</span>
                </h3>
                <span className="text-ether-grey-5 text-sm">
                  Choose NFTs from your wallet
                </span>
              </div>
              <div className="flex flex-col w-full rounded-md p-6">
                <div className="grid grid-cols-6 gap-6 w">
                  {myNFTs.map((nft, index) => (
                    <NFTCard
                      nft={nft}
                      nftCurrency={nftCurrency}
                      key={index}
                      textXS
                      onClick={handleAddNFTToCollection}
                      classStyles="h-20 w-20"
                    />
                  ))}
                </div>
              </div>
              <div className="pb-6 px-6 w-full flex justify-end">
                <Pagination />
              </div>
            </div>

            <div className="flex flex-col w-full bg-ether-grey-1 rounded-2xl mt-8">
              <div className="border-b border-b-ether-grey-3 px-6 py-4">
                <h3 className="text-white">
                  NFTs <span>({collectionNFTs.length})</span>
                </h3>
                <span className="text-ether-grey-5 text-sm">
                  NFTs assigned to the collection
                </span>
              </div>
              <div className="flex flex-col w-full rounded-md p-6">
                <div className="grid grid-cols-6 gap-6">
                  {collectionNFTs.map((nft, index) => (
                    <NFTCard
                      nft={nft}
                      nftCurrency={nftCurrency}
                      key={index}
                      textXS
                      onClick={handleRemoveNFTFromCollection}
                      classStyles="h-20 w-20"
                    />
                  ))}
                </div>
              </div>
              <div className="pb-6 px-6 w-full flex justify-end">
                <Pagination />
              </div>
            </div>
          </div>

          <div className="mt-16 w-full flex justify-end">
            <Button
              btnName="Create collection"
              classStyles="rounded-md"
              handleClick={() => createCollection(formInput, fileUrl, router)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;
