import axios from "axios";
import React, { useEffect, useState } from "react";
import ManageVideoCard from "../Helpers/ManageVideoCard";

function ManageVideos() {
  const [videos, setVideos] = useState([]);
  const getVideos = async () => {
    try {
      const accesstoken = document.cookie
        ?.split("; ")
        .find((row) => row.startsWith("accessToken="))
        .split("=")[1];
      if (document.cookie.length > 0) {
        const response = await axios.get(
          "http://localhost:3000/api/v1/videos/owner/videos",
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
    getVideos();
  }, []);
  return (
    <div className="flex flex-col  items-center">
      <h1 className="font-bold text-lg md:text-3xl text-white mt-4">
        Manage your <span className="text-red-700">Videotube</span> Videos here
      </h1>
      {videos.length > 0
        ? videos.map((video) => (
            <div key={video._id}>
              <ManageVideoCard
                id={video._id}
                description={video.description}
                title={video.title}
                createdAt={video.createdAt}
                views={video.views}
                isPublished={video.isPublished}
                thumbnail={video.thumbnail}
              />
            </div>
          ))
        : ""}
    </div>
  );
}

export default ManageVideos;