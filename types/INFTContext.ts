import { BigNumberish } from "ethers";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export interface INFTContext {
  nftCurrency: string;
  connectWallet: () => Promise<void>;
  currentAccount: string;
  uploadToIPFS: (file: File, name: string) => Promise<IUploadToIPFSResponse>;
  createCollection: (
    formInput: ICollectionFromInput,
    fileUrl: string,
    router: AppRouterInstance
  ) => Promise<void>;
  fetchMyCollections: () => Promise<IFormattedCollection[]>;
  createNFT: (
    formInput: INFTFormInput,
    fileUrl: string,
    router: AppRouterInstance
  ) => Promise<void>;

  fetchNFTsByCollection: (collectionId: number) => Promise<IFormattedNFT[]>;
}

export interface IUploadToIPFSResponse {
  success: boolean;
  message: string;
}

export interface ICollectionFromInput {
  name: string;
  description: string;
}

export interface INFTFormInput {
  name: string;
  description: string;
  collectionId: string | number;
  price: string | null;
}

export interface IRawNFT {
  tokenId: BigNumberish;
  owner: string;
  collectionId: string;
}

export interface IFormattedNFT {
  tokenId: number;
  owner: string;
  image: string;
  name: string;
  description: string;
  tokenURI: string;
  collectionId: string;
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
