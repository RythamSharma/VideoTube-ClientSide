import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import BottomNav from "./BottomNav";
import { userState } from "../../store/atom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Navbar({ toggleSideBar, setProgress, setChoice, setSearch }) {
  const handleOnChange = async (e) => {
    setSearch(e.target.value)
  }
  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchButtonClick();
    }
  };
  const handleSearchButtonClick = async (e) => {
    setChoice('search')
  }
  let navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const handleLogout = async () => {
    try {
      if (document.cookie.length > 0) {
        setProgress(60);
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
        setProgress(100);
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
        const response = await axios.post(
          "http://localhost:3000/api/v1/users/logout",
          {},
          {
            headers: {
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );

        document.cookie ="accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure;";
        document.cookie ="id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure;";
        setUser({
          fullname: "",
          coverImage: "",
          email: "",
          _id: null,
          avatar: "",
          username: "",
        });

        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCurrUser = async () => {
    try {
      if (document.cookie.length > 0) {
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];

        const response = await axios.get(
          "http://localhost:3000/api/v1/users/current-user",
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
  }, []);
  const [modal, setModal] = useState(false);
  const [isSearchBarOpen, setSearchBar] = useState(false);
  const togglemodal = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
    // console.log("modal toggeled"+modal)
  };
  const togglesearch = () => {
    if (isSearchBarOpen) {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  };
  return (
    <>
      <div className="bg-[#0f0f0f] fixed top-0 left-0 right-0 z-20">
        <nav className="flex p-2 justify-between items-center">
          <div className="flex items-center ">
            <img
              onClick={toggleSideBar}
              className="cursor-pointer hidden active:bg-[#272727] p-2 rounded-full md:block"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAANElEQVR4nO3VwQkAIAwDwO4/lh0sTuBDqPi5WyAQCKkCpiXpvNe/gtd4Y3BkTjAm3gmoOxvWvmrcKBZ+KAAAAABJRU5ErkJggg=="
            />
            <img
              className={`${
                isSearchBarOpen ? "hidden" : "block"
              } w-36 md:w-44 mx-3`}
              src="https://i.postimg.cc/pXjtdktL/Picsart-24-02-04-18-06-35-507.png"
              alt="videotubelogo"
            />
            {isSearchBarOpen ? (
              <>
                <img
                  className="w-9 cursor-pointer "
                  onClick={togglesearch}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAiklEQVR4nO3WsQ3CQAxAUW9ARmD1zJASKmhyRFQMwCifIklHibjY+m+C+7J1coQkSZL0L8AJmIAxkkc0Vkskjpi3iDdwjmwoFNGM6A0YKkxiqBLxMKI3Ck3iSX/3KiG3X00l92qV+nZ3xhwVFY7FUuf7zpijouCatS3mFZmxxlyAa++3SJIkSfHNB32MhlzT81jPAAAAAElFTkSuQmCC"
                ></img>
                <div className=" border flex border-gray-700 rounded-full py-1 px-2 ">
                  <input
                    type="text"
                    name="search"
                    onChange={handleOnChange}
                    placeholder="Search"
                    className="bg-black  w-[63vw] text-white focus:outline-none rounded-l-full "
                  />
                  <button className="rounded-r-full "
                  onClick={handleSearchButtonClick}
                  >
                    <img
                      className="w-5"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABcklEQVR4nO2WwUpCQRiFL5lusnYJvYL1Dtm6FhnlK4hhaT1F+BpmPUoQbbIgJW3fWhe1+uK3c2FWysxcJMgDAxfunP8bZv575ibJSn9FQAGoAXfAAJhq2HNP7wpZQ0+AMYs1AqpZANeAjlP4GbgEysCGxi7QAvrOvBvzxoA7KvQF1OcV0yIbmjuDx2wvKrTv4as48OOQRhrLXA9Y9Lm870Dex1hzztT7rIAc8KIapz7Ge5kufKFOjbZq3PqYhjKVI8DW7aaBj2kiUzECvKkak2WDt0LAwwy2ei/tbB9TT6ZWBPhaNbohn1M/4nN6VY0z3wAZydgIADfltRBa9zVXZbb4q3j4DoBveY98Fz2TbpkUbjGYS+Zvb9OBfgKlJET83jgpHMVgW+FQ1LDuvXLONIWm88PgJrtlFPiL9AEcGszJ6mh43gLfshd4U8hMtaCuda/bSJnCfQVsO38mttid5L/AS862Py4N7MCfgIelgldKpB/hgvXNldcwtQAAAABJRU5ErkJggg=="
                      />
                  </button>
                </div>
                <div className="bg-[#272727] p-3 ml-2 cursor-pointer rounded-full">
                  <img
                    className="w-4"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABC0lEQVR4nO2VwUoCURiFL65N3Rtkoa0jwRYuogerXiN6gxiM9hX4EIL4CpaS0wN8cesIP8n8XuPu8odBOJz/fHpmvBNCwgCHQAGUukZAL2U3NXzB5kStnQNQUD0POQClA/jIAXBnDwh+QfuKQuaKgE/tHRhtlfI/ABrSSg8wk+nMaCMHUBjfubSpB7iX6dpop8B7xVnUNb5b6Xce4EqmefzJRm/Hc0d1rXQ+2fCW+RKXlQCZxzLGamqu+cdfA5608xoSFjrAUguPQNPxtkx4rOxoK0CLF+Yd8Abc6CbW4xMG9NX5upb4OUgKN5AT4IXt8wwc7xT+CzTU0zUxoRNpwz8HV8C+J2to+PeAL9ZY/qvCumfbAAAAAElFTkSuQmCC"
                    />
                </div>
              </>
            ) : (
              ""
              )}
          </div>
          <div className="flex items-center">
            <div className=" border hidden md:flex border-gray-700 rounded-full ">
              <input
                type="text"
                name="search"
                placeholder="Search"
                onChange={handleOnChange}
                onKeyDown={handleInputKeyDown}
                className="bg-black  w-[34vw] text-white focus:outline-none rounded-l-full py-1 px-2"
                />
              <button className="px-2 py-1 rounded-r-full bg-[#272727]"
                onClick={handleSearchButtonClick}
                >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABcklEQVR4nO2WwUpCQRiFL5lusnYJvYL1Dtm6FhnlK4hhaT1F+BpmPUoQbbIgJW3fWhe1+uK3c2FWysxcJMgDAxfunP8bZv575ibJSn9FQAGoAXfAAJhq2HNP7wpZQ0+AMYs1AqpZANeAjlP4GbgEysCGxi7QAvrOvBvzxoA7KvQF1OcV0yIbmjuDx2wvKrTv4as48OOQRhrLXA9Y9Lm870Dex1hzztT7rIAc8KIapz7Ge5kufKFOjbZq3PqYhjKVI8DW7aaBj2kiUzECvKkak2WDt0LAwwy2ei/tbB9TT6ZWBPhaNbohn1M/4nN6VY0z3wAZydgIADfltRBa9zVXZbb4q3j4DoBveY98Fz2TbpkUbjGYS+Zvb9OBfgKlJET83jgpHMVgW+FQ1LDuvXLONIWm88PgJrtlFPiL9AEcGszJ6mh43gLfshd4U8hMtaCuda/bSJnCfQVsO38mttid5L/AS862Py4N7MCfgIelgldKpB/hgvXNldcwtQAAAABJRU5ErkJggg==" />
              </button>
            </div>
            <div className="bg-[#272727] hidden md:block p-3 ml-2 cursor-pointer rounded-full">
              <img
                className="w-5"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABC0lEQVR4nO2VwUoCURiFL65N3Rtkoa0jwRYuogerXiN6gxiM9hX4EIL4CpaS0wN8cesIP8n8XuPu8odBOJz/fHpmvBNCwgCHQAGUukZAL2U3NXzB5kStnQNQUD0POQClA/jIAXBnDwh+QfuKQuaKgE/tHRhtlfI/ABrSSg8wk+nMaCMHUBjfubSpB7iX6dpop8B7xVnUNb5b6Xce4EqmefzJRm/Hc0d1rXQ+2fCW+RKXlQCZxzLGamqu+cdfA5608xoSFjrAUguPQNPxtkx4rOxoK0CLF+Yd8Abc6CbW4xMG9NX5upb4OUgKN5AT4IXt8wwc7xT+CzTU0zUxoRNpwz8HV8C+J2to+PeAL9ZY/qvCumfbAAAAAElFTkSuQmCC"
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className=" hidden md:block border-gray-600 mx-1 cursor-pointer p-2 rounded-full">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAARElEQVR4nO3SwQmAMBQFwV+ewf4bSOxjvAgec0kQ4U0De9mqWAUnLgy0HYHh1X8ZaE+k41geiCnZdEY2/ZxsOiOb1iY3Ij60FutFJCQAAAAASUVORK5CYII=" />
            </div>
            <img
              className={`block ${
                isSearchBarOpen ? "hidden" : "block"
              } cursor-pointer md:hidden w-6 mr-2`}
              onClick={togglesearch}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABcklEQVR4nO2WwUpCQRiFL5lusnYJvYL1Dtm6FhnlK4hhaT1F+BpmPUoQbbIgJW3fWhe1+uK3c2FWysxcJMgDAxfunP8bZv575ibJSn9FQAGoAXfAAJhq2HNP7wpZQ0+AMYs1AqpZANeAjlP4GbgEysCGxi7QAvrOvBvzxoA7KvQF1OcV0yIbmjuDx2wvKrTv4as48OOQRhrLXA9Y9Lm870Dex1hzztT7rIAc8KIapz7Ge5kufKFOjbZq3PqYhjKVI8DW7aaBj2kiUzECvKkak2WDt0LAwwy2ei/tbB9TT6ZWBPhaNbohn1M/4nN6VY0z3wAZydgIADfltRBa9zVXZbb4q3j4DoBveY98Fz2TbpkUbjGYS+Zvb9OBfgKlJET83jgpHMVgW+FQ1LDuvXLONIWm88PgJrtlFPiL9AEcGszJ6mh43gLfshd4U8hMtaCuda/bSJnCfQVsO38mttid5L/AS862Py4N7MCfgIelgldKpB/hgvXNldcwtQAAAABJRU5ErkJggg=="
            />

            {user._id ? (
              user.avatar ? (
                <img
                  onClick={togglemodal}
                  className={`w-9 mr-1 rounded-full cursor-pointer ${
                    isSearchBarOpen ? "hidden" : "block"
                  } `}
                  src={user.avatar}
                  alt={user.fullname}
                />
              ) : (
                <img
                  onClick={togglemodal}
                  className={`w-9 mr-1 rounded-full cursor-pointer ${
                    isSearchBarOpen ? "hidden" : "block"
                  } `}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFE0lEQVR4nO2ay29VVRTGL23BgkTbgi0gKL4iKOCLP4FEJKmIxoGgcWAUR9LWgRODJoao4ABD1TgxToxEJwK+U4114KMioAMtPoM8oinWxMQWKZefWfY7YXlz7jl7n56CGlZyc29y1rfW3mevtfZ63ErlLP1PCWgBbgY2A7uAr4EhYFQf+/0VsFM8ncD5lX8DAecA64C3gRPEk2HeAtaarMoZ2EAz0AMcdos6BnwAPAKsAa4GZom3Wb+XALeKpx/40+EPAV3Ge7o2cRPwnVvA58B6oLWArFZh9zh53wI3TvYpPOsUmvKVJcmeohe0z8nfVrq5AR3AbikYATYAjaUqGdfTBHQrOBgNAO1lCV+o4zYaBJbm8F8BbAT6gCPynT8UxZ4GLg7QeQ3wjXTa98IyTiLZxCfmsDn2/iJQzYlUvwN3Aefl6J4NfOo20z4Rn0jM6WNgZgbvXL3xZKEvyOYXATP0sYj1uAvTZj5b7VmG3JluMwOFfAZ4zpnTrBxH7XcR7KIcuXfr3jkuzIdZC2T8ZBIz643dxCrn2Hk+sVq8Q1kbTsEt0d1h9FAO77UuAISFZmA68L1ADwTwvyTentBNOKylKUYHAni7nb/kmxjwoLsnckMs8Kv4L4vYgzdLO0mjeQGh+Qvxbghx8MOhRwicmzh47CacjPckY0WEyR/KPBXgTjHuDlzEAvEfjFy/l2GZslFn4Akm6cwdWYzviunewEW0J28ocv1pOoPSHeB+8b+ZdaGd0E3cEii0UReghdIpkXtIZCT3z7JA/jZlzWOp9QxwiwS+H7mQn4S7MAbnfOy4FjY9Atdf1xyBp/RwY+RiXhNudQxO2BXCfhSJe1S4zWkPXy+yIGCTcJticMI+JuzWSNwa4XamPUzSgMURAhtckfVwzGJq3qwlpg0ROKs+jQbTHh7Vw5g0Y54wwxHrr5UxLBlzIzCWfxkNpT1M6udpEQKnKR+rhka6lEhZlYypkU0Po2OlbEQ464IgH1segVvu/DL9Tii4kcS02iKFXgf8IuwTEbgnhfnZZETqnJ1lWomzL4oRKuwNwu6LwCQJYNQmjICrspy9UPh10etgaKqh6tHoQJGMgFOX967SLkSHt+aa0Q9Zjq/WqvHkp+N1SA2+uhdioRTF4ae6+np/QG41EBOpPKmjWTdFiU4aM9L6agZP0mVZUFBHW2bSWJNS31dQSVJonczgOSmeGQV1rM8N2a6w2lNQidm/0WgGj504RUYK/LOwWptX6h4JjT51uoxGRzN4kvvq8gLyVwWVujXNB2soN0Uome+cfUcG3w7X9JsfIb8J+DI42tW0g7oC+Jda40z5UhJ+6zqyNfBc+B0RNrc6ZHweE94OqjnC0TQlqtWtI/+Z+P6OVMD2kOxZkeflmj7xXvWu5pTSoEtpme633MYJ3K7Ql9BvwDPWOYxScKqu2OZ6Y+gKeBW4XjwXuEZ6XMu0ThO7173BMbVxbi9jVKZs9jb5T/KSqnqZNgUo3sR2b8NOBCf8FeDKiS4+Zx7zfM2pWxXaMVHBlzrn/zGvqV0GActcQLBNXFKW4DkaGaDpU/ckjd4aFZ1GnDl1lK2k2QUAdMOWNn1Var/Xye+d1Nl7nfH0PQVr9hZha8fTKydn9emXZo9LZ1DHsE8tHpt7LFZG3aBPqyq7TvH0uakVmgJ0nbY/DKSYmyWa70zwLxzrzshfODLMxMZwW4A3NHscVhgd0+9BPdsi3kJ1z1mq/AfoL3hzLb7qNxrGAAAAAElFTkSuQmCC"
                ></img>
              )
            ) : (
              <Link to="/login">
                <button
                  className={`bg-black border ${
                    isSearchBarOpen ? "hidden" : "block"
                  } cursor-pointer border-gray-600 rounded-full p-2  text-[#00ADEE] flex items-center`}
                >
                  <img
                    className="w-5 md:mr-1 "
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACUUlEQVR4nO1WS2sUQRD+NBhFMXpS9Cjmooh40LP4A9QoKN41Pm+aiyL+AAXJQcWTkICG2arNquAvMMbnol5EQdYgQXG3ahJX40FhpGt6cAO77GSZSSLkg4Khpx5fV3VXF7CE/w7DtR6wXgZLGaw/TEjHQXoOQdSdb/CCbAfpZ7BGzUXKKFU35xM80HUgqfhgj1EI9+LB5GqUqmtB4UGwvrN/JK/yyQTrxTiAvsWjaGVTggkJ1rM5EJCyd76/tU7Y50mOZ0+A9GdMoL6hzQF1BL4vDIHAypATAU5RgmJ4yBN4Mv+HcDRcD9L3nuSZ7AkM13oaruEYONyHoS9rbN3tPAlO8hK3oxXIrRGxTrRsRC44f9uEXFFyjUcvxcG07mXM0p7bzhctgqjLZF5A072WZtJ7YHnjU5/Uv+7X7oL0NIKprdkEDaJukPSD9HmL1+9PLM0OpD5DUU50/jBR7fCsE08SgnXECHF1t937BO7brbGc9DphA5kJ8zUnsF5rCPwaBTmGO5VVqe2drrOJy5Jk5GrKnUu/N/pl9YyiZegUV6Ll5sP5cj5dSdqC5ZMpF+QIsgLJUZ/NSgoCOmPKbtrJCq5lx1mdSUPgqU/XqcwIOF+pBxWy+c6l6zdIBq3/dwp3M0humC/LQNiX0lAu/DPytWMZAslAPHY5x9O9uP91I2hqi0mxtgdFPQCS83GzmnWF3WYG5sZ+VHeA9BZItPUY3kZIJ0FyHUFtGzpGEHWhEO6K27AMguQhWF6A5YMFYPlo4sZx+6c3wXIcrDvtGi5hseMvkKREAxA6BR0AAAAASUVORK5CYII="
                  />
                  <p className="hidden md:block">Sign in</p>
                </button>
              </Link>
            )}
          </div>
        </nav>
      </div>
      {modal && (
        <div className="bg-[#282828] w-fit fixed float-right p-3 rounded-xl  md:top-7 top-14 right-1 z-30 text-white md:right-14">
          <div className=" flex justify-center items-center border-b mb-4 pb-2 font-semibold ">
            {user._id &&
              (user.avatar ? (
                <img
                  className="w-9 m-2 rounded-full"
                  src={user.avatar}
                  alt="avatar"
                />
              ) : (
                <img
                  className="w-9 m-2 rounded-full"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFE0lEQVR4nO2ay29VVRTGL23BgkTbgi0gKL4iKOCLP4FEJKmIxoGgcWAUR9LWgRODJoao4ABD1TgxToxEJwK+U4114KMioAMtPoM8oinWxMQWKZefWfY7YXlz7jl7n56CGlZyc29y1rfW3mevtfZ63ErlLP1PCWgBbgY2A7uAr4EhYFQf+/0VsFM8ncD5lX8DAecA64C3gRPEk2HeAtaarMoZ2EAz0AMcdos6BnwAPAKsAa4GZom3Wb+XALeKpx/40+EPAV3Ge7o2cRPwnVvA58B6oLWArFZh9zh53wI3TvYpPOsUmvKVJcmeohe0z8nfVrq5AR3AbikYATYAjaUqGdfTBHQrOBgNAO1lCV+o4zYaBJbm8F8BbAT6gCPynT8UxZ4GLg7QeQ3wjXTa98IyTiLZxCfmsDn2/iJQzYlUvwN3Aefl6J4NfOo20z4Rn0jM6WNgZgbvXL3xZKEvyOYXATP0sYj1uAvTZj5b7VmG3JluMwOFfAZ4zpnTrBxH7XcR7KIcuXfr3jkuzIdZC2T8ZBIz643dxCrn2Hk+sVq8Q1kbTsEt0d1h9FAO77UuAISFZmA68L1ADwTwvyTentBNOKylKUYHAni7nb/kmxjwoLsnckMs8Kv4L4vYgzdLO0mjeQGh+Qvxbghx8MOhRwicmzh47CacjPckY0WEyR/KPBXgTjHuDlzEAvEfjFy/l2GZslFn4Akm6cwdWYzviunewEW0J28ocv1pOoPSHeB+8b+ZdaGd0E3cEii0UReghdIpkXtIZCT3z7JA/jZlzWOp9QxwiwS+H7mQn4S7MAbnfOy4FjY9Atdf1xyBp/RwY+RiXhNudQxO2BXCfhSJe1S4zWkPXy+yIGCTcJticMI+JuzWSNwa4XamPUzSgMURAhtckfVwzGJq3qwlpg0ROKs+jQbTHh7Vw5g0Y54wwxHrr5UxLBlzIzCWfxkNpT1M6udpEQKnKR+rhka6lEhZlYypkU0Po2OlbEQ464IgH1segVvu/DL9Tii4kcS02iKFXgf8IuwTEbgnhfnZZETqnJ1lWomzL4oRKuwNwu6LwCQJYNQmjICrspy9UPh10etgaKqh6tHoQJGMgFOX967SLkSHt+aa0Q9Zjq/WqvHkp+N1SA2+uhdioRTF4ae6+np/QG41EBOpPKmjWTdFiU4aM9L6agZP0mVZUFBHW2bSWJNS31dQSVJonczgOSmeGQV1rM8N2a6w2lNQidm/0WgGj504RUYK/LOwWptX6h4JjT51uoxGRzN4kvvq8gLyVwWVujXNB2soN0Uome+cfUcG3w7X9JsfIb8J+DI42tW0g7oC+Jda40z5UhJ+6zqyNfBc+B0RNrc6ZHweE94OqjnC0TQlqtWtI/+Z+P6OVMD2kOxZkeflmj7xXvWu5pTSoEtpme633MYJ3K7Ql9BvwDPWOYxScKqu2OZ6Y+gKeBW4XjwXuEZ6XMu0ThO7173BMbVxbi9jVKZs9jb5T/KSqnqZNgUo3sR2b8NOBCf8FeDKiS4+Zx7zfM2pWxXaMVHBlzrn/zGvqV0GActcQLBNXFKW4DkaGaDpU/ckjd4aFZ1GnDl1lK2k2QUAdMOWNn1Var/Xye+d1Nl7nfH0PQVr9hZha8fTKydn9emXZo9LZ1DHsE8tHpt7LFZG3aBPqyq7TvH0uakVmgJ0nbY/DKSYmyWa70zwLxzrzshfODLMxMZwW4A3NHscVhgd0+9BPdsi3kJ1z1mq/AfoL3hzLb7qNxrGAAAAAElFTkSuQmCC"
                ></img>
              ))}
            <div>
              {user._id && <h2>{user.fullname}</h2>}
              {user._id && <p>{user.email}</p>}
            </div>
          </div>
          <Link to="/edit-profile">
            <p className="flex cursor-pointer p-3 hover:bg-[#2f2f2f] rounded-2xl">
              <img
                className="w-5 h-auto mr-3"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABt0lEQVR4nO3ZPU7DQBCG4eW3IUhcAAqUQIA2h6ClQHTAHTgAVFAiTkJHhUAK5AzQUPFbUSBaeJGlsWQZJ3G8nt21tF8V2VlnnuxkEivGxMRMHGAWOAYegC/gHtg2TQowB1zyPz+NwgCHDM/AhB5gKvP4fAjk24QcYAG4BvYyx84KII8m1AAt4E4KfQLmR+zMkWkA4hloFzwnxSQDYMYEjnjJI3I7c5BMs2EXGuA+JyURbWmznTLvSCiITgEiabMkN9lpNhJi3E+nW3npd2Ajd74jOOTbfLHMRZ1CVBCuIWoIlxBVhCuIOsIFJIf4UEFoQwoQm2UQyIgOAmKDoEo9GpCqCKt66obYIIKBlECsjftg4xtSEvE6bjrhE1IXwiukToQ3SN0ILxANhHNIcpMD9GXpG9DNne/KceTmqaVZjw1kVZb9Ar26ED4gu+k6uedPf16sV2knn5DTDCTF9GwRPiBXOUjaZpXaySckmVJFsUI4hQArsuRTWugC2Ae2gOmJC7CsxwayBCwbpeCytTRDhEhMIKFqPRGiFOKOSEwgoWo9EaIU4o4EGlNhK9P/8UJKX6VvY4x+/gDtAFvi5WSVywAAAABJRU5ErkJggg=="
              />
              Edit Profile
            </p>
          </Link>
          <p
            className="flex cursor-pointer p-3 hover:bg-[#2f2f2f] rounded-2xl"
            onClick={handleLogout}
          >
            <img
              className="w-5 h-auto mr-3"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNUlEQVR4nO3aO05DMRBGYUNBiwQtG0FZGG0aXjvJCmgQC6AIUNDR5rKNE01kikjJlSfRDf+MfHpL88nJfckFuACegV90GoBHm620Bjyh24MHYnrrtogEzOpMg2fRpiIW3rk6ZOLoOyIWfUfEAu5SXLUsYF4yQFx1yIQBC+AFuAz90wKWdaz3Zowo5Ab4qaMZ6iok5CCMKmQH5mMUowxxYdQhezDXJSKkCRMFsgPzuYWJBBnFRIPsxRwDAc6AL/6/5bGQ8/rHiw1J89OSugwTCMLYvSQKhAw3RFqet9QhtD7OK0PwvJOoQsjwYkWWV13gO8vHhzfgNfznoIPqkBNEho/YwNw1lzBk03QLThTeuTpk4ug7kmBHhrpmVvQO1aw8i+xclGr3HogdPDPM384otDKE5+DZGhon/IxufD43AAAAAElFTkSuQmCC"
            />
            Logout
          </p>
        </div>
      )}
      <div className="block md:hidden">
        <BottomNav setChoice={setChoice}/>
      </div>
    </>
  );
}

export default Navbar;
