const GameMenu = () => {
  return (
    <div className="sidebar-wrapper game-menu">
      <aside className="sidebar">
        <button className="close-btn btn">
          <i className="fas fa-times"></i>
        </button>
        <div className="text-content"></div>
        <div className="btn-container">
          <button className="btn start-new-game-btn">start new game</button>
        </div>
      </aside>
    </div>
  );
};
export default GameMenu;
