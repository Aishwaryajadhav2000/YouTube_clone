import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../services/Apicall';
import axios from "axios";
import { useState } from 'react';

// createChannelService.js
const createChanneService = (onClose) => {

  const navigate = useNavigate();
  const [ handle,
    setHandle,] = useState("");
  const [channelName, setChannelName] = useState("");
  const [ channelImage,
    setChannelImage] = useState(null);

  const isFormValid =  handle && channelName && channelImage



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const formData = new FormData();
    formData.append("channelName", channelName);
    formData.append("handle", handle);
    formData.append("channelImage", channelImage);

    




    try {
      const token = localStorage.getItem("token");
      console.log("token" , token)
      const response = await axios.post(
        `${API_BASE_URL}/create`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      // if (response?.data?.channelId) {
      //   await fetchCurrentUser();
      //   onClose();
      //   navigate(`/channel/${response.data.channelId}`);
      // }
    } catch (error) {
      console.error("Error creating channel:", error);
    } 
  };

  return {
    channelName, setChannelName,
    handle,
    setHandle,
   channelImage,
    setChannelImage,
    isFormValid,
    handleSubmit,
    
  };

 



};

export default createChanneService;
