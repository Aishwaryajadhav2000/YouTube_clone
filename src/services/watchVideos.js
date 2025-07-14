import { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "./Apicall";



const watchVideos = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

const [video, setVideo] = useState(location.state?.video || null);
  const [playlist, setPlaylist] = useState(location.state?.playlist || null);
  const [videos, setVideos] = useState([]);
  const [channelNames, setChannelNames] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/videos/${id}`);
        setVideo(res.data)
      } catch (err) {
        console.log("Failed to fetch", err)
      }
    };
    fetchVideo();
  }, [id])


   useEffect(() => {
    const fetchVideosAndChannels = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/videos`);
        const fetchedVideos = res.data;
        setVideos(fetchedVideos)
        console.log("fetchvideos" , videos)

        const uniqueChannelIds = [
          ...new Set(fetchedVideos.map((v) => v.channelId)),
        ];
        const channelMap = {};
        const validChannelIds = [];
        console.log("videos are" , videos)
        setChannelNames(channelMap);
      } catch (err) {
        console.error("Error fetching videos or channels", err);
      }
    };

    fetchVideosAndChannels();
  }, []);

   
  const filteredSuggestions = videos

   const handleVideoSelect = (videoId) => {
    navigate(`/watch/${videoId}`);
  };

  return {
    video,
    filteredSuggestions, channelNames , handleVideoSelect , setVideo
  }


}



export default watchVideos;
