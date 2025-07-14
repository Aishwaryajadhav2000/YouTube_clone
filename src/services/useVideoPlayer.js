import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import API_BASE_URL from "./Apicall";



const useVideoPlayer = (video) => {
  const [channelInfo, setChannelInfo] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [userChannel, setUserChannel] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSaveDropdown, setShowSaveDropdown] = useState(false);
  const [isInWatchLater, setIsInWatchLater] = useState(false);
  const dropdownRef = useRef();

  const navigate = useNavigate();

   function extractYouTubeId(url) {
        const match = url?.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : '';
    }


  return {
    extractYouTubeId

  };
};

export default useVideoPlayer;
