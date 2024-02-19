import axios from "axios";
import React, { useState } from "react";
function ManageVideoCard(props) {
  function calculateDaysAgo(createdAt) {
    const currentDate = new Date();
    const videoDate = new Date(createdAt);
    const timeDifference = currentDate - videoDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo;
  }
  const daysAgo = calculateDaysAgo(props.createdAt);
  const [formdata, setFormdata] = useState({
    thumbnail: null,
    title: props.title,
    description: props.description,
  });
  const handleDeletePermanently = async () => {
    try {
      if (document.cookie.length > 0) {
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
        const response = await axios.delete(
          `http://localhost:3000/api/v1/videos/${props.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        props.setResponse(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnPublish = async () => {
    try {
      if (document.cookie.length > 0) {
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
        const response = await axios.patch(
          `http://localhost:3000/api/v1/videos/toggle/publish/${props.id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        props.setResponse(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (document.cookie.length > 0) {
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
        const response = await axios.patch(
          `http://localhost:3000/api/v1/videos/${props.id}`,
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        props.setResponse(response.data.message);
        // console.log(formdata);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    if (e.target.type === "file") {
      const id = document.getElementById(e.target.id);
      const file = id.files[0];
      setFormdata({
        ...formdata,
        [e.target.name]: file,
      });
    } else {
      setFormdata({
        ...formdata,
        [e.target.name]: e.target.value,
      });
    }
  };
  return (
    <div className="bg-[#272727] text-white relative  rounded-lg md:rounded-2xl p-2 m-7 w-fit">
      <div className="flex flex-col md:flex-row justify-evenly items-center p-1 md:p-9">
        <div>
          <div name="thumbnail" className="relative mt-1">
            <input
              id={props.id}
              name="thumbnail"
              type="file"
              className="hidden"
              onChange={handleChange}
            />
            <label
              name="thumbnail"
              htmlFor={props.id}
              className="cursor-pointer  text-white py-2 px-4 w-fit text-center  inline-block"
            >
              <img
                name="thumbnail"
                className=" rounded-lg md:rounded-2xl w-[450px]"
                src={props.thumbnail}
                alt="thumbnail"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="my-1">
            <label htmlFor="title" className=" font-bold">
              Title :
            </label>
            <input
              onChange={handleChange}
              type="text"
              value={formdata.title}
              name="title"
              className="bg-transparent active:outline-none w-fit md:w-[600px] md:border-b ml-14 border-white "
            />
          </div>
          <div className="my-1">
            <label htmlFor="description" className=" font-bold">
              Description :
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="description"
              value={formdata.description}
              className="bg-transparent active:outline-none w-fit md:w-[600px] ml-2 md:border-b border-white "
            />
          </div>
          <div className="my-1 flex font-bold">
            views :{" "}
            <div className="bg-transparent font-normal active:outline-none w-fit md:w-[600px] ml-12 md:border-b border-white">
              {" "}
              {props.views}
            </div>
          </div>
          <div className="my-1 flex font-bold">
            Published :{" "}
            <div className="bg-transparent font-normal active:outline-none w-fit md:w-[600px] ml-5 md:border-b border-white">
              {" "}
              {daysAgo} days ago
            </div>
          </div>
        </div>
      </div>
      <div className="buttons flex flex-row md:absolute md:bottom-3  md:right-2 justify-center mb-3 md:mb-0 ">
        <button
          onClick={handleSaveChanges}
          className="bg-green-700 font-semibold tracking-tighter mx-1 rounded-lg px-5 md:px-2 py-2"
        >
          Save <span className="hidden md:inline-block"> Changes</span>
        </button>
        <button
          onClick={handleOnPublish}
          className="bg-yellow-500  00 font-semibold tracking-tighter mx-1 rounded-lg px-5 md:px-2 py-2"
        >
          {props.isPublished ? "Unpublish" : "Publish"}
        </button>
        <button
          onClick={handleDeletePermanently}
          className="bg-red-700 font-semibold tracking-tighter mx-1 rounded-lg px-5 md:px-2 py-2"
        >
          Delete <span className="hidden md:inline-block"> Permanently</span>
        </button>
      </div>
    </div>
  );
}

export default ManageVideoCard;
