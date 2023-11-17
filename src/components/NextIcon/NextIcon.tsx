import "./nexticon.scss";
import React, { ReactElement } from "react";
import nextIcon from "assets/img/nextIcon.png";

type NextIconPropsType = {
  type: "large" | "small";
  style?: React.CSSProperties;
  onClick?: () => void;
};

const NextIcon = ({
  type,
  style,
  onClick,
}: NextIconPropsType): ReactElement => {
  return (
    <div className={`next-icon ${type}`} style={style} onClick={onClick}>
      <img className={`next-icon-image ${type}`} src={nextIcon} alt=">"></img>
    </div>
  );
};

export default NextIcon;
