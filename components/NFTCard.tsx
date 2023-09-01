import Link from "next/link";
import Image from "next/image";

import { IFormattedNFT } from "@/types/INFTContext";

interface Props {
  nft: IFormattedNFT;
  nftCurrency: string;
  classStyles: string;
  textXS?: boolean;
}

const NFTCard = ({ nft, nftCurrency, classStyles, textXS }: Props) => {
  return (
    <Link href={`/nft/${nft.tokenId}`}>
      <div className="flex flex-col col-span-1 cursor-pointer">
        <div className={`overflow-hidden rounded-md ${classStyles}`}>
          <Image
            src={nft.image}
            alt={`nft`}
            className="w-full rounded-md object-cover"
          />
        </div>

        <div className="flex flex-col py-3">
          <span
            className={`text-white font-semibold ${
              textXS ? "text-xs" : "text-sm"
            }`}
          >
            {nft.name}
          </span>
          <span
            className={`text-white ${textXS ? "text-xs" : "text-sm"}`}
          >{`${nft.price} ${nftCurrency}`}</span>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
