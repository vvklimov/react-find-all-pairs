const Loading = () => {
  return (
    <div className="page-loading">
      <div className="loading-spinner-wrapper">
        <div className="loading-spinner"></div>
        <h1 className="tag-btn gradient-hover-effect">Loading...</h1>
      </div>
      <article className="rules">
        <h3>rules are simple:</h3>
        <p>find all card pairs before time is up</p>
      </article>
    </div>
  );
};
export default Loading;
