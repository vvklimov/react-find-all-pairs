import TimerUnitFormat from "./TimerUnitFormat";
import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setupTimers } from "../../features/timers/timersSlice";
const Timer = ({ name }) => {
  const dispatch = useDispatch();
  const { defaultTimers, settings } = useSelector((state) => {
    return {
      defaultTimers: state.timers.defaultTimers,
      settings: state.settings.settings,
    };
  }, shallowEqual);

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
          <TimerUnitFormat timerName={name} unitClass="min" unitName="m" />
          <h5>:</h5>
          <TimerUnitFormat timerName={name} unitClass="sec" unitName="s" />
          <h5>:</h5>
          <TimerUnitFormat timerName={name} unitClass="msec" unitName="ms" />
        </div>
      </div>
    </div>
  );
};
export default Timer;
