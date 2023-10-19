"use client";

import { ChangeEvent } from "react";

import { useCurrentNFTContext } from "@/context/NFTContext";

interface Props {
  inputType: string;
  title: string;
  placeholder: string;
  classStyles?: string;
  handleClick: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Input = ({
  inputType,
  title,
  placeholder,
  classStyles,
  handleClick,
}: Props) => {
  const { nftCurrency } = useCurrentNFTContext();

  return (
    <div className={`w-full ${classStyles ? classStyles : ""}`}>
      <p className="text-white font-semibold text-lg">{title}</p>

      {inputType === "number" ? (
        <div className="bg-ether-grey-1 border border-ether-grey-1 rounded-md w-full outline-none text-white text-sm mt-4 px-4 py-2 flexBetween flex-row">
          <input
            type="number"
            className="flex w-full bg-transparent outline-none"
            placeholder={placeholder}
            onChange={handleClick}
          />
          <p className="text-white font-normal text-sm ml-4">{nftCurrency}</p>
        </div>
      ) : inputType === "textarea" ? (
        <textarea
          rows={5}
          className="bg-ether-grey-1 border border-ether-grey-1 rounded-md w-full outline-none text-white text-sm mt-4 px-4 py-2"
          placeholder={placeholder}
          onChange={handleClick}
        />
      ) : (
        <input
          className="bg-ether-grey-1 border border-ether-grey-1 rounded-md w-full outline-none text-white text-sm mt-4 px-4 py-2"
          placeholder={placeholder}
          type={inputType}
          onChange={handleClick}
        />
      )}
    </div>
  );
};

export default Input;
