import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../store/atom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate =useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [formdata, setFormdata] = useState({
    fullname:"",
    email:"",
    username:"",
    password:""
  });
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/users/register",formdata)
      // console.log(response.data.data)
      setUser({
        fullname: response.data.data.fullname,
        coverImage: response.data.data.coverImage,
        email: response.data.data.email,
        _id: response.data.data._id,
        avatar: response.data.data.avatar,
        username: response.data.data.username,
      });
      document.cookie = `accessToken=${response.data.data.accesstoken}; path=/; SameSite=;`;

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="text-white flex flex-col justify-center items-center ">
        <img
          className=" w-72 mt-0 mb-7 md:w-96"
          src="https://i.postimg.cc/pXjtdktL/Picsart-24-02-04-18-06-35-507.png"
          alt=""
        />
      </div>
      <div className="flex flex-row items-center " >
      <div className="flex flex-col justify-center items-center bg-[#272727] p-2 w-[90vw] md:w-fit md:p-11 mx-3 rounded-lg">
        <div className=" m-1 flex flex-col w-full" >
          <p className="text-white text-center text-xl md:text-2xl mb-3 font-bold " >Hey! Welcome to <span  className="text-red-600 inline" > VideoTube</span></p>
          <label className="text-white" htmlFor="fullname" >Fullname :</label>
        <input
          id="fullname"
          type="text"
          placeholder="Fullname"
          name="fullname"
          onChange={handleChange}
          className="bg-transparent focus:border-red-600 transition-colors duration-150 border-b  w-full md:w-[26vw] mt-0  focus:outline-none p-3 text-white"
          />
          </div>
          <div className=" m-1 flex flex-col w-full" >
          <label className="text-white mt-5" htmlFor="username" >Username :</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          className="bg-transparent focus:border-red-600 transition-colors duration-150 border-b  w-full md:w-[26vw] mt-0  focus:outline-none p-3 text-white"
          />
          </div>
        <div className=" m-1 flex flex-col w-full" >
          <label className="text-white mt-5" htmlFor="email" >Email :</label>
        <input
          id="email"
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          className="bg-transparent focus:border-red-600 transition-colors duration-150 border-b  w-full md:w-[26vw] mt-0  focus:outline-none p-3 text-white"
          />
          </div>
           <div className=" m-1 flex flex-col w-full" >
          <label className="text-white mt-5" htmlFor="password" >Password :</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          className="bg-transparent focus:border-red-600 transition-colors duration-150 border-b  w-full md:w-[26vw] mt-0  focus:outline-none p-3 text-white"
        />
        </div>
        <div className=" m-1 flex flex-col w-full" >
        <button
          onClick={handleOnSubmit}
          className="rounded-xl bg-red-700 hover:bg-red-600 transition-all duration-300 p-3 mt-3 w-full md:w-[26vw] text-white"
        >
          Sign Up
        </button>
        </div>
      </div>
      <div className="hidden md:block w-[40vw] ml-32" >
        <img src="https://i.postimg.cc/DfMBKLNH/video-stratrgy-01.png" alt="" />
      </div>
        </div>
    </div>
  );
}

export default Signup;
