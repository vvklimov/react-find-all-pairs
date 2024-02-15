import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setIsLoaded } from "../features /transfers/transfersSlice";
import preloadImages from "image-preload";
import SettingsBtn from "./SettingsBtn";
const Loading = () => {
  const dispatch = useDispatch();
  const { "show-rules": showRules } = useSelector((state) => {
    return {
      "show-rules": state.settings.settings.other["show-rules"],
    };
  }, shallowEqual);
  const [showBtn, setShowBtn] = useState(false);
  useEffect(() => {
    const handleLoading = () => {
      const images = document.querySelectorAll("img");
      const imageURLs = Array.from(images).map((img) => img.src);
      preloadImages(imageURLs, {
        onComplete: () => {
          setShowBtn(true);
        },
      });
    };
    if (document.readyState === "complete") {
      handleLoading();
    } else {
      window.addEventListener("load", handleLoading);
    }
    return () => {
      return window.removeEventListener("load", handleLoading);
    };
  }, []);
  //
  return (
    <div className="page-loading center-items">
      {!showBtn && (
        <div className="loading-spinner-wrapper">
          <div className="loading-spinner"></div>
          <h1 className="tag-btn-gradient gradient-hover-effect">Loading...</h1>
        </div>
      )}

      <article className={`rules ${showRules ? "rules-show" : ""}`}>
        <h3>rules are simple:</h3>
        <p>find all card pairs before time is up</p>
      </article>
      {showBtn && (
        <>
          <div className="settings-container">
            <div className="single-setting center-items">
              <SettingsBtn tag={"other"} subtagClass={"sound-effects"} />
              <span>{"sound effects"}</span>
            </div>
            <div className="single-setting center-items">
              <SettingsBtn tag={"other"} subtagClass={"show-rules"} />
              <span>{"show rules"}</span>
            </div>
          </div>
          <button className="btn" onClick={() => dispatch(setIsLoaded(true))}>
            start new game
          </button>
        </>
      )}
    </div>
  );
};
export default Loading;
