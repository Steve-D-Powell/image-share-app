import NavLinks from "./NavLinks";
import "../css/nav.css";

const Navigation = ({ links }) => {
  return (
    <div className="main-nav--wrapper">
      <NavLinks
        links={links}
        menuClass="main-nav--links navigation-links"
        isMobile={false}
      />
      <div className="main-nav--text">
        <span>Destination:</span>
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
