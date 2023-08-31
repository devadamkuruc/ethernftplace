interface Props {
  classStyles?: string;
  onClick: () => void;
}

const ArrowUpIcon = ({ classStyles, onClick }: Props) => {
  return (
    <svg
      width="8"
      height="5"
      viewBox="0 0 6 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classStyles}
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.78167 1.615L4.42167 3.255C4.68167 3.515 5.10167 3.515 5.36167 3.255C5.62167 2.995 5.62167 2.575 5.36167 2.315L3.24833 0.195C2.98833 -0.065 2.56833 -0.065 2.30833 0.195L0.195 2.315C-0.065 2.575 -0.065 2.995 0.195 3.255C0.455 3.515 0.875 3.515 1.135 3.255L2.78167 1.615Z"
        fill="white"
      />
    </svg>
  );
};

export default ArrowUpIcon;
