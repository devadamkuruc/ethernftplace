import { BannerBackground, QRCode } from "@/assets/icons";

const Banner = () => {
  return (
    <div className="relative overflow-hidden flex h-128 w-324 eth-gradient-2 rounded-2xl">
      <BannerBackground />
      <div className="flex flex-1 flex-col flexCenter m-4 z-20">
        <p className="font-extrabold text-white text-xl font-nunito">
          Explorify
        </p>
        <p className="text-xs text-white font-light ">Powered by WebWorks</p>
      </div>
      <div className="flexCenter flex-1 z-20">
        <QRCode />
      </div>
    </div>
  );
};

export default Banner;
