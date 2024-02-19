import React, { useState } from "react";
import axios from "axios";
function UploadVideo({setProgress}) {
  const [err, setErr] = useState();
  const handleOnSubmit = async () => {
    try {
      if (document.cookie.length > 0) {
        setProgress(10);
        console.log("uploading video", formdata);
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
        setProgress(60);
        const response = await axios.post(
          "http://localhost:3000/api/v1/videos",
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        setProgress(100);

        // console.log(response.data);
      }
    } catch (error) {
      setProgress(100);
      console.log(error);
    }
  };
  const [formdata, setFormdata] = useState({
    videoFile: null,
    thumbnail: null,
    title: "",
    description: "",
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
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-2 md:mt-9 ">
        <div className="text-white flex flex-col mt-2 justify-center  md:hidden items-center ">
          <img
            className=" w-72 md:w-96 mt-3"
            src="https://i.postimg.cc/pXjtdktL/Picsart-24-02-04-18-06-35-507.png"
            alt=""
          />
        </div>
        <div className="flex flex-row items-center md:mt-6">
          <div className="flex flex-col justify-center items-center bg-[#272727] p-2 w-[90vw] md:w-fit md:p-11 mx-3 rounded-lg">
            <div className=" m-1 flex flex-col w-full">
              <p className="text-white text-center text-xl md:text-2xl mb-11 font-bold ">
                Upload Video on{" "}
                <span className="text-red-600 inline"> VideoTube</span>
              </p>
              <label className="text-white font-semibold" htmlFor="Title">
                Title :
              </label>
              <input
                id="Title"
                type="text"
                placeholder="Title"
                value={formdata.title}
                name="title"
                onChange={handleChange}
                className="bg-transparent focus:border-red-600 transition-colors duration-150 border-b  w-full md:w-[26vw] mt-0  focus:outline-none p-3 text-white"
              />
              <div className=" m-1 flex flex-col w-full">
                <label
                  className="text-white mt-5 font-semibold"
                  htmlFor="Description"
                >
                  Description :
                </label>
                <input
                  id="Description"
                  type="text"
                  value={formdata.description}
                  placeholder="Description"
                  name="description"
                  onChange={handleChange}
                  className="bg-transparent focus:border-red-600 transition-colors duration-150 border-b  w-full md:w-[26vw] mt-0  focus:outline-none p-3 text-white"
                />
              </div>
              <label
                htmlFor="Thumbnail"
                className="text-white m-1 mt-4 font-semibold"
              >
                Thumbnail:
              </label>
              <div className="relative mt-1">
                <input
                  id="Thumbnail"
                  name="thumbnail"
                  type="file"
                  className="hidden"
                  onChange={handleChange}
                />
                <label
                  htmlFor="Thumbnail"
                  className="cursor-pointer bg-[#363131] text-white py-2 px-4 w-full text-center rounded-lg border border-white inline-block"
                >
                  {formdata.thumbnail
                    ? formdata.thumbnail.name
                    : "Choose Thumbnail "}
                </label>
              </div>
              <label
                htmlFor="Video"
                className="text-white m-1 mt-4 font-semibold"
              >
                Video:
              </label>
              <div className="relative mt-1">
                <input
                  id="Video"
                  name="videoFile"
                  type="file"
                  className="hidden"
                  onChange={handleChange}
                />
                <label
                  htmlFor="Video"
                  className="cursor-pointer bg-[#363131] text-white py-2 px-4 w-full text-center rounded-lg border border-white inline-block"
                >
                  {formdata.videoFile
                    ? formdata.videoFile.name
                    : "Choose Video "}
                </label>
              </div>
            </div>
            {err && (
              <div className=" text-yellow-500 text-sm absolute top-32 md:top-28">
                {err}
              </div>
            )}
            <div className=" m- flex flex-col w-full">
              <button
                onClick={handleOnSubmit}
                className="rounded-xl bg-red-700 md:ml-2 mt-11 hover:bg-red-600 transition-all duration-300 p-3  w-full md:w-[26vw] text-white"
              >
                Upload Video
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
              src="https://i.postimg.cc/T1PwxRt2/Screenshot-2024-02-13-182614-removebg-preview.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadVideo;
