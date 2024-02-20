import { useSelector } from "react-redux";
import ApplyChangesBtn from "./ApplyChangesBtn";
import SettingsContainer from "./SettingsContainer";
const NavbarDropdown = ({ show, subtags, tag }) => {
  const settingsAreEqual = useSelector(
    (state) => state.settings.settingsAreEqual
  );
  return (
    <aside className={`dropdown ${show ? "show-dropdown" : ""}`}>
      <SettingsContainer subtags={subtags} tag={tag} />
      {!settingsAreEqual && <ApplyChangesBtn />}
    </aside>
  );
};
export default NavbarDropdown;
