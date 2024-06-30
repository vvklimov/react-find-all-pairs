import useHandleLoading from "./hooks/useHandleLoading";

const Loading = () => {
  const { showRules } = useHandleLoading();
  return (
    <div className="page-loading center-items">
      <div className="loading-spinner-wrapper">
        <div className="loading-spinner"></div>
        <h1 className="tag-btn-gradient gradient-hover-effect">Loading...</h1>
      </div>
      <article className={`rules ${showRules ? "rules-show" : ""}`}>
        <h3>rules are simple:</h3>
        <p>find all card pairs before time is up</p>
      </article>
    </div>
  );
};
export default Loading;
