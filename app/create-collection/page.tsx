"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";

import { images } from "@/assets/images";
import { useCurrentNFTContext } from "@/context/NFTContext";
import { Button, Input, NFTCard, Pagination } from "@/components";
import { IFormattedCollection, IFormattedNFT } from "@/types/INFTContext";

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
  const [formInput, setFormInput] = useState({
    name: "",
    description: "",
  });
  const [fileUrl, setFileUrl] = useState<string>("");
  const [myNFTs, setMyNFTs] = useState<IFormattedNFT[]>([]);
  const [collectionNFTs, setCollectionNFTs] = useState<IFormattedNFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { uploadToIPFS, createCollection, nftCurrency, fetchNFTsByCollection } =
    useCurrentNFTContext();
  const router = useRouter();

  useEffect(() => {
    fetchNFTsByCollection(0).then((nfts) => {
      setMyNFTs(nfts);
      setIsLoading(false);
    });
  }, []);

  const handleAddNFTToCollection = (clickedNFT: IFormattedNFT) => {
    setCollectionNFTs((prevCollectionNFTs) => [
      ...prevCollectionNFTs,
      clickedNFT,
    ]);

    setMyNFTs((prevMyNFTs) => prevMyNFTs.filter((nft) => nft !== clickedNFT));
  };

  const handleRemoveNFTFromCollection = (clickedNFT: IFormattedNFT) => {
    setCollectionNFTs((prevCollectionNFTs) =>
      prevCollectionNFTs.filter((nft) => nft !== clickedNFT)
    );

    setMyNFTs((prevMyNFTs) => [...prevMyNFTs, clickedNFT]);
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
      `border-ether-grey-5 border-2 flex flex-col items-center p-5 rounded-lg border-dashed cursor-pointer
              ${isDragActive ? "border-file-active" : ""}
              ${isDragAccept ? "border-file-accept" : ""}
              ${isDragReject ? "border-file-reject" : ""}
              `,
    [isDragActive, isDragAccept, isDragReject]
  );

  return (
    <div className="flex justify-center p-12 mt-16">
      <div className="w-3/5">
        <h1 className="text-white text-2xl font-semibold">
          Create new NFT collection
        </h1>

        <div className="mt-16">
          <p className="text-white font-semibold text-xl">
            Upload Collection Thumbnail
          </p>

          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="text-white font-semibold text-xl">
                  JPG, PNG, GIF, SVG, WEBM, Max 100mb.
                </p>

                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    alt="upload"
                    className="object-contain"
                  />
                </div>

                <p className="text-white font-semibold text-sm">
                  Drag and Drop File
                </p>
                <p className="text-white font-semibold text-sm mt-2">
                  or Browse media on your device
                </p>
              </div>
            </div>

            {fileUrl ? (
              <aside>
                <div>
                  <Image
                    src={fileUrl}
                    alt="asset_file"
                    className="rounded-md mt-4"
                    width={350}
                    height={350}
                  />
                </div>
              </aside>
            ) : (
              ""
            )}
          </div>
        </div>

        <Input
          inputType="input"
          title="Name"
          placeholder="NFT Collection Name"
          handleClick={(e) =>
            setFormInput({ ...formInput, name: e.target.value })
          }
        />
        <Input
          inputType="textarea"
          title="Description"
          placeholder="NFT Collection Description"
          handleClick={(e) =>
            setFormInput({ ...formInput, description: e.target.value })
          }
        />

        <div className="mt-10 w-full">
          <div className="text-white font-semibold text-xl">Add NFTs</div>
          <div className="text-ether-grey-5 text-sm mt-2">
            Choose NFTs from your wallet and add them to the collection
          </div>

          <div className="flex flex-col w-full bg-ether-grey-1 rounded-2xl mt-8">
            <div className="border-b border-b-ether-grey-3 px-6 py-4">
              <h3 className="text-white">
                NFTs <span>({myNFTs.length})</span>
              </h3>
              <span className="text-ether-grey-5 text-sm">
                Choose NFTs from your wallet
              </span>
            </div>
            <div className="flex flex-col w-full rounded-md p-6">
              <div className="grid grid-cols-5 gap-6">
                {myNFTs.map((nft, index) => (
                  <NFTCard
                    nft={nft}
                    nftCurrency={nftCurrency}
                    key={index}
                    onClick={handleAddNFTToCollection}
                    classStyles="h-108"
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
              <div className="grid grid-cols-5 gap-6">
                {collectionNFTs.map((nft, index) => (
                  <NFTCard
                    nft={nft}
                    nftCurrency={nftCurrency}
                    key={index}
                    onClick={handleRemoveNFTFromCollection}
                    classStyles="h-108"
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
            btnName="Create NFT Collection"
            classStyles="rounded-md"
            handleClick={() => createCollection(formInput, fileUrl, router)}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;
