import { FaTimes } from "react-icons/fa";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setShowGameMenu } from "../features /gameMenu/gameMenuSlice";
import GameMenuTextContent from "./GameMenuTextContent";
import {
  snakeLikeArrival,
  translateCards,
} from "../features /transfers/transfersSlice";

const GameMenu = () => {
  const { show, textContent } = useSelector((state) => {
    return {
      show: state.gameMenu.show,
      textContent: state.gameMenu.textContent,
    };
  }, shallowEqual);
  const dispatch = useDispatch();
  return (
    <div className={`sidebar-wrapper game-menu ${show ? "show" : ""}`}>
      <aside className="sidebar">
        <button
          className="close-btn btn"
          onClick={() => {
            dispatch(setShowGameMenu(false));
          }}
        >
          <FaTimes />
        </button>
        <div className="text-content center-items">
          <GameMenuTextContent textContent={textContent} />
        </div>
        <div className="btn-container">
          <button
            onClick={() => {
              // dispatch(translateCards("moveToLeft"));
              dispatch(snakeLikeArrival());
            }}
            className="btn start-new-game-btn"
          >
            start new game
          </button>
        </div>
      </aside>
    </div>
  );
};
export default GameMenu;
