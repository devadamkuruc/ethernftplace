interface Props {
  classStyles: string;
}

const CheckBorderIcon = ({ classStyles }: Props) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classStyles}
    >
      <rect x="0.5" y="0.5" width="15" height="15" rx="2.5" stroke="white" />
    </svg>
  );
};

export default CheckBorderIcon;
