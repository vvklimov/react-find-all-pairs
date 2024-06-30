import { type Tag } from "@/utils";
type NavBtnProps = { gradient: boolean; tag: Tag };
const NavBtn = ({ gradient, tag }: NavBtnProps) => {
  return (
    <button
      className={`tag-btn tag-btn-gradient nav-btn ${
        gradient ? "gradient-hover-effect" : ""
      }`}
    >
      {tag}
    </button>
  );
};
export default NavBtn;
