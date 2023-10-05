"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ArrowLeftIcon } from "@/assets/icons";
import { NFTsTable } from "@/components";
import { IFormattedCollection, IFormattedNFT } from "@/types/INFTContext";
import { useCurrentNFTContext } from "@/context/NFTContext";

const CollectionDetail = ({ params }: { params: { id: number } }) => {
  const [myNFTs, setMyNFTs] = useState<IFormattedNFT[]>([]);
  const [collection, setCollection] = useState<IFormattedCollection | null>();
  const [isLoading, setIsLoading] = useState(false);

  const { fetchNFTsByCollection, fetchCollectionById } = useCurrentNFTContext();
  const router = useRouter();

  useEffect(() => {
    fetchNFTsByCollection(params.id).then((nfts) => {
      setMyNFTs(nfts);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchCollectionById(params.id).then((collection) => {
      setCollection(collection);
    });
  }, []);

  console.log(collection);
  return (
    <div className="flex-col flexCenter px-28 py-4 mt-8 mb-16">
      <div className="flex items-center w-full mt-14 mb-4">
        <div
          className="inline-flex p-5 bg-ether-grey-2 rounded-2xl cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon />
        </div>
        <div className="text-white font-semibold text-3xl ml-8 ">
          {collection ? collection.name : `Collection#${params.id}`}
        </div>
      </div>

      <NFTsTable tableClassStyles="mt-8" nfts={myNFTs} />
    </div>
  );
};

export default CollectionDetail;
