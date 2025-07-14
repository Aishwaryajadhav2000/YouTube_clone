 import { XIcon, History, Search, Mic } from "lucide-react";
import searchService from "../services/searchService";

// SearchBar input to show on header
//USer can search video by title name
function SearchBar() {
  const { query, setQuery, suggestions, activeIndex, activeRecentIndex, searchInputRef, suggestionsRef, handleSuggestionClick,} = searchService();

  return (
    <div className="relative w-[100%] md:w-[70%]">
      <div className="flex items-center">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border rounded-l-full px-3 py-2 w-full border-gray-400 focus:outline-none "
            />

            <button
             
              className="bg-gray-200 text-white border border-gray-400 px-6 rounded-r-full hover:bg-gray-300 py-2"
            >
              <Search className="text-black" />
            </button>

            {/* Mic icon (currently not working) */}
            <button className="hidden sm:block ml-2 p-3 rounded-full bg-gray-100 hover:bg-gray-200">
              <Mic className="text-black" size={18} />
            </button>
      </div>

      
      {/* Show suggestions while searching video */}
      {suggestions.length > 0 && query && (
        <ul ref={suggestionsRef} className="absolute bg-white w-full z-10 max-h-60 shadow-2xl rounded-lg overflow-y-auto mt-2 scrollbar-hide">
          {suggestions.map((s, index) => (
            <li
              key={s.videoId || s.playlistId}
              onClick={() => handleSuggestionClick(s)}
              className={`p-2 cursor-pointer ${
                index === activeIndex ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              {s.title} ({s.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
