import { useEffect } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector, type TimerName } from "@/utils";
import { setupTimers } from "@/features";
import { TimerUnitFormat } from "@/components";

const Timer = ({ name }: { name: TimerName }) => {
  const dispatch = useAppDispatch();
  const { defaultTimers, settings } = useAppSelector((state) => {
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
