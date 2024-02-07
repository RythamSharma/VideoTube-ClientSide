import React, { useEffect, useState } from "react";
import VideoCard from "../Helpers/VideoCard";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { userState } from "../store/atom";

function VideosLayout({ isSidebarOpen }) {
  const user = useRecoilValue(userState);
  const [videos, setVideos] = useState();

  const fetchvideos = async () => {
    if (document.cookie.length > 0 && user?._id) {
      const accesstoken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        .split("=")[1];
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/videos/?userId=${user._id}`,
          {
            headers: {
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        setVideos(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchvideos();
  }, [user]);

  return (
    <div
      className={`bg-black mt-11  ${
        isSidebarOpen ? "md:ml-64 justify-center" : "md:ml-28"
      } md:mt-14 ml-0 w-full flex flex-wrap overflow-x-scroll `}
    >
      {videos?.map((video) => (
        <VideoCard
          key={video._id}
          id={video._id}
          thumbnail={video.thumbnail}
          title={video.title}
          owner={video.owner}
          views={video.views}
          createdAt={video.createdAt}
        />
      ))}
    </div>
  );
}

export default VideosLayout;
