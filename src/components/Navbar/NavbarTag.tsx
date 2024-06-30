import { NavbarDropdown, useHandleMouseHover, NavBtn } from "@/components";
import { type NavTag } from "@/utils";

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
