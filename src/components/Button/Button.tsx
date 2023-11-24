import React, { ReactElement } from "react";
import "./button.scss";
import plusIcon from "assets/img/plusIcon.png";

type ButtonPropsType = {
  label: string;
  type:
    | "cta-full"
    | "cta-fit"
    | "cta-fit-secondary"
    | "small"
    | "small-outline"
    | "extra-small"
    | "with-keyboard"
    | "cta-fixed"
    | "cta-fixed-secondary"
    | "add";
  style?: React.CSSProperties;
  isDisabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  label,
  type,
  style,
  isDisabled,
  onClick,
}: ButtonPropsType): ReactElement => {
  const fontOfType = {
    "cta-full": "font-label-large",
    "cta-fit": "font-label-large",
    "cta-fit-secondary": "font-label-large",
    small: "font-label-medium",
    "small-outline": "font-label-medium",
    "extra-small": "font-label-small",
    "with-keyboard": "font-label-large",
    "cta-fixed": "font-label-large",
    "cta-fixed-secondary": "font-label-large",
    add: "",
  };

  const renderContent = () => {
    if (type === "add") {
      return <img className="button-add-img" src={plusIcon} alt="Add" />;
    }
    return label;
  };

  return (
    <button
      className={`button ${type} ${fontOfType[type]} ${
        isDisabled ? "disabled" : null
      }`}
      style={style}
      onClick={isDisabled ? () => {} : onClick}
    >
      <div className="dim"></div>

      {renderContent()}
    </button>
  );
};

export default Button;
