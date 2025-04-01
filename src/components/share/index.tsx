import React, { useState } from "react";

// Components
import Button from "../button";

// MUI Components
import Popover from "@mui/material/Popover";

// Icons
import EmailIcon from "@mui/icons-material/Email";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

// Styles
import "./share.scss";

interface Props {
  id: string;
  title: string;
}

const Share: React.FC<Props> = ({ title, id }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className="share"
      data-testid="share"
    >
      <Button
        onClick={handleClick}
        className="share__button"
        data-testid="share-button"
        variant="icon"
      >
        <span className="sr-only">Share button</span>
        <ShareIcon />
      </Button>
      <Popover
        className="share__popover"
        data-testid="share-popover"
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <ul className="share__list">
          <li className="share__list-item">
            <Button
              href={`mailto:?subject=${title}&body=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="link"
            >
              <EmailIcon />
              <span data-testid="email">Email</span>
            </Button>
          </li>

          <li className="share__list-item">
            <Button
              href={`https://api.whatsapp.com/send?text=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="link"
            >
              <WhatsAppIcon />
              <span data-testid="whatsapp">WhatsApp</span>
            </Button>
          </li>
        </ul>
      </Popover>
    </div>
  );
};

export default Share;
