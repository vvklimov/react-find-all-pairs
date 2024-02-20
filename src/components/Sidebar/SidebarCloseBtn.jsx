import { FaTimes } from "react-icons/fa";
const SidebarCloseBtn = ({ handleCloseSidebar }) => {
  return (
    <button className="close-btn btn" onClick={handleCloseSidebar}>
      <FaTimes />
    </button>
  );
};
export default SidebarCloseBtn;
