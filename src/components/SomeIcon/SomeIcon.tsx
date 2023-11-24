import "./someicon.scss";
import React, { ReactElement } from "react";
import nextIcon from "assets/img/nextIcon.png";
import closeIcon from "assets/img/closeIcon.png";

type SomeIconPropsType = {
  type: "large-next" | "small-next" | "close";
  style?: React.CSSProperties;
  onClick?: () => void;
};

const SomeIcon = ({
  type,
  style,
  onClick,
}: SomeIconPropsType): ReactElement => {
  const renderIconImage = () => {
    if (type === "close") {
      return (
        <img
          className={`some-icon-image ${type}`}
          src={closeIcon}
          alt=">"
        ></img>
      );
    } else if (type === "large-next" || type === "small-next") {
      return (
        <img className={`some-icon-image ${type}`} src={nextIcon} alt=">"></img>
      );
    }
  };

  return (
    <div className={`some-icon ${type}`} style={style} onClick={onClick}>
      {renderIconImage()}
    </div>
  );
};

export default SomeIcon;
