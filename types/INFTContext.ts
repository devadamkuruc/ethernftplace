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
  fetchCollectionById: (
    collectionId: number
  ) => Promise<IFormattedCollection | null>;
  createNFT: (
    formInput: INFTFormInput,
    fileUrl: string,
    router: AppRouterInstance
  ) => Promise<void>;
  fetchNFTsByCollection: (collectionId: number) => Promise<IFormattedNFT[]>;
  listNFTForSale: (
    formInputPrice: string,
    isReselling?: boolean,
    id?: string
  ) => Promise<void>;
  fetchListedNFTs: () => Promise<IFormattedNFT[]>;
  fetchNFTDetails: (tokenId: number) => Promise<IFormattedNFT>;
}

export interface IUploadToIPFSResponse {
  success: boolean;
  message: string;
}

export interface ICollectionFromInput {
  name: string;
  description: string;
  nfts: number[];
}

export interface INFTFormInput {
  name: string;
  description: string;
  collectionId: string | number;
  formInputPrice: string;
}

export interface IRawNFT {
  tokenId: BigNumberish;
  owner: string;
  seller: string;
  collectionId: string;
  price: BigNumberish;
}

export interface IFormattedNFT {
  tokenId: number;
  owner: string;
  image: string;
  name: string;
  description: string;
  tokenURI: string;
  collectionId: string;
  price: string;
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
