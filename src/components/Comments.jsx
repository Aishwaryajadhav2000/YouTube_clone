import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FaSortDown, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { MdDelete, MdReport } from "react-icons/md";
import API_BASE_URL from "../services/Apicall";
import axios from "axios";
import moment from "moment";

function Comments({ video, setVideo }) {

  console.log("videooncomments", video)

  const [comment, setComment] = useState("");
  const { token, user } = useSelector((state) => state.auth);
    const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);
  // const commentsLength = video.comments.length
  const firstInitial = user?.firstname?.trim().charAt(0).toUpperCase();

  const handleComment = async () => {

    const res = await axios.post(
      `${API_BASE_URL}/api/${video.videoId}/videocomments`,
      { text: comment },
      { headers: { Authorization: `JWT ${token}` } }
    );

    setVideo((prev) => ({ ...prev, comments: res.data }));
    setComment("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="mt-6 p-3 sm:p-6">

      <div className="flex items-center gap-5 mb-4">
        <h3 className="font-semibold text-lg">
          Comments
        </h3>
        <div className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer">
          <FaSortDown />
          Sort by
        </div>
      </div>

      {token && (
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-start gap-3">

            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="bg-blue-500 text-white font-bold w-10 h-10 flex items-center justify-center rounded-full">
                {firstInitial}
              </div>
            )}
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 border-b focus:outline-none focus:border-gray-500 py-2"
              value={comment}
              onFocus={() => setIsFocused(true)}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>


          <div className="flex justify-end gap-2 mt-1 ml-12">
            <button
              className="text-sm font-medium text-black hover:text-black hover:bg-gray-200 hover:rounded-full p-2 px-4"
              onClick={() => {
                setComment("");
              }}
            >
              Cancel
            </button>
            <button className="text-sm px-4 py-1 rounded-full bg-blue-500 " onClick={handleComment}>
              Comment
            </button>
          </div>

        </div>
      )}


    </div>
  )
}

export default Comments;