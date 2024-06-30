import { Timer } from "@/components";

const Timers = () => {
  return (
    <div className="timer-container">
      <Timer name={"targetTime"} />
      <Timer name={"currentGameTime"} />
      <Timer name={"bestTime"} />
    </div>
  );
};
export default Timers;
