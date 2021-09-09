import React from "react";
import "../css/Header.css";
import NasaLogo from "../images/nasa-logo.png";

const Header = (props) => {
  const imageUrl = props.imageOfTheDay.url;

  const styles = {
    headerHero: {
      backgroundImage: `url(${imageUrl}`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  };

  return (
    <header className="App-header">
      <div className="header-hero" style={styles.headerHero}>
        <div className="header-hero--text-container">
          <img className="header-hero--text-container_logo" src={NasaLogo} />
          <div className="header-hero--text_text">
            <span>Images From Space</span>
          </div>
        </div>
        <div className="header-hero--text-container_bg">
          <div className="header-hero--text-container_bg-bar"></div>
        </div>
        <div className="header-hero--text-container_note">
          <span>
            {props.imageOfTheDay.title} - {props.imageOfTheDay.date}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
