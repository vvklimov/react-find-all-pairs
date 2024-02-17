import { memo } from "react";
const SlideImage = ({ src, theme }) => {
  return <img className="slide-img" src={src} alt={`${theme} img`} />;
};
export default memo(SlideImage);
