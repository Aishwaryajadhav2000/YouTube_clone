import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";

export default function SearchBar() {
   return (
    <div className="w-full md:w-[70%] flex items-center">
      <div className="flex items-center w-full border border-black-500 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-blue-200">

        <input
          type="text"
          placeholder="Search"
          className="w-full px-2 py-2 text-base focus:outline-none"
        />

        <button className="bg-gray-300 px-4 py-2">
          <CiSearch size={25} />
        </button>

       
      </div>
       <button>
            <IoMdMic className="text-black rounded-full  bg-gray-300 ml-3 p-1.5" size={35}></IoMdMic>
        </button>
    </div>
  );
}
