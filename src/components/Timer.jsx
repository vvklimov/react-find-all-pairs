import TimerUnitFormat from "./TimerUnitFormat";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
useSelector;
import { setupTimers } from "../features /timers/timersSlice";
const Timer = ({ name }) => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings);
  const { [name]: timerValues, defaultTimers } = useSelector(
    (state) => state.timers
  );

  const { timerClass, timerName } = defaultTimers[name];
  useEffect(() => {
    dispatch(setupTimers({ name, settings }));
  }, [settings.difficulty, settings.size]);
  return (
    <div className="timer-wrapper center-items">
      <div className={timerClass}>
        <div className="timer-format">
          <h5 className="tag-btn-gradient gradient-hover-effect">
            {timerName}
          </h5>
          <TimerUnitFormat
            unitClass="min"
            unitName="m"
            unitValue={timerValues.min}
          />
          <h5>:</h5>
          <TimerUnitFormat
            unitClass="sec"
            unitName="s"
            unitValue={timerValues.sec}
          />
          <h5>:</h5>
          <TimerUnitFormat
            unitClass="msec"
            unitName="ms"
            unitValue={timerValues.msec}
          />
        </div>
      </div>
    </div>
  );
};
export default Timer;
