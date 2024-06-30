import NavbarDropdown from "./NavbarDropdown";
import NavBtn from "./NavBtn";
import useHandleMouseHover from "./hooks/useHandleMouseHover";
import { NavTag } from "../../utils/types";

const NavbarTag = ({ tag, subtags }: NavTag) => {
  const { handleMouseEnter, handleMouseLeave, showDropdown, gradient } =
    useHandleMouseHover();

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <NavBtn tag={tag} gradient={gradient} />
      <NavbarDropdown show={showDropdown} subtags={subtags} tag={tag} />
    </li>
  );
};
export default NavbarTag;
