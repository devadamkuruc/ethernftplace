import Link from "next/link";

import { Button } from "@/components";

const Header = () => {
  return (
    <header className="absolute w-full flex justify-center px-28 h-16 z-10">
      <div className="flex justify-between w-full items-center">
        <div className="flexStartCenter">
          <Link href="/" className="text-white font-bold text-2xl">
            Explorify
          </Link>
        </div>

        <Button btnName="Sign in" classStyles="rounded-md" />
      </div>
    </header>
  );
};

export default Header;
