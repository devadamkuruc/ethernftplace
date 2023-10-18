"use client";

import { useRouter } from "next/navigation";

import Button from "./Button";
import Pagination from "./Pagination";
import { useCurrentNFTContext } from "@/context/NFTContext";
import { shortenAddress } from "@/utils";
import { useState } from "react";
import { IFormattedNFT } from "@/types/INFTContext";

const offers = [
  {
    price: 0.000001,
    currency: "ETH",
    usdPrice: 1,
    floorPrice: 0.00001,
    timestamp: 1697615646072,
    from: "0x5a8216a9c47ee2E8Df1c874252fDEe467215C25b",
  },
];

const OffersTable = () => {
  const router = useRouter();
  const { nftCurrency } = useCurrentNFTContext();

  const currentDate = new Date();

  const timestamp = currentDate.getTime();
  console.log(timestamp);

  const floorDifference = (floorPrice: number, price: number) => {
    const floorDifference = (price * 100) / floorPrice;

    let floorSign;

    switch (true) {
      case floorPrice > price:
        floorSign = "below";
        break;
      case floorPrice === price:
        floorSign = "at floor";
        break;
      case floorPrice < price:
        floorSign = "above";
        break;
      default:
        break;
    }

    return { floorSign, floorDifference };
  };

  const getExpiration = (timestamp: number) => {
    const expirationDate: Date = new Date(timestamp);
    const currentDate: Date = new Date();

    const differenceInMs: number =
      expirationDate.getTime() - currentDate.getTime();
    const differenceInMinutes: number = Math.floor(
      differenceInMs / (1000 * 60)
    );
    const differenceInHours: number = Math.floor(
      differenceInMs / (1000 * 60 * 60)
    );
    const differenceInDays: number = Math.floor(
      differenceInMs / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays < 0) {
      return "is expired";
    }

    console.log(expirationDate, currentDate);

    if (differenceInDays === 0) {
      if (differenceInHours === 0) {
        return `in ${differenceInMinutes} minutes`;
      } else {
        return `in ${differenceInHours} hours`;
      }
    } else {
      return `in ${differenceInDays} days`;
    }
  };

  return (
    <div className="flex flex-col w-full bg-ether-grey-1 rounded-2xl mt-10">
      <div className="border-b border-b-ether-grey-3 py-4 px-6">
        <div className="text-white">
          Offers <span className="text-xs">({offers.length})</span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-12 border-b border-b-ether-grey-2 px-6 py-4">
          <div className="col-span-3 text-ether-grey-5 text-xs">Price</div>
          <div className="col-span-2 text-ether-grey-5 text-xs">USD Price</div>
          <div className="col-span-3 text-ether-grey-5 text-xs">
            Floor Difference
          </div>
          <div className="col-span-2 text-ether-grey-5 text-xs">Expiration</div>
          <div className="col-span-2 text-ether-grey-5 text-xs">From</div>
        </div>
        <div className="flex flex-col pb-6">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`w-full cursor-pointer hover:bg-ether-grey-3 px-6`}
            >
              <div className="grid grid-cols-12 border-b border-b-ether-grey-2 items-center py-4">
                <div className="col-span-3 text-white text-xs">
                  {offer.price} {offer.currency}
                </div>
                <div className="col-span-2 text-white text-xs">
                  ${offer.usdPrice}
                </div>
                <div className="col-span-3 text-white text-xs">
                  {floorDifference(
                    offer.floorPrice,
                    offer.price
                  ).floorDifference.toFixed(2)}
                  % {floorDifference(offer.floorPrice, offer.price).floorSign}
                </div>
                <div className="col-span-2 text-white text-xs">
                  {getExpiration(offer.timestamp)}
                </div>
                <div className="col-span-2 text-white text-xs">
                  <div
                    className="hover:underline"
                    onClick={() => router.push(`/address/${offer.from}`)}
                  >
                    {shortenAddress(offer.from)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pb-6 px-6 w-full flex justify-end">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default OffersTable;
