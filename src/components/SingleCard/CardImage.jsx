import { memo } from "react";

const CardImage = ({ src }) => {
  return <img src={src} alt="card" className="img card-img" />;
};
export default memo(CardImage);
