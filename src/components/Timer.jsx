import TimerUnitFormat from "./TimerUnitFormat";
import { targetTimeValues } from "../utils/data";
import { useSettingsContext } from "../context/settings_context";
import { c } from "tar";

const Timer = ({ timerName, timerClass, defaultValues }) => {
  const { settings } = useSettingsContext();
  let min, sec, msec;
  if (timerClass === "target-time") {
    let targetTimeName = `${settings.difficulty}${settings.size.slice(0, 2)}`;
    const { mins, secs, msecs } = targetTimeValues[targetTimeName];
    min = mins;
    sec = secs;
    msec = msecs;
  } else if (timerClass === "best-time") {
    min = "--";
    sec = "--";
    msec = "--";
  } else {
    min = defaultValues.min;
    sec = defaultValues.sec;
    msec = defaultValues.msec;
  }
  return (
    <div className="timer-wrapper">
      <div className={timerClass}>
        <div className="timer-format">
          <h5 className="tag-btn-gradient gradient-hover-effect">
            {timerName}
          </h5>
          <TimerUnitFormat unitClass="min" unitName="m" unitValue={min} />
          <h5>:</h5>
          <TimerUnitFormat unitClass="sec" unitName="s" unitValue={sec} />
          <h5>:</h5>
          <TimerUnitFormat unitClass="msec" unitName="ms" unitValue={msec} />
        </div>
      </div>
    </div>
  );
};
export default Timer;
