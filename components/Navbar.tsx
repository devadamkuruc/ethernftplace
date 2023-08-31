import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  active: string;
  setActive: (item: string) => void;
}

const Navbar = ({ active, setActive }: Props) => {
  const pathname = usePathname();

  const generateLink = (i: number) => {
    switch (i) {
      case 0:
        return "/";
      case 1:
        return "/listed-nfts";
      case 2:
        return "/my-nfts";
      default:
        return "/";
    }
  };

  return (
    <nav className="flexCenter flex-row">
      {["Explore NFTs", "Listed NFTs", "My NFTs"].map((item, index) => {
        const isActive = pathname === generateLink(index);

        return (
          <Link
            key={index}
            href={generateLink(index)}
            className={`flex items-center mx-3 text-sm hover:text-white ${
              isActive ? "text-white" : "text-ether-grey-6"
            }`}
          >
            {item}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
