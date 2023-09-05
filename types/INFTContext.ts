import { BigNumberish } from "ethers";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export interface INFTContext {
  nftCurrency: string;
  connectWallet: () => Promise<void>;
  currentAccount: string;
  uploadToIPFS: (file: File, name: string) => Promise<IUploadToIPFSResponse>;
  createCollection: (
    formInput: IFormCollectionInput,
    fileUrl: string,
    router: AppRouterInstance
  ) => Promise<void>;
  fetchMyCollections: () => Promise<IFormattedCollection[]>;
}

export interface IUploadToIPFSResponse {
  success: boolean;
  message: string;
}

export interface IFormCollectionInput {
  name: string;
  description: string;
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

export interface ICollection {
  collectionId: BigNumberish;
  image: string;
  name: string;
  description: string;
  // Add other properties as needed
}

export interface IRawCollection {
  collectionId: string;
  owner: string;
  collectionURI: string;
}

export interface IFormattedCollection {
  collectionId: number;
  owner: string;
  image: string;
  name: string;
  description: string;
}
