"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components";
import { images } from "@/assets/images";
import { shortenAddress } from "@/utils";

const creators = [
  {
    background: images.tc1,
    profile: images.person1,
    address: "0x5a8216a9c47ee2E8Df1c874252fDEe467215C25b",
    walletBalance: 510,
    currency: "ETH",
    rank: 1,
  },
  {
    background: images.tc2,
    profile: images.person2,
    address: "0x539290Ac73153dA6Cbc6Afd246A25edc56F26Cb8",
    walletBalance: 312,
    currency: "ETH",
    rank: 2,
  },
  {
    background: images.tc3,
    profile: images.person3,
    address: "0x283607241ACECceFC5Aa71e3e7de3C721612a447",
    walletBalance: 100,
    currency: "ETH",
    rank: 3,
  },
  {
    background: images.tc4,
    profile: images.person4,
    address: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
    walletBalance: 98,
    currency: "ETH",
    rank: 4,
  },
];

const TopCreatorsSection = () => {
  return (
    <section className="mt-16 w-full">
      <h3 className="text-white font-semibold text-3xl mb-6">Top Creators</h3>

      <div className="grid grid-cols-4 gap-6">
        {creators.map((creator, index) => (
          <div key={index} className="col-span-1 rounded-md">
            <div className="relative">
              <div className="w-full h-188 overflow-hidden object-contain">
                <Image
                  src={creator.background}
                  alt={`thumbnail-${index}`}
                  className="rounded-md h-[100%]"
                />
              </div>
              <div className="absolute flex justify-center items-center border-8 border-black rounded-full w-20 h-20 -bottom-[25%] left-[50%] translate-x-[-50%] overflow-hidden">
                <Image
                  src={creator.profile}
                  alt={`profile-${index}`}
                  className="cursor-pointer"
                />
              </div>
              <div className="absolute top-3 left-3 rounded-full bg-black text-white px-3 py-1 text-xs">
                {index + 1}.
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <div className="flex flex-col">
                <Link
                  href={`/address/${creator.address}`}
                  className="text-white font-semibold text-sm"
                >
                  {shortenAddress(creator.address)}
                </Link>
                <span className="text-white text-sm">{`${creator.walletBalance} ${creator.currency}`}</span>
              </div>
              <Button btnName="Follow" classStyles="rounded-md self-center" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCreatorsSection;
