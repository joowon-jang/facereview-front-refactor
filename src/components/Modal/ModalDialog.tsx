import React, { ReactElement } from "react";
import Modal from "react-modal";
import "./modaldialog.scss";
import Button from "components/Button/Button";
import ProfileIcon from "components/ProfileIcon/ProfileIcon";
import { EmotionType } from "types";

type ModalDialogPropTypes = {
  titleLabel: string;
  bodyLabel?: string;
  type: "one-button" | "two-button";
  style?: React.CSSProperties;
  isOpen: boolean;
  onClose: () => void;
  onSelectColor?: (color: EmotionType) => void;
};

const ModalDialog = ({
  isOpen,
  titleLabel,
  bodyLabel,
  type,
  style,
  onClose,
  onSelectColor,
}: ModalDialogPropTypes): ReactElement => {
  const handleColorSelect = (color: EmotionType) => {
    if (onSelectColor) {
      onSelectColor(color);
    }
  };

  const renderButtons = () => {
    if (type === "one-button") {
      return (
        <div className={`modal-button-wrapper ${type}`}>
          <Button label={"확인"} type={"cta-fixed"} onClick={onClose} />
        </div>
      );
    } else if (type === "two-button") {
      return (
        <div className={`modal-button-wrapper ${type}`}>
          <Button
            label={"취소"}
            type={"cta-fixed-secondary"}
            style={{ marginRight: "12px", background: "#5D5D6D" }}
            onClick={onClose}
          />
          <Button label={"확인"} type={"cta-fixed"} onClick={onClose} />
        </div>
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-container">
        <div className={`modal-label-container ${type}`}>
          <h3 className="modal-title-label font-title-mini">{titleLabel}</h3>
          <div className="modal-icon-wrapper">
            <ProfileIcon
              type="icon-medium"
              color="neutral"
              onSelectClick={() => handleColorSelect("neutral")}
              style={{ cursor: "pointer" }}
            />
            <ProfileIcon
              type="icon-medium"
              color="happy"
              onSelectClick={() => handleColorSelect("happy")}
              style={{ cursor: "pointer" }}
            />
            <ProfileIcon
              type="icon-medium"
              color="surprise"
              onSelectClick={() => handleColorSelect("surprise")}
              style={{ cursor: "pointer" }}
            />
            <ProfileIcon
              type="icon-medium"
              color="sad"
              onSelectClick={() => handleColorSelect("sad")}
              style={{ cursor: "pointer" }}
            />
            <ProfileIcon
              type="icon-medium"
              color="angry"
              onSelectClick={() => handleColorSelect("angry")}
              style={{ cursor: "pointer" }}
            />
          </div>
          <p className="modal-body-label font-body-large">{bodyLabel}</p>
        </div>
        {renderButtons()}
      </div>
    </Modal>
  );
};

export default ModalDialog;
