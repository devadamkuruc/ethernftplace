import { ArrowLeftIcon, ArrowRightIcon } from "@/assets/icons";
import { PageSizeDropdown } from "@/components";

const Pagination = () => {
  return (
    <div className="flex justify-between w-full">
      <div className="flexCenter">
        <p className="text-white text-xs mr-2">Show</p>
        <PageSizeDropdown />
        <p className="text-white text-xs ml-2">Results</p>
      </div>
      <div className="flex">
        <button className="text-white text-xs bg-ether-grey-2 px-4 py-2 rounded-md hover:bg-ether-grey-3">
          First
        </button>
        <button className=" bg-ether-grey-2 px-4 py-2 rounded-md mx-2 hover:bg-ether-grey-3">
          <ArrowLeftIcon />
        </button>
        <div className="text-white text-xs flexCenter bg-ether-grey-2 px-4 py-2 rounded-md">
          PAGE 1 OF 1
        </div>
        <button className=" bg-ether-grey-2 px-4 py-2 rounded-md mx-2 hover:bg-ether-grey-3">
          <ArrowRightIcon />
        </button>
        <button className="text-white text-xs bg-ether-grey-2 px-4 py-2 rounded-md hover:bg-ether-grey-3">
          Last
        </button>
      </div>
    </div>
  );
};

export default Pagination;
