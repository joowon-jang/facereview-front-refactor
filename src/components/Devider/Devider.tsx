import React from "react";
import "./devider.scss";

type DeviderPropsType = {
  style?: React.CSSProperties;
};

const Devider = ({ style }: DeviderPropsType) => {
  return <div className="devider" style={style}></div>;
};

export default Devider;
