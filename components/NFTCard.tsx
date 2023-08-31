import Link from "next/link";
import Image from "next/image";

import { IFormattedNFT } from "@/types/INFTContext";

interface Props {
  nft: IFormattedNFT;
  nftCurrency: string;
  classStyles: string;
}

const NFTCard = ({ nft, nftCurrency, classStyles }: Props) => {
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
          <span className="text-white text-sm font-semibold">{nft.name}</span>
          <span className="text-white text-sm">{`${nft.price} ${nftCurrency}`}</span>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
