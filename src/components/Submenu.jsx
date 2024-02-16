import { useDispatch, useSelector } from "react-redux";
import SettingsBtn from "./SettingsBtn";
import { setShowGameMenu } from "../features /gameMenu/gameMenuSlice";

const Submenu = ({ show, subtags, tag }) => {
  const dispatch = useDispatch();
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
        <button
          className="apply-changes-btn btn"
          style={{ marginTop: "1rem" }}
          onClick={() => {
            dispatch(setShowGameMenu(true));
          }}
        >
          apply changes
        </button>
      )}
    </aside>
  );
};
export default Submenu;
