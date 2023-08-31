interface Props {
  classStyles: string;
  btnName: string;
  handleClick?: () => void;
}

const Button = ({ classStyles, btnName, handleClick }: Props) => (
  <button
    type="button"
    className={`eth-gradient-2 text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white ${classStyles} `}
    onClick={handleClick}
  >
    {btnName}
  </button>
);

export default Button;
