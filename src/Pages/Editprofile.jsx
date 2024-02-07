import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../store/atom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Editprofile() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [formdata, setFormdata] = useState({
    avatar: "",
    cover: "",
    fullname: "",
    email: "",
    oldpassword: "",
    newpassword: "",
  });
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormdata({
        ...formdata,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormdata({
        ...formdata,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleOnSubmit = async () => {
    try {
      console.log("submitted form with data:");
      console.log(formdata);
      // const response = await axios.post(
      //   "http://localhost:3000/api/v1/users/register",
      //   formdata
      // );
      // console.log(response.data.data)
      // setUser({
      //   fullname: response.data.data.fullname,
      //   coverImage: response.data.data.coverImage,
      //   email: response.data.data.email,
      //   _id: response.data.data._id,
      //   avatar: response.data.data.avatar,
      //   username: response.data.data.username,
      // });
      // document.cookie = `accessToken=${response.data.data.accesstoken}; path=/; SameSite=;`;

      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex flex-row items-center mt-11">
        <div className="flex flex-col justify-center items-center bg-[#272727] p-2 w-[90vw] md:w-fit md:p-11 mx-3 rounded-lg">
          <div className=" m-1 flex flex-col w-full">
            <p className="text-white text-center text-xl md:text-2xl mb-11 font-bold ">
              Edit Your Profile For{" "}
              <span className="text-red-600 inline"> VideoTube</span>
            </p>
            <label className="text-white font-semibold" htmlFor="fullname">
              Fullname :
            </label>
            <input
              id="fullname"
              type="text"
              placeholder="Fullname"
              name="fullname"
              onChange={handleChange}
              className="bg-transparent focus:border-red-600 transition-colors duration-150 border-b  w-full md:w-[26vw] mt-0  focus:outline-none p-3 text-white"
            />
            <div className=" m-1 flex flex-col w-full">
              <label className="text-white mt-5 font-semibold" htmlFor="email">
                Email :
              </label>
              <input
                id="email"
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                className="bg-transparent focus:border-red-600 transition-colors duration-150 border-b  w-full md:w-[26vw] mt-0  focus:outline-none p-3 text-white"
              />
            </div>
            <label
              htmlFor="avatar"
              className="text-white m-1 mt-4 font-semibold"
            >
              Avatar:
            </label>
            <div className="relative mt-1">
              <input
                id="avatar"
                type="file"
                className="hidden"
                onChange={handleChange}
              />
              <label
                htmlFor="avatar"
                className="cursor-pointer bg-[#363131] text-white py-2 px-4 w-full text-center rounded-lg border border-white inline-block"
              >
                Choose Avatar
              </label>
            </div>
            <label
              htmlFor="cover"
              className="text-white m-1 mt-4 font-semibold"
            >
              Cover:
            </label>
            <div className="relative mt-1">
              <input
                id="cover"
                type="file"
                className="hidden"
                onChange={handleChange}
              />
              <label
                htmlFor="cover"
                className="cursor-pointer bg-[#363131] text-white py-2 px-4 w-full text-center rounded-lg border border-white inline-block"
              >
                Choose Cover Picture
              </label>
            </div>
          </div>
          <div className="flex flex-row w-fit mt-3">
            <div className=" m-1 flex  w-full">
              <input
                id="oldpassword"
                type="password"
                placeholder="Old Password"
                name="oldpassword"
                onChange={handleChange}
                className="bg-transparent focus:border-red-600 transition-colors duration-150 border-b  w-full md:w-[13vw] mt-0  focus:outline-none p-3 text-white"
              />
            </div>

            <div className=" m-1 flex flex-col w-full">
              <input
                id="newpassword"
                type="password"
                placeholder="New Password"
                name="newpassword"
                onChange={handleChange}
                className="bg-transparent focus:border-red-600 transition-colors duration-150 border-b  w-full md:w-[12vw] mt-0  focus:outline-none p-3 text-white"
              />
            </div>
          </div>
          <div className=" m-1 flex flex-col w-full">
            <button
              onClick={handleOnSubmit}
              className="rounded-xl bg-red-700 md:ml-2 hover:bg-red-600 transition-all duration-300 p-3 mt-3 w-full md:w-[26vw] text-white"
            >
              Update Profile
            </button>
          </div>
        </div>
        <div className="hidden md:block w-[25vw] ml-32">
          <img
            className=" w-72 md:w-96"
            src="https://i.postimg.cc/pXjtdktL/Picsart-24-02-04-18-06-35-507.png"
            alt=""
          />
          <img
            src="https://i.postimg.cc/ZRL4hf9g/7472023-3675820-removebg-preview-3.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Editprofile;
