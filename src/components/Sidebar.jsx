const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <aside className="sidebar">
        <button className="close-btn btn">
          <i className="fas fa-times"></i>
        </button>
        <button className="btn new-game-btn">new game</button>
        <div className="sidebar-tags">
          <ul className="sidebar-tags-ul"></ul>
        </div>
      </aside>
    </div>
  );
};
export default Sidebar;
