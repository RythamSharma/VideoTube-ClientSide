import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function VideoCardsecond(props) {
  function calculateDaysAgo(createdAt) {
    const currentDate = new Date();
    const videoDate = new Date(createdAt);
    const timeDifference = currentDate - videoDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo;
  }
  const durat = (props.duration/60).toFixed(2);
  const daysAgo = calculateDaysAgo(props.createdAt);
  const navigate =useNavigate();
  const handleVideoStream = () => {
    const videoId = props.id;
    const ownerId = props.owner;
    navigate(`/video-stream/${videoId}/${ownerId}`);
  };
  return (
    <div
      onClick={handleVideoStream}
      className=" m-1 text-white mt-1 mx-2 mb-3 md:flex md:flex-row cursor-pointer "
      id={props.id}
    >
      <div className={`w-full md:w-[${props.size}px] relative`}>
        <img className="rounded-2xl " src={props.thumbnail} alt="" />
        <div className="absolute bottom-1 right-1 bg-black px-1 font-semibold text-sm rounded-md">
          {durat}
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center mt-2 ml-5 font-semibold">
          <div className="flex flex-col ">
            <p className="title">{props.title}</p>
            <div className="text-gray-400 text-sm ">
              <div className="flex flex-row md:mb-1">
                <p className="views">{props.views} views •</p>
                <p className="time">{daysAgo} days ago</p>
              </div>
              <div className="flex flex-row items-center " >
              <img className="w-7 rounded-full " src={props.avatar} alt="" />
              <p className="channel ml-1 text-xs">{props.username}</p>
              </div>
            </div>
            <p className="ml-1 text-xs hidden md:block w-[50vw] text-gray-400 my-3">
              {props.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCardsecond;
