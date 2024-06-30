import { FaTimes } from "react-icons/fa";
type SidebarCloseBtnProps = { handleCloseSidebar: () => Promise<void> };
const SidebarCloseBtn = ({ handleCloseSidebar }: SidebarCloseBtnProps) => {
  return (
    <button className="close-btn btn" onClick={handleCloseSidebar}>
      <FaTimes />
    </button>
  );
};
export default SidebarCloseBtn;
