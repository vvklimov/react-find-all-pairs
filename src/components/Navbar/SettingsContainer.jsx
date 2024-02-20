import SingleSetting from "../SingleSetting/SingleSetting";
const SettingsContainer = ({ subtags, tag }) => {
  return (
    <div className="settings-container">
      {subtags.map((subtag, index) => {
        return <SingleSetting subtag={subtag} key={index} tag={tag} />;
      })}
    </div>
  );
};

export default SettingsContainer;
