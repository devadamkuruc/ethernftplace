"use client";

import { useState } from "react";

import { ArrowDownIcon } from "@/assets/icons";

const dropdownValues = [1, 5, 10, 25];

const PageSizeDropdown = () => {
  const [inputValue, setInputValue] = useState<number>(10);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex relative">
      <div
        className="flex w-16 bg-ether-grey-3 px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="text-white text-xs mr-2">{inputValue}</div>
        <div className="flexCenter flex-col ">
          <ArrowDownIcon classStyles="cursor-pointer" />
        </div>
      </div>
      {isOpen ? (
        <div className="absolute bg-[#3c383a] w-16 rounded-md top-9 py-2">
          <ul className="flexCenter flex-col ">
            {dropdownValues.map((value, index) => (
              <li
                key={index}
                className={`text-ether-grey-5 text-xs cursor-pointer hover:text-white ${
                  inputValue === value ? "text-white" : ""
                }`}
                onClick={() => {
                  setInputValue(value);
                  setIsOpen(false);
                }}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PageSizeDropdown;
