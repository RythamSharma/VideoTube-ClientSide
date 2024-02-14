import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCard from "../Helpers/VideoCard";
import { Link } from "react-router-dom";
function YourChannel({ setProgress, isSidebarOpen }) {
  const [channeldetails, setChanneldetails] = useState();
  const [videos, setVideos] = useState([]);
  const fetchChannelDetails = async () => {
    try {
      const accesstoken = document.cookie
        ?.split("; ")
        .find((row) => row.startsWith("accessToken="))
        .split("=")[1];
      // console.log("fetdcinhg ", accesstoken);
      if (document.cookie.length > 0) {
        const response = await axios.get(
          "http://localhost:3000/api/v1/dashboard/you",
          {
            headers: {
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        setChanneldetails(response.data.data.ChannelStatsAndDetails[0]);
        setVideos(response.data.data.uploadedVideos);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchChannelDetails();
  }, []);
  return (
    <div
      className={` ${
        isSidebarOpen ? "md:pl-64 justify-items-end p-0" : "md:ml-24 p-0"
      } text-white  mt-20`}
    >
      <div>
        {channeldetails ? (
          <>
            <div className="px-3 md:px-20">
              <div className="w-full rounded-2xl mb-5 md:mb-7 ">
                <img
                  className="rounded-2xl "
                  src={channeldetails.coverImage}
                  alt=""
                />
              </div>
              <div className="flex flex-row items-center  border-b border-gray-600 pb-2">
                <div className="w-[160px] ">
                  <img
                    className="rounded-full"
                    src={channeldetails.avatar}
                    alt=""
                  />
                </div>
                <div className="flex flex-col ml-4">
                  <div className=" font-bold text-lg md:text-4xl">
                    {channeldetails.username}
                  </div>
                  <div className="text-gray-400 text-sm md:text-md mt-2">
                    @{channeldetails.fullname} •
                    {channeldetails.TotalSubscriptions} Subscribers •
                    {channeldetails.stats?.totalVideos || 0} Videos
                  </div>
                  <div className="text-gray-400 md:my-2 text-sm md:text-md">
                    {" "}
                    Contact {channeldetails.email}
                  </div>
                  <div>
                    <Link to='/upload-video' >
                    <button className={"bg-[#272727] my-3 px-7 rounded-full p-2"}>
                      Upload Video
                    </button>
                    </Link>
                    <button className={"bg-[#272727] md:my-3 px-6 md:ml-2 rounded-full p-2"}>
                      Manage Videos
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="font-semibold ml-2 mt-10 flex items-center text-xl">
              Videos{" "}
              <img
                className="ml-2 w-6"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAj0lEQVR4nO3asQ0CMRAF0W2CE/TfCQkSEEFAOYMsLiNG+rvM6+BrLjjLrpL0E8AZuANbdQZc+Xi2HgMcgMc+5gWcqiscEwrLhMIyobBMKMukskwqy6SyTKppZbb9uLzcqqsRQ/j+tI7VjSNSWCKFJVJYIoUlUlgiBf4AhsASIZhQYlnH0inX05cRDwakP/EGHbXP3xCyjY8AAAAASUVORK5CYII="
              />{" "}
            </h1>
            {videos.length > 0 ? (
              <div
                className={`bg-black mt-1  ml-0 w-full flex flex-wrap overflow-x-clip mb-14 md:mb-0`}
              >
                {videos.length > 0 ? (
                  videos.map((video) => (
                    <VideoCard
                      key={video._id}
                      id={video._id}
                      thumbnail={video.thumbnail}
                      title={video.title}
                      duration={video.duration}
                      owner={video.owner}
                      views={video.views}
                      username={video.ownerdetails.username}
                      avatar={video.ownerdetails.avatar}
                      createdAt={video.createdAt}
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <div className="text-white font-bold  items-center text-xs mt-20 ml-5 md:ml-[23vw] flex md:text-xl">
                <div> This Channel hasn't uploaded any videos yet on</div>
                <div className="text-red-700 ml-2"> VideoTube</div>
              </div>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default YourChannel;
