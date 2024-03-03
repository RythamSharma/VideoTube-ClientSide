import React, { useEffect, useState } from "react";
import VideoCard from "../Helpers/VideoCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { userState } from "../store/atom";
import loader from "../Images/loader2.png";
import "../App.css";

function VideosLayout({ isSidebarOpen, setProgress }) {
  const user = useRecoilValue(userState);
  const [hasmore, setHasmore] = useState(true);
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const fetchvideos = async () => {
    if (document.cookie.length > 0) {
      setProgress(10);
      const accesstoken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        .split("=")[1];
      setProgress(40);
      try {
        setProgress(60);
        const response = await axios.get(
          `https://videotube-api.onrender.com/api/v1/videos/?page=${page}`,
          {
            headers: {
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        setPage((prevPage) => prevPage + 1);
        setProgress(100);
        if (response.data.data.length < 9) {
          setHasmore(false);
        }
        // console.log(response.data.data);
        setVideos((prevVideos) => [...prevVideos, ...response.data.data]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchvideos();
  }, []);

  return (
    <InfiniteScroll
      className={`bg-black mt-11  ${
        isSidebarOpen ? "md:pl-64 justify-items-end p-0" : "md:pl-24 p-0"
      } md:mt-14 ml-0 w-full flex flex-wrap overflow-x-clip mb-10 md:mb-0`}
      dataLength={videos.length}
      next={fetchvideos}
      hasMore={hasmore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more videos to load.</p>}
    >
      {videos.length > 0 ? (
        videos.map((video) => (
          <VideoCard
            key={video._id}
            id={video._id}
            thumbnail={video.thumbnail}
            duration={video.duration}
            title={video.title}
            owner={video.owner}
            views={video.views}
            username={video.ownerdetails.username}
            avatar={video.ownerdetails.avatar}
            createdAt={video.createdAt}
          />
        ))
      ) : (
        <>
          <div className="z-50 fixed top-0 right-0 left-0 bottom-0 overflow-hidden">
            <img
              className="w-[100vw] h-[100vh] opacity-10"
              src={loader}
              alt=""
            />
            <div className="wipe-animation"></div>
          </div>
        </>
      )}
    </InfiniteScroll>
  );
}

export default VideosLayout;
