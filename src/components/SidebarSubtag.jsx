import { SettingsBtn } from "./";

const SidebarSubtag = ({ subtagClass, subtagName, tag }) => {
  return (
    <li>
      <SettingsBtn tag={tag} subtagClass={subtagClass} />
      {subtagName}
    </li>
  );
};
export default SidebarSubtag;
