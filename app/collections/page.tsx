"use client";

import { Banner, CollectionsTable, NFTsTable, Searchbar } from "@/components";
import { useCurrentNFTContext } from "@/context/NFTContext";
import { ICollection } from "@/types/INFTContext";
import { useEffect, useState } from "react";

const Collections = () => {
  const { currentAccount } = useCurrentNFTContext();
  const [collections, setCollections] = useState<ICollection[]>([]);

  console.log(currentAccount);

  return (
    <div className="flex-col flexCenter px-28 py-4 mt-8 mb-16">
      <div className="flexBetween w-full mt-14 gap-28">
        <Searchbar />
        <Banner />
      </div>

      <div className="text-white mt-16 self-start font-semibold text-3xl">
        My Collections
      </div>
      <CollectionsTable />

      <div className="text-white mt-16 self-start font-semibold text-3xl">
        My NFTs
      </div>
      <div className="text-ether-grey-5 text-sm mt-2 self-start">
        NFTs that don't not have assigned any collection
      </div>

      <NFTsTable
        nftCardClassStyles="h-188"
        tableClassStyles="mt-8"
        accountDetail
      />
    </div>
  );
};

export default Collections;
