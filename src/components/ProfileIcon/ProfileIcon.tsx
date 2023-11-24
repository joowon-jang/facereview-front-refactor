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
  return (
    <div
      className={`profile-icon ${type} ${color}`}
      style={style}
      onClick={onSelectClick}
    >
      {onSelectClick && <div className="profile-icon-dim"></div>}
      <img
        className={`profile-image ${type}`}
        src={ProfileImage}
        alt="Person"
      />
      <img
        className={`editable-image ${type} ${isEditable ? "editable" : null}`}
        src={EditableImage}
        alt="Editable"
        onClick={onEditClick}
      />
    </div>
  );
};

export default ProfileIcon;
