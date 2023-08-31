"use client";

import { useState } from "react";

import { CancelIcon, CheckIcon, CopyIcon } from "@/assets/icons";
import {
  AccountsTable,
  Banner,
  CollectionsTable,
  NFTsTable,
  Searchbar,
} from "@/components";
import { useCurrentNFTContext } from "@/context/NFTContext";

const MyNFTs = () => {
  const { nftCurrency } = useCurrentNFTContext();
  const [copyStatus, setCopyStatus] = useState<string>("");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("Text to copy");
      setCopyStatus("Copied!");

      setTimeout(() => {
        setCopyStatus("");
      }, 1000);
    } catch (error) {
      console.log("Error copying to clipboard:", error);
      setCopyStatus("Copy failed");

      setTimeout(() => {
        setCopyStatus("");
      }, 1000);
    }
  };

  return (
    <div className="flex-col flexCenter px-28 py-4 mt-8 mb-16">
      <div className="flexBetween w-full mt-14 gap-28">
        <Searchbar />
        <Banner />
      </div>
      <div className="text-white my-4 self-start font-semibold text-3xl">
        Account Details
      </div>
      <div className="grid grid-cols-12 w-full gap-2">
        <div className="flex flex-col justify-between col-span-3 bg-ether-grey-1 h-111 rounded-2xl p-6">
          <div className="text-ether-grey-6 text-sm">Net Worth</div>
          <div className="text-ether-grey-5 text-xs">$12,345</div>
          <div className="text-white text-base font-bold">
            3.125 {nftCurrency}
          </div>
        </div>
        <div className="flex flex-col justify-between col-span-2 bg-ether-grey-1 h-111 rounded-2xl p-6">
          <div className="text-ether-grey-6 text-sm">NFTs in Wallet</div>
          <div className="text-white text-base font-bold">7</div>
        </div>
        <div className="flex flex-col justify-between  col-span-2 bg-ether-grey-1 h-111 rounded-2xl p-6">
          <div className="text-ether-grey-6 text-sm">Collections in Wallet</div>
          <div className="text-white text-base font-bold">4</div>
        </div>
        <div className="flex flex-col justify-between  col-span-5 bg-ether-grey-1 h-111 rounded-2xl p-6">
          <div className="text-ether-grey-6 text-sm">Address</div>
          <div className="flex">
            <div className="text-ether-grey-5 text-sm mr-2">
              0xC6FfB521EBb73048053119FF697Ae988e2Ad1772
            </div>
            <div className="flexCenter">
              {!copyStatus ? (
                <CopyIcon
                  classStyles="cursor-pointer"
                  onClick={copyToClipboard}
                />
              ) : (
                ""
              )}
              {copyStatus === "Copied!" ? <CheckIcon classStyles="ml-1" /> : ""}
              {copyStatus === "Copy failed" ? <CancelIcon /> : ""}
            </div>
          </div>
        </div>
      </div>
      <CollectionsTable />

      <NFTsTable
        nftCardClassStyles="h-188"
        tableClassStyles="mt-8"
        accountDetail
      />

      <AccountsTable />
    </div>
  );
};

export default MyNFTs;
