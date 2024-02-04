import React, { useState } from "react";
import { User, useAuth0 } from "@auth0/auth0-react";
function Navbar({ toggleSideBar }) {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const [modal, setModal] = useState(false);
  const togglemodal = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };
  return (
    <>
      <div className="bg-[#0f0f0f] fixed top-0 left-0 right-0 z-20">
        <nav className="flex p-2 justify-between items-center">
          <div className="flex items-center ">
            <img
              onClick={toggleSideBar}
              className="cursor-pointer hidden md:block"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAANElEQVR4nO3VwQkAIAwDwO4/lh0sTuBDqPi5WyAQCKkCpiXpvNe/gtd4Y3BkTjAm3gmoOxvWvmrcKBZ+KAAAAABJRU5ErkJggg=="
            />
            <img
              className=" w-36 md:w-44 mx-3"
              src="https://i.postimg.cc/pXjtdktL/Picsart-24-02-04-18-06-35-507.png"
              alt="videotubelogo"
            />
          </div>
          <div className="flex items-center">
            <div className=" border hidden md:flex border-gray-700 rounded-full ">
              <input
                type="text"
                name="search"
                placeholder="Search"
                className="bg-black  w-[34vw] text-white focus:outline-none rounded-l-full py-1 px-2"
              />
              <button className="px-2 py-1 rounded-r-full bg-[#272727]">
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
            <div className="active:border hidden md:block border-gray-600 mx-1 cursor-pointer p-2 rounded-full">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAARElEQVR4nO3SwQmAMBQFwV+ewf4bSOxjvAgec0kQ4U0De9mqWAUnLgy0HYHh1X8ZaE+k41geiCnZdEY2/ZxsOiOb1iY3Ij60FutFJCQAAAAASUVORK5CYII=" />
            </div>
            <img className="block md:hidden w-7 mr-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABcklEQVR4nO2WwUpCQRiFL5lusnYJvYL1Dtm6FhnlK4hhaT1F+BpmPUoQbbIgJW3fWhe1+uK3c2FWysxcJMgDAxfunP8bZv575ibJSn9FQAGoAXfAAJhq2HNP7wpZQ0+AMYs1AqpZANeAjlP4GbgEysCGxi7QAvrOvBvzxoA7KvQF1OcV0yIbmjuDx2wvKrTv4as48OOQRhrLXA9Y9Lm870Dex1hzztT7rIAc8KIapz7Ge5kufKFOjbZq3PqYhjKVI8DW7aaBj2kiUzECvKkak2WDt0LAwwy2ei/tbB9TT6ZWBPhaNbohn1M/4nN6VY0z3wAZydgIADfltRBa9zVXZbb4q3j4DoBveY98Fz2TbpkUbjGYS+Zvb9OBfgKlJET83jgpHMVgW+FQ1LDuvXLONIWm88PgJrtlFPiL9AEcGszJ6mh43gLfshd4U8hMtaCuda/bSJnCfQVsO38mttid5L/AS862Py4N7MCfgIelgldKpB/hgvXNldcwtQAAAABJRU5ErkJggg==" />

            {isAuthenticated ? (
              <img
                onClick={togglemodal}
                className="w-9 rounded-full cursor-pointer "
                src={user.picture}
                alt={user.name}
              />
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="bg-black border cursor-pointer border-gray-600 rounded-full p-2  text-[#00ADEE] flex items-center"
              >
                <img
                  className="w-5 md:mr-1 "
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACUUlEQVR4nO1WS2sUQRD+NBhFMXpS9Cjmooh40LP4A9QoKN41Pm+aiyL+AAXJQcWTkICG2arNquAvMMbnol5EQdYgQXG3ahJX40FhpGt6cAO77GSZSSLkg4Khpx5fV3VXF7CE/w7DtR6wXgZLGaw/TEjHQXoOQdSdb/CCbAfpZ7BGzUXKKFU35xM80HUgqfhgj1EI9+LB5GqUqmtB4UGwvrN/JK/yyQTrxTiAvsWjaGVTggkJ1rM5EJCyd76/tU7Y50mOZ0+A9GdMoL6hzQF1BL4vDIHAypATAU5RgmJ4yBN4Mv+HcDRcD9L3nuSZ7AkM13oaruEYONyHoS9rbN3tPAlO8hK3oxXIrRGxTrRsRC44f9uEXFFyjUcvxcG07mXM0p7bzhctgqjLZF5A072WZtJ7YHnjU5/Uv+7X7oL0NIKprdkEDaJukPSD9HmL1+9PLM0OpD5DUU50/jBR7fCsE08SgnXECHF1t937BO7brbGc9DphA5kJ8zUnsF5rCPwaBTmGO5VVqe2drrOJy5Jk5GrKnUu/N/pl9YyiZegUV6Ll5sP5cj5dSdqC5ZMpF+QIsgLJUZ/NSgoCOmPKbtrJCq5lx1mdSUPgqU/XqcwIOF+pBxWy+c6l6zdIBq3/dwp3M0humC/LQNiX0lAu/DPytWMZAslAPHY5x9O9uP91I2hqi0mxtgdFPQCS83GzmnWF3WYG5sZ+VHeA9BZItPUY3kZIJ0FyHUFtGzpGEHWhEO6K27AMguQhWF6A5YMFYPlo4sZx+6c3wXIcrDvtGi5hseMvkKREAxA6BR0AAAAASUVORK5CYII="
                />
                <p className="hidden md:block">Sign in</p>
              </button>
            )}
          </div>
        </nav>
      </div>
      {modal && (
        <div className="bg-[#282828] w-fit float-right p-3 rounded-xl absolute md:top-7 top-14 right-1 z-30 text-white md:right-14">
          <div className=" flex justify-center items-center border-b mb-4 pb-2 font-semibold ">
            {isAuthenticated && (
              <img
                className="w-9 m-2 rounded-full"
                src={user.picture}
                alt={user.name}
              />
            )}
            <div>
              {isAuthenticated && <h2>{user.name}</h2>}
              {isAuthenticated && <p>{user.email}</p>}
            </div>
          </div>
          <p
            className="flex cursor-pointer p-3 "
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            <img
              className="w-5 h-auto mr-3"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNUlEQVR4nO3aO05DMRBGYUNBiwQtG0FZGG0aXjvJCmgQC6AIUNDR5rKNE01kikjJlSfRDf+MfHpL88nJfckFuACegV90GoBHm620Bjyh24MHYnrrtogEzOpMg2fRpiIW3rk6ZOLoOyIWfUfEAu5SXLUsYF4yQFx1yIQBC+AFuAz90wKWdaz3Zowo5Ab4qaMZ6iok5CCMKmQH5mMUowxxYdQhezDXJSKkCRMFsgPzuYWJBBnFRIPsxRwDAc6AL/6/5bGQ8/rHiw1J89OSugwTCMLYvSQKhAw3RFqet9QhtD7OK0PwvJOoQsjwYkWWV13gO8vHhzfgNfznoIPqkBNEho/YwNw1lzBk03QLThTeuTpk4ug7kmBHhrpmVvQO1aw8i+xclGr3HogdPDPM384otDKE5+DZGhon/IxufD43AAAAAElFTkSuQmCC"
            />
            Logout
          </p>
          <p className="flex cursor-pointer p-3 ">
            <img
              className="w-5 h-auto mr-3"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABt0lEQVR4nO3ZPU7DQBCG4eW3IUhcAAqUQIA2h6ClQHTAHTgAVFAiTkJHhUAK5AzQUPFbUSBaeJGlsWQZJ3G8nt21tF8V2VlnnuxkEivGxMRMHGAWOAYegC/gHtg2TQowB1zyPz+NwgCHDM/AhB5gKvP4fAjk24QcYAG4BvYyx84KII8m1AAt4E4KfQLmR+zMkWkA4hloFzwnxSQDYMYEjnjJI3I7c5BMs2EXGuA+JyURbWmznTLvSCiITgEiabMkN9lpNhJi3E+nW3npd2Ajd74jOOTbfLHMRZ1CVBCuIWoIlxBVhCuIOsIFJIf4UEFoQwoQm2UQyIgOAmKDoEo9GpCqCKt66obYIIKBlECsjftg4xtSEvE6bjrhE1IXwiukToQ3SN0ILxANhHNIcpMD9GXpG9DNne/KceTmqaVZjw1kVZb9Ar26ED4gu+k6uedPf16sV2knn5DTDCTF9GwRPiBXOUjaZpXaySckmVJFsUI4hQArsuRTWugC2Ae2gOmJC7CsxwayBCwbpeCytTRDhEhMIKFqPRGiFOKOSEwgoWo9EaIU4o4EGlNhK9P/8UJKX6VvY4x+/gDtAFvi5WSVywAAAABJRU5ErkJggg=="
            />
            Edit Profile
          </p>
        </div>
      )}
    </>
  );
}

export default Navbar;
