import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API_BASE_URL from '../services/Apicall';
import { data } from 'react-router-dom';
import { Search, SearchCheck } from 'lucide-react';
import UploadedVideos from '../components/UploadedVideos.jsx';
import VideoCard from '../components/VideoCard.jsx';
import ChannelPlaylists from '../components/ChannelPlaylists.jsx';
import ChannelPosts from '../components/ChannelPosts.jsx';

export default function Channel() {
  const user = useSelector((state) => state.auth.user);
  const firstInitial = user?.firstname?.trim().charAt(0).toUpperCase();
  const [channelName, setChannelName] = useState('');
  const [channelHandle, setChannelHandle] = useState('');
  const [totalVideos, setTotalVideos] = useState('');
  const [channelVideos, setChannelVideos] = useState(false)
  const [homeContent, setHomeContent] = useState(true);
  const [allVideos, setAllVieos] = useState('');
  const [channelPlaylist, setChannelPlaylist] = useState(false);
  const [channelPosts, setChannelPosts] = useState(false)

  useEffect(() => {
    setChannelVideos(false)
    const fetchChannel = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${API_BASE_URL}/getchannel`, {
          method: 'GET',
          headers: {
            Authorization: `JWT ${token}`,
          },
        });

        const data = await res.json();
        console.log("channeldata", data)
        setChannelName(data.channelName);
        setChannelHandle(data.handle);
        setTotalVideos(data.videos.length);
        setAllVieos(data.videos)
      } catch (err) {
        console.error('Error fetching channel:', err.message);
      }
    };

    fetchChannel();
  }, []);

  return (
    <div className="w-full bg-black text-white min-h-screen">
      {/* Banner */}
      <div className="w-full h-48 bg-gradient-to-r from-purple-700 to-indigo-800"></div>

      {/* Channel Info */}
      <div className="max-w-6xl mx-auto px-4 -mt-20 flex items-center space-x-6">
        {/* Avatar */}
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="Channel Avatar"
            className="w-36 h-36 rounded-full border-4 border-black object-cover"
          />
        ) : (
          <div className="w-36 h-36 flex items-center justify-center bg-red-500 text-5xl font-bold rounded-full border-4 border-black">
            {firstInitial}
          </div>
        )}

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold">{channelName || `${user.firstname} ${user.lastname}`}</h1>
          <p className="text-sm text-white">{channelHandle}</p>
          <p className="text-sm text-white mt-1">0 subscribers </p>
          <p className="text-sm text-white mt-1">{totalVideos} Videos </p>

        </div>
      </div>

      {/* Nav Tabs */}
      {/* <div className="max-w-6xl mx-auto px-4 mt-6 border-b border-gray-700">
        <nav className="flex flex-wrap text-sm font-semibold uppercase tracking-wide space-x-6 overflow-x-auto">
          {["Home", "Videos", "Shorts", "Live", "Playlists", "Community", "Channels", "About"].map((tab) => (
            <button
              key={tab}
              className="pb-2 hover:border-b-2 hover:border-white transition-all"

              // onClick={() => {
              //   if (tab === "Videos"){ setChannelVideos(true); setHomeContent(false)}
              // }}

            >
              {tab}
            </button>
          ))}
        </nav>
      </div> */}

      <div className="max-w-6xl mx-auto px-4 mt-6 border-b border-gray-700">
        <nav className="flex flex-wrap text-sm font-semibold uppercase tracking-wide space-x-6 overflow-x-auto">
          <button onClick={() => { setHomeContent(false); setChannelVideos(true); setChannelPlaylist(false);setChannelPosts(false) }}>Videos</button>

          <button onClick={() => { setHomeContent(false); setChannelVideos(false); setChannelPlaylist(true); setChannelPosts(false) }}>Playlists</button>

          <button onClick={() => { setHomeContent(false); setChannelVideos(false); setChannelPosts(true); setChannelPlaylist(false) }}>Posts</button>

          <button onClick={() => { setHomeContent(false); setChannelVideos(false); setChannelPlaylist(false); setChannelPosts(false) }}><Search></Search></button>
        </nav>
      </div>

      {/* Main Content Area */}
      {
        homeContent === true && (
          <div className="max-w-6xl mx-auto px-4 mt-6">
            <h2 className="text-xl font-semibold mb-2">Welcome to the channel!</h2>
            {
              totalVideos <= 0 ? (
                <p className="text-gray-300">
                  This channel hasn't uploaded any content yet.
                </p>

              ) : (
                <p className="text-gray-300">
                  Go watch the Videos uploaded by me
                </p>
              )
            }
          </div>
        )
      }


      {channelVideos === true && (
        <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allVideos.map((video) => (
            <UploadedVideos key={video._id} video={video} />
          ))}
        </div>
      )}

      {
        channelPlaylist === true && (
          <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <ChannelPlaylists></ChannelPlaylists>
          </div>

        )
      }

      {
        channelPosts === true && (
          <div className="max-w-6xl mx-auto px-4 mt-6 ">
          <ChannelPosts></ChannelPosts>
          </div>
        )
      }
    </div>
  );
}
