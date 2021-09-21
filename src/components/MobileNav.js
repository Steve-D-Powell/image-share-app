import NavLinks from "./NavLinks";
import "../css/mobileNav.css";
import rocketClouds from "../images/rocketClouds.png";
import rocketCloudsMedium from "../images/rocketCloudsMedium.png";
import rocketCloudsSmall from "../images/rocketCloudsSmall.png";
import rocketIcon from "../images/rocketIcon.png";
import useLocalStorageState from "../hooks/localStorageState";

const MobileNav = ({ links }) => {
  const [bounce, setBounce] = useLocalStorageState("bounce", "rocket-bounce");
  const openMenu = (menu) => {
    menu.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = (menu) => {
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

  const clickHandler = () => {
    const menu = document.querySelector(".mobile-nav--container");
    const menuOpen = document.querySelector(".mobile-nav--container.open");
    setBounce("", "rocket-bounce");
    menu.style.height = "menuHeight";
    menuOpen === null ? openMenu(menu) : closeMenu(menu);
  };

  return (
    <div className="mobile-nav--container">
      <img className="rocket-smoke" src={rocketClouds} alt="rocket clouds" />
      <img
        className="rocket-smoke-medium"
        src={rocketCloudsMedium}
        alt="rocket clouds"
      />
      <img
        className="rocket-smoke-small"
        src={rocketCloudsSmall}
        alt="rocket clouds"
      />
      <div className="mobile-nav--container__inner">
        <div className={`rocket-icon ${bounce}`} onClick={clickHandler}>
          <img src={rocketIcon} alt="Rocket Icon" width="75px" />
        </div>
        <div className="mobile-nav--content">
          <NavLinks
            links={links}
            menuClass="mobile-nav--links navigation-links"
            isMobile={true}
            closeMenu={closeMenu}
            clickXhandler={clickHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
