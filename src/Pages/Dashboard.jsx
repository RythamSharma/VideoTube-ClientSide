import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import Navbar from "../components/global/Navbar";
import Sidebar from "../components/global/Sidebar";
import VideosLayout from "../components/VideosLayout";
import ChannelDashboard from "./ChannelDashboard";
const Profile = ({ setProgress }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isSidebarOpen, setSideBar] = useState(true);
  const [choice, setChoice] = useState("home");
  const toggleSideBar = () => {
    if (isSidebarOpen) {
      setSideBar(false);
    } else {
      setSideBar(true);
    }
  };
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <Navbar setProgress={setProgress} toggleSideBar={toggleSideBar} />
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
      ) : (
        choice.startsWith("channel") ? (
          <ChannelDashboard choice={choice} channel={choice.substring(8)} isSidebarOpen={isSidebarOpen} setProgress={setProgress} />
        ) : (
          <div>
            {/* Add your custom components or logic here */}
          </div>
        )
      )}

      </div>
    </div>
  );
};

export default Profile;
