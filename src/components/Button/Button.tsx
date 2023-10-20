import React, { ReactElement } from "react";
import "./button.scss";

type ButtonPropsType = {
  label: string;
  style?: React.CSSProperties;
};

const Button = ({ label, style }: ButtonPropsType): ReactElement => {
  return (
    <button className="button font-label-large" style={style}>
      {label}
    </button>
  );
};

export default Button;
