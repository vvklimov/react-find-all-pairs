import { useDispatch } from "react-redux";
import Logo from "../assets/images/logo.png";

import { navTags } from "../utils/data";
import { NavbarTag } from "./";
import { setGameState } from "../features /gameState/gameStateSlice";
import { GAME } from "../gameStateNames";
setGameState;
import { setShowSidebar } from "../features /sidebar/sidebarSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className="nav center-items">
      <div className="nav-center">
        <div className="nav-header" onDragStart={(e) => e.preventDefault()}>
          <img src={Logo} className="nav-logo" alt="logo" />
          <button
            className="btn toggle-btn"
            onClick={() => {
              dispatch(setShowSidebar(true));
            }}
          >
            menu
          </button>
          <button
            className="btn new-game-btn navbar-new-game-btn"
            onClick={() => {
              dispatch(setGameState(GAME));
            }}
          >
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
