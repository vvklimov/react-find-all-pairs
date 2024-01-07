const TimerUnitFormat = ({ unitValue, unitClass, unitName }) => {
  return (
    <div className="timer-unit-format">
      <h5 className={unitClass}>{unitValue}</h5>
      <h5 className="tag-btn-gradient gradient-hover-effect">{unitName}</h5>
    </div>
  );
};
export default TimerUnitFormat;
