"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";

import { images } from "@/assets/images";
import { useCurrentNFTContext } from "@/context/NFTContext";
import { Button, Checkbox, Input, Pagination } from "@/components";
import { IFormattedCollection, INFTFormInput } from "@/types/INFTContext";
import ThrashIcon from "@/assets/icons/ThrashIcon";

const CreateNFT = () => {
  const [formInput, setFormInput] = useState<INFTFormInput>({
    name: "",
    description: "",
    collectionId: 0,
    formInputPrice: "0",
  });
  const [fileUrl, setFileUrl] = useState<string>("");
  const [listOnMarket, setListOnMarket] = useState<boolean>(false);
  const [myCollections, setMyCollections] = useState<IFormattedCollection[]>(
    []
  );
  const [myCollectionsCopy, setMyCollectionsCopy] = useState<
    IFormattedCollection[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const { uploadToIPFS, removeFromIPFS, createNFT, fetchMyCollections } =
    useCurrentNFTContext();
  const router = useRouter();

  useEffect(() => {
    fetchMyCollections().then((collections) => {
      setMyCollections(collections);
      setMyCollectionsCopy(collections);
      setIsLoading(false);
    });
  }, []);

  const onDrop = useCallback(
    async (acceptedFile: File[]) => {
      if (uploadToIPFS) {
        const response = await uploadToIPFS(acceptedFile[0], "nft");

        if (response.success) {
          setFileUrl(response.message);
        } else {
          console.log(response.message);
        }
      }
    },
    [uploadToIPFS]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxSize: 5000000,
  });

  const fileStyle = useMemo(
    () =>
      `flexCenter w-full border-ether-grey-5 border-2 flex flex-col items-center p-5 rounded-md border-dashed cursor-pointer
          ${isDragActive ? "border-file-active" : ""}
          ${isDragAccept ? "border-file-accept" : ""}
          ${isDragReject ? "border-file-reject" : ""}
          `,
    [isDragActive, isDragAccept, isDragReject]
  );

  const handleRemoveFileUrl = () => {
    const ipfsHash = fileUrl.split("/").pop();

    if (ipfsHash) removeFromIPFS(ipfsHash);

    setFileUrl("");
  };

  return (
    <div className="flex flex-col items-center px-28 py-4 mt-28 mb-16 w-full">
      <div className="mb-4 w-4/5">
        <h1 className="text-white text-3xl font-semibold mb-2">
          Create new NFT
        </h1>
        <div className="text-white text-sm">
          Once your item is minted you will not be able to change name or
          description
        </div>
      </div>

      <div className="flex gap-28 w-4/5 h-screen">
        <div className="flex justify-center w-[45%] h-[65%]">
          <div className="relative flex w-full h-full rounded-md overflow-hidden">
            {fileUrl ? (
              <div className="relative w-full h-full group">
                <Image
                  src={fileUrl}
                  alt="asset_file"
                  fill
                  className="object-cover"
                />
                <div className="absolute w-full h-full z-20 group-hover:bg-black group-hover:opacity-50 cursor-pointer transition duration-300" />
                <div className="cursor-pointer" onClick={handleRemoveFileUrl}>
                  <ThrashIcon classStyles="absolute hidden group-hover:block top-4 right-4 z-30" />
                </div>
              </div>
            ) : (
              <div {...getRootProps()} className={fileStyle}>
                <input {...getInputProps()} />
                <div className="flexCenter flex-col text-center">
                  <div className="my-12 w-full flex justify-center items-center">
                    <Image
                      src={images.upload}
                      width={100}
                      height={100}
                      alt="upload"
                      className="object-contain"
                    />
                  </div>

                  <p className="text-white font-semibold text-2xl">
                    Drag and Drop File
                  </p>
                  <p className="text-white font-normal text-sm mt-2">
                    or Browse media on your device
                  </p>
                  <p className="text-white font-normal text-sm mt-2">
                    JPG, PNG, GIF, SVG, WEBM, Max 100mb.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col w-[55%] justify-start">
          <Input
            inputType="input"
            title="Name *"
            placeholder="NFT Name"
            handleClick={(e) =>
              setFormInput({ ...formInput, name: e.target.value })
            }
          />
          <Input
            inputType="textarea"
            title="Description *"
            placeholder="NFT Description"
            classStyles="mt-4"
            handleClick={(e) =>
              setFormInput({ ...formInput, description: e.target.value })
            }
          />
          <Input
            inputType="number"
            title="Price *"
            placeholder="NFT Price"
            classStyles="mt-4"
            handleClick={(e) =>
              setFormInput({ ...formInput, formInputPrice: e.target.value })
            }
          />

          <div className="mt-4 w-full">
            <div className="text-white font-semibold text-lg">
              Choose collection
            </div>
            <div className="text-ether-grey-5 text-sm">
              Choose an existing collection
            </div>

            <div className="flex flex-col w-full bg-ether-grey-1 rounded-2xl mt-4">
              <div className="border-b border-b-ether-grey-3 px-6">
                <div className="text-white my-4">Collections</div>
              </div>
              <div className="flex flex-col">
                <div className="grid grid-cols-12 border-b border-b-ether-grey-2 px-6 py-4">
                  <div className="col-span-1 text-ether-grey-5 text-sm">#</div>
                  <div className="col-span-5 text-ether-grey-5 text-sm">
                    Collection
                  </div>
                  <div className="col-span-3 text-ether-grey-5 text-sm">
                    Total Assets
                  </div>
                  <div className="col-span-3 text-ether-grey-5 text-sm">
                    Owners
                  </div>
                </div>
                <div className="flex flex-col pb-6">
                  {myCollections.map((collection, index) => (
                    <div
                      key={index}
                      className={`w-full cursor-pointer hover:bg-ether-grey-3 px-6 ${
                        formInput.collectionId === collection.collectionId
                          ? "bg-ether-grey-3"
                          : ""
                      }`}
                      onClick={() => {
                        if (
                          formInput.collectionId === collection.collectionId
                        ) {
                          setFormInput({
                            ...formInput,
                            collectionId: 0,
                          });
                        } else {
                          setFormInput({
                            ...formInput,
                            collectionId: collection.collectionId,
                          });
                        }
                      }}
                    >
                      <div className="grid grid-cols-12 border-b border-b-ether-grey-2 items-center py-4">
                        <div className="col-span-1 text-white text-sm">
                          {index + 1}
                        </div>
                        <div className="flex col-span-5 text-white text-sm items-center">
                          <div className="w-8 h-8 overflow-hidden rounded-full">
                            <Image
                              src={collection.image}
                              width={32}
                              height={32}
                              alt="collection"
                              className="object-contain"
                            />
                          </div>
                          <div className="ml-3">{collection.name}</div>
                        </div>
                        <div className="col-span-3 text-white text-sm">255</div>
                        <div className="col-span-3 text-white text-sm">22</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pb-6 px-6 w-full flex justify-end">
                  <Pagination />
                </div>
              </div>
            </div>
          </div>

          <div className="flex text-white mt-4 text-sm">
            Do you want to place NFT on market ?{" "}
            <Checkbox
              classStyles="ml-6"
              handleClick={() => setListOnMarket((prev) => !prev)}
              checked={listOnMarket}
            />
          </div>

          <div className="mt-16 w-full flex justify-end">
            <Button
              btnName="Create NFT"
              classStyles="rounded-md"
              handleClick={() => createNFT(formInput, fileUrl, router)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
