import React from "react";
import Image from "next/image";

import { Button } from "@/components";
import { images } from "@/assets/images";

const HeroSection = () => {
  return (
    <section className="flex h-screen">
      <div className="flex flex-col flex-1 justify-center">
        <h2 className="font-bold text-5xl text-white mb-6">
          Explore a Universe of Unique Digital Collectibles
        </h2>
        <p className="text-base text-white my-6 mb-3">
          The future of art is here, and it's digitized. Join us in celebrating
          the boundless creativity of artists who are using NFTs to redefine the
          concept of ownership and transform the way we experience art.
        </p>
        <Button
          btnName="Start Exploring"
          classStyles="rounded-md self-start mt-3"
        />
      </div>
      <div className="flex flex-1 justify-center items-center">
        <div className="grid w-4/5 h-4/5 grid-rows-6 grid-cols-2 gap-3 overflow-hidden">
          <div className="row-span-2 col-span-1 overflow-hidden">
            <Image
              src={images.hero1}
              alt="hero"
              className="rounded-md h-[100%]"
            />
          </div>
          <div className="row-start-2 row-span-3 col-start-2 col-span-1 overflow-hidden">
            <Image
              src={images.hero2}
              alt="hero"
              className="rounded-md h-[100%]"
            />
          </div>
          <div className="row-start-3 row-span-3 col-span-1 overflow-hidden">
            <Image
              src={images.hero3}
              alt="hero"
              className="rounded-md h-[100%]"
            />
          </div>
          <div className="row-start-5 row-span-2 col-start-2 col-span-1 overflow-hidden">
            <Image
              src={images.hero4}
              alt="hero"
              className="rounded-md h-[100%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
