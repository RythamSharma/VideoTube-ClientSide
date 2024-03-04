import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/global/Navbar";
import VideoCard3 from "../Helpers/VideoCard3";
import CommentCard from "../Helpers/CommentCard";
import loader from "../Images/loader.png";
import "../App.css";
function StreamVideo(props) {
  const { videoId, ownerId } = useParams();
  const [videoDetails, setVideoDetails] = useState({});
  const [ownerdetails, setOwnerDetails] = useState({});
  const [videoSource, setVideoSource] = useState("");
  const [issub, setIssub] = useState(false);
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [transaction, setTransaction] = useState(false);
  const [search, setSearch] = useState("");
  const [choice, setChoice] = useState("home");
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState();
  const [user, setUser] = useState({});
  const [alert, setAlert] = useState("");
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const copyToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setAlert("URL copied to clipboard!");
  };
  useEffect(() => {
    setTimeout(() => {
      setAlert("");
    }, 1500);
  }, [alert]);
  function calculateDaysAgo(createdAt) {
    const currentDate = new Date();
    const videoDate = new Date(createdAt);
    const timeDifference = currentDate - videoDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo;
  }
  const handleLikeButton = async () => {
    try {
      setTransaction(true);
      if (document.cookie.length > 0) {
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
        const response = await axios.post(
          `https://videotube-api.onrender.com/api/v1/likes/toggle/v/${videoId}`,
          {},
          {
            headers: {
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        if (liked) {
          setLikes((prev) => prev - 1);
          setLiked(false);
        } else {
          setLikes((prev) => prev + 1);
          setLiked(true);
        }
        setTransaction(false);
      }
    } catch (error) {
      console.log(error);
      setTransaction(false);
    }
  };
  const handleComment = async () => {
    try {
      setTransaction(true);
      if (document.cookie.length > 0) {
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
        const response = await axios.post(
          `https://videotube-api.onrender.com/api/v1/comments/${videoId}`,
          { content: content },
          {
            headers: {
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        getVideoComments();
        setContent("");
        setTransaction(false);
      }
    } catch (error) {
      setTransaction(false);
      console.log(error);
    }
  };
  const getCurrUser = async () => {
    try {
      if (document.cookie.length > 0) {
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];

        const response = await axios.get(
          "https://videotube-api.onrender.com/api/v1/users/current-user",
          {
            headers: {
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );

        setUser({
          fullname: response.data.data.fullname,
          coverImage: response.data.data.coverImage,
          email: response.data.data.email,
          _id: response.data.data._id,
          avatar: response.data.data.avatar,
          username: response.data.data.username,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const daysAgo = calculateDaysAgo(videoDetails.createdAt);
  const toggleSubscription = async () => {
    setTransaction(true);
    const accesstoken = document.cookie
      ?.split("; ")
      .find((row) => row.startsWith("accessToken="))
      .split("=")[1];
    if (document.cookie.length > 0) {
      const response = await axios.post(
        `https://videotube-api.onrender.com/api/v1/subscriptions/c/${ownerdetails._id}`,
        {},
        {
          headers: {
            Authorization: `bearer ${accesstoken}`,
          },
        }
      );
      setIssub(response.data.statusCode !== 200);
      setTransaction(false);
      // console.log(response.data)
    }
  };
  const getVideoComments = async () => {
    try {
      if (document.cookie.length > 0) {
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
        const response = await axios.get(
          `https://videotube-api.onrender.com/api/v1/comments/${videoId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );

        setComments(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const memoizedComments = useMemo(() => comments, [comments]);

  const fetchVIdeoBasedOnQuery = async () => {
    try {
      if (document.cookie.length > 0) {
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
        const response = await axios.get(
          `https://videotube-api.onrender.com/api/v1/videos/`,
          {
            headers: {
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        setVideos(response.data.data);
        // console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getOwnerDetails = async () => {
    try {
      if (document.cookie.length > 0) {
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
        const response = await axios.get(
          `https://videotube-api.onrender.com/api/v1/dashboard/stats/${ownerId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        // console.log(response.data.data[0]);
        setOwnerDetails(response.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const view = async () => {
    try {
      if (document.cookie.length > 0) {
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
        const response = await axios.post(
          `https://videotube-api.onrender.com/api/v1/videos/viewvideo/`,
          { videoId: videoId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        // console.log(response.data.message);
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
          `https://videotube-api.onrender.com/api/v1/videos/${videoId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        setVideoDetails(response.data.data);
        setLiked(response.data.data.liked);
        setLikes(response.data.data.likes);
        setVideoSource(response.data.data.videoFile);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVideoComments();
    fetchVIdeoBasedOnQuery();
    fetchvideodetails();
    getOwnerDetails();
    getCurrUser();
    view();
  }, []);
  return (
    <>
      {videoSource ? (
        <div className="text-white">
          <Navbar
            setChoice={setChoice}
            setProgress={props.setProgress}
            search={search}
            setSearch={setSearch}
          />
          <div className="flex flex-col md:flex-row ">
            <div className="mt-14 md:mt-20 md:ml-20 md:w-[60vw]">
              {videoSource && (
                <video
                  controls
                  className="w-fit h-fit md:w-[60vw] md:rounded-2xl md:h-auto"
                >
                  <source src={videoSource} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <div className="mx-2 md:mx-0">
                <div className="text-md md:text-xl font-bold m-2">
                  {videoDetails.title}
                </div>
                <div className="flex flex-col  md:flex-row justify-between">
                  <div className="flex flex-row  items-center ">
                    <img
                      className="md:w-14 w-11 rounded-full"
                      src={ownerdetails.avatar}
                      alt="..."
                    />
                    <div className="flex items-center md:items-start md:flex-col mx-1 md:mx-2 md:font-semibold">
                      <div className="mb-[1px] text-lg">
                        {ownerdetails.username}
                      </div>
                      <div className=" text-sm ml-4 md:ml-0 md:text-xs text-gray-400">
                        {ownerdetails.TotalSubscriptions}{" "}
                        <span className="hidden md:inline-block">
                          {" "}
                          Subscribers
                        </span>
                      </div>
                    </div>
                    <div className="mx-2 ml-7 md:ml-2 ">
                      <button
                        onClick={toggleSubscription}
                        disabled={transaction}
                        className={`${
                          issub ? "bg-[#272727]" : "bg-white text-black"
                        } my-3 rounded-full py-2  px-4`}
                      >
                        {issub ? "Subscribed" : "Subscribe"}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-around mt-3">
                    <div className="mr-2 flex ">
                      {liked ? (
                        <button
                          onClick={handleLikeButton}
                          className="bg-[#272727] flex p-2 pr-4 rounded-l-full"
                          disabled={transaction}
                        >
                          <img
                            className="w-6"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABi0lEQVR4nO3Zu2oVURSA4SVqJVpEUWuJhVUKa0FR+1TiMwgiaOsLWGgTRLQxja9g5wXB+ASKEdQENILgJUeCdz8ZOIUonsxh9jmzZzMfTD9/McNae0f0er2pw05cwzu8xk3siy7Bdjz0rxfYHV2BS/7vSnQBTuLniJDnkTvsxRujfYmcYQtu29zLyBnOq+dq5AqH8bVmyFzkCDvwtGbEvcgVFtU3HznCqTEiVrA1coMDWB8j5ELkBtuwNEbEBmaiYyNIN365OLrJCPK3XzgUGY4ga5r7gPcjnlU8wkXsamsESW0Z+1OGnNGeW6kiZvCxxZDBtAfCSVlPFXKn5ZDlVCFvWw75hnMpQn7Iw3zTkFwslRLyqZSQV6WEXC4hZLVaq0sI+Y5jJYRUHpQSslFKyErTkIE8LDQNqXsAN+kFa0/TkBstRzxOctuFE0WM8RXcbzHkc6SCg8OLzTY8SxYyjDnSUszZpCHDmFncnWLEYnUUlTzkj6DjuI4n1Z6Q+OUHw2/y9MQCer1edNZvHJ3eD3RXlmQAAAAASUVORK5CYII="
                          ></img>
                          <div className="mx-2">{likes}</div>
                        </button>
                      ) : (
                        <button
                          onClick={handleLikeButton}
                          disabled={transaction}
                          className="bg-[#272727] flex p-2 pr-4 rounded-l-full"
                        >
                          <img
                            className="w-6"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACs0lEQVR4nO2ZTYhNYRjH3zFNGIzmNo1GUT4WiBoWPlNYS1mMLGZlwYLCkrCzEGqmKCxGsbBiQVkYpCwkNWWKGfkoZOQzY8i3n97mf+t0594zR+e54z06/zqb8z79///n3vfjOc/rXI4cOcYcwESgA3gLDAAngEaXJQC1wBVG4iFQcFkBcFDGXwCtwHzgrt4dcVkAsA74BfwAlkfer1Iij13oAJr0L3jsLRmbrPdfXMgAaoBLMnsNGFcy7qeYxwMXMoCdMvoamF5m/KjGj7lQASwGvgK/gfVlxuuBd0pkiQsRwCSgTyY7KsRs1fhNFyqA0zLZC0yoEFPceje5EAG0yeAnYF6FmDWRM6XOhQZgNjAok1ti4s4rZp8LDUAdcFsGz8XEzQJ++rMDaHahATikJJ7GFYJAp+JOudDA8JwvliArYuIaNPX8lrzAhQSgGXipX3lPwgOyHPzm8D7mGQBu+TLHlzbVKEEuy8jV0hKkTHw78J30uA9Ms0xke6QEaUl5gDaO8swANgD3pHnWKokC8EGkG01Ik+nOleagFeFuEXabECbXbSyuKSvCbhG2mRAm110k3X4rwlciHFGeVxPA6sgut82C0J/OHrUmDpPrjgeOR/TTFZ3FfdDM4d/r75CFO1lPpGCy6ANIZJksPM9sIgx3ZnpkoTPLifRK/knqlus/TuSi5L/FVdtZSKQGOCwL17O+2Jv+l11roSw8S0v0UURTzNwl154ZWfBdacn6RdRq5jCZbjvwObJrpav1gJMi22/mMplul3R7TLowuvMofh02mLhMprtUun2WpP6qADXcYr/XDTXrze9UgDm62PS4AEw1Ix+9JfvImnhlJJk3wAF/TWDdsgFa/IdUpCW7y5I/2vP17aCxwpmqTmVgre7Ofd9pyNj8EHAD2Fy1BHLkyOEyiz+lhVxrUBoKtwAAAABJRU5ErkJggg=="
                            alt="...."
                          ></img>
                          <div className="mx-2">{likes}</div>
                        </button>
                      )}
                      <button className="bg-[#272727] border-l border-gray-600 pl-2 p-2 rounded-r-full">
                        <img
                          className="rotate-180 w-6 "
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACs0lEQVR4nO2ZTYhNYRjH3zFNGIzmNo1GUT4WiBoWPlNYS1mMLGZlwYLCkrCzEGqmKCxGsbBiQVkYpCwkNWWKGfkoZOQzY8i3n97mf+t0594zR+e54z06/zqb8z79///n3vfjOc/rXI4cOcYcwESgA3gLDAAngEaXJQC1wBVG4iFQcFkBcFDGXwCtwHzgrt4dcVkAsA74BfwAlkfer1Iij13oAJr0L3jsLRmbrPdfXMgAaoBLMnsNGFcy7qeYxwMXMoCdMvoamF5m/KjGj7lQASwGvgK/gfVlxuuBd0pkiQsRwCSgTyY7KsRs1fhNFyqA0zLZC0yoEFPceje5EAG0yeAnYF6FmDWRM6XOhQZgNjAok1ti4s4rZp8LDUAdcFsGz8XEzQJ++rMDaHahATikJJ7GFYJAp+JOudDA8JwvliArYuIaNPX8lrzAhQSgGXipX3lPwgOyHPzm8D7mGQBu+TLHlzbVKEEuy8jV0hKkTHw78J30uA9Ms0xke6QEaUl5gDaO8swANgD3pHnWKokC8EGkG01Ik+nOleagFeFuEXabECbXbSyuKSvCbhG2mRAm110k3X4rwlciHFGeVxPA6sgut82C0J/OHrUmDpPrjgeOR/TTFZ3FfdDM4d/r75CFO1lPpGCy6ANIZJksPM9sIgx3ZnpkoTPLifRK/knqlus/TuSi5L/FVdtZSKQGOCwL17O+2Jv+l11roSw8S0v0UURTzNwl154ZWfBdacn6RdRq5jCZbjvwObJrpav1gJMi22/mMplul3R7TLowuvMofh02mLhMprtUun2WpP6qADXcYr/XDTXrze9UgDm62PS4AEw1Ix+9JfvImnhlJJk3wAF/TWDdsgFa/IdUpCW7y5I/2vP17aCxwpmqTmVgre7Ofd9pyNj8EHAD2Fy1BHLkyOEyiz+lhVxrUBoKtwAAAABJRU5ErkJggg=="
                        ></img>
                      </button>
                    </div>
                    <div className="mr-2">
                      <button
                        onClick={openModal}
                        className="bg-[#272727] flex px-3 p-2 rounded-full"
                      >
                        <img
                          className="w-6 mr-0 md:mr-1"
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACs0lEQVR4nO3YS8hVVRjG8ZWmfoI2UDT5BAlUIsJykEYYOElRgiQqBWkQNtAkiCxoJChUCibmIEQcZI6cRGKoiBleKLyUhAMpQUciIWh2AcvMXyx6j2f7+d30bLfu2P/RPuuc86z3WZd3vXul1NDQ0NDQ0NDQgH34AVNqPRraXMSc9D8wkrmG91Id0WYVrsfzZ+hKdaLlIp6fx6/RdAKTUh2NxOdpOBPNFzA71dFItI2JbJb5E6+n+53ejET7UKxtfY/NGHZvomwH9SBmYgW24Escw7m+jBT+uyRmJbMfY6sOvguvYi/+0D+HBtB6Bufjt2fzPqrCwARsiAOuxW84gI+wCE/jUTw82DSLiTgaer/jpbtlYBjewuXo7K9YQq9geEl9jMCnoX899tCQMrRbHUzFyejgb3yC8aV10AO8E1VAZgdGp06JQ+yXED2IxzoWHVy/c3Ep+j3Sqdhi/BPTvD5np9IircoIFsQyykZeKzXKqpYWpuNKzMQbpUfaf0rfVtjsq/HAnYqNwo8htqb0aKtKv9gUYt8OtCcwEs/izdhDn+O7KAp/jjWel+bhSg9EPBlrMy+ryf0suw9i9K4aJJWWKNoV6doe7aPxNn7qJcY8gl9gHZZhPmbhCTzSl5GozzYWdDaWkhUxIwRz6fFQYfOtLJwj4mTfipfRPQjdW4zkUcdX8VWejSUdGyiIbw/hD+PzbJwuGDga5ciI29Tt78XqfN4fZZoYG7VTPje68W48Z07huQ60bxjBi5GRWgMzsTQT0cHSEN+Djwt5/P1OX3YqvXzAruigNeU5a71QknaRnBFXlKGb+njlbN1siJQ6L5VEZRd0eKrHqC0vWf9rfH/Xr0z9V6C12J3qipuLtMdTXcE3YWRnqjPaxdrCVGe0C79xqc7geL5Mu9dxNDQ0NKTe+BfILA2N5/Gp+AAAAABJRU5ErkJggg=="
                        ></img>
                        <div className="hidden md:block">Share</div>
                      </button>
                    </div>
                    <div className="mr-2">
                      <button className="bg-[#272727] flex pr-4 py-2 md:px-3 md:p-2 rounded-full">
                        <img
                          className="w-6 mr-1"
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAl0lEQVR4nO2SawqDQAwGcworvWI9rth6mikLEeJaH9CNomZg0R9ZvzGJSBD8AYocBSGgxAgklvAoiCVU9mj1C6i3jiDVpjulwhvNeecSvwQ0PNUmmhICFdDqB3vgOScAPEztx9a6SGAE3MKXJAYB9/CZ+Q5P+z7Zk+Iw7oTF7883SOwXno2j0+Pb9pVOVHJZKMR5BYJb8AUh2BBbQ/uxeQAAAABJRU5ErkJggg=="
                        />
                        Download
                      </button>
                    </div>
                    <div>
                      <button className="bg-[#272727] flex px-3 p-2 rounded-full">
                        <img
                          className="w-6 mr-0 md:mr-2"
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABFElEQVR4nO3YsS4EURSA4RuK1WqQSBQShVo8hsJTaDV6EoV4CS8gkVB4Aq1oUaDZiEpB2OrTbCKZIGOEOTPOV8+du/89M5lkS0kppZT+CSxgHbs4xRkmS2SYq/zoBx+bqi5szSchjzWXhw/RKCQa9WVItIkMSmS+dotDbJTovBviBNtYw2zpEmONF7YhQ3r9aEUjQ4KRE+nLRLQoQ7pAvuzB6MNEMNGXkKXOh2CAo8YhbXwrKvvPYxPX31kXIgSL2MFF0wOI8DLvYdTkAMLA1k8mGQauanaMSmR4rRlyWSLDXc2Q/RIZjmtE3GOmyc1/VWWvFTx/cfkQq01P6c9Cxvst4wA3eMETzsd/jU43ikgppdIVb4uQyed/dF8wAAAAAElFTkSuQmCC"
                        />
                        <div className="hidden md:block">Later</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" text-white bg-[#272727] rounded-2xl mx-3 md:mx-0 mt-5 p-4">
                <div className="flex font-bold">
                  <div>{videoDetails.views} views</div>
                  <div className="ml-2">{daysAgo} days ago</div>
                </div>
                <div className="mt-3">{videoDetails.description}</div>
              </div>
              <div className="comment-section border-t mx-3 md:mx-0 mt-5 text-white border-gray-700">
                <div className="font-bold text-2xl ">
                  {comments.length} comments
                </div>
                <div className="add-comment mt-4">
                  <div className="flex flex-row items-center">
                    <img
                      className="w-9 rounded-full"
                      src={user.avatar}
                      alt=""
                    />
                    <input
                      value={content}
                      onChange={(e) => {
                        setContent(e.target.value);
                      }}
                      type="text"
                      className="bg-transparent border-b w-full outline-none  focus:border-red-700 transition-all duration-300 mx-3 "
                    />
                  </div>
                  <div className="float-right mt-2">
                    <button
                      onClick={() => setContent("")}
                      className="mx-3 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleComment}
                      disabled={transaction}
                      className={`px-3 py-[7px] ${
                        content
                          ? "bg-blue-500 text-black"
                          : "bg-[#272727] text-gray-400 "
                      }  rounded-3xl  `}
                    >
                      Comment
                    </button>
                  </div>
                </div>
                <div className="comments mt-12">
                  {memoizedComments.map((comment) => (
                    <div key={comment._id}>
                      <CommentCard
                        id={comment._id}
                        owner={comment.owner}
                        content={comment.content}
                        getVideoComments={getVideoComments}
                        createdAt={comment.createdAt}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
                <div className="bg-[#272727] rounded-lg p-6 pt-1 max-w-md m-3 md:m-0 w-full">
                  <div className="flex flex-row justify-between items-center">
                    <h2 className="text-2xl font-bold mt-2 mb-4">Share </h2>
                    <button className="" onClick={closeModal}>
                      <img
                        className="w-6"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABBUlEQVR4nO3ZTQqDMBCGYU/RSq9Yj1uwPc1bRBcirWicv4T5Vm6UeVCTGdJ1mUwm00yAJ9AHqKOfaim9eWDO6IlhRkw1TBlKHnADXssDPsBDpdL9Gu6rGt7FNXhikEJ4YpBGeGDQQlhi0EZYYMwQmhhzhAbGDSGJcUdIYMIgrmDCIUowYRFnMOERRzDVIPYw1SH+zBDj5tp9ULvyZup6E+tsPiezEUA0TXxa/PixI4zNp7K3OlWD4cASGx7DiX0iLIaCzS4chgs7dhgMAm2HOwbB3skNg0IDaI5BsYs1w2DQiqONsZwn0MJ4DEVIYzwnO6QwEcZTJDDNHL01cxiayWQyXcR8AfkY5euVO0c7AAAAAElFTkSuQmCC"
                      />
                    </button>
                  </div>
                  <div className="flex flex-row items-center bg-black p-2 rounded-xl">
                    <p className="text-white hidden md:block">
                      {window.location.href.length > 35
                        ? `${window.location.href.substring(0, 35)}...`
                        : window.location.href}
                    </p>
                    <p className="text-white block md:hidden">
                      {window.location.href.length > 22
                        ? `${window.location.href.substring(0, 22)}...`
                        : window.location.href}
                    </p>
                    <button
                      onClick={copyToClipboard}
                      className="text-gray-900 ml-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 outline:none font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 "
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
                {alert ? (
                  <div className="fixed bottom-4 left-4 bg-white text-black transition-all duration-100 ease-in-out px-9 py-3 rounded-xl">
                    {alert}
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
            <div className="video-layout mt-4 md:mt-20 md:mr-20">
              {videos.map((video) => (
                <div className="md:ml-6 ml-2" key={video._id}>
                  <VideoCard3
                    key={video._id}
                    id={video._id}
                    thumbnail={video.thumbnail}
                    description={video.description}
                    title={video.title}
                    owner={video.owner}
                    duration={video.duration}
                    views={video.views}
                    username={video.ownerdetails.username}
                    avatar={video.ownerdetails.avatar}
                    createdAt={video.createdAt}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[100vh] w-[100vw] relative overflow-hidden">
          <img className="w-[100vw] h-[100vh] opacity-10" src={loader} alt="" />
          <div className="wipe-animation"></div>
        </div>
      )}
    </>
  );
}

export default StreamVideo;
