"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import { useCurrentNFTContext } from "@/context/NFTContext";
import Button from "./Button";

interface Props {
  router: AppRouterInstance;
}

const ButtonGroup = ({ router }: Props) => {
  const { connectWallet, currentAccount } = useCurrentNFTContext();

  const handleSignIn = () => {
    connectWallet();
  };

  return currentAccount ? (
    <Button
      btnName="Create"
      classStyles="rounded-md"
      handleClick={() => {
        router.push("/upload-nft");
      }}
    />
  ) : (
    <Button
      btnName="Sign in"
      classStyles="rounded-md"
      handleClick={handleSignIn}
    />
  );
};

export default ButtonGroup;
