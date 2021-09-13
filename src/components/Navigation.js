import { NavLink } from "react-router-dom";

const Navigation = ({ links }) => {
  return (
    <div className="main-nav">
      <ul>
        {links.map((obj, index) => {
          return (
            <NavLink key={index} to={obj.link}>
              {obj.name}
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};

export default Navigation;
