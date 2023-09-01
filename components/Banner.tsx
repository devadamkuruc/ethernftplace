import { BannerBackground, QRCode } from "@/assets/icons";

const Banner = () => {
  return (
    <div className="relative overflow-hidden flex h-128 w-324 eth-gradient-2 rounded-2xl">
      <BannerBackground classStyles="z-0" />
      <div className="flex flex-1 flex-col flexCenter m-4">
        <p className="font-extrabold text-white text-xl font-nunito">
          Explorify
        </p>
        <p className="text-xs text-white font-light ">Powered by WebWorks</p>
      </div>
      <div className="flexCenter flex-1">
        <QRCode />
      </div>
    </div>
  );
};

export default Banner;
