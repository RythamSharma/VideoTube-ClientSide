import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function StreamVideo(props) {
  const { videoId } = useParams();
  const [videoDetails, setVideoDetails] = useState({});
  const [videoSource, setVideoSource] = useState("");
  const view = async () => {
    try {
      if (document.cookie.length > 0) {
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
        const response = await axios.post(
          `http://localhost:3000/api/v1/videos/viewvideo/`,
          { videoId: videoId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        console.log(response.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchvideodetails = async () => {
    try {
      if (document.cookie.length > 0) {
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
        const response = await axios.get(
          `http://localhost:3000/api/v1/videos/${videoId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        setVideoDetails(response.data.data);
        setVideoSource(response.data.data.videoFile);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchvideodetails();
    view();
  }, []);
  return (
    <div className="m-50 text-white">
      {videoSource && (
        <video controls className="w-fit h-fit">
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {videoDetails.title}
    </div>
  );
}

export default StreamVideo;
