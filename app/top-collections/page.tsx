"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Banner, Pagination, Searchbar } from "@/components";
import { collections } from "@/components/CollectionsTable";
import { useCurrentNFTContext } from "@/context/NFTContext";

const TopCollections = () => {
  const { nftCurrency } = useCurrentNFTContext();
  const router = useRouter();

  return (
    <div className="flex-col flexCenter px-28 py-4 mt-8 mb-16">
      <div className="flexBetween w-full mt-14 gap-28">
        <Searchbar />
        <Banner />
      </div>

      <div className="text-white my-4 self-start font-semibold text-3xl">
        Top Collections
      </div>

      <div className="flex flex-col w-full bg-ether-grey-1 rounded-2xl mt-10">
        <div className="border-b border-b-ether-grey-3 px-6">
          <div className="text-white my-4">
            Collections <span className="text-xs">(11)</span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-12 border-b border-b-ether-grey-2 px-6 py-4">
            <div className="col-span-1 text-ether-grey-5 text-sm">#</div>
            <div className="col-span-5 text-ether-grey-5 text-sm">
              Collection
            </div>
            <div className="col-span-2 text-ether-grey-5 text-sm">Volume</div>
            <div className="col-span-2 text-ether-grey-5 text-sm">
              Total Assets
            </div>
            <div className="col-span-2 text-ether-grey-5 text-sm">Owners</div>
          </div>
          <div className="flex flex-col pb-6">
            {collections.map((collection, index) => (
              <div
                key={index}
                className={`w-full cursor-pointer hover:bg-ether-grey-3 px-6`}
                onClick={() =>
                  router.push(`/collection/${collection.collectionId}`)
                }
              >
                <div className="grid grid-cols-12 border-b border-b-ether-grey-2 items-center py-4">
                  <div className="col-span-1 text-white text-sm">
                    {index + 1}
                  </div>
                  <div className="flex col-span-5 text-white text-sm items-center">
                    <div className="w-8 h-8 overflow-hidden rounded-full">
                      <Image
                        src={collection.image}
                        alt="collection"
                        className="object-contain"
                      />
                    </div>
                    <div className="ml-3">{collection.name}</div>
                  </div>
                  <div className="col-span-2 text-white text-sm">
                    {collection.volume} <span>{nftCurrency}</span>
                  </div>
                  <div className="col-span-2 text-white text-sm">
                    {collection.totalAssets}
                  </div>
                  <div className="col-span-2 text-white text-sm">
                    {collection.owners}
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
    </div>
  );
};

export default TopCollections;
