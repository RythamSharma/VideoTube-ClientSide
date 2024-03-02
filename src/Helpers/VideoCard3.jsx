import React from "react";
import { useNavigate } from "react-router-dom";
function VideoCard3(props) {
  function calculateDaysAgo(createdAt) {
    const currentDate = new Date();
    const videoDate = new Date(createdAt);
    const timeDifference = currentDate - videoDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo;
  }
  const durat = props.duration.toFixed(2);
  const daysAgo = calculateDaysAgo(props.createdAt);
  const navigate = useNavigate();
  const handleVideoStream = () => {
    const videoId = props.id;
    const ownerId = props.owner;
    navigate(`/video-stream/${videoId}/${ownerId}`);
    window.location.reload();
  };
  return (
    <div
      className="flex flex-col md:flex-row my-2 mx-1 cursor-pointer"
      onClick={handleVideoStream}
    >
      <div className="thumbnail relative mr-2">
        <img
          className="md:w-[200px] w-full  rounded-xl"
          src={props.thumbnail}
          alt=""
        />
        <p className="absolute right-1 bottom-1 bg-black px-1 rounded text-xs" >{durat}</p>
      </div>
      <div className="content w-full md:w-[320px]  flex flex-col text-wrap text-white ">
        <p className="font-semibold  mb-1">{props.title}</p>
        <p className="text-gray-500 text-sm mb-1">{props.username}</p>
        <div className="text-gray-500 text-sm flex flex-row mb-1">
          <p>{props.views} views •</p>
          <p>{daysAgo} days ago</p>
        </div>
      </div>
    </div>
  );
}

export default VideoCard3;
