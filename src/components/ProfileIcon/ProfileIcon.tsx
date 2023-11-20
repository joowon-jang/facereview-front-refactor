import "./profileicon.scss";
import ProfileImage from "assets/img/profileImage.png";
import EditableImage from "assets/img/editableImage.png";

import React, { ReactElement } from "react";

type ProfileIconPropsType = {
  type: "icon-large" | "icon-medium" | "icon-small";
  color: "default" | "happy" | "surprise" | "sad" | "angry";
  style?: React.CSSProperties;
  isEditable?: boolean;
  onClick?: () => void;
};

const ProfileIcon = ({
  type,
  color,
  style,
  isEditable,
  onClick,
}: ProfileIconPropsType): ReactElement => {
  const handleEditableClick = () => {
    if (isEditable && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`profile-icon ${type} ${color}`}
      style={style}
      onClick={handleEditableClick}
    >
      <img
        className={`profile-image ${type}`}
        src={ProfileImage}
        alt="Person"
      />
      <img
        className={`editable-image ${type} ${isEditable ? "editable" : null}`}
        src={EditableImage}
        alt="Editable"
        onClick={handleEditableClick}
      />
    </div>
  );
};

export default ProfileIcon;
