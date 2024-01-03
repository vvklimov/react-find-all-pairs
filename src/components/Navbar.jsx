import Logo from "../assets/images/logo.png";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav-center">
        <div className="nav-header">
          <img src={Logo} className="nav-logo" alt="logo" />
          <button className="btn toggle-btn">menu</button>
          <button className="btn new-game-btn navbar-new-game-btn">
            new game
          </button>
        </div>
        <ul className="nav-tags">
          <li>
            <button className="tag-btn tag-btn-gradient nav-btn">
              difficulty
            </button>
          </li>
          <li>
            <button className="tag-btn tag-btn-gradient nav-btn">size</button>
          </li>
          <li>
            <button className="tag-btn tag-btn-gradient nav-btn">themes</button>
          </li>
          <li>
            <button className="tag-btn tag-btn-gradient nav-btn">other</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
