const GameMenuTextContent = ({ textContent }) => {
  const { textContentName: name, currentGameTime: time } = textContent;
  const templates = {
    newRecord: Won,
    won: Won,
    lost: Lost,
    applyNewSettings: ApplyNewChanges,
    default: Default,
  };
  const TemplateComponent = templates[name];
  return (
    <div className="text-content center-items">
      <TemplateComponent time={time} name={name} />
    </div>
  );
};
export default GameMenuTextContent;

const Won = ({ time, name }) => {
  const { min, sec, msec } = time;
  return (
    <>
      <h2>{`${
        name === "newRecord" ? "new record!" : name === "won" ? "you won!" : ""
      }`}</h2>
      <h4>
        your time: {min} : {sec} : {msec}
      </h4>
    </>
  );
};
const Default = () => {
  return <h4>start a new game?</h4>;
};
const Lost = () => {
  return <h4>time is up!</h4>;
};
const ApplyNewChanges = () => {
  return (
    <>
      <h5>to apply changes</h5>
      <h5>you have to start a new game</h5>
      <h4>start a new game?</h4>
    </>
  );
};
