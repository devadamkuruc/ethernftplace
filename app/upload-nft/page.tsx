"use client";

import { useMemo, useState, useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";

import { images } from "@/assets/images";
import { useCurrentNFTContext } from "@/context/NFTContext";
import { Button, Input } from "@/components";

const UploadNFT = () => {
  const [formInput, setFormInput] = useState({
    name: "",
    description: "",
    price: "",
    category: 0,
  });
  const [fileUrl, setFileUrl] = useState<string>("");
  const { uploadToIPFS, createNFT } = useCurrentNFTContext();
  const router = useRouter();

  const onDrop = useCallback(
    async (acceptedFile: File[]) => {
      if (uploadToIPFS) {
        const response = await uploadToIPFS(acceptedFile[0]);

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
      `border-ether-grey-5 border-2 flex flex-col items-center p-5 rounded-lg border-dashed cursor-pointer
          ${isDragActive ? "border-file-active" : ""}
          ${isDragAccept ? "border-file-accept" : ""}
          ${isDragReject ? "border-file-reject" : ""}
          `,
    [isDragActive, isDragAccept, isDragReject]
  );

  return (
    <div className="flex justify-center p-12 mt-16">
      <div className="w-3/5">
        <h1 className="text-white text-2xl font-semibold">Upload new NFT</h1>

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
                    className="rounded-md mt-4"
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
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) =>
            setFormInput({ ...formInput, price: e.target.value })
          }
        />

        <div className="mt-16 w-full flex justify-end">
          <Button
            btnName="Upload NFT"
            classStyles="rounded-md"
            handleClick={() => createNFT(formInput, fileUrl, router)}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadNFT;
