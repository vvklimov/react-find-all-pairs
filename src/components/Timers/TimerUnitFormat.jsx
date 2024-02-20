import { shallowEqual, useSelector } from "react-redux";

const TimerUnitFormat = ({ unitClass, unitName, timerName }) => {
  const { pulseFlag, newRecordFlag, lostFlag, unitValue } = useSelector(
    (state) => {
      return {
        pulseFlag: state.timers.pulseFlag,
        newRecordFlag: state.timers.newRecordFlag,
        lostFlag: state.timers.lostFlag,
        unitValue: state.timers[timerName][unitClass],
      };
    },
    shallowEqual
  );
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
