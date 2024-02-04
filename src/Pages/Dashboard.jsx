import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import Navbar from "../components/global/Navbar";
import Sidebar from "../components/global/Sidebar";
import LoadingBar from "react-top-loading-bar";
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isSidebarOpen, setSideBar] = useState(true);
  const toggleSideBar = ()=>{
    if(isSidebarOpen){
        setSideBar(false)
    }
    else{
        setSideBar(true)
    }
  }
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <Navbar toggleSideBar={toggleSideBar} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default Profile;
