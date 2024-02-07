import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setIsLoaded } from "../features /transfers/transfersSlice";
const Loading = () => {
  const dispatch = useDispatch();
  const { "show-rules": showRules } = useSelector((state) => {
    return {
      "show-rules": state.settings.settings.other["show-rules"],
    };
  }, shallowEqual);
  useEffect(() => {
    const handleLoading = () => {
      dispatch(setIsLoaded(true));
    };
    if (document.readyState === "complete") {
      handleLoading();
    }
    {
      window.addEventListener("load", handleLoading);
    }
    return () => {
      return window.removeEventListener("load", handleLoading);
    };
  }, []);
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
