"use client";

import { useMemo, useState, useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";

import { images } from "@/assets/images";
import { useCurrentNFTContext } from "@/context/NFTContext";
import { Button, Checkbox, Input, Pagination } from "@/components";
import { collections } from "@/components/CollectionsTable";
import { INFTFormInput } from "@/types/INFTContext";

const CreateNFT = () => {
  const [formInput, setFormInput] = useState<INFTFormInput>({
    name: "",
    description: "",
    collectionId: 0,
    price: null,
  });
  const [fileUrl, setFileUrl] = useState<string>("");
  const [listOnMarket, setListOnMarket] = useState<boolean>(false);
  const { uploadToIPFS, createNFT } = useCurrentNFTContext();
  const router = useRouter();

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
      `border-ether-grey-5 border-2 flex flex-col items-center p-5 rounded-2xl border-dashed cursor-pointer
          ${isDragActive ? "border-file-active" : ""}
          ${isDragAccept ? "border-file-accept" : ""}
          ${isDragReject ? "border-file-reject" : ""}
          `,
    [isDragActive, isDragAccept, isDragReject]
  );

  console.log(formInput);

  return (
    <div className="flex justify-center p-12 mt-16">
      <div className="w-3/5">
        <h1 className="text-white text-2xl font-semibold">Create new NFT</h1>

        <div className="mt-16">
          <p className="text-white font-semibold text-xl">Upload file</p>

          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="text-white font-semibold text-xl">
                  JPG, PNG, GIF, SVG, WEBM, Max 100mb.
                </p>

                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    alt="upload"
                    className="object-contain"
                  />
                </div>

                <p className="text-white font-semibold text-sm">
                  Drag and Drop File
                </p>
                <p className="text-white font-semibold text-sm mt-2">
                  or Browse media on your device
                </p>
              </div>
            </div>

            {fileUrl ? (
              <aside>
                <div>
                  <Image
                    src={fileUrl}
                    alt="asset_file"
                    className="rounded-2xl mt-4"
                    width={350}
                    height={350}
                  />
                </div>
              </aside>
            ) : (
              ""
            )}
          </div>
        </div>

        <Input
          inputType="input"
          title="Name"
          placeholder="NFT Name"
          handleClick={(e) =>
            setFormInput({ ...formInput, name: e.target.value })
          }
        />
        <Input
          inputType="textarea"
          title="Description"
          placeholder="NFT Description"
          handleClick={(e) =>
            setFormInput({ ...formInput, description: e.target.value })
          }
        />

        <div className="mt-10 w-full">
          <div className="text-white font-semibold text-xl">
            Choose collection
          </div>
          <div className="text-ether-grey-5 text-sm mt-2">
            Choose an existing collection
          </div>

          <div className="flex flex-col w-full bg-ether-grey-1 rounded-2xl mt-10">
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
                {collections.map((collection, index) => (
                  <div
                    key={index}
                    className={`w-full cursor-pointer hover:bg-ether-grey-3 px-6 ${
                      formInput.collectionId === collection.collectionId
                        ? "bg-ether-grey-3"
                        : ""
                    }`}
                    onClick={() => {
                      if (formInput.collectionId === collection.collectionId) {
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
                            alt="collection"
                            className="object-contain"
                          />
                        </div>
                        <div className="ml-3">{collection.name}</div>
                      </div>
                      <div className="col-span-3 text-white text-sm">
                        {collection.totalAssets}
                      </div>
                      <div className="col-span-3 text-white text-sm">
                        {collection.owners}
                      </div>
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

        <div className="flex text-white mt-10">
          Do you want to place NFT on market ?{" "}
          <Checkbox
            classStyles="ml-6"
            handleClick={() => setListOnMarket((prev) => !prev)}
            checked={listOnMarket}
          />
        </div>
        {listOnMarket ? (
          <Input
            inputType="number"
            title="Price"
            placeholder="NFT Price"
            handleClick={(e) =>
              setFormInput({ ...formInput, price: e.target.value })
            }
          />
        ) : (
          ""
        )}

        <div className="mt-16 w-full flex justify-end">
          <Button
            btnName="Create NFT"
            classStyles="rounded-md"
            handleClick={() => createNFT(formInput, fileUrl, router)}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
