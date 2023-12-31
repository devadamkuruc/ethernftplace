interface ThrashIconProps {
  classStyles?: string;
}

const ThrashIcon = ({ classStyles }: ThrashIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${classStyles}`}
    >
      <g clipPath="url(#clip0_1_16800)">
        <path
          d="M15.5414 21H8.45857C7.89171 21 7.34573 20.786 6.92981 20.4009C6.51389 20.0157 6.25868 19.4878 6.2152 18.9226L5.25 6.375H18.75L17.7848 18.9226C17.7413 19.4878 17.4861 20.0157 17.0702 20.4009C16.6543 20.786 16.1083 21 15.5414 21V21Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 6.375H4"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.1875 3H14.8125C15.1109 3 15.397 3.11853 15.608 3.3295C15.819 3.54048 15.9375 3.82663 15.9375 4.125V6.375H8.0625V4.125C8.0625 3.82663 8.18103 3.54048 8.392 3.3295C8.60298 3.11853 8.88913 3 9.1875 3V3Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 17H14"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_16800">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ThrashIcon;
