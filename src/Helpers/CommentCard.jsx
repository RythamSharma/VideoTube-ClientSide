import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

function CommentCard(props) {
  const [user, setUser] = useState({});
  const [liked, setLiked] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editcontent, setEditcontent] = useState(props.content);
  const [modal, setModal] = useState(false);
  const editCommentHandle = async () =>{
    try {
      if (document.cookie.length > 0) {
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
          const reponse = await axios.patch(`https://videotube-api.onrender.com/api/v1/comments/c/${props.id}`,{
            content:editcontent
          },{
            headers:{
              Authorization:`bearer ${accesstoken}`
            }
          })
          setEditing(false);
          props.getVideoComments();
      }
    } catch (error) {
      console.log(error)
    }
  }
  const editcontenttoggle = () => {
    setEditing(true);
    setModal(false);
  };
  const togglemodal = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };
  function calculateDaysAgo(createdAt) {
    const currentDate = new Date();
    const videoDate = new Date(createdAt);
    const timeDifference = currentDate - videoDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo;
  }
  const togglelike = () => {
    setLiked((prev) => !prev);
  };
  const daysAgo = calculateDaysAgo(props.createdAt);
  const getuser = async () => {
    try {
      const response = await axios.post(
        "https://videotube-api.onrender.com/api/v1/users/getuser",
        {
          userid: props.owner,
        }
      );
      // console.log(response.data);
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComment = async () => {
    try {
      if (document.cookie.length > 0) {
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
        const response = await axios.delete(
          `https://videotube-api.onrender.com/api/v1/comments/c/${props.id}`,
          {
            headers: {
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
      }
      props.getVideoComments();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getuser();
  }, []);
  return (
    <>
      <div className="text-white flex flex-row relative my-4">
        <div className="avatar">
          <img className="w-9 rounded-full" src={user.avatar} alt="" />
        </div>
        <div className="content flex flex-col ml-2 w-[90%]">
          <div className="font-semibold">
            {user.username}{" "}
            <span className="font-normal text-gray-500 text-xs">
              {" "}
              {daysAgo} days ago
            </span>{" "}
          </div>
          <div>
            {editing ? (
              <input
                onChange={(e) => {
                  setEditcontent(e.target.value);
                }}
                type="text"
                name="edit"
                id="edit"
                className="bg-transparent border-b w-full outline-none  focus:border-red-700 transition-all duration-300 mx-3 "
                value={editcontent}
              />
            ) : (
              props.content
            )}
          </div>
          <div className="mt-2 ">
            {editing ? (
              <div className="float-right mt-2">
                <button className="mx-3 font-semibold" onClick={()=>setEditing(false)}>Cancel</button>
                <button
                  onClick={editCommentHandle}
                  className={`px-2 py-[5px] ${
                    editcontent
                      ? "bg-blue-500 text-black"
                      : "bg-[#272727] text-gray-400 "
                  }  rounded-3xl  `}
                >
                  Comment
                </button>
              </div>
            ) : (
              <>
                {" "}
                <button className="" onClick={togglelike}>
                  {liked ? (
                    <img
                      className="w-6"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABi0lEQVR4nO3Zu2oVURSA4SVqJVpEUWuJhVUKa0FR+1TiMwgiaOsLWGgTRLQxja9g5wXB+ASKEdQENILgJUeCdz8ZOIUonsxh9jmzZzMfTD9/McNae0f0er2pw05cwzu8xk3siy7Bdjz0rxfYHV2BS/7vSnQBTuLniJDnkTvsxRujfYmcYQtu29zLyBnOq+dq5AqH8bVmyFzkCDvwtGbEvcgVFtU3HznCqTEiVrA1coMDWB8j5ELkBtuwNEbEBmaiYyNIN365OLrJCPK3XzgUGY4ga5r7gPcjnlU8wkXsamsESW0Z+1OGnNGeW6kiZvCxxZDBtAfCSVlPFXKn5ZDlVCFvWw75hnMpQn7Iw3zTkFwslRLyqZSQV6WEXC4hZLVaq0sI+Y5jJYRUHpQSslFKyErTkIE8LDQNqXsAN+kFa0/TkBstRzxOctuFE0WM8RXcbzHkc6SCg8OLzTY8SxYyjDnSUszZpCHDmFncnWLEYnUUlTzkj6DjuI4n1Z6Q+OUHw2/y9MQCer1edNZvHJ3eD3RXlmQAAAAASUVORK5CYII="
                    ></img>
                  ) : (
                    <img
                      className="w-6  "
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACs0lEQVR4nO2ZTYhNYRjH3zFNGIzmNo1GUT4WiBoWPlNYS1mMLGZlwYLCkrCzEGqmKCxGsbBiQVkYpCwkNWWKGfkoZOQzY8i3n97mf+t0594zR+e54z06/zqb8z79///n3vfjOc/rXI4cOcYcwESgA3gLDAAngEaXJQC1wBVG4iFQcFkBcFDGXwCtwHzgrt4dcVkAsA74BfwAlkfer1Iij13oAJr0L3jsLRmbrPdfXMgAaoBLMnsNGFcy7qeYxwMXMoCdMvoamF5m/KjGj7lQASwGvgK/gfVlxuuBd0pkiQsRwCSgTyY7KsRs1fhNFyqA0zLZC0yoEFPceje5EAG0yeAnYF6FmDWRM6XOhQZgNjAok1ti4s4rZp8LDUAdcFsGz8XEzQJ++rMDaHahATikJJ7GFYJAp+JOudDA8JwvliArYuIaNPX8lrzAhQSgGXipX3lPwgOyHPzm8D7mGQBu+TLHlzbVKEEuy8jV0hKkTHw78J30uA9Ms0xke6QEaUl5gDaO8swANgD3pHnWKokC8EGkG01Ik+nOleagFeFuEXabECbXbSyuKSvCbhG2mRAm110k3X4rwlciHFGeVxPA6sgut82C0J/OHrUmDpPrjgeOR/TTFZ3FfdDM4d/r75CFO1lPpGCy6ANIZJksPM9sIgx3ZnpkoTPLifRK/knqlus/TuSi5L/FVdtZSKQGOCwL17O+2Jv+l11roSw8S0v0UURTzNwl154ZWfBdacn6RdRq5jCZbjvwObJrpav1gJMi22/mMplul3R7TLowuvMofh02mLhMprtUun2WpP6qADXcYr/XDTXrze9UgDm62PS4AEw1Ix+9JfvImnhlJJk3wAF/TWDdsgFa/IdUpCW7y5I/2vP17aCxwpmqTmVgre7Ofd9pyNj8EHAD2Fy1BHLkyOEyiz+lhVxrUBoKtwAAAABJRU5ErkJggg=="
                      alt="...."
                    ></img>
                  )}
                </button>
                <button className="rotate-180 ml-2">
                  <img
                    className="w-6"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACs0lEQVR4nO2ZTYhNYRjH3zFNGIzmNo1GUT4WiBoWPlNYS1mMLGZlwYLCkrCzEGqmKCxGsbBiQVkYpCwkNWWKGfkoZOQzY8i3n97mf+t0594zR+e54z06/zqb8z79///n3vfjOc/rXI4cOcYcwESgA3gLDAAngEaXJQC1wBVG4iFQcFkBcFDGXwCtwHzgrt4dcVkAsA74BfwAlkfer1Iij13oAJr0L3jsLRmbrPdfXMgAaoBLMnsNGFcy7qeYxwMXMoCdMvoamF5m/KjGj7lQASwGvgK/gfVlxuuBd0pkiQsRwCSgTyY7KsRs1fhNFyqA0zLZC0yoEFPceje5EAG0yeAnYF6FmDWRM6XOhQZgNjAok1ti4s4rZp8LDUAdcFsGz8XEzQJ++rMDaHahATikJJ7GFYJAp+JOudDA8JwvliArYuIaNPX8lrzAhQSgGXipX3lPwgOyHPzm8D7mGQBu+TLHlzbVKEEuy8jV0hKkTHw78J30uA9Ms0xke6QEaUl5gDaO8swANgD3pHnWKokC8EGkG01Ik+nOleagFeFuEXabECbXbSyuKSvCbhG2mRAm110k3X4rwlciHFGeVxPA6sgut82C0J/OHrUmDpPrjgeOR/TTFZ3FfdDM4d/r75CFO1lPpGCy6ANIZJksPM9sIgx3ZnpkoTPLifRK/knqlus/TuSi5L/FVdtZSKQGOCwL17O+2Jv+l11roSw8S0v0UURTzNwl154ZWfBdacn6RdRq5jCZbjvwObJrpav1gJMi22/mMplul3R7TLowuvMofh02mLhMprtUun2WpP6qADXcYr/XDTXrze9UgDm62PS4AEw1Ix+9JfvImnhlJJk3wAF/TWDdsgFa/IdUpCW7y5I/2vP17aCxwpmqTmVgre7Ofd9pyNj8EHAD2Fy1BHLkyOEyiz+lhVxrUBoKtwAAAABJRU5ErkJggg=="
                    alt="...."
                  ></img>
                </button>{" "}
              </>
            )}
          </div>
        </div>
        <div className="options">
          <img
            className="w-6 mt-5 cursor-pointer"
            onClick={togglemodal}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAARElEQVR4nO3SwQmAMBQFwV+ewf4bSOxjvAgec0kQ4U0De9mqWAUnLgy0HYHh1X8ZaE+k41geiCnZdEY2/ZxsOiOb1iY3Ij60FutFJCQAAAAASUVORK5CYII="
          />
          <div className="modal">
            {modal && (
              <div className="bg-[#282828] w-fit absolute float-right p-3 rounded-xl  md:top-7 top-14 right-1 z-30 text-white md:right-10">
                <div className=" flex justify-center items-center font-semibold "></div>
                <p
                  className="flex cursor-pointer p-2 rounded-lg"
                  onClick={editcontenttoggle}
                >
                  <img
                    className="w-5 h-auto mr-3"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABt0lEQVR4nO3ZPU7DQBCG4eW3IUhcAAqUQIA2h6ClQHTAHTgAVFAiTkJHhUAK5AzQUPFbUSBaeJGlsWQZJ3G8nt21tF8V2VlnnuxkEivGxMRMHGAWOAYegC/gHtg2TQowB1zyPz+NwgCHDM/AhB5gKvP4fAjk24QcYAG4BvYyx84KII8m1AAt4E4KfQLmR+zMkWkA4hloFzwnxSQDYMYEjnjJI3I7c5BMs2EXGuA+JyURbWmznTLvSCiITgEiabMkN9lpNhJi3E+nW3npd2Ajd74jOOTbfLHMRZ1CVBCuIWoIlxBVhCuIOsIFJIf4UEFoQwoQm2UQyIgOAmKDoEo9GpCqCKt66obYIIKBlECsjftg4xtSEvE6bjrhE1IXwiukToQ3SN0ILxANhHNIcpMD9GXpG9DNne/KceTmqaVZjw1kVZb9Ar26ED4gu+k6uedPf16sV2knn5DTDCTF9GwRPiBXOUjaZpXaySckmVJFsUI4hQArsuRTWugC2Ae2gOmJC7CsxwayBCwbpeCytTRDhEhMIKFqPRGiFOKOSEwgoWo9EaIU4o4EGlNhK9P/8UJKX6VvY4x+/gDtAFvi5WSVywAAAABJRU5ErkJggg=="
                  />
                  Edit
                </p>
                <p
                  className="flex cursor-pointer mt-1 p-1 rounded-lg"
                  onClick={deleteComment}
                >
                  <img
                    className="w-6 h-auto mr-3 "
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWElEQVR4nO2aQU7DMBAAfeIHVPQrlO9B4Vm0EhWFEz3wgZZvDHIwEoqaxru2YyvsnHLY7GayG8cHO2fMFOAKeAK+GOcErP09rjWAR+Q8uNbg5y17biNiV7+dca1BoFT8ZDQtAmxph+1cRDY5OtORnKh2XUwkDawjA9hoJYKN1gA2Wolgo/XfRwvYAO/AQpBzAbwAz9q6JUT2IeQQIxMkfKznVVu3hMg18BHCPoGlIPZGW1dMTMIYGYlE1VXrkoxUovrye05GI9HEf6T3MR9615KVrUP94DkS9rog6kRK3alElqXrZk04i9HizIct+c80IXJpddLIUEMkZomVyjC1iHDbIdnOdORwiEoIvCVsGvfauiVEdsptvL9np60rJnvCWnUxkTSwjgxgo5UINloD2Gg1OFqnkHOVLel4zbtQ85gzqT83Uov73Adm1n86MwVHL9HkwRvDjfMNy032c2DQYhYAAAAASUVORK5CYII="
                  />
                  Delete
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentCard;
