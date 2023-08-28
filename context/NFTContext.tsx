"use client";

import { ReactNode } from "react";

import { INFTContext } from "@/types/INFTContext";
import { createCtx } from "@/utils";

export const [useCurrentNFTContext, NFTContextProvider] =
  createCtx<INFTContext>();

export const NFTProvider = ({ children }: { children: ReactNode }) => {
  return <NFTContextProvider value={() => {}}>{children}</NFTContextProvider>;
};
