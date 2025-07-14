import React from 'react'

export default function ChannelVideos({ videos }) {

    const [dropdownOpen, setDropdownOpen] = useState(false);


    const handleToggleDropdown = (e) => {
        e.preventDefault();
        setDropdownOpen(!dropdownOpen);
    };

    console.log(videos)

    return (
        <div className="p-2 hover:shadow-md transition rounded-md relative">
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
                            <ul className="absolute right-0 top-8 w-56 bg-white shadow-md rounded z-50 text-sm">
                                <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-default">
                                    <MdQueue /> Add to queue
                                </li>
                                <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-default">
                                    <MdWatchLater /> Save to Watch later
                                </li>
                                <li
                                    className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSaveToPlaylist(v._id)}
                                >
                                    <MdPlaylistAdd /> Save to playlist
                                </li>
                                <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-default">
                                    <MdFileDownload /> Download
                                </li>
                                <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-default">
                                    <MdShare /> Share
                                </li>
                                <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-default">
                                    <MdOutlineThumbDown /> Not interested
                                </li>
                                <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-default">
                                    <MdBlock /> Don't recommend channel
                                </li>
                                <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-default">
                                    <MdFlag /> Report
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
