import axios from "axios";
import React, { useEffect, useState } from "react";
import ManageVideoCard from "../Helpers/ManageVideoCard";
import '../App.css'
function ManageVideos({setProgress,progress}) {
  const [videos, setVideos] = useState([]);
  const[response,setResponse]=useState(null);
  const getVideos = async () => {
    try {
      const accesstoken = document.cookie
        ?.split("; ")
        .find((row) => row.startsWith("accessToken="))
        .split("=")[1];
      if (document.cookie.length > 0) {
        const response = await axios.get(
          "https://videotube-api.onrender.com/api/v1/videos/owner/videos",
          {
            headers: {
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        setVideos(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVideos();
  }, []);
  useEffect(() => {
    // Set a timeout to fade out the message after 1 second
    const timeout = setTimeout(() => {
      setResponse('');
    }, 1000);

    // Clear the timeout when the component is unmounted or the response changes
    return () => clearTimeout(timeout);
  }, [response]);
  return (
    <div className="flex flex-col  items-center">
      <h1 className="font-bold text-lg md:text-3xl text-white mt-4">
        Manage your <span className="text-red-700">Videotube</span> Videos here
      </h1>
      <h1 className={`font-normal text-xs md:text-sm fixed top-12 z-20 text-white mt-4 transition-all duration-300 ease-in-out ${response ? '' : 'fade-out'}`}>{response}</h1>
      {videos.length > 0
        ? videos.map((video) => (
            <div key={video._id}>
              <ManageVideoCard
                setResponse={setResponse}
                id={video._id}
                description={video.description}
                title={video.title}
                setProgress={setProgress}
                progress={progress}
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
