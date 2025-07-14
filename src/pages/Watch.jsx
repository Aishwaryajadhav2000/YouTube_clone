import React from 'react'
import watchVideos from '../services/watchVideos'
import VideoPlayer from '../components/VideoPlayer';
import Comments from '../components/Comments';
import VideoSuggetion from '../components/VideoSuggetion';

export default function Watch() {

  const { video , filteredSuggestions, channelNames , handleVideoSelect , setVideo} = watchVideos();
  console.log("filteredSuggestions", filteredSuggestions)



  return (
    <div className="w-full max-w-[1350px] mx-auto px-0 md:px-4 lg:px-6">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1">
          <VideoPlayer video={video} />

          <Comments video={video} setVideo={setVideo}/>
          
        </div>

        <div className="w-full md:w-[360px] flex-col gap-6 top-20 overflow-y-auto pr-1 hidden md:block scrollbar-hide">
           <VideoSuggetion
              suggestions={filteredSuggestions}
              channelNames={channelNames}
              onSelect={handleVideoSelect}
            />
        </div>


      </div>
    </div>
  )
}
