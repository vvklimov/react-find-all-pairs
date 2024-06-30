import { useAppSelector } from "../../utils/hooks";
import { NavTag } from "../../utils/types";
import ApplyChangesBtn from "./ApplyChangesBtn";
import SettingsContainer from "./SettingsContainer";
type NavbarDropdownProps = NavTag & { show: boolean };
const NavbarDropdown = ({ show, subtags, tag }: NavbarDropdownProps) => {
  const settingsAreEqual = useAppSelector(
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
