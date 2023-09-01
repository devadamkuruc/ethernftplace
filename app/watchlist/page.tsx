import { AccountsTable, Banner, NFTsTable, Searchbar } from "@/components";

const Watchlist = () => {
  return (
    <div className="flex-col flexCenter px-28 py-4 mt-8 mb-16">
      <div className="flexBetween w-full mt-14 gap-28">
        <Searchbar />
        <Banner />
      </div>

      <div className="text-white mt-16 self-start font-semibold text-3xl">
        Creators
      </div>
      <div className="text-ether-grey-5 text-sm mt-2 self-start">
        Creators are following
      </div>

      <AccountsTable />

      <div className="text-white mt-16 self-start font-semibold text-3xl">
        NFTs
      </div>
      <div className="text-ether-grey-5 text-sm mt-2 self-start">
        NFTs in your watchlist
      </div>

      <NFTsTable nftCardClassStyles="h-148" tableClassStyles="mt-8" />
    </div>
  );
};

export default Watchlist;
