import { IFormattedNFT } from "@/types/INFTContext";
import Image from "next/image";
import React from "react";

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: IFormattedNFT;
}

const OfferModal = ({ isOpen, onClose, nft }: OfferModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="flexCenter fixed w-screen h-screen top-0">
      <div
        className="absolute w-full h-full bg-black opacity-50 "
        onClick={onClose}
      />

      <div className="w-[40%] h-[70%] bg-[#0d0d0d] rounded-md z-20 py-10 px-6">
        <h2 className="text-white font-semibold text-2xl mb-4">
          Make an offer
        </h2>

        <div className="flex w-full items-center">
          <div className="relative w-20 h-20 my-4 mx-4 rounded-md overflow-hidden">
            <Image
              src={nft.image}
              alt={nft.name + nft.tokenId}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-white text-md font-semibold">{nft.name}</div>
            <div className="text-white text-sm text-ether-grey-5">
              Collection
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
