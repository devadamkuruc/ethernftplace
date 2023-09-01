"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Link from "next/link";

import { useCurrentNFTContext } from "@/context/NFTContext";
import { Button } from "@/components";
import {
  CollectionsIcon,
  CreateCollectionIcon,
  CreateNFTIcon,
  FollowingIcon,
  ListNFTIcon,
  ListedNFTsIcon,
  LogoutIcon,
  ProfileIcon,
} from "@/assets/icons";

interface Props {
  router: AppRouterInstance;
}

export const headerDropdownLinks = [
  {
    icon: <ProfileIcon />,
    name: "Profile",
    href: "/account",
  },
  {
    icon: <FollowingIcon />,
    name: "Watchlist",
    href: "/watchlist",
  },
  {
    icon: <CollectionsIcon />,
    name: "My NFTs",
    href: "/collections",
  },
  {
    icon: <ListedNFTsIcon />,
    name: "Listed NFTs",
    href: "/listed-nfts",
  },
  {
    icon: <CreateCollectionIcon />,
    name: "Create Collection",
    href: "/create-collection",
  },
  {
    icon: <CreateNFTIcon />,
    name: "Create NFT",
    href: "/create-nft",
  },
  {
    icon: <ListNFTIcon />,
    name: "List NFT",
    href: "/listing/create",
  },
  {
    icon: <LogoutIcon />,
    name: "Log Out",
    href: "/",
  },
];

const ButtonGroup = ({ router }: Props) => {
  const { connectWallet, currentAccount } = useCurrentNFTContext();

  const handleSignIn = () => {
    connectWallet();
  };

  return currentAccount ? (
    <div className="relative ml-3 group py-2">
      <Button
        btnName="Account"
        classStyles="rounded-md"
        handleClick={() => {
          router.push("/account");
        }}
      />
      {
        <div className="absolute hidden group-hover:block hover:block right-0 bg-[#0e0d0e] z-40 rounded-md py-6 w-52 mt-2">
          {headerDropdownLinks.map((item, index) => (
            <div
              className="py-2 hover:bg-ether-grey-3 w-full px-6 rounded-md cursor-pointer"
              key={index}
            >
              <Link
                href={item.href}
                className="flex items-center gap-3 text-white text-sm"
              >
                {item.icon}
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      }
    </div>
  ) : (
    <Button
      btnName="Sign in"
      classStyles="rounded-md ml-3"
      handleClick={handleSignIn}
    />
  );
};

export default ButtonGroup;
