import { shallowEqual, useSelector } from "react-redux";

const TimerUnitFormat = ({ unitValue, unitClass, unitName, timerName }) => {
  const { pulseFlag } = useSelector((state) => {
    return { pulseFlag: state.timers.pulseFlag };
  }, shallowEqual);
  return (
    <div className="timer-unit-format">
      <h5
        className={`${unitClass} ${
          timerName === "currentGameTime" && pulseFlag ? "pulse" : ""
        }`}
      >
        {unitValue}
      </h5>
      <h5 className="tag-btn-gradient gradient-hover-effect">{unitName}</h5>
    </div>
  );
};
export default TimerUnitFormat;
