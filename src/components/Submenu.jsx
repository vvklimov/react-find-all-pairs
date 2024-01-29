import { useSelector } from "react-redux";
import SettingsBtn from "./SettingsBtn";

const Submenu = ({ show, subtags, tag }) => {
  const { settingsAreEqual } = useSelector((state) => state.settings);
  return (
    <aside className={`submenu ${show ? "show-submenu" : ""}`}>
      <div className="settings-container">
        {subtags.map((subtag, index) => {
          const { subtagName, subtagClass } = subtag;
          return (
            <div className="single-setting center-items" key={index}>
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
