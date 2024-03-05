import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCardsecond from "../Helpers/VideoCard2";
import VideoCard3 from "../Helpers/VideoCard3";
import loader from "../Images/loader3.png";

function LikedVideos({ isSidebarOpen, setProgress }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchLikedVideos = async () => {
    try {
      if (document.cookie.length > 0) {
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
        const response = await axios.get(
          "https://videotube-api.onrender.com/api/v1/likes/videos",
          {
            headers: {
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        setVideos(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLikedVideos();
  }, []);
  return (
    <>
    {loading ? (
      <div className=" left-64 top-14 relative overflow-hidden">
        <img className=" opacity-10" src={loader} alt="" />
        <div className="wipe-animation"></div>
      </div>
    ) : (
    <div
      className={` ${
        isSidebarOpen ? "md:pl-64 justify-items-end p-0" : "md:ml-24 p-0"
      } text-white  mt-20`}
    >
      {videos.length > 0 ? (
        videos.map((video) => (
          <VideoCardsecond
            key={video.Videodetails._id}
            id={video.Videodetails._id}
            thumbnail={video.Videodetails.thumbnail}
            description={video.Videodetails.description}
            title={video.Videodetails.title}
            owner={video.Videodetails.owner}
            duration={video.Videodetails.duration}
            views={video.Videodetails.views}
            username={video.Ownerdetails.username}
            avatar={video.Ownerdetails.avatar}
            createdAt={video.Videodetails.createdAt}
          />
        ))
      ) : (
        <div className="text-white font-bold  items-center text-xs mt-20 ml-5 md:ml-[28vw] flex md:text-xl">
          <div> You haven't liked a Video yet on</div>
          <div className="text-red-700 ml-2"> VideoTube :(</div>
        </div>
      )}
    </div>
     )}
     </>
  );
}

export default LikedVideos;
