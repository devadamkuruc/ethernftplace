"use client";

import { useRouter } from "next/navigation";

import { creators } from "./TopCreatorsSection";
import { useCurrentNFTContext } from "@/context/NFTContext";
import { Pagination, Button } from "@/components";

const AccountsTable = () => {
  const router = useRouter();
  const { nftCurrency } = useCurrentNFTContext();

  return (
    <div className="flex flex-col w-full bg-ether-grey-1 rounded-2xl mt-10">
      <div className="border-b border-b-ether-grey-3 py-4 px-6">
        <div className="text-white">
          Creators <span className="text-xs">(4)</span>
        </div>
        <div className="text-ether-grey-5 text-sm">
          Creators you have been following
        </div>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-12 border-b border-b-ether-grey-2 px-6 py-4">
          <div className="col-span-1 text-ether-grey-5 text-sm">#</div>
          <div className="col-span-5 text-ether-grey-5 text-sm">Account</div>
          <div className="col-span-2 text-ether-grey-5 text-sm">
            Balance ({nftCurrency})
          </div>
          <div className="col-span-3 text-ether-grey-5 text-sm">
            NFT Holdings
          </div>
          <div className="col-span-1 text-ether-grey-5 text-sm">Action</div>
        </div>
        <div className="flex flex-col pb-6">
          {creators.map((creator, index) => (
            <div
              key={index}
              className={`w-full cursor-pointer hover:bg-ether-grey-3 px-6`}
            >
              <div className="grid grid-cols-12 border-b border-b-ether-grey-2 items-center py-4">
                <div className="col-span-1 text-white text-sm">{index + 1}</div>
                <div className="flex col-span-5 text-white text-sm items-center">
                  <div
                    className="ml-3 hover:underline"
                    onClick={() => router.push(`/address/${creator.address}`)}
                  >
                    {creator.address}
                  </div>
                </div>
                <div className="col-span-2 text-white text-sm">
                  {creator.walletBalance}
                </div>
                <div className="col-span-3 text-white text-sm">
                  {creator.totalAssets}
                </div>
                <div className="col-span-1">
                  <Button
                    btnName="Unfollow"
                    classStyles="rounded-md hover:bg-ether-grey-3"
                    ghost
                  />
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

export default AccountsTable;
