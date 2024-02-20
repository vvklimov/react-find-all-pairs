import NavbarDropdown from "./NavbarDropdown";
import NavBtn from "./NavBtn";
import useHandleMouseHover from "./hooks/useHandleMouseHover";

const NavbarTag = ({ tag, subtags }) => {
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
