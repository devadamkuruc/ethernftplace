interface Props {
  classStyles: string;
  btnName: string;
  handleClick?: () => void;
  ghost?: boolean;
}

const Button = ({ classStyles, btnName, handleClick, ghost }: Props) => (
  <button
    type="button"
    className={`text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white ${classStyles} ${
      ghost ? "bg-ether-grey-1" : "eth-gradient-2"
    } `}
    onClick={handleClick}
  >
    {btnName}
  </button>
);

export default Button;
