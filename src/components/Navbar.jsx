import Logo from "../assets/images/logo.png";
import { useSidebarContext } from "../context/sidebar_context";
import { navTags } from "../utils/data";
import { NavbarTag } from "./";

const Navbar = () => {
  const { setShowSidebar } = useSidebarContext();
  return (
    <nav className="nav">
      <div className="nav-center">
        <div className="nav-header">
          <img src={Logo} className="nav-logo" alt="logo" />
          <button
            className="btn toggle-btn"
            onClick={() => {
              setShowSidebar(true);
            }}
          >
            menu
          </button>
          <button className="btn new-game-btn navbar-new-game-btn">
            new game
          </button>
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
