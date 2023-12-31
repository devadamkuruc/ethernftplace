import {
  AccountsTable,
  Banner,
  CollectionsTable,
  Searchbar,
} from "@/components";

const Watchlist = () => {
  return (
    <div className="flex-col flexCenter px-28 py-4 mt-8 mb-16">
      <div className="flexBetween w-full mt-14 gap-28">
        <Searchbar />
        <Banner />
      </div>

      <div className="text-white mt-16 self-start font-semibold text-3xl">
        Watchlist
      </div>

      <AccountsTable />

      <CollectionsTable watchlist />
    </div>
  );
};

export default Watchlist;
