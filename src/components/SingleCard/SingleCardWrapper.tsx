import { memo } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector, type SingleCardWrapperProps } from "@/utils";
import { SingleCard } from "@/components";

const SingleCardWrapper = ({
  deckImg,
  cardsSrc,
  cardIndex,
  index,
  forwardedRef,
}: SingleCardWrapperProps) => {
  const { moveToDefaultPosition, destCoord, visible, heightAspectRatio } =
    useAppSelector((state) => {
      return {
        moveToDefaultPosition: state.transfers.moveToDefaultPosition,
        destCoord: state.transfers.currentPosition[index]?.destCoord,
        visible: state.transfers.visible,
        heightAspectRatio: state.transfers.heightAspectRatio,
      };
    }, shallowEqual);

  return (
    <div
      className="single-card-wrapper center-items"
      onDragStart={(e) => e.preventDefault()}
      ref={(el) => {
        if (forwardedRef && el) {
          forwardedRef.current[index] = el;
        }
      }}
    >
      <div
        className={`single-card-container  ${
          visible ? "single-card-transition" : ""
        } ${heightAspectRatio ? "height-aspect-ratio" : "width-aspect-ratio"} `}
        style={{
          transform: `${destCoord || moveToDefaultPosition}`,
        }}
      >
        <SingleCard
          index={index}
          cardsSrc={cardsSrc}
          deckImg={deckImg}
          cardIndex={cardIndex}
        />
      </div>
    </div>
  );
};
export default memo(SingleCardWrapper);
