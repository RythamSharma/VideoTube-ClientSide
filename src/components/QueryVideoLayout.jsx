import React, { useEffect, useState } from "react";
import VideoCardsecond from "../Helpers/VideoCard2";
import axios from "axios";

function QueryVideoLayout({ setProgress, search, isSidebarOpen }) {
  const [videos, setVideos] = useState([]);
  const fetchVIdeoBasedOnQuery = async () => {
    try {
      if (document.cookie.length > 0) {
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
        const response = await axios.get(
          `http://localhost:3000/api/v1/videos/?query=${search}`,
          {
            headers: {
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        setVideos(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchVIdeoBasedOnQuery();
  }, [search]);
  return (
    <div
      className={`bg-black mt-11 text-white ${
        isSidebarOpen ? "md:pl-80 justify-items-end p-0" : "md:pl-24 p-0"
      } md:mt-14 ml-0 w-full flex flex-col overflow-x-clip mb-16 md:mb-0`}
    >
      {videos.length > 0 ? (
        videos.map((video) => (
          <VideoCardsecond
            key={video._id}
            id={video._id}
            thumbnail={video.thumbnail}
            description={video.description}
            title={video.title}
            owner={video.owner}
            views={video.views}
            username={video.ownerdetails.username}
            avatar={video.ownerdetails.avatar}
            createdAt={video.createdAt}
          />
        ))
      ) : (
        <div className="text-white font-bold  items-center text-xs mt-20 ml-5 md:ml-[18vw] flex md:text-xl">
          <div> No Videos Found for the following query on</div>
          <div className="text-red-700 ml-2"> VideoTube</div>
        </div>
      )}
    </div>
  );
}

export default QueryVideoLayout;
