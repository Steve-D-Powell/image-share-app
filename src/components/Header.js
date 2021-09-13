import React, { useState, useEffect } from "react";
import "../css/Header.css";

const Header = (props) => {
  const [imageOfTheDay, setImageOfTheDay] = useState({
    url: "/images/stars.jpg",
  });
  const [headerIsLoaded, setHeaderIsLoaded] = useState(false);

  useEffect(() => {
    if (headerIsLoaded) {
      setTimeout(() => {
        document
          .querySelector(".loading-screen--container")
          .classList.add("hide");
        document.querySelector("body").style.overflow = "scroll";
      }, 1000);
    }
  }, [headerIsLoaded]);

  useEffect(() => {
    console.log("Updated the Header Image");
    async function getImageOfTheDay() {
      try {
        const response = await fetch(
          "https://api.nasa.gov/planetary/apod?api_key=KnTfeP68Y6KMuMuhCMWSxjlYXsqjgoCWUo8chunG"
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return await response.json();
      } catch (err) {
        console.log(err);
      }
    }
    getImageOfTheDay().then((data) => {
      if (data !== undefined) {
        setImageOfTheDay(data);
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
    <header className="App-header">
      <div className="header-hero" style={styles.headerHero}>
        <div className="header-hero--text-container">
          <img
            className="header-hero--text-container_logo"
            src="/images/nasa-logo.png"
            alt="Nasa Logo"
          />
          <div className="header-hero--text_text">
            <span>Images From Space</span>
          </div>
        </div>
        <div className="header-hero--text-container_bg">
          <div className="header-hero--text-container_bg-bar"></div>
        </div>
        <div className="header-hero--text-container_note">
          <span>
            {imageOfTheDay.title} - {imageOfTheDay.date}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
