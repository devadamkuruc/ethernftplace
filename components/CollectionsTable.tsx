"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Pagination } from "@/components";
import { images } from "@/assets/images";

export const collections = [
  {
    collectionId: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
    name: "Editorial Collection",
    totalAssets: 824,
    owners: 250,
    image: images.painting1,
    volume: 22,
  },
  {
    collectionId: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1190",
    name: "Markas Collection",
    totalAssets: 824,
    owners: 250,
    image: images.painting2,
    volume: 22,
  },
  {
    collectionId: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1191",
    name: "Variation Collection",
    totalAssets: 824,
    owners: 250,
    image: images.painting3,
    volume: 22,
  },
  {
    collectionId: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1192",
    name: "Kor Blockchain OG Badge",
    totalAssets: 824,
    owners: 250,
    image: images.painting4,
    volume: 22,
  },
  {
    collectionId: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1193",
    name: "Maximum Strike",
    totalAssets: 824,
    owners: 250,
    image: images.painting5,
    volume: 22,
  },
  {
    collectionId: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1194",
    name: "Paradigma OG Boom",
    totalAssets: 824,
    owners: 250,
    image: images.painting6,
    volume: 22,
  },
  {
    collectionId: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1195",
    name: "Universe Collection",
    totalAssets: 824,
    owners: 250,
    image: images.painting7,
    volume: 22,
  },
];

interface Props {
  watchlist?: boolean;
}

const CollectionsTable = ({ watchlist }: Props) => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full bg-ether-grey-1 rounded-2xl mt-10">
      <div className="border-b border-b-ether-grey-3 py-4 px-6">
        <div className="text-white ">
          Collections <span className="text-xs">(11)</span>
        </div>
        <div className="text-ether-grey-5 text-sm">
          Collections in your watchlist
        </div>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-12 border-b border-b-ether-grey-2 px-6 py-4">
          <div className="col-span-1 text-ether-grey-5 text-sm">#</div>
          <div className="col-span-5 text-ether-grey-5 text-sm">Collection</div>
          <div className="col-span-3 text-ether-grey-5 text-sm">
            Total Assets
          </div>
          <div className="col-span-3 text-ether-grey-5 text-sm">Owners</div>
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
                <div className="col-span-1 text-white text-sm">{index + 1}</div>
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
                <div className="col-span-3 text-white text-sm">
                  {collection.totalAssets}
                </div>
                <div className="col-span-3 text-white text-sm">
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
  );
};

export default CollectionsTable;
