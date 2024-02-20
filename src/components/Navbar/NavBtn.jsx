const NavBtn = ({ gradient, tag }) => {
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
