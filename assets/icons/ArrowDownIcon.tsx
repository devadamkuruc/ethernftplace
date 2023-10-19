interface ArrowDownIconProps {
  classStyles?: string;
  height?: number;
  width?: number;
}

const ArrowDownIcon = ({ classStyles, height, width }: ArrowDownIconProps) => {
  return (
    <svg
      width={width ? width : "8"}
      height={height ? height : "5"}
      viewBox="0 0 6 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classStyles}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.78184 1.84159L1.14184 0.201592C0.881836 -0.0584082 0.461836 -0.0584082 0.201836 0.201592C-0.0581641 0.461592 -0.0581641 0.881592 0.201836 1.14159L2.31517 3.26159C2.57517 3.52159 2.99517 3.52159 3.25517 3.26159L5.3685 1.14826C5.6285 0.888258 5.6285 0.468258 5.3685 0.208258C5.1085 -0.0517415 4.6885 -0.0517415 4.4285 0.208258L2.78184 1.84159Z"
        fill="white"
      />
    </svg>
  );
};

export default ArrowDownIcon;
