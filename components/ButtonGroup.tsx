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
    <div className="ml-3">
      <Button
        btnName="Create Collection"
        classStyles="rounded-md  mr-3"
        handleClick={() => {
          router.push("/create-collection");
        }}
      />
      <Button
        btnName="Create NFT"
        classStyles="rounded-md"
        handleClick={() => {
          router.push("/create-nft");
        }}
      />
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
