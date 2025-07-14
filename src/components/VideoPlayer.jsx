import useVideoPlayer from "../services/useVideoPlayer";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike, AiFillDislike, AiOutlineArrowDown } from "react-icons/ai";
import { Share } from "lucide-react";

function VideoPlayer({ video }) {
  const { extractYouTubeId } = useVideoPlayer(video);

  if (!video || !video.videoUrl) {
    return <div className="text-red-500 text-center">Video not found..</div>;
  }

  const youtubeId = extractYouTubeId(video.videoUrl);
  const views = video?.views?.length || 0;
  const uploadDate = new Date(video.uploadDate).toLocaleDateString();

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto text-black">
      {/* Video Player */}
      <div className="w-full rounded-lg overflow-hidden aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0`}
          title={video.title}
          className="w-full h-full rounded"
          allow="autoplay"
          allowFullScreen
        />
      </div>

      {/* Title */}
      <h2 className="text-lg sm:text-2xl font-bold mt-4">{video.title}</h2>

      {/* Meta */}
      <div className="text-gray-600 text-sm sm:text-base mt-1">
        <span>{views} views • {uploadDate}</span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center justify-between mt-4">
        <div className="flex gap-2 items-center">
          <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 text-sm">
            <AiOutlineLike /> {video.likes.length}
          </button>
          <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 text-sm">
            <AiFillDislike />
          </button>
          <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 text-sm">
            <Share size={14} /> Share
          </button>
          <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 text-sm">
            <AiOutlineArrowDown /> Download
          </button>
        </div>
        <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
          <BsThreeDots />
        </button>
      </div>

      {/* Uploader Info */}
      <div className="flex items-start sm:items-center gap-4 mt-6 border-t pt-4">
        <img src={video.uploader.avatar} alt="uploader" className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h3 className="font-semibold text-sm sm:text-base">{video.uploader.username}</h3>
          <p className="text-gray-500 text-xs sm:text-sm">@{video.channelId}</p>
        </div>
      </div>

      {/* Description */}
      <div className="mt-4 bg-gray-100 p-4 rounded-lg text-sm sm:text-base">
        {video.description}
      </div>
    </div>
  );
}

export default VideoPlayer;
