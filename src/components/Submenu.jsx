import { useSettingsContext } from "../context/settings_context";
import SettingsBtn from "./SettingsBtn";

const Submenu = ({ show, subtags, tag }) => {
  const { settingsAreEqual } = useSettingsContext();
  return (
    <aside className={`submenu ${show ? "show-submenu" : ""}`}>
      <div className="settings-container">
        {subtags.map((subtag, index) => {
          const { subtagName, subtagClass } = subtag;
          return (
            <div className="single-setting" key={index}>
              <SettingsBtn subtagClass={subtagClass} tag={tag} />
              <span>{subtagName}</span>
            </div>
          );
        })}
      </div>
      {!settingsAreEqual && (
        <button className="apply-changes-btn btn" style={{ marginTop: "1rem" }}>
          apply changes
        </button>
      )}
    </aside>
  );
};
export default Submenu;
