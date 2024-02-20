import SingleSetting from "../SingleSetting/SingleSetting";
const SidebarSettingsContainer = ({ tag, subtags }) => {
  return (
    <div className="settings-container">
      <h4 className="tag-btn tag-btn-gradient gradient-hover-effect">{tag}</h4>
      {subtags.map((subtag, index) => {
        return <SingleSetting subtag={subtag} key={index} tag={tag} />;
      })}
    </div>
  );
};
export default SidebarSettingsContainer;
