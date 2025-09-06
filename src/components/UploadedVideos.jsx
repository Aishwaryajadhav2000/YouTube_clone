import React, { useEffect , useState } from 'react'
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  MdQueue,
  MdWatchLater,
  MdPlaylistAdd,
  MdFileDownload,
  MdShare,
  MdOutlineThumbDown,
  MdBlock,
  MdFlag,
} from "react-icons/md";


export default function UploadedVideos({ video }) {

     const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        console.log("videos", video)
    })

     const handleToggleDropdown = (e) => {
        e.preventDefault();
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <>
              <div className="p-2 hover:shadow-md transition rounded-md relative bg-amber-950">
                {/* Redirect to watch page with video */}
                <Link to={`/watch/${video.videoId}`} className="block">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                        <img
                            src={video.thumbnailUrl?.length ? video.thumbnailUrl : ""}
                            alt={video.title}
                            className="absolute w-full h-full object-cover"
                        />
                    </div>
                </Link>

                {/* Dropdown */}
                <div className="flex justify-between items-start mt-2 relative">
                    <h3
                        className="font-semibold text-base sm:text-lg truncate w-4/5"
                        title={video.title}
                    >
                        {video.title}
                    </h3>

                    <div className="relative">
                        <button
                            onClick={handleToggleDropdown}
                            className="p-1 hover:bg-gray-200 rounded-full"
                        >
                            <BsThreeDotsVertical size={18} />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-1 bg-white rounded shadow-md w-48 z-10">
                                <ul className="absolute right-0 top-8 w-56 bg-black shadow-md rounded z-50 text-sm">
                                    <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 hover:text-black cursor-default">
                                        <MdQueue /> Add to queue
                                    </li>
                                    <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 hover:text-black cursor-default">
                                        <MdWatchLater /> Save to Watch later
                                    </li>
                                    <li
                                        className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 hover:text-black cursor-pointer"
                                        onClick={() => handleSaveToPlaylist(v._id)}
                                    >
                                        <MdPlaylistAdd /> Save to playlist
                                    </li>
                                    <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 hover:text-black cursor-default">
                                        <MdFileDownload /> Download
                                    </li>
                                    <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 hover:text-black cursor-default">
                                        <MdShare /> Share
                                    </li>
                                    <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 hover:text-black cursor-default">
                                        <MdOutlineThumbDown /> Not interested
                                    </li>
                                    <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 hover:text-black cursor-default">
                                        <MdBlock /> Don't recommend channel
                                    </li>
                                    <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 hover:text-black cursor-default">
                                        <MdFlag /> Report
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* <Link to={`/watch/${video.videoId}`} className="block">
                    <p className="text-sm text-gray-600 mt-1">
                        {video.uploader.username}
                    </p>
                    <p className="text-xs text-gray-500">{video.views.length} views</p>
                </Link> */}
            </div>


        </>
    )
}
