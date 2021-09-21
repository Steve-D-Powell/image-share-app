import { NavLink } from "react-router-dom";
import apodNavIcon from "../images/apodNavIcon.png";
import likesNavIcon from "../images/likesNavIcon.png";
import luckyNavIcon from "../images/luckyNavIcon.png";
import marsNavIcon from "../images/marsNavIcon.png";

const NavLinks = ({ links, menuClass, isMobile, clickXhandler }) => {
  const icons = {
    "Mars Rover Gallery": marsNavIcon,
    "Pic of the Day Gallery": apodNavIcon,
    "Feeling Lucky Gallery": luckyNavIcon,
    "Liked Gallery": likesNavIcon,
  };

  const showText = (event) => {
    const hoverNode = event.target.closest(".link-hover");
    const selectNode = event.target;
    const textNode = document.querySelector(
      `.nav-text[data-text="${hoverNode.dataset.text}"]`
    );
    const previous = document.querySelector(".typing-text");
    if (previous) {
      previous.classList.remove("typing-text").classList.add("hide");
    }

    textNode.classList.remove("hide");
    selectNode.classList.add("hovering");
    textNode.classList.add("typing-text");
  };

  const hideText = (event) => {
    const hoverNode = event.target.closest(".link-hover");
    const selectNode = event.target;
    const textNode = document.querySelector(
      `.nav-text[data-text="${hoverNode.dataset.text}"]`
    );

    textNode.classList.remove("typing-text");
    selectNode.classList.remove("hovering");
    textNode.classList.add("hide");
  };

  const handleClick = (event) => {
    const galleryNode = document.querySelector(".gallery-has-error");
    const target = event.target.closest(".mobile-nav--links");
    document.querySelector(".rocket-icon").classList.add("hidden");

    if (galleryNode) {
      document.querySelector(".error-image").classList.add("hide");
      galleryNode.style.display = "block";
      galleryNode.classList.remove("gallery-has-error");
      document.querySelector(".gallery-loading-container").style.display =
        "block";
    }
    if (target !== null) {
      closeMobileMenu();
    }
  };

  const closeMobileMenu = () => {
    const menu = document.querySelector(".mobile-nav--container");
    menu.classList.add("flying");
    menu.classList.remove("open");
    setTimeout(() => {
      menu.classList.add("gone");
      menu.classList.remove("flying");
    }, 1500);

    setTimeout(() => {
      menu.classList.remove("gone");
    }, 1800);
    document.body.style.overflow = "scroll";
  };

  const checkisMobile = (obj, index) => {
    if (isMobile) {
      return (
        <NavLink
          activeClassName="nav-link-selected"
          className="nav-link"
          key={index}
          to={obj.link}
          onClick={handleClick}
        >
          <div className="nav-icon" data-text={obj.name}>
            <div className="nav-icon--wrapper">
              <img src={icons[obj.name]} alt={obj.name} width="60" />
            </div>
            <div>
              <span>{obj.name}</span>
            </div>
          </div>
        </NavLink>
      );
    } else {
      return (
        <NavLink
          activeClassName="nav-link-selected"
          className="nav-link"
          key={index}
          to={obj.link}
          onClick={handleClick}
        >
          <div
            className="nav-icon link-hover"
            data-text={obj.name}
            onMouseEnter={showText}
            onMouseLeave={hideText}
          >
            <img src={icons[obj.name]} alt={obj.name} width="48" />
          </div>
        </NavLink>
      );
    }
  };

  const linkValidation = (obj, index) => {
    if (obj.hide) {
      return;
    } else {
      return checkisMobile(obj, index);
    }
  };

  return (
    <>
      <div className="nav-links-title" data-text="Navigation">
        Navigation
      </div>
      <div className={menuClass}>
        <span className="close-mobile-nav" onClick={clickXhandler}>
          EXIT
        </span>
        {links.map((obj, index) => {
          return linkValidation(obj, index);
        })}
      </div>
    </>
  );
};

export default NavLinks;
