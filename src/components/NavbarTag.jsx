import { useState } from "react";
import Submenu from "./Submenu";

const NavbarTag = ({ tag, subtags }) => {
  const [show, setShow] = useState(false);
  const [gradient, setGradient] = useState(false);
  return (
    <li
      onMouseOver={() => {
        setShow(true);
        setGradient(true);
      }}
      onMouseOut={() => {
        setShow(false);
        setGradient(false);
      }}
    >
      <button
        className={`tag-btn tag-btn-gradient nav-btn ${
          gradient ? "gradient-hover-effect" : ""
        }`}
      >
        {tag}
      </button>
      <Submenu key={tag} show={show} subtags={subtags} tag={tag} />
    </li>
  );
};
export default NavbarTag;
