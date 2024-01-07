import TimerUnitFormat from "./TimerUnitFormat";
import { useSettingsContext } from "../context/settings_context";
import { useTimersContext } from "../context/timers_context";
import { useEffect } from "react";

const Timer = ({ name }) => {
  const { settings } = useSettingsContext();
  const {
    [name]: timerValues,
    setupTimers,
    defaultTimers,
  } = useTimersContext();
  const { timerClass, timerName } = defaultTimers[name];
  useEffect(() => {
    setupTimers(name, settings);
  }, [settings.difficulty, settings.size]);
  return (
    <div className="timer-wrapper">
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
