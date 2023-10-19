"use client";

import { ArrowDownIcon, CancelIcon, WalletIcon } from "@/assets/icons";
import { useCurrentNFTContext } from "@/context/NFTContext";
import { IFormattedNFT } from "@/types/INFTContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components";
import { calculateExpirationDate, convertEthToUsd } from "@/utils";

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: IFormattedNFT;
}

interface IExpirationOptions {
  [key: string]: number;
}

export const ExpirationOptions: IExpirationOptions = {
  "12 hours": 12 * 60 * 60, // 12 hours in seconds
  "1 day": 24 * 60 * 60, // 1 day in seconds
  "3 days": 3 * 24 * 60 * 60, // 3 days in seconds
  "7 days": 7 * 24 * 60 * 60, // 7 days in seconds
};

const OfferModal = ({ isOpen, onClose, nft }: OfferModalProps) => {
  const { nftCurrency, getWalletBalance } = useCurrentNFTContext();
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [usdBidAmount, setUsdBidAmount] = useState<number>(0);
  const [isExpirationDropdownOpen, setIsExpirationDropdownOpen] =
    useState<boolean>(false);
  const [selectedExpiration, setSelectedExpiration] =
    useState<string>("3 days");
  const [walletBalance, setWalletBalance] = useState<string>("");

  useEffect(() => {
    const convertEthToUsdAmount = async () => {
      const usdAmount = await convertEthToUsd(bidAmount);
      if (usdAmount) setUsdBidAmount(Number(usdAmount));
    };

    convertEthToUsdAmount();
  }, [bidAmount]);

  useEffect(() => {
    getWalletBalance().then((balance) => {
      setWalletBalance(balance);
    });
  }, []);

  const handleExpirationDropdownOpen = () => {
    setIsExpirationDropdownOpen((prev) => !prev);
  };

  const handleExpirationChange = (option: string) => {
    setSelectedExpiration(option);
    handleExpirationDropdownOpen();
  };

  if (!isOpen) return null;

  return (
    <div className="flexCenter fixed w-screen h-screen top-0 ">
      <div
        className="absolute w-full h-full bg-black opacity-50 "
        onClick={onClose}
      />

      <div className="flex flex-col w-[40%] h-[70%] bg-[#0d0d0d] rounded-md z-20 py-10 px-6 justify-between">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold text-2xl px-2">
            Make an offer
          </h2>
          <div className="cursor-pointer" onClick={onClose}>
            <CancelIcon height={30} width={30} />
          </div>
        </div>

        <div className="flex w-full items-center justify-between px-8">
          <div className="flex gap-4 items-center">
            <div className="relative w-20 h-20 my-4 rounded-md overflow-hidden">
              <Image
                src={nft.image}
                alt={nft.name + nft.tokenId}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="text-white text-md font-semibold">{nft.name}</div>
              <div className="text-ether-grey-5 text-sm">Collection</div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="text-white text-md font-semibold">
              {bidAmount ? bidAmount : 0} {nftCurrency}
            </div>
            <div className="text-ether-grey-5 text-sm">
              ${usdBidAmount ? usdBidAmount : 0}
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-col p-8">
          <div className="flex justify-between">
            <div className="flex gap-2 text-white text-md">
              <WalletIcon />
              Balance
            </div>
            <div className="text-white text-md">
              {Number(walletBalance).toFixed(4)} {nftCurrency}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="text-white text-md">Floor price</div>
            <div className="text-white text-md">10 ETH</div>
          </div>

          <div className="flex justify-between">
            <div className="text-white text-md">Best offer</div>
            <div className="text-white text-md">11 ETH</div>
          </div>
        </div>

        <div className="flex w-full py-4 px-2">
          <input
            type="number"
            placeholder="Price"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.valueAsNumber)}
            className="flex-1 py-2 px-6 rounded-l-md bg-transparent border border-ether-grey-4 text-white placeholder:text-ether-grey-5 "
          />
          <div className="flex justify-end text-white text-md font-semibold px-6 py-2 bg-transparent border border-l-0 border-ether-grey-4 rounded-r-md">
            {nftCurrency}
          </div>
        </div>

        <div className="flex flex-col gap-4 px-2 py-4">
          <div className="text-white text-md font-semibold">Expiration</div>
          <div className="flex gap-6">
            <div className="relative rounded-md bg-transparent border border-ether-grey-4 w-[20%]">
              <div className="flex items-center justify-between text-white text-md pl-4">
                {selectedExpiration}{" "}
                <div
                  className="flex h-full items-center cursor-pointer py-4 px-4"
                  onClick={handleExpirationDropdownOpen}
                >
                  {
                    <ArrowDownIcon
                      height={8}
                      width={8}
                      classStyles={`transition duration-300 ease-out ${
                        isExpirationDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  }
                </div>
              </div>
              {isExpirationDropdownOpen ? (
                <div className="absolute px-2 py-4 bg-[#262626] bottom-12 rounded-md w-full">
                  {Object.keys(ExpirationOptions).map((option: string) => (
                    <div
                      key={option}
                      className="text-white text-md cursor-pointer px-2 py-2 hover:bg-ether-grey-4 rounded-md"
                      onClick={() => handleExpirationChange(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-1 justify-between items-center pr-6">
              <div className="text-white text-md">
                {calculateExpirationDate(selectedExpiration).formattedDate}
              </div>
              <div className="text-white text-md">
                {calculateExpirationDate(selectedExpiration).formattedTime}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8 p-2">
          <Button
            btnName="Make offer"
            classStyles="rounded-md flex-1"
            handleClick={() => {}}
          />

          <Button
            btnName="Cancel"
            classStyles="rounded-md flex-1 hover:bg-ether-grey-3"
            ghost
            handleClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
