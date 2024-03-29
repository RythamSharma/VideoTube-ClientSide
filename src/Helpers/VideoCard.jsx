import React from "react";
import { useNavigate } from "react-router-dom";
function VideoCard(props) {
  function calculateDaysAgo(createdAt) {
    const currentDate = new Date();
    const videoDate = new Date(createdAt);
    const timeDifference = currentDate - videoDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo;
  }
  const daysAgo = calculateDaysAgo(props.createdAt);
  const durat = (props.duration/60).toFixed(2);
  const navigate =useNavigate();
  const handleVideoStream = () => {
    const videoId = props.id;
    const ownerId = props.owner;
    navigate(`/video-stream/${videoId}/${ownerId}`);
  };
  return (
    <div
      onClick={handleVideoStream}
      className={` m-1 text-white mt-4 mx-2 w-[358px] md:w-[410px] mb-3  cursor-pointer `}
      id={props.id}
    >
      <div className="w-full relative">
        <img className="rounded-2xl " src={props.thumbnail} alt="" />
        <div className="absolute bottom-1 right-1 bg-black px-1 font-semibold text-sm rounded-md" >{durat}</div>
      </div>
      <div>
        <div className="flex flex-row items-center mt-2 font-semibold">
          <img
            className="w-11 rounded-full m-2"
            src={props.avatar}
            alt=""
          />
          <div className="flex flex-col ">
            <p className="title ml-1">{props.title}</p>
            <div className="text-gray-400 text-sm ml-1">
              <p className="channel  ">{props.username}</p>
              <div className="flex flex-row">
                <p className="views">{props.views} views •</p>
                <p className="time">{daysAgo} days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
