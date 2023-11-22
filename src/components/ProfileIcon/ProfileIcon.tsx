import "./profileicon.scss";
import ProfileImage from "assets/img/profileImage.png";
import EditableImage from "assets/img/editableImage.png";

import React, { ReactElement } from "react";

type ProfileIconPropsType = {
  type: "icon-large" | "icon-medium" | "icon-small";
  color: "neutral" | "happy" | "surprise" | "sad" | "angry";
  style?: React.CSSProperties;
  isEditable?: boolean;
  onEditClick?: () => void;
  onSelectClick?: () => void;
};

const ProfileIcon = ({
  type,
  color,
  style,
  isEditable,
  onEditClick,
  onSelectClick,
}: ProfileIconPropsType): ReactElement => {
  const handleEditableClick = () => {
    if (isEditable && onEditClick) {
      onEditClick();
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
        onClick={onSelectClick}
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
