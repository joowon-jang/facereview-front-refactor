import React, { ReactElement } from "react";
import UploadButtonImage from "assets/img/uploadButton.png";

import "./uploadbutton.scss";

type UploadButtonPropsType = {
  style?: React.CSSProperties;
  isDisabled?: boolean;
  onClick?: () => void;
};

const UploadButton = ({
  style,
  isDisabled,
  onClick,
}: UploadButtonPropsType): ReactElement => {
  return (
    <button
      className={`upload-button ${isDisabled ? "disabled" : null}`}
      style={style}
      onClick={isDisabled ? () => {} : onClick}
    >
      <div className="dim"></div>
      <img
        className="upload-button-image"
        src={UploadButtonImage}
        alt="업로드"
      />
    </button>
  );
};

export default UploadButton;
