import { memo } from "react";

type Props = {
  src: string;
  theme: string;
};

const SlideImage = ({ src, theme }: Props) => {
  return <img className="slide-img" src={src} alt={`${theme} img`} />;
};
export default memo(SlideImage);
