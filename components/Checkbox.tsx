"use client";

import { CheckBorderIcon, CheckIcon } from "@/assets/icons";

interface Props {
  handleClick: () => void;
  checked: boolean;
  classStyles?: string;
}

const Checkbox = ({ classStyles, handleClick, checked }: Props) => {
  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center cursor-pointer ${classStyles}`}
    >
      <CheckBorderIcon classStyles="absolute" />
      {checked ? <CheckIcon classStyles="absolute" /> : ""}
    </div>
  );
};

export default Checkbox;
