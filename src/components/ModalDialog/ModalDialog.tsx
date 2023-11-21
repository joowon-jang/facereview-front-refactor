import React, { ReactElement, ReactNode } from "react";
import Modal from "react-modal";
import "./modaldialog.scss";
import "./modaldialogchildren.scss";
import Button from "components/Button/Button";

type ModalDialogPropTypes = {
  children: React.ReactNode;
  type: "one-button" | "two-button" | "video-register";
  isOpen: boolean;
  onClose: () => void;
  onCheck?: () => void;
};

const ModalDialog = ({
  isOpen,
  children,
  type,
  onClose,
  onCheck,
}: ModalDialogPropTypes): ReactElement => {
  const renderButtons = () => {
    if (type === "one-button" || type === "video-register") {
      return (
        <div className={`modal-button-wrapper ${type}`}>
          <Button
            label={"확인"}
            type={"cta-full"}
            onClick={() => {
              onClose();
              onCheck && onCheck();
            }}
          />
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
      className={`modal-content ${type}`}
      overlayClassName="modal-overlay"
    >
      <div className={`modal-contents-container ${type}`}>{children}</div>
      {renderButtons()}
    </Modal>
  );
};

export default ModalDialog;
