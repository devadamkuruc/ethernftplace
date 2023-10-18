"use client";

import { Button, NFTCard, OfferModal, Pagination } from "@/components";
import OffersTable from "@/components/OffersTable";
import { useCurrentNFTContext } from "@/context/NFTContext";
import { IFormattedNFT } from "@/types/INFTContext";
import { convertEthToUsd, shortenAddress } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NFTDetail = ({ params }: { params: { id: number } }) => {
  const { nftCurrency, fetchNFTDetails, fetchNFTsByCollection } =
    useCurrentNFTContext();
  const [NFT, setNFT] = useState<IFormattedNFT>();
  const [usdPrice, setUsdPrice] = useState<string | null>(null);
  const [collectionNFTs, setCollectionNFTs] = useState<IFormattedNFT[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchNFTDetails(params.id).then((nft) => {
      if (nft) {
        setNFT(nft);
        convertEthToUsd(parseFloat(nft.price)).then((usdValue) => {
          setUsdPrice(usdValue);
        });
      }
    });
  }, []);

  useEffect(() => {
    fetchNFTsByCollection(0).then((nfts) => {
      setCollectionNFTs(nfts);
    });
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (NFT) {
    return (
      <div className="flexCenter flex-col px-28 py-4 mt-8 mb-16 w-full">
        <div className="flexCenter gap-10 w-full h-screen">
          <div className="relative flex w-[50%] h-[85%] rounded-md overflow-hidden">
            <Image
              src={NFT.image}
              alt={NFT.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col w-[50%] h-[85%] justify-start">
            <Link
              href={`/collection/${NFT.collectionId}`}
              className="text-ether-pink-1 hover:underline"
            >
              Collection by {shortenAddress(NFT.owner)}
            </Link>
            <div className="my-4">
              <h1 className="text-white  self-start font-semibold text-3xl">
                {NFT.name}
              </h1>
              <p className="text-white">
                Owned by{" "}
                <Link
                  href={`/address/${NFT.owner}`}
                  className="text-ether-pink-1 hover:underline"
                >
                  {shortenAddress(NFT.owner)}
                </Link>
              </p>
            </div>

            <div className="my-4">
              <h2 className="text-md text-white font-normal">Description:</h2>
              <p className="text-sm text-white">{NFT.description}</p>
            </div>

            <div className="my-4">
              <h2 className="text-md text-white font-normal">Current price:</h2>
              <div className="flex gap-4 items-end">
                <h1 className="text-white self-start font-semibold text-3xl">
                  {NFT.price} {nftCurrency}
                </h1>
                <p className="text-sm text-ether-grey-6 font-normal pb-1 ">
                  ${usdPrice}
                </p>
              </div>
            </div>

            <div className="flex gap-8">
              <Button
                btnName="Buy now"
                classStyles="rounded-md flex-1"
                handleClick={() => {}}
              />

              <Button
                btnName="Make offer"
                classStyles="rounded-md flex-1 hover:bg-ether-grey-3"
                ghost
                handleClick={openModal}
              />
            </div>

            <OffersTable />
          </div>
        </div>

        <div className="flex flex-col w-full bg-ether-grey-1 rounded-2xl">
          <div className="border-b border-b-ether-grey-3 px-6 py-4">
            <h3 className="text-white">
              {BigInt(NFT.collectionId) === BigInt(0)
                ? "More NFTs assigned to no collection "
                : "More NFTs assigned to this collection "}
              <span className="text-xs">({collectionNFTs.length - 1})</span>
            </h3>
          </div>
          <div className="flex flex-col w-full rounded-md p-6">
            <div className="grid grid-cols-8 gap-6">
              {collectionNFTs
                .filter((nft) => Number(nft.tokenId) !== Number(params.id))
                .map((nft, index) => {
                  return (
                    <NFTCard
                      nft={nft}
                      nftCurrency={nftCurrency}
                      key={index}
                      classStyles="h-108 w-108"
                    />
                  );
                })}
            </div>
          </div>
          <div className="pb-6 px-6 w-full flex justify-end">
            <Pagination />
          </div>
        </div>

        <OfferModal isOpen={isModalOpen} onClose={closeModal} nft={NFT} />
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default NFTDetail;
