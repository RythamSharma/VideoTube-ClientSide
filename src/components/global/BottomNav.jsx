import React from "react";

function BottomNav({ setChoice }) {
  return (
    <div className="fixed bottom-0 z-20  text-white bg-black right-0 left-0 p-2">
      <ul className="flex flex-row justify-around items-center">
        <li
          className="flex flex-col items-center cursor-pointer "
          onClick={() => {
            setChoice("home");
          }}
        >
          <img
            className="w-7"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACBElEQVR4nO3Yz4tNYRzH8WP8SGkUohRSJEWa2VjajTJloSwsFAv5C8gsLW0trSyt2MmQsrCQ2flRkliInd+RezFeOpwZT8/cO9177rnHmTzvunXrPM/n8/me832e8yPLEonEUMABPMbz/H+2lMBpfPOX7ziXNR2sxmXduYI1WRPBTjyIAt8rfiH5mB1Zk8Ak3kVBL2EVVuBCdOwjjjQh+LK8tzEbhGvhVIexx/ElGPezKGzkX4Vfi2vRmX2J/YvMGcOLaM51rKs7/G48iYLcwaYe5m7AzWjuM+yrK/wxfI5a4WLe631oLMf5qPW+4uQwg3dajJ9wdADNw3jfYfGvrDr8RtyOjJ5iTwXau4o7dshdbK4q/DheRQZXMVqJQfbbY7TQDMk9xwcVHov29x+YyrfPqsJHW/JU4THH29KLO+9DPArE3mCilFh/vhOF1xwPS62JfEcIRD5U0e99eO8t7tZznCgjEu7VZ4aSdBFwNvC/UUbgdSCwLasZbA8XdBmB8CZT+/MKRgL/2TIC8wwl4bAzSAUMjnQFCv6bK+DPq+UM2hbSLo4damQBOFi8G/TCZBMLmNE795tYQDuYsuAdF+uD460mFjBPnZpZnWapgH5IV6ADqYX6IbVQB1IL9UOXB7JeaNWp2RXcKmk2XadmV7C1+LTS61nLx01jS52aiUQiW9r8AhvTeS7acGUAAAAAAElFTkSuQmCC"
            alt=""
          />
          <p>Home</p>
        </li>
        <li className="flex flex-col items-center cursor-pointer">
          <img
            className="w-6"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA4UlEQVR4nO3XsQ2CUBSF4VvpBE5h4wx2DuAszmJn5RIkFjCApYYhHMDmNxhpDCaYJ4975XwtyX05Oe9CMBMReQfMgCvDqyxDkEuGIOWgQWQi+zDs3pBvH/oqf96W5ACciKfqChKSfQpiQaAgzqBGnEGNOIMa6Qk4AhuL3ghwfo0qgGXqPA9BGndgDyxS544dpHUDdsA8df7YQVo1sE09w0OQVvPLsEo856n/g+8PmESQOvrVukVf9vs/vH6L6B/EA7BOnTN6kFxQEGdQI86gRpxhMo1EYx1BKuIpM10AETEnHmo3wltDHUm6AAAAAElFTkSuQmCC"
          />
          <p>Library</p>
        </li>
        <li
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            setChoice("you");
          }}
        >
          <img
            className="w-7"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFE0lEQVR4nO2ay29VVRTGL23BgkTbgi0gKL4iKOCLP4FEJKmIxoGgcWAUR9LWgRODJoao4ABD1TgxToxEJwK+U4114KMioAMtPoM8oinWxMQWKZefWfY7YXlz7jl7n56CGlZyc29y1rfW3mevtfZ63ErlLP1PCWgBbgY2A7uAr4EhYFQf+/0VsFM8ncD5lX8DAecA64C3gRPEk2HeAtaarMoZ2EAz0AMcdos6BnwAPAKsAa4GZom3Wb+XALeKpx/40+EPAV3Ge7o2cRPwnVvA58B6oLWArFZh9zh53wI3TvYpPOsUmvKVJcmeohe0z8nfVrq5AR3AbikYATYAjaUqGdfTBHQrOBgNAO1lCV+o4zYaBJbm8F8BbAT6gCPynT8UxZ4GLg7QeQ3wjXTa98IyTiLZxCfmsDn2/iJQzYlUvwN3Aefl6J4NfOo20z4Rn0jM6WNgZgbvXL3xZKEvyOYXATP0sYj1uAvTZj5b7VmG3JluMwOFfAZ4zpnTrBxH7XcR7KIcuXfr3jkuzIdZC2T8ZBIz643dxCrn2Hk+sVq8Q1kbTsEt0d1h9FAO77UuAISFZmA68L1ADwTwvyTentBNOKylKUYHAni7nb/kmxjwoLsnckMs8Kv4L4vYgzdLO0mjeQGh+Qvxbghx8MOhRwicmzh47CacjPckY0WEyR/KPBXgTjHuDlzEAvEfjFy/l2GZslFn4Akm6cwdWYzviunewEW0J28ocv1pOoPSHeB+8b+ZdaGd0E3cEii0UReghdIpkXtIZCT3z7JA/jZlzWOp9QxwiwS+H7mQn4S7MAbnfOy4FjY9Atdf1xyBp/RwY+RiXhNudQxO2BXCfhSJe1S4zWkPXy+yIGCTcJticMI+JuzWSNwa4XamPUzSgMURAhtckfVwzGJq3qwlpg0ROKs+jQbTHh7Vw5g0Y54wwxHrr5UxLBlzIzCWfxkNpT1M6udpEQKnKR+rhka6lEhZlYypkU0Po2OlbEQ464IgH1segVvu/DL9Tii4kcS02iKFXgf8IuwTEbgnhfnZZETqnJ1lWomzL4oRKuwNwu6LwCQJYNQmjICrspy9UPh10etgaKqh6tHoQJGMgFOX967SLkSHt+aa0Q9Zjq/WqvHkp+N1SA2+uhdioRTF4ae6+np/QG41EBOpPKmjWTdFiU4aM9L6agZP0mVZUFBHW2bSWJNS31dQSVJonczgOSmeGQV1rM8N2a6w2lNQidm/0WgGj504RUYK/LOwWptX6h4JjT51uoxGRzN4kvvq8gLyVwWVujXNB2soN0Uome+cfUcG3w7X9JsfIb8J+DI42tW0g7oC+Jda40z5UhJ+6zqyNfBc+B0RNrc6ZHweE94OqjnC0TQlqtWtI/+Z+P6OVMD2kOxZkeflmj7xXvWu5pTSoEtpme633MYJ3K7Ql9BvwDPWOYxScKqu2OZ6Y+gKeBW4XjwXuEZ6XMu0ThO7173BMbVxbi9jVKZs9jb5T/KSqnqZNgUo3sR2b8NOBCf8FeDKiS4+Zx7zfM2pWxXaMVHBlzrn/zGvqV0GActcQLBNXFKW4DkaGaDpU/ckjd4aFZ1GnDl1lK2k2QUAdMOWNn1Var/Xye+d1Nl7nfH0PQVr9hZha8fTKydn9emXZo9LZ1DHsE8tHpt7LFZG3aBPqyq7TvH0uakVmgJ0nbY/DKSYmyWa70zwLxzrzshfODLMxMZwW4A3NHscVhgd0+9BPdsi3kJ1z1mq/AfoL3hzLb7qNxrGAAAAAElFTkSuQmCC"
            alt=""
          />
          <p>Profile</p>
        </li>
      </ul>
    </div>
  );
}

export default BottomNav;
