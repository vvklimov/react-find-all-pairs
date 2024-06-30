import { useAppSelector, type NavTag } from "@/utils";
import { ApplyChangesBtn, SettingsContainer } from "@/components";

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
