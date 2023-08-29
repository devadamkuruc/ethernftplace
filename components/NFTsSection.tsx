import React from "react";
import Image from "next/image";

import { images } from "@/assets/images";
import { Button } from "@/components";

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
    image: images.tc2,
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
  {
    name: "Editorial.. #1395",
    price: "0.245",
    currency: "ETH",
    image: images.tc1,
  },
];

const NFTsSection = () => {
  return (
    <section className="w-full my-36">
      <div className="mb-6">
        <h3 className="text-white font-semibold text-3xl">
          NFTs <span className="font-normal text-sm">(1000)</span>
        </h3>
        <span className="text-white text-sm">$12,345</span>
      </div>

      <div className="flex flex-col w-full rounded-md ">
        <div className="grid grid-cols-6 gap-6">
          {nfts.map((nft, index) => (
            <div key={index} className="flex flex-col col-span-1">
              <div className="overflow-hidden h-148 rounded-md">
                <Image
                  src={nft.image}
                  alt={`nft-${index}`}
                  className="w-full rounded-md object-cover"
                />
              </div>

              <div className="flex flex-col py-3">
                <span className="text-white text-sm font-semibold">
                  {nft.name}
                </span>
                <span className="text-white text-sm">{`${nft.price} ${nft.currency}`}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="my-6 w-full flex justify-center">
          <Button btnName="Show more NFTs" classStyles="rounded-md" />
        </div>
      </div>
    </section>
  );
};

export default NFTsSection;
