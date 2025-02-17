import React from "react";

// Components
import Button from "../button";

// Icons
import ClearIcon from "@mui/icons-material/Clear";

// MUI
import { Modal as ModalComponent, Fade } from "@mui/material";

// Styles
import "./modal.scss";

interface Props {
  id: string;
  variant?: string[];
  className?: string;
  open: boolean;
  handleClose: () => any;
  title?: string;
  children?: React.ReactNode;
  description?: string;
  footer?: any;
  video?: boolean;
}

const Modal: React.FC<Props> = ({ variant, className, id, open, handleClose, title, children, footer, video }) => {
  // Class Definitions
  const baseClass = "modal";
  const variantClasses = variant ? variant.map((name) => `modal--${name}`).join(" ") : "";
  const videoClass = video ? "modal--video" : "";
  const classes = [baseClass, variantClasses, videoClass, className].filter(Boolean).join(" ");

  return (
    <ModalComponent
      className={classes}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      data-testid="modal"
      aria-labelledby={title || `modal-${id}-title`}
    >
      <>
        <Fade in={open}>
          <div className="modal__inner">
            {title && (
              <div
                className="modal__header"
                data-testid="modal-header"
              >
                <h2
                  className="modal__title"
                  id={`modal-${id}-title`}
                  data-testid="modal-title"
                >
                  {title}
                </h2>
              </div>
            )}

            <Button
              variant="icon"
              className="modal__close"
              onClick={handleClose}
              testId="modal-close-button"
            >
              <ClearIcon sx={{ color: "#fff" }} />
            </Button>

            {children && <div className="modal__body">{children}</div>}

            {footer && <div className="modal__footer">{footer}</div>}
          </div>
        </Fade>
      </>
    </ModalComponent>
  );
};

export default Modal;
