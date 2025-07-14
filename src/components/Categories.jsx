import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Load videos category vise
function Categories({ categories, selected, onSelect }) {
  const scrollRef = useRef();

  const scroll = (dir) => {
    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="sticky top-0 z-40 bg-white">
      <div className="relative flex items-center bg-white px-4 py-2 overflow-hidden">
       {/* Scrolling */}
        <button
          className="absolute left-0 z-10 bg-white px-2 py-1"
          onClick={() => scroll("left")}
        >
          <ChevronLeft />
        </button>
        
        <div className="mx-6 w-full overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide whitespace-nowrap"
          >
            {["All", ...categories].map((cat, i) => (
              <button
                key={i}
                onClick={() => onSelect(cat)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                  selected === cat ? "bg-black text-white" : "bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 bg-white px-2 py-1"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Categories;
