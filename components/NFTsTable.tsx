"use client";

import NFTCard from "./NFTCard";
import { images } from "@/assets/images";
import { useCurrentNFTContext } from "@/context/NFTContext";
import { Pagination } from "@/components";
import { IFormattedNFT } from "@/types/INFTContext";

/*
export const nfts = [
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
];*/

interface Props {
  tableClassStyles?: string;
  accountDetail?: boolean;
  noCollection?: boolean;
  nfts: IFormattedNFT[];
}

const NFTsTable = ({ tableClassStyles, noCollection, nfts }: Props) => {
  const { nftCurrency } = useCurrentNFTContext();

  return (
    <div
      className={`flex flex-col w-full bg-ether-grey-1 rounded-2xl ${tableClassStyles}`}
    >
      <div className="border-b border-b-ether-grey-3 px-6 py-4">
        <h3 className="text-white">
          NFTs <span className="text-xs">{nfts ? `(${nfts.length})` : ""}</span>
        </h3>
        {noCollection ? (
          <span className="text-ether-grey-5 text-sm">
            NFTs not assigned to any collection
          </span>
        ) : (
          <span className="text-ether-grey-5 text-sm">$12,345</span>
        )}
      </div>
      <div className="flex flex-col w-full rounded-md p-6">
        <div className="grid grid-cols-12 gap-6">
          {nfts
            ? nfts.map((nft, index) => (
                <NFTCard
                  nft={nft}
                  nftCurrency={nftCurrency}
                  key={index}
                  classStyles="h-108 w-108"
                />
              ))
            : ""}
        </div>
      </div>
      <div className="pb-6 px-6 w-full flex justify-end">
        <Pagination />
      </div>
    </div>
  );
};

export default NFTsTable;
