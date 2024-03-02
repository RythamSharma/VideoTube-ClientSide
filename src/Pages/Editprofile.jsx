import React, { useState,useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../store/atom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Editprofile({ setProgress }) {
  const navigate = useNavigate();
  const [err, setErr] = useState();
  const [user, setUser] = useRecoilState(userState);
  const [formdata, setFormdata] = useState({
    avatar: null,
    cover: null,
    fullname: user.fullname,
    email: user.email,
    oldpassword: "",
    newpassword: "",
    ismodified: false,
  });
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
  useEffect(() => {
    getCurrUser();
  }, [user]);
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormdata({
        ...formdata,
        [e.target.name]: e.target.files[0],
      });
    } else if (e.target.name === "email" || e.target.name === "fullname") {
      setFormdata({
        ...formdata,
        [e.target.name]: e.target.value,
        ismodified: true,
      });
    } else {
      setFormdata({
        ...formdata,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleOnSubmit = async () => {
    if (document.cookie.length > 0) {
      try {
        setProgress(10);
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
        setProgress(30);
        if (formdata.avatar) {
          // console.log(formdata.avatar);
          const response = await axios.patch(
            "https://videotube-api.onrender.com/api/v1/users/update-avatar",
            { avatar: formdata.avatar },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `bearer ${accesstoken}`,
              },
            }
          );
          setProgress(50);
          // console.log(response.data);
          setErr("Avatar updated successfully");

          setUser({ avatar: response.data.data.avatar });
        }
        setProgress(67);
        if (formdata.cover) {
          const response = await axios.patch(
            "https://videotube-api.onrender.com/api/v1/users/update-cover",
            { cover: formdata.cover },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `bearer ${accesstoken}`,
              },
            }
          );
          // console.log(response.data);
          setErr("Cover Image updated successfully");
          setUser({ coverImage: response.data.data.coverImage });
        }
        if ((formdata.email || formdata.fullname) && formdata.ismodified) {
          const response = await axios.patch(
            "https://videotube-api.onrender.com/api/v1/users/update-details",
            {
              fullName: formdata.fullname,
              email: formdata.email,
            },
            {
              headers: {
                Authorization: `bearer ${accesstoken}`,
              },
            }
          );
          setErr("user details updated successfully");
          // console.log(response.data);

          setUser({
            email: response.data.data.email,
            fullname: response.data.data.fullname,
          });
        }
        setProgress(80);
        if (formdata.oldpassword || formdata.newpassword) {
          if (!formdata.oldpassword) {
            setErr("Current password is required");
            setProgress(100);
            return;
          }
          if (!formdata.newpassword) {
            setErr("new password is required");
            setProgress(100);
            return;
          }
          const response = await axios.post(
            "https://videotube-api.onrender.com/api/v1/users/update-password",
            {
              oldpass: formdata.oldpassword,
              newpass: formdata.newpassword,
            },
            {
              headers: {
                Authorization: `bearer ${accesstoken}`,
              },
            }
          );
          setErr("Password updated successfully");
        }
        setProgress(100);
      } catch (error) {
        setProgress(100);
        setErr(error.response.data);
      }
    }
  };
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="text-white flex flex-col mt-2 justify-center  md:hidden items-center ">
        <img
          className=" w-72 md:w-96 mt-3"
          src="https://i.postimg.cc/pXjtdktL/Picsart-24-02-04-18-06-35-507.png"
          alt=""
        />
      </div>
      <div className="flex flex-row items-center md:mt-6">
        <div className="flex flex-col justify-center items-center bg-[#181818] p-2 w-[90vw] md:w-fit md:p-11 mx-3 rounded-lg">
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
              value={formdata.fullname}
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
                value={formdata.email}
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
                name="avatar"
                onChange={handleChange}
              />
              <label
                htmlFor="avatar"
                className="cursor-pointer bg-[#363131] text-white py-2 px-4 w-full text-center rounded-lg border border-gray-600 inline-block"
              >
                {formdata.avatar ? (
                   <>
                   <div className="flex items-center justify-between">
                     <div className="flex items-center">
                       {
                         <img
                           className="w-14 mr-2 rounded-full"
                           src={user.avatar}
                           alt=""
                         />
                       }{" "}
                       {user.fullname}
                     </div>
                     <div>
                       <p className="bg-red-800 rounded-lg px-3 py-1">
                         {formdata.avatar.name}
                       </p>
                     </div>
                   </div>
                 </>
                  
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {
                          <img
                            className="w-14 mr-2 rounded-full"
                            src={user.avatar}
                            alt=""
                          />
                        }{" "}
                        {user.fullname}
                      </div>
                      <div>
                        <p className="bg-red-800 rounded-lg px-3 py-1">
                          Change Avatar
                        </p>
                      </div>
                    </div>
                  </>
                )}
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
                name="cover"
                type="file"
                className="hidden"
                onChange={handleChange}
              />
              <label
                htmlFor="cover"
                className="cursor-pointer bg-[#363131] text-white py-2 px-4 w-full text-center rounded-lg border border-white inline-block"
              >
                {formdata.cover ? formdata.cover.name : "Choose Cover "}
              </label>
            </div>
          </div>
          <div className="flex flex-row w-fit mt-3">
            <div className=" m-1 flex  w-full">
              <input
                id="oldpassword"
                type="password"
                placeholder="Current Password"
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
          {err && <div className=" text-yellow-500 text-sm absolute top-32 md:top-28">{err}</div>}
          <div className=" m- flex flex-col w-full">
            <button
              onClick={handleOnSubmit}
              className="rounded-xl bg-red-700 md:ml-2 hover:bg-red-600 transition-all duration-300 p-3 mt-3 w-full md:w-[26vw] text-white"
            >
              Update Profile
            </button>
          </div>
        </div>
        <div className="hidden md:block w-[25vw] ml-56">
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
