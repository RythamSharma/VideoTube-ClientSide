import React, { useState } from "react";
import Navbar from "../components/global/Navbar";
import Sidebar from "../components/global/Sidebar";
import VideosLayout from "../components/VideosLayout";
import ChannelDashboard from "./ChannelDashboard";
import YourChannel from "./YourChannel";
import QueryVideoLayout from "../components/QueryVideoLayout";
import LikedVideos from "./LikedVideos";
import WatchLater from "./WatchLater";
const Profile = ({ setProgress }) => {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setSideBar] = useState(true);
  const [choice, setChoice] = useState("home");
  const toggleSideBar = () => {
    if (isSidebarOpen) {
      setSideBar(false);
    } else {
      setSideBar(true);
    }
  };

  return (
    <div>
      <Navbar
        setProgress={setProgress}
        search={search}
        setChoice={setChoice}
        setSearch={setSearch}
        toggleSideBar={toggleSideBar}
      />
      <div className="flex flex-row ">
        <Sidebar
          setProgress={setProgress}
          setChoice={setChoice}
          isSidebarOpen={isSidebarOpen}
        />
        {choice === "home" ? (
          <VideosLayout
            setProgress={setProgress}
            isSidebarOpen={isSidebarOpen}
          />
        ) : choice.startsWith("channel") ? (
          <ChannelDashboard
            choice={choice}
            channel={choice.substring(8)}
            isSidebarOpen={isSidebarOpen}
            setProgress={setProgress}
          />
        ) : choice === "you" ? (
          <YourChannel
            isSidebarOpen={isSidebarOpen}
            setProgress={setProgress}
          />
        ) : choice === "search" ? (
          <QueryVideoLayout
            isSidebarOpen={isSidebarOpen}
            search={search}
            setProgress={setProgress}
          />
        ) : choice==="liked"?(
          <LikedVideos
          setProgress={setProgress}
          isSidebarOpen={isSidebarOpen}
          />
        ): choice==="watchlater"?(
          <WatchLater
          setProgress={setProgress}
          isSidebarOpen={isSidebarOpen}/>
        ):(null)}
      </div>
    </div>
  );
};

export default Profile;
