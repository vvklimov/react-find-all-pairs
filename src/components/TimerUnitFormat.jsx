import { shallowEqual, useSelector } from "react-redux";
import gameMenuSlice from "../features /gameMenu/gameMenuSlice";

const TimerUnitFormat = ({ unitValue, unitClass, unitName, timerName }) => {
  const { pulseFlag, newRecordFlag, lostFlag } = useSelector((state) => {
    return {
      pulseFlag: state.timers.pulseFlag,
      newRecordFlag: state.timers.newRecordFlag,
      lostFlag: state.timers.lostFlag,
    };
  }, shallowEqual);
  return (
    <div className="timer-unit-format">
      <h5
        className={`${unitClass} ${
          timerName === "currentGameTime"
            ? pulseFlag
              ? "pulse"
              : newRecordFlag
              ? "new-record"
              : lostFlag
              ? "lost-flag"
              : ""
            : ""
        } ${
          timerName === "currentGameTime" || timerName === "bestTime"
            ? newRecordFlag
              ? "new-record"
              : ""
            : ""
        }`}
      >
        {unitValue}
      </h5>
      <h5 className="tag-btn-gradient gradient-hover-effect">{unitName}</h5>
    </div>
  );
};
export default TimerUnitFormat;
