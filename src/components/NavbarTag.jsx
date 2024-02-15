import { useState } from "react";
import Submenu from "./Submenu";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { timeout } from "../utils/helpers";
import { resumeTimer, stopTimer } from "../features /timers/timersSlice";
import { GAME, PAUSE, RESUME } from "../gameStateNames";
import { setGameState } from "../features /gameState/gameStateSlice";
import playSound, { HOVER_MENU_SOUND } from "../utils/playSound";
import { sounds } from "../utils/data";

const NavbarTag = ({ tag, subtags }) => {
  const { gameState } = useSelector((state) => {
    return {
      gameState: state.gameState.gameState,
    };
  }, shallowEqual);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [gradient, setGradient] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(null);
  const audio = new Audio(sounds[HOVER_MENU_SOUND]);

  return (
    <li
      onMouseEnter={() => {
        playSound(HOVER_MENU_SOUND);
        // audio.play();
        setShow(true);
        setGradient(true);
        if (gameState === GAME) {
          dispatch(setGameState(PAUSE));
        }
      }}
      onMouseLeave={async (e) => {
        setShow(false);
        setGradient(false);
        if (
          gameState === PAUSE &&
          !e.relatedTarget.classList.contains("nav-btn")
        ) {
          await timeout(300);
          dispatch(setGameState(RESUME));
        }
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
