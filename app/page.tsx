import { HeroSection, TopCreatorsSection, NFTsSection } from "@/components";

const Home = () => {
  return (
    <div className=" flex-col flexCenter px-28 py-4">
      <HeroSection />
      <TopCreatorsSection />
      <NFTsSection />
    </div>
  );
};

export default Home;
