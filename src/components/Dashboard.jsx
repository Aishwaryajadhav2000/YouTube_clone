import React, { useEffect, useState } from 'react';
import fetchAllVideos from '../services/videoService.js';
import VideoCard from './VideoCard.jsx';
import Categories from './Categories.jsx';
// import fetchAllVideos from "../services/videoService.js"

function Dashboard() {
  const {
    videos,
    filtered,
    categories,
    selectedCategory,
    handleCategorySelect,
  } = fetchAllVideos();

  return (
    <>

      {/* Categories to display on dashboard and load videos  */}
      <Categories
        categories={categories}
        selected={selectedCategory}
        onSelect={handleCategorySelect}
      />

      {/* Videos  to display on dashboard */}
      <div className="px-2 py-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((video) => (
          <VideoCard video={video} key={video.videoId} />
        ))}
      </div>
    </>
  );
}

export default Dashboard;











// const Dashboard = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     const loadVideos = async () => {
//       try {
//         const data = await fetchAllVideos();
//         setVideos(data);
//         console.log("data" , data)
//       } catch (error) {
//         console.error('Error fetching videos:', error.message);
//       }
//     };

//     loadVideos();
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">All Videos</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {videos.length === 0 ? (
//           <p>No videos found.</p>
//         ) : (
//           videos.map((video) => (
//             <div key={video._id} className="border p-2 rounded shadow-md">
//               <video
//                 controls
//                 width="100%"
//                 height="auto"
//                 className="rounded"
//                 src={`http://localhost:8000/${video.path.replace(/\\/g, '/')}`}
//               />
//               <h2 className="font-semibold mt-2">{video.title}</h2>
//               {video.description && <p className="text-sm text-gray-600">{video.description}</p>}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
