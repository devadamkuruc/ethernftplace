interface Props {
  classStyles: string;
  onClick: () => void;
}

const CopyIcon = ({ classStyles, onClick }: Props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classStyles}
      onClick={onClick}
    >
      <g opacity="0.4">
        <path
          d="M10.6666 5H14.6666V14.3333H5.33325V10.3333"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.6666 1H1.33325V10.3333H10.6666V1Z"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default CopyIcon;
