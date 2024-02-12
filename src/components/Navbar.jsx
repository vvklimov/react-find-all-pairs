import { useDispatch } from "react-redux";
import { navTags } from "../utils/data";
import { NavbarTag } from "./";
import { setGameState } from "../features /gameState/gameStateSlice";
import { GAME, PAUSE } from "../gameStateNames";
setGameState;
import { setShowSidebar } from "../features /sidebar/sidebarSlice";
import { setShowGameMenu } from "../features /gameMenu/gameMenuSlice";
import Logo from "./Logo";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className="nav center-items">
      <div className="nav-center">
        <div className="nav-header" onDragStart={(e) => e.preventDefault()}>
          <Logo />
          <button
            className="btn toggle-btn"
            onClick={() => {
              dispatch(setShowSidebar(true));
              dispatch(setGameState(PAUSE));
            }}
          >
            menu
          </button>
          <button
            className="btn new-game-btn navbar-new-game-btn"
            onClick={() => {
              dispatch(setShowGameMenu(true));
              dispatch(setGameState(PAUSE));
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
