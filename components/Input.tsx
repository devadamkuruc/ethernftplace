"use client";

import { ChangeEvent } from "react";

import { useCurrentNFTContext } from "@/context/NFTContext";

interface Props {
  inputType: string;
  title: string;
  placeholder: string;
  handleClick: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Input = ({ inputType, title, placeholder, handleClick }: Props) => {
  const { nftCurrency } = useCurrentNFTContext();

  return (
    <div className="mt-10 w-full">
      <p className="text-white font-semibold text-xl">{title}</p>

      {inputType === "number" ? (
        <div className="bg-ether-grey-1 border border-ether-grey-1 rounded-md w-full outline-none text-white text-base mt-4 px-4 py-3 flexBetween flex-row">
          <input
            type="number"
            className="flex w-full bg-transparent outline-none"
            placeholder={placeholder}
            onChange={handleClick}
          />
          <p className="text-white font-normal text-base ml-4">{nftCurrency}</p>
        </div>
      ) : inputType === "textarea" ? (
        <textarea
          rows={10}
          className="bg-ether-grey-1 border border-ether-grey-1 rounded-md w-full outline-none text-white text-base mt-4 px-4 py-3"
          placeholder={placeholder}
          onChange={handleClick}
        />
      ) : (
        <input
          className="bg-ether-grey-1 border border-ether-grey-1 rounded-md w-full outline-none text-white  text-base mt-4 px-4 py-3"
          placeholder={placeholder}
          type={inputType}
          onChange={handleClick}
        />
      )}
    </div>
  );
};

export default Input;
