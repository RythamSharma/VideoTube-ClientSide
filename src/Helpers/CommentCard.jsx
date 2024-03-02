import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

function CommentCard(props) {
  const [user, setUser] = useState({});
  const[liked,setLiked]=useState(false);
  function calculateDaysAgo(createdAt) {
    const currentDate = new Date();
    const videoDate = new Date(createdAt);
    const timeDifference = currentDate - videoDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo;
  }
  const togglelike = ()=>{
    setLiked((prev)=>!prev)
  }
  const daysAgo = calculateDaysAgo(props.createdAt);
  const getuser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/getuser",
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
  useEffect(() => {
    getuser();
  }, []);
  return (
    <>
      <div className="text-white flex flex-row  my-4">
        <div>
          <img className="w-9 rounded-full" src={user.avatar} alt="" />
        </div>
        <div className="flex flex-col ml-2 w-[90%]">
          <div className="font-semibold">
            {user.username}{" "}
            <span className="font-normal text-gray-500 text-xs">
              {" "}
              {daysAgo} days ago
            </span>{" "}
          </div>
          <div>{props.content}</div>
          <div className="mt-2">
            <button className="" onClick={togglelike}>
              {liked?(
                <img className="w-6" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABi0lEQVR4nO3Zu2oVURSA4SVqJVpEUWuJhVUKa0FR+1TiMwgiaOsLWGgTRLQxja9g5wXB+ASKEdQENILgJUeCdz8ZOIUonsxh9jmzZzMfTD9/McNae0f0er2pw05cwzu8xk3siy7Bdjz0rxfYHV2BS/7vSnQBTuLniJDnkTvsxRujfYmcYQtu29zLyBnOq+dq5AqH8bVmyFzkCDvwtGbEvcgVFtU3HznCqTEiVrA1coMDWB8j5ELkBtuwNEbEBmaiYyNIN365OLrJCPK3XzgUGY4ga5r7gPcjnlU8wkXsamsESW0Z+1OGnNGeW6kiZvCxxZDBtAfCSVlPFXKn5ZDlVCFvWw75hnMpQn7Iw3zTkFwslRLyqZSQV6WEXC4hZLVaq0sI+Y5jJYRUHpQSslFKyErTkIE8LDQNqXsAN+kFa0/TkBstRzxOctuFE0WM8RXcbzHkc6SCg8OLzTY8SxYyjDnSUszZpCHDmFncnWLEYnUUlTzkj6DjuI4n1Z6Q+OUHw2/y9MQCer1edNZvHJ3eD3RXlmQAAAAASUVORK5CYII="></img>
              ):(

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
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentCard;
