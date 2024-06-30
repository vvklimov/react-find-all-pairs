import { shallowEqual } from "react-redux";
import { useAppSelector, type TimerName } from "@/utils";

type TimerUnitFormatProps = {
  timerName: TimerName;
  unitName: "m" | "s" | "ms";
  unitClass: "min" | "sec" | "msec";
};

const TimerUnitFormat = ({
  unitClass,
  unitName,
  timerName,
}: TimerUnitFormatProps) => {
  const { pulseFlag, newRecordFlag, lostFlag, unitValue } = useAppSelector(
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
