import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const generateLink = (i: number) => {
    switch (i) {
      case 0:
        return "/";
      case 1:
        return "/top-collections";
      case 2:
        return "/latest";
      default:
        return "/";
    }
  };

  return (
    <nav className="flexCenter flex-row">
      {["Explore NFTs", "Top Collections", "Latest Activity"].map(
        (item, index) => {
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
        }
      )}
    </nav>
  );
};

export default Navbar;
