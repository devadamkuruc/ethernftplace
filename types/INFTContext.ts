import { BigNumberish } from "ethers";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export interface INFTContext {
  nftCurrency: string;
  connectWallet: () => Promise<void>;
  currentAccount: string;
  uploadToIPFS: (file: File, name: string) => Promise<IUploadToIPFSResponse>;
  createNFT: (
    formInput: IFormInput,
    fileUrl: string,
    router: AppRouterInstance
  ) => Promise<void>;
  fetchNFTs: () => Promise<IFormattedNFT[] | undefined>;
  fetchMyNFTsOrListedNFTs: (
    type: string
  ) => Promise<IFormattedNFT[] | undefined>;
  buyNFT: (nft: IFormattedNFT) => Promise<void>;
  createSale: (
    url: string,
    formInputPrice: string,
    isReselling?: boolean,
    id?: string
  ) => Promise<void>;
}

export interface IUploadToIPFSResponse {
  success: boolean;
  message: string;
}

export interface IFormInput {
  name: string;
  description: string;
  price: string;
}

export interface IRawNFT {
  tokenId: BigNumberish;
  seller: string;
  owner: string;
  price: BigNumberish;
}

export interface IFormattedNFT {
  tokenId: number;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
  price: string;
  tokenURI: string;
}
