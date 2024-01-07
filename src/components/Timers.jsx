import { timers } from "../utils/data";
import Timer from "./Timer";

const Timers = () => {
  return (
    <div className="timer-container">
      <Timer timer={timers.targetTime} />
      <Timer timer={timers.currentGameTime} />
      <Timer timer={timers.bestTime} />
    </div>
  );
};
export default Timers;
