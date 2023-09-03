import { HeroSection, CollectionsTable, NFTsTable } from "@/components";

const Home = () => {
  return (
    <div className="flex-col flexCenter px-28 py-4 mb-16">
      <HeroSection />

      <div className="text-white my-4 self-start font-semibold text-3xl">
        Explore the Marketplace
      </div>

      <CollectionsTable />

      <NFTsTable
        nftCardClassStyles="h-188"
        tableClassStyles="mt-8"
        noCollection
      />
    </div>
  );
};

export default Home;
