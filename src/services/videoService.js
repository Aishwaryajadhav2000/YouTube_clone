import axios from 'axios';
import API_BASE_URL from './Apicall';
import { useEffect, useState } from "react";


 const fetchAllVideos = () => {

   const [videos, setVideos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    //  Fetch videos from the API and categorize them.
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/videos`);
        setVideos(res.data);
        setFiltered(res.data);
        console.log("videos response", res)

        const uniqueCategories = [
          ...new Set(res.data.map((video) => video.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchVideos();
  }, []);


   const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFiltered(videos);
    } else {
      setFiltered(videos.filter((v) => v.category === category));
    }
  };

  return {
    videos,
    filtered,
    categories,
    selectedCategory,
    handleCategorySelect,
  };

  // const response = await axios.get(`${API_BASE_URL}/api/videos`);
  // return response.data;
};

export default fetchAllVideos
