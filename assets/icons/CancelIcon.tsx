interface CancelIconProps {
  height?: number;
  width?: number;
}

const CancelIcon = ({ height, width }: CancelIconProps) => {
  return (
    <svg
      width={width ? width : "20"}
      height={height ? height : "20"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1_16668)">
        <path
          d="M8 8L16 16"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 8L8 16"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default CancelIcon;
