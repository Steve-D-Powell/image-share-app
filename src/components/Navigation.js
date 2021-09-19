import { NavLink } from "react-router-dom";
import { isEmptyArray } from "../functions/helperFunctions";
import apodNavIcon from "../images/apodNavIcon.png";
import likesNavIcon from "../images/likesNavIcon.png";
import luckyNavIcon from "../images/luckyNavIcon.png";
import marsNavIcon from "../images/marsNavIcon.png";
import "../css/nav.css";

const Navigation = ({ links }) => {
  console.log("Nav Rendered");
  const likedIds = window.localStorage.getItem("favorites-ids");
  const noLikes = likedIds === null || isEmptyArray(likedIds) ? true : false;
  const icons = {
    "Mars Rover Gallery": marsNavIcon,
    "Pic of the Day Gallery": apodNavIcon,
    "Feeling Lucky Gallery": luckyNavIcon,
    "Liked Gallery": likesNavIcon,
  };

  const showText = (event) => {
    const hoverNode = event.target.closest(".link-hover");
    const textNode = document.querySelector(
      `.nav-text[data-text="${hoverNode.dataset.text}"]`
    );
    const previous = document.querySelector(".typing-text");
    if (previous) {
      previous.classList.remove("typing-text").classList.add("hide");
    }

    textNode.classList.remove("hide");
    textNode.classList.add("typing-text");
  };

  const hideText = (event) => {
    const hoverNode = event.target.closest(".link-hover");
    const textNode = document.querySelector(
      `.nav-text[data-text="${hoverNode.dataset.text}"]`
    );
    textNode.classList.remove("typing-text");
    textNode.classList.add("hide");
  };

  const removeErrorScreen = () => {
    const galleryNode = document.querySelector(".gallery-has-error");

    if (galleryNode) {
      document.querySelector(".error-image").classList.add("hide");
      galleryNode.style.display = "block";
      galleryNode.classList.remove("gallery-has-error");
      document.querySelector(".gallery-loading-container").style.display =
        "block";
    }
  };

  const linkValidation = (obj, index) => {
    if (obj.hide) {
      return;
    } else {
      return (
        <NavLink key={index} to={obj.link}>
          <div
            className="nav-icon link-hover"
            data-text={obj.name}
            onMouseEnter={showText}
            onMouseLeave={hideText}
            onClick={removeErrorScreen}
          >
            <img src={icons[obj.name]} alt={obj.name} width="48" />
          </div>
        </NavLink>
      );
    }
  };

  return (
    <div className="main-nav--wrapper">
      <div className="main-nav--links">
        {links.map((obj, index) => {
          return linkValidation(obj, index);
        })}
      </div>
      <div className="main-nav--text">
        <span>Navigate to:</span>
        <div
          data-text="Mars Rover Gallery"
          className="nav-text hide"
          style={{ width: "16ch" }}
        >
          Mars Rover Gallery
        </div>
        <div
          data-text="Pic of the Day Gallery"
          className="nav-text hide"
          style={{ width: "18ch" }}
        >
          Pic of the Day Gallery
        </div>
        <div
          data-text="Feeling Lucky Gallery"
          className="nav-text hide"
          style={{ width: "18ch" }}
        >
          Feeling Lucky Gallery
        </div>
        <div
          data-text="Liked Gallery"
          className="nav-text hide"
          style={{ width: "11ch" }}
        >
          Liked Gallery
        </div>
        <div className="blinking-cursor"></div>
      </div>
    </div>
  );
};

export default Navigation;
