"use client";

import { useRouter } from "next/navigation";

import { ArrowLeftIcon } from "@/assets/icons";
import { NFTsTable } from "@/components";

const CollectionDetail = () => {
  const router = useRouter();

  return (
    <div className="flex-col flexCenter px-28 py-4 mt-8 mb-16">
      <div className="flex items-center w-full mt-14 mb-4">
        <div
          className="inline-flex p-5 bg-ether-grey-2 rounded-2xl cursor-pointer"
          onClick={() => router.push("/account")}
        >
          <ArrowLeftIcon />
        </div>
        <div className="text-white font-semibold text-3xl ml-8 ">
          Kor Blockchain OG Badge
        </div>
      </div>

      <NFTsTable nftCardClassStyles="h-148" tableClassStyles="mt-8" />
    </div>
  );
};

export default CollectionDetail;
