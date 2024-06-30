import { navTags } from "../../utils/data";
import NavbarTag from "./NavbarTag";
import Logo from "./Logo";
import ShowMenuButton from "./ShowMenuBtn";
import ShowGameMenuBtn from "./ShowGameMenuBtn";
const Navbar = () => {
  return (
    <nav className="nav center-items">
      <div className="nav-center">
        <div className="nav-header" onDragStart={(e) => e.preventDefault()}>
          <Logo />
          <ShowMenuButton />
          <ShowGameMenuBtn />
        </div>
        <ul className="nav-tags">
          {navTags.map((item) => {
            return <NavbarTag key={item.tag} {...item} />;
          })}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
