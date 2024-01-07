import { timers } from "../utils/data";
import Timer from "./Timer";

const Timers = () => {
  return (
    <div className="timer-container">
      <Timer name={"targetTime"} />
      <Timer name={"currentGameTime"} />
      <Timer name={"bestTime"} />
    </div>
  );
};
export default Timers;
