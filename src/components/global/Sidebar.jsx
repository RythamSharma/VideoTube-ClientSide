import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/atom";
import axios from "axios";
function Sidebar({ isSidebarOpen }) {
  const user = useRecoilValue(userState);
  const [subscriptions, setSubscriptions] = useState([]);
  const fetchSubscriptions = async () => {
    if (document.cookie.length > 0 && user?._id) {
    try {
        const accesstoken = document.cookie
          ?.split("; ")
          .find((row) => row.startsWith("accessToken="))
          .split("=")[1];
        const response = await axios.get(
          `http://localhost:3000/api/v1/subscriptions/c/${user._id}`,
          {
            headers: {
              Authorization: `bearer ${accesstoken}`,
            },
          }
        );
        console.log(response.data.data.channelsSubscribed);
        setSubscriptions(response.data.data.channelsSubscribed);
        // console.log(subscriptions)
      
    } catch (error) {
      console.log(error);
    }}
  };
  useEffect(() => {
    fetchSubscriptions();
  }, [user]);
  return (
    <>
      <div
        className={`fixed text-white h-[100vh] ${
          isSidebarOpen ? "w-64" : "w-fit"
        } hidden md:block  pt-16 border-gray-300 bg-black p-5`}
      >
        <div className="border-b border-gray-700 p-1 my-1 ">
          <p className="flex items-center p-3 cursor-pointer hover:bg-[#272727] rounded-xl ">
            <img
              className={`w-6 ${isSidebarOpen ? "mr-4" : "mr-0"}`}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACBElEQVR4nO3Yz4tNYRzH8WP8SGkUohRSJEWa2VjajTJloSwsFAv5C8gsLW0trSyt2MmQsrCQ2flRkliInd+RezFeOpwZT8/cO9177rnHmTzvunXrPM/n8/me832e8yPLEonEUMABPMbz/H+2lMBpfPOX7ziXNR2sxmXduYI1WRPBTjyIAt8rfiH5mB1Zk8Ak3kVBL2EVVuBCdOwjjjQh+LK8tzEbhGvhVIexx/ElGPezKGzkX4Vfi2vRmX2J/YvMGcOLaM51rKs7/G48iYLcwaYe5m7AzWjuM+yrK/wxfI5a4WLe631oLMf5qPW+4uQwg3dajJ9wdADNw3jfYfGvrDr8RtyOjJ5iTwXau4o7dshdbK4q/DheRQZXMVqJQfbbY7TQDMk9xwcVHov29x+YyrfPqsJHW/JU4THH29KLO+9DPArE3mCilFh/vhOF1xwPS62JfEcIRD5U0e99eO8t7tZznCgjEu7VZ4aSdBFwNvC/UUbgdSCwLasZbA8XdBmB8CZT+/MKRgL/2TIC8wwl4bAzSAUMjnQFCv6bK+DPq+UM2hbSLo4damQBOFi8G/TCZBMLmNE795tYQDuYsuAdF+uD460mFjBPnZpZnWapgH5IV6ADqYX6IbVQB1IL9UOXB7JeaNWp2RXcKmk2XadmV7C1+LTS61nLx01jS52aiUQiW9r8AhvTeS7acGUAAAAAAElFTkSuQmCC"
            />
            {isSidebarOpen && "Home"}
          </p>
          <p className="flex items-center p-3 cursor-pointer hover:bg-[#272727] rounded-xl">
            <img
              className={`w-5 ${isSidebarOpen ? "mr-4" : "mr-0"}`}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADwElEQVR4nO2ZS2xNQRzGp3rrLVFJPUMkiEQbCUsVEtQCkYiWpb1QioXYsOrCY2FDwgppSIhISCTCQoJIBAnqUe/EY+HZqldVfzL1nWRyes/rOrf3VvslJ/f0zH/OzO/MnG/+c2rMgAaUHwFd9DGZfgFi+rr4X0HoYzL9BsQUuYgB0vW/gPxWTCNQYopQwMLYIyKdBIaZIhJQC3xPMiJt+r0MjDFFIGCHfwGPAzIbeKnzx8CMAgKUAgfUl06gPgnIIGAicFN/vweqCwAxEjinPtgptUbXI0E6PZCwG/USxISgB5kEpNQ3tAedod3YCxBVYVM7JxCnbJMz9fZ7o5YHiMXAZ7VzDajIEhMJ8isIROV1jv2dBoanDLEO6ND9TwXZfxKQTEhj84B3irsOjE0BoATY5dhr6IinAqK46Zq7Vk+Bmf8AkQEOOe/g+hh1IkE64oAodjxwQ/EfgAU5QIwCzuse7cCKmPUiQX4qpizmDccBnxx7rksAMQW4q7pvgLkJ6qYHYi3R6cgP/VpX2xaj7hzgtercs1AmgVIDAZYBHxX7EJjls+fDQdMTqAFaFXcJGJ0EIi6I92QHmyxS6rLL6bC1yFEB9nwRmOaUDQd2OoZyJKidvILYJwecddxle7Y9i+z5rRN3B7jqZNS/BZTzfocEIEOypAwtTt5TE9FQhaaXdz9PV4LcDSgD1gJNsnbrYl9l700a7UxckO9+EJsoAl90/RYwNcGTs9OpGlgETAqJW6UOR+kZsDwRiBaqPc5qezTtHaNW9H1OR+8Bm4FKYIQOe94ANPup4oBMlqOgRXJDmgBOe3vVhnXLDUE5npOF1zuLdijIN8W80q99aefnCWKlA7EkS7l9kGcC7NuDWR4FgpxmYp4gypz9Ro/R5u+0tvoWUN+uWVbPuw0gBORArh6f4GuI906U5gCSAe4rpmdaJLsj7X1GlnZOqJ3NIR0NBFHMlu4IaAoDsR8eynWkDgU8Ujuz/gGkSjFPwkB6S93pDXAhJKZDeZ13nHS2AFbt2UBe+Sp9dPbP+QSxK35c3faBtJlCyZlalc61ct/h5WbjfddLfVPrYSFBjqsTDSExrYoZGlC+VeXHTKEErFYnmkO+2LQGgcgMHqi81hRKWhBfqCP1OYA0qKwl7rY8b7IfGhxX6rEtUIpyx79vAZaqjl3MV5piELDbgdkU8T0to5Hw8qxGUyxSGu9uFZq1YlfpA/pInW91UpIu/UctL59s08iEH8dYQ1qKZjpFTJ06a6daZ9q1M72va7UFf7EHZOLpD80syLzZFKcsAAAAAElFTkSuQmCC"
            />
            {isSidebarOpen && "Subscriptions"}
          </p>
        </div>
        <div className="border-b border-gray-700 p-1 my-1 ">
          {isSidebarOpen && (
            <p className="font-semibold flex items-center ">
              You
              <img
                className="ml-2 w-3"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAj0lEQVR4nO3asQ0CMRAF0W2CE/TfCQkSEEFAOYMsLiNG+rvM6+BrLjjLrpL0E8AZuANbdQZc+Xi2HgMcgMc+5gWcqiscEwrLhMIyobBMKMukskwqy6SyTKppZbb9uLzcqqsRQ/j+tI7VjSNSWCKFJVJYIoUlUlgiBf4AhsASIZhQYlnH0inX05cRDwakP/EGHbXP3xCyjY8AAAAASUVORK5CYII="
              />
            </p>
          )}
          <p className="flex items-center p-3 cursor-pointer hover:bg-[#272727] rounded-xl">
            <img
              className={`w-6 ${isSidebarOpen ? "mr-4" : "mr-0"}`}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFE0lEQVR4nO2ay29VVRTGL23BgkTbgi0gKL4iKOCLP4FEJKmIxoGgcWAUR9LWgRODJoao4ABD1TgxToxEJwK+U4114KMioAMtPoM8oinWxMQWKZefWfY7YXlz7jl7n56CGlZyc29y1rfW3mevtfZ63ErlLP1PCWgBbgY2A7uAr4EhYFQf+/0VsFM8ncD5lX8DAecA64C3gRPEk2HeAtaarMoZ2EAz0AMcdos6BnwAPAKsAa4GZom3Wb+XALeKpx/40+EPAV3Ge7o2cRPwnVvA58B6oLWArFZh9zh53wI3TvYpPOsUmvKVJcmeohe0z8nfVrq5AR3AbikYATYAjaUqGdfTBHQrOBgNAO1lCV+o4zYaBJbm8F8BbAT6gCPynT8UxZ4GLg7QeQ3wjXTa98IyTiLZxCfmsDn2/iJQzYlUvwN3Aefl6J4NfOo20z4Rn0jM6WNgZgbvXL3xZKEvyOYXATP0sYj1uAvTZj5b7VmG3JluMwOFfAZ4zpnTrBxH7XcR7KIcuXfr3jkuzIdZC2T8ZBIz643dxCrn2Hk+sVq8Q1kbTsEt0d1h9FAO77UuAISFZmA68L1ADwTwvyTentBNOKylKUYHAni7nb/kmxjwoLsnckMs8Kv4L4vYgzdLO0mjeQGh+Qvxbghx8MOhRwicmzh47CacjPckY0WEyR/KPBXgTjHuDlzEAvEfjFy/l2GZslFn4Akm6cwdWYzviunewEW0J28ocv1pOoPSHeB+8b+ZdaGd0E3cEii0UReghdIpkXtIZCT3z7JA/jZlzWOp9QxwiwS+H7mQn4S7MAbnfOy4FjY9Atdf1xyBp/RwY+RiXhNudQxO2BXCfhSJe1S4zWkPXy+yIGCTcJticMI+JuzWSNwa4XamPUzSgMURAhtckfVwzGJq3qwlpg0ROKs+jQbTHh7Vw5g0Y54wwxHrr5UxLBlzIzCWfxkNpT1M6udpEQKnKR+rhka6lEhZlYypkU0Po2OlbEQ464IgH1segVvu/DL9Tii4kcS02iKFXgf8IuwTEbgnhfnZZETqnJ1lWomzL4oRKuwNwu6LwCQJYNQmjICrspy9UPh10etgaKqh6tHoQJGMgFOX967SLkSHt+aa0Q9Zjq/WqvHkp+N1SA2+uhdioRTF4ae6+np/QG41EBOpPKmjWTdFiU4aM9L6agZP0mVZUFBHW2bSWJNS31dQSVJonczgOSmeGQV1rM8N2a6w2lNQidm/0WgGj504RUYK/LOwWptX6h4JjT51uoxGRzN4kvvq8gLyVwWVujXNB2soN0Uome+cfUcG3w7X9JsfIb8J+DI42tW0g7oC+Jda40z5UhJ+6zqyNfBc+B0RNrc6ZHweE94OqjnC0TQlqtWtI/+Z+P6OVMD2kOxZkeflmj7xXvWu5pTSoEtpme633MYJ3K7Ql9BvwDPWOYxScKqu2OZ6Y+gKeBW4XjwXuEZ6XMu0ThO7173BMbVxbi9jVKZs9jb5T/KSqnqZNgUo3sR2b8NOBCf8FeDKiS4+Zx7zfM2pWxXaMVHBlzrn/zGvqV0GActcQLBNXFKW4DkaGaDpU/ckjd4aFZ1GnDl1lK2k2QUAdMOWNn1Var/Xye+d1Nl7nfH0PQVr9hZha8fTKydn9emXZo9LZ1DHsE8tHpt7LFZG3aBPqyq7TvH0uakVmgJ0nbY/DKSYmyWa70zwLxzrzshfODLMxMZwW4A3NHscVhgd0+9BPdsi3kJ1z1mq/AfoL3hzLb7qNxrGAAAAAElFTkSuQmCC"
            />
            {isSidebarOpen && "Your Channel"}
          </p>
          {user._id ? (
            <div>
              <p className="flex items-center p-3 cursor-pointer hover:bg-[#272727] rounded-xl">
                <img
                  className={`w-6 ${isSidebarOpen ? "mr-4" : "mr-0"}`}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADsUlEQVR4nO2ayY9NQRjFy9hDRKPF0NiRNHb+A8QYUyd2hsSQEKy6g1VjZYGtjeGfIISYWZhFTN1mQQzRsaFjzk8+fW6Udt/t++6r9/p2OMlNbrqqTtXpqlv1faeec/8CgHPAVdfXgZCy7nBgMbAHOAo8AN4DX4Evem8HjqjOEmBELoQAVcAy4BjwneLxAzgBrARqKi4EqAaagZfeoD4DZ4Bt+m83apYG6bH3ySprBU4Bn7z2b4AtQG1FhADzgIfeAG4C62ygGfiHAquASx7fM1uiZROiWdjrdXgbmA/0C9TXDOCyx38w2Ox4pKOAK94S2gwMDNLJn/31B9YDH7zZbghBHCFaSo+BaUFGndxvo2bc8BSYVCqhj1vAuKwcGdoN0Y5meAFMKJbjr0GkwIXQQgy2JetQjpZZTbmFnO+JI9MA3K/2w4A7otnvegulCjHo/PkoqoWurwoxABtE9STVEtOBN8blT8gAC2BF15Lm4+oAOoHxpXYeUogBmCW6V3ZAu0IA1qriRRcIIYUYvNN/uSsE4HSPlXpfyBpRHk/a5r7qqcuxkDqFSZY2DIursFR9ngzVaTmEGJQuEBslAztVuMPlX8g20e6OK7T01NDUB4Q0ifZwXOF9FU7uA0KmiLY9rvCtCkcH7HBmJMTeA/KOFOe7uELbCQxVATu0/CXCo4C8VeL8HFdolo1hcKDOxmgrj/A8BG8aIRaaGOpdGBFt4vtmIoC5pfKmXVoPQnzs3US0hQxAIwBTkz52cwANi1xG2EbhJUHtQYyD5O33UFyh2ZiGVpfTmYgAbFc/u5JUnszrTEQAzhZcPWYoKxAzG3Ooy+FMeMFt4aBRlSL7ZXVshfg2myololvOdMwVglxxw6WCleLbbayECIPneCYmVtVKIw3TXc4AzNHYXvdoQABbVdkS/f4uJ6DLF47S3OY0DWpl7RvWuZyA39/i49SOo67QkCveWPZRpjvJOzWmBcU2tvsJ5IoHy+Ezbrd3NZZ9WQhqZRyjA6h8d3zJPtt5jeFGKSZ2g+4nDBdDRMZFzsQ5zyYdWyrhJE/MndCpcEIqe88TMTEUcYO3zD7KUA6+NdPl727yPuwbJc9EgfV6gN+4Zl5sQP7ZwHWPf1+5794XarojXJGNWZfxO1jrhR3ROVHcFlvi7LR44Uz3Hww0ae+vNw9AT73+1qQ6Zz3DA3E198buGMVmK8xQzvgTju/6+cfyxGuCSkLLxCKCXeYAKqzvkDvzRe9tKrM6i3rzoP0PV2b8BLokuGCBK+JKAAAAAElFTkSuQmCC"
                />
                {isSidebarOpen && "History"}
              </p>
              <p className="flex items-center p-3 cursor-pointer hover:bg-[#272727] rounded-xl">
                <img
                  className={`w-6 ${isSidebarOpen ? "mr-4" : "mr-0"}`}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABVklEQVR4nO2WMU4DMRBFBwkJWmiQ0lPRUHEB7kHJIai4Qo4QGiSOgECio4cbkI6WDgSPIhvJFF6cnRmtvZnXRJnYk/9ke9ciQRBsBI0gWycihXUv0OYIkVpXJId1YLccaBvUJiKFdS/Q5giRWlckh3VgtxxoG9QmIoV1L9Dm0DQAboEH4Gzz6HY5LETW/AALYNY33iuHem8mwz67zw/gCtjvm2edw1LkGLhLvi+BC2Cnb76LSGm9bwxwDrwk//8EnDZzRuRvbRe4BN67n7+BG+CoKZE1wAEwB76S83MN7ImnSI6Suf+MOQHuk5bP1jmmKSLDQmbHAIejbC0xEpnEYWf1+H0d9fGbY+AL8W20F2KO5q4oUliv/tIoAxp02+mx+Wu8JViJDN6bRmB1RiYjIoV1L9DmCJFaVySHdWC3HGgb1CYihXUv0OYIkVpXpHZka0SCIJCUX9V5vUC681s8AAAAAElFTkSuQmCC"
                />
                {isSidebarOpen && "Your Videos"}
              </p>
              <p className="flex items-center p-3 cursor-pointer hover:bg-[#272727] rounded-xl">
                <img
                  className={`w-6 ${isSidebarOpen ? "mr-4" : "mr-0"}`}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEO0lEQVR4nO2ayYtVRxTGn7baLRq1BweCkATcSEs7gEvdRY3acdhp0lkpunCidesAumiHTQKif4Bg1gniEKK0JCZOiWJI1FY3aiOkE8jCoXH4ydGvsGjvve+9W3X7GekDFx6vqr7vq1vDqTrnlkpD9p4a0AQsB/YDx4DrwL9Avx77/ZfKrM4yoLH0LhjQAHQAp4DnVG/PgJPAl0B9LTowGtgK9HqingCnge0amen2xoGRehr1n5XtAM6ojbP7QKe9nMHqxBLgtifgIrAGGJ8DawKwFrjk4d0CPit6Gh32CC8DCyLiLwJ+9/APRh8dYIqEmz0ENgJ1UUle89QBm4FH3mhPjgX+iYYb7TozogBnc7YBN8TZYxpCASd6gBeAlmhqy3M3Aj+J29bklJA14abTOWBMdLXlNYwBfvWmWfVrxlvYNp2aClGa7FQvAme9/5q9WXEwzxbrFnbha8J7+7+4aZywZtwGsKgaZ+f8xMaihA/gHAWcEOcd4MOEOlu8xV9+igHbPD8RfYtN4BsOfCvOB8C0lHojgCuqt6UcaL2OCmafFiV+AOfX4vsPmFOm7mLV7c0cFR3eXu0QRYhO4NsjPpv/8yqoP8zbSVdnVfxBldbEFp3AtcE7Aa+sot06tTuetfU904m06gNgNQZ8BbzQ05HDUfYDTxN1AivU0x9jik7gaZcIs86cGN1q355UeECF22MIThEw3/MHuwNwdgljX1KhXUHNPg8VnELepuuu2aFArBXC+S6p8KYKp4eQDHBye7VV3vc6cdR8RyB2q7CuJxX2qbA5hMTD6+Jtu2YdjIDdIry/kwptJyAGkfCcY/Xtn0jY9cJ7UquO9A5GR/oGYWrtjYTdkjW1iljsXRoZF/PqioTdmrXY3fa7LAbZAOzZ6sxj4KMIeCuztl/nEHeEEqWQHxH+kQhYu7IcokUAzU6HEqWQT9WN085XcwOxuqV1adphzB0aJ4QQVbABdAdgNHmHxnFplSygbLY2RHCGiA90CzRbnhNjvdofy6r0hSpdChFc4T3kjxxthwG/qf2qcrEs58gWhopO4RipwNuZHG2XSNvdsmkIhfZRzwsPPlRqvA4+XJW2TZU0aPBivZtL74jx5gXfqDgpZPkJNbJLUFvhKsvrmSVnStWpDOUn3BuIcv4KCKT3SMs3eQAaFIdFgeRaBLHHAuel4XzuPKPehmVnXVphYnS12Y7vZ3HfCk74KNHT402zmdHUZq+JHnHaqfzjWMCTvWn2SAHlEVHA395iO72FbdNpUmySBm8DQAHlKNlXeWxzds5PvFrYhebelX11w45isevyfMWgdbDeO3a4qRQtW1zJ6Nj0uscb69fxeqfiTq3KNo3SY79n6FK0U3VdnMAdOzbV6gsICwKstoCyrgDV2lPdTFfVpANJZgFlxXX3Ad8r99jnfVRjv/+066nqtKfeJ4as9P+3l60r15YimrWAAAAAAElFTkSuQmCC"
                />
                {isSidebarOpen && "Watch later"}
              </p>
              <p className="flex items-center p-3 cursor-pointer hover:bg-[#272727] rounded-xl">
                <img
                  className={`w-6 ${isSidebarOpen ? "mr-4" : "mr-0"}`}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACs0lEQVR4nO2ZTYhNYRjH3zFNGIzmNo1GUT4WiBoWPlNYS1mMLGZlwYLCkrCzEGqmKCxGsbBiQVkYpCwkNWWKGfkoZOQzY8i3n97mf+t0594zR+e54z06/zqb8z79///n3vfjOc/rXI4cOcYcwESgA3gLDAAngEaXJQC1wBVG4iFQcFkBcFDGXwCtwHzgrt4dcVkAsA74BfwAlkfer1Iij13oAJr0L3jsLRmbrPdfXMgAaoBLMnsNGFcy7qeYxwMXMoCdMvoamF5m/KjGj7lQASwGvgK/gfVlxuuBd0pkiQsRwCSgTyY7KsRs1fhNFyqA0zLZC0yoEFPceje5EAG0yeAnYF6FmDWRM6XOhQZgNjAok1ti4s4rZp8LDUAdcFsGz8XEzQJ++rMDaHahATikJJ7GFYJAp+JOudDA8JwvliArYuIaNPX8lrzAhQSgGXipX3lPwgOyHPzm8D7mGQBu+TLHlzbVKEEuy8jV0hKkTHw78J30uA9Ms0xke6QEaUl5gDaO8swANgD3pHnWKokC8EGkG01Ik+nOleagFeFuEXabECbXbSyuKSvCbhG2mRAm110k3X4rwlciHFGeVxPA6sgut82C0J/OHrUmDpPrjgeOR/TTFZ3FfdDM4d/r75CFO1lPpGCy6ANIZJksPM9sIgx3ZnpkoTPLifRK/knqlus/TuSi5L/FVdtZSKQGOCwL17O+2Jv+l11roSw8S0v0UURTzNwl154ZWfBdacn6RdRq5jCZbjvwObJrpav1gJMi22/mMplul3R7TLowuvMofh02mLhMprtUun2WpP6qADXcYr/XDTXrze9UgDm62PS4AEw1Ix+9JfvImnhlJJk3wAF/TWDdsgFa/IdUpCW7y5I/2vP17aCxwpmqTmVgre7Ofd9pyNj8EHAD2Fy1BHLkyOEyiz+lhVxrUBoKtwAAAABJRU5ErkJggg=="
                />
                {isSidebarOpen && "Liked Videos"}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        {isSidebarOpen && (
          <div className="border-b border-gray-700 p-1 my-1 ">
            <p className="font-semibold flex items-center">
              Subscriptions
              <img
                className="ml-2 w-3"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAj0lEQVR4nO3asQ0CMRAF0W2CE/TfCQkSEEFAOYMsLiNG+rvM6+BrLjjLrpL0E8AZuANbdQZc+Xi2HgMcgMc+5gWcqiscEwrLhMIyobBMKMukskwqy6SyTKppZbb9uLzcqqsRQ/j+tI7VjSNSWCKFJVJYIoUlUlgiBf4AhsASIZhQYlnH0inX05cRDwakP/EGHbXP3xCyjY8AAAAASUVORK5CYII="
              />
            </p>
          
            {subscriptions &&
            subscriptions.map((sub) => (
              <div
                key={sub._id}
                className="flex flex-row w-full p-2 items-center"
              >
                <img
                  className="w-9 rounded-full mr-2"
                  src={sub.channeldetails.avatar}
                  alt="photo"
                />
                <p>{sub.channeldetails.username}</p>
              </div>
            ))
            }
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
