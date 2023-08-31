import React from "react";

interface Props {
  classStyles?: string;
}

const CheckIcon = ({ classStyles }: Props) => {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classStyles}
    >
      <path
        d="M1 5.57143L3.34286 7.44571C3.40578 7.49753 3.47946 7.53467 3.55853 7.55444C3.63761 7.57421 3.7201 7.57611 3.8 7.56C3.88067 7.54487 3.95713 7.51254 4.02418 7.46521C4.09123 7.41788 4.1473 7.35666 4.18857 7.28571L7.85714 1"
        stroke="white"
        strokeWidth="1.14286"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
