import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../store/atom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setProgress }) {
  let navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [err, setErr] = useState();
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnSubmit = async () => {
    try {
      // console.log(formdata);
      if (!formdata.username) {
        setErr("username is required");
        return;
      }
      if (!formdata.password) {
        setErr("password is required");
        return;
      }

      setProgress(10);

      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProgress(60);

      document.cookie = `accessToken=${response.data.data.accesstoken}; path=/; SameSite=;`;

      setUser({
        fullname: response.data.data.loggedinuser.fullname,
        coverImage: response.data.data.loggedinuser.coverImage,
        email: response.data.data.loggedinuser.email,
        _id: response.data.data.loggedinuser._id,
        avatar: response.data.data.loggedinuser.avatar,
        username: response.data.data.loggedinuser.username,
      });
      setProgress(100);

      navigate("/");
    } catch (error) {
      setProgress(100);
      setErr(error.response.data);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="text-white flex flex-col justify-center items-center ">
        <img
          className=" w-72 mt-10 md:w-96"
          src="https://i.postimg.cc/pXjtdktL/Picsart-24-02-04-18-06-35-507.png"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-center items-center bg-[#181818] p-11 rounded-2xl">
        <p className="text-white font-bold">
          Hi, Welcome Back to <span className="text-red-700">VideoTube!</span>{" "}
        </p>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          className="bg-black m-4 w-full md:w-[26vw] text-white focus:outline-none rounded-xl p-3"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          className="bg-black mx-4 w-full md:w-[26vw] text-white focus:outline-none rounded-xl p-3"
        />
        {err && <div className="text-yellow-500">{err}</div>}
        <button
          onClick={handleOnSubmit}
          className="rounded-xl bg-red-700 hover:bg-red-600 transition-all duration-300 p-3 mt-7 w-full md:w-[26vw] text-white"
        >
          Log in
        </button>
        <div className="md:w-[20vw] w-full border-b my-14 bg-white"></div>
        <button className="text-blue-600 underline -9">
          Forgotten password
        </button>
        <button className="rounded-xl bg-white hover:bg-slate-200 transition-all duration-300 m-9 p-3 mt-2 w-full md:w-[26vw]  text-black">
          <Link to="/signup">Create New Account</Link>
        </button>
      </div>
    </div>
  );
}

export default Login;
