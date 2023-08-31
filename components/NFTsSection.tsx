"use client";

import { useRouter } from "next/navigation";

import { Button, NFTCard } from "@/components";
import { useCurrentNFTContext } from "@/context/NFTContext";
import { nfts } from "@/components/NFTsTable";

const NFTsSection = () => {
  const router = useRouter();
  const { nftCurrency } = useCurrentNFTContext();

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
            <NFTCard
              nft={nft}
              nftCurrency={nftCurrency}
              key={index}
              classStyles="h-148"
            />
          ))}
        </div>
        <div className="my-6 w-full flex justify-center">
          <Button
            btnName="Show more NFTs"
            classStyles="rounded-md"
            handleClick={() => router.push("/nfts")}
          />
        </div>
      </div>
    </section>
  );
};

export default NFTsSection;
