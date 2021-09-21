import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import "../css/home.css";
import starsImg from "../images/stars.jpg";
import Loading from "./Loading";
import nasaLogo from "../images/nasa-logo.png";

const Home = ({ links }) => {
  const [imageOfTheDay, setImageOfTheDay] = useState({
    url: starsImg,
  });
  const [headerIsLoaded, setHeaderIsLoaded] = useState(true);

  useEffect(() => {
    if (headerIsLoaded) {
      setTimeout(() => {
        document
          .querySelector(".gallery-loading-container")
          .classList.add("ghost");
      }, 1000);
      setTimeout(() => {
        document
          .querySelector(".gallery-loading-container")
          .classList.add("hide");
      }, 2100);
    }
  }, [headerIsLoaded]);

  useEffect(() => {
    async function getImageOfTheDay() {
      try {
        const response = await fetch(
          "https://api.nasa.gov/planetary/apod?api_key=KnTfeP68Y6KMuMuhCMWSxjlYXsqjgoCWUo8chunG"
        );
        if (!response.ok) {
          document
            .querySelector(".gallery-loading-container")
            .classList.remove("home");
          throw new Error(response.statusText);
        }
        return await response.json();
      } catch (err) {
        console.log(err);
      }
    }
    getImageOfTheDay().then((data) => {
      if (data !== undefined) {
        if (data.media_type !== "video") {
          setImageOfTheDay(data);
        }
        setHeaderIsLoaded(true);
      }
    });
  }, []);

  const styles = {
    headerHero: {
      backgroundImage: `url(${imageOfTheDay.url}`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  };

  return (
    <div className="home-container">
      <Loading homeLoading="home" />
      <div className="main-nav--container">
        <Navigation links={links} />
        <div className="main-nav--logo">
          <span className="left-text">Images from Space</span>
          <img src={nasaLogo} width="100px" />
          <span className="right-text">Images from Space</span>
        </div>
      </div>
      <div className="home-image-container" style={styles.headerHero}>
        <div className="home-image-container--text-container_note">
          <span>
            {imageOfTheDay.title} - {imageOfTheDay.date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
