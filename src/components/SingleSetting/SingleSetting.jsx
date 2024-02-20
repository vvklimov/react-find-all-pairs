import SettingsBtn from "./SettingsBtn";

const SingleSetting = ({ subtag, index, tag }) => {
  const { subtagName, subtagClass } = subtag;
  return (
    <div className="single-setting center-items" key={index}>
      <SettingsBtn subtagClass={subtagClass} tag={tag} />
      <span>{subtagName}</span>
    </div>
  );
};
export default SingleSetting;
