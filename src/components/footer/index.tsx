import React from "react";

// Components

// Styles
import "./footer.scss";

interface Props {
  divider?: boolean;
  straight?: boolean;
}

const Footer: React.FC<Props> = ({ divider, straight }) => {
  const baseClass = "footer";
  const dividerClass = divider ? "footer--divider" : "";
  const straightClass = straight ? "footer--straight" : "";
  const classes = [baseClass, dividerClass, straightClass].filter(Boolean).join(" ");

  return (
    <footer
      className={classes}
      data-testid="footer"
    >
      <div className="footer__inner">
        <p data-testid="footer-text">Built by Steve Denning</p>
      </div>
    </footer>
  );
};

export default Footer;
