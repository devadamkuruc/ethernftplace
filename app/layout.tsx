import type { Metadata } from "next";

import { Header, Footer } from "@/components";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "EtherNFTPlace",
  description: "Explore the Ether NFT Place on your own",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="flex flex-col black-bg min-h-screen vsc-initialized font-inter">
        <Providers>
          <div className="bg-ether-blue h-488 w-488 fixed rounded-full blur-4xl -left-200 -top-200 -z-5" />
          <div className="bg-ether-pink-2 h-488 w-488 fixed rounded-full blur-4xl right-485 -top-330 -z-5" />
          <div className="bg-ether-orange h-416 w-416 fixed rounded-full blur-4xl top-620 -left-164 -z-5" />
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
