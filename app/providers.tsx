"use client";

import { ReactNode } from "react";

import { NFTProvider } from "@/context/NFTContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return <NFTProvider>{children}</NFTProvider>;
};

export default Providers;
