import { AccountsTable, Banner, Searchbar } from "@/components";

const FollowingCreators = () => {
  return (
    <div className="flex-col flexCenter px-28 py-4 mt-8 mb-16">
      <div className="flexBetween w-full mt-14 gap-28">
        <Searchbar />
        <Banner />
      </div>

      <div className="text-white mt-16 self-start font-semibold text-3xl">
        Following
      </div>
      <div className="text-ether-grey-5 text-sm mt-2 self-start">
        Creators you have been following
      </div>

      <AccountsTable />
    </div>
  );
};

export default FollowingCreators;
