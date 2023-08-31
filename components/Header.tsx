"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ButtonGroup, Navbar } from "@/components";

const Header = () => {
  const router = useRouter();
  const [active, setActive] = useState("");

  return (
    <header className="absolute w-full flex justify-center px-28 h-16 z-10">
      <div className="flex justify-between w-full items-center">
        <div className="flexStartCenter">
          <Link href="/" className="text-white font-bold text-2xl">
            Explorify
          </Link>
        </div>

        <div className="flexCenter">
          <Navbar active={active} setActive={setActive} />
          <ButtonGroup router={router} />
        </div>
      </div>
    </header>
  );
};

export default Header;
