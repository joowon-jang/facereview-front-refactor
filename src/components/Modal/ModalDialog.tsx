import React, { ReactElement } from "react";
import Modal from "react-modal";
import "./modaldialog.scss";
import Button from "components/Button/Button";

type ModalDialogPropTypes = {
  titleLabel?: string;
  bodyLabel?: string;
  type: "one-button" | "two-button";
  style?: React.CSSProperties;
  isOpen: boolean;
  onClose: () => void;
};

const ModalDialog = ({
  isOpen,
  titleLabel,
  bodyLabel,
  type,
  style,
  onClose,
}: ModalDialogPropTypes): ReactElement => {
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
            style={{ marginRight: "12px" }}
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
          <p className="modal-body-label font-body-large">{bodyLabel}</p>
        </div>
        {renderButtons()}
      </div>
    </Modal>
  );
};

export default ModalDialog;
