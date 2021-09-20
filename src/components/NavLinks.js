import { NavLink } from "react-router-dom";
import apodNavIcon from "../images/apodNavIcon.png";
import likesNavIcon from "../images/likesNavIcon.png";
import luckyNavIcon from "../images/luckyNavIcon.png";
import marsNavIcon from "../images/marsNavIcon.png";

const NavLinks = ({ links, menuClass, isMobile }) => {
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
        <NavLink key={index} to={obj.link}>
          <div
            className="nav-icon"
            data-text={obj.name}
            onClick={removeErrorScreen}
            onTouchEnd={closeMobileMenu}
          >
            <img src={icons[obj.name]} alt={obj.name} width="60" />
            <div>
              <span>{obj.name}</span>
            </div>
          </div>
        </NavLink>
      );
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

  const linkValidation = (obj, index) => {
    if (obj.hide) {
      return;
    } else {
      return checkisMobile(obj, index);
    }
  };

  return (
    <div className={menuClass}>
      {links.map((obj, index) => {
        return linkValidation(obj, index);
      })}
    </div>
  );
};

export default NavLinks;
