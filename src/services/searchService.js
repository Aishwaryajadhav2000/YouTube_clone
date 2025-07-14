import API_BASE_URL from "./Apicall";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Search service to call API : search video by title
const searchService = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeRecentIndex, setActiveRecentIndex] = useState(-1);

  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() === "") return setSuggestions([]);
      const res = await axios.get(
        `${API_BASE_URL}/api/search/suggestions?q=${query}`
      );
      setSuggestions(res.data);
      console.log("setsuggestion", suggestions)
      // Reset on new fetch
      setActiveIndex(-1);
    };
    const delayDebounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayDebounce);
  }, [query]);

//  Search action handle and navigation

  const handleSuggestionClick = (s) => {
    if (s.type === "video") {
      navigate(`/watch/${s.videoId}`);
    } else if (s.type === "playlist" && s.videos.length > 0) {
      const firstVideoId = s.videos[0].videoId;
      if (firstVideoId) {
        navigate(`/watch/${firstVideoId}`, {
          state: { playlist: { videos: s.videos } },
        });
      }
    }
    setSuggestions([]);
    setActiveIndex(-1);
  };



  return {
    query, setQuery, suggestions, activeIndex, activeRecentIndex, searchInputRef, suggestionsRef, handleSuggestionClick,
  };
};

export default searchService;