import Link from "next/link";
import Image from "next/image";

import { IFormattedNFT } from "@/types/INFTContext";
import { useRouter } from "next/navigation";

interface Props {
  nft: IFormattedNFT;
  nftCurrency: string;
  classStyles: string;
  onClick?: (nft: IFormattedNFT) => void;
  textXS?: boolean;
}

const NFTCard = ({ nft, nftCurrency, classStyles, onClick, textXS }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick(nft);
    } else {
      // If onClick is not provided, navigate to the NFT details page
      router.push(`/nft/${nft.tokenId}`);
    }
  };

  return (
    <div
      className={`flex flex-col col-span-1 cursor-pointer`}
      onClick={handleClick}
    >
      <div
        className={`relative overflow-hidden rounded-md ${classStyles} w-16 h-16`}
      >
        <Image
          src={nft.image}
          alt={`nft`}
          fill
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
        <span className={`text-white ${textXS ? "text-xs" : "text-sm"}`}>
          {nft.description}{" "}
        </span>
      </div>
    </div>
  );
};

export default NFTCard;
