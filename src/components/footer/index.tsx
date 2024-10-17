import React from "react";

// Components
import { Container } from "@mui/material";

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
      <Container className="footer__inner">
        <a
          className="footer__logo-link"
          href="/"
        >
          <span className="sr-only">Debut homepage</span>
        </a>

        <ul
          className="footer__menu"
          role="menu"
        >
          <li
            className="footer__menu-item"
            role="none"
          >
            <a
              className="footer__link"
              href="/about"
              role="menuitem"
            >
              What is Debut?
            </a>
          </li>

          <li
            className="footer__menu-item"
            role="none"
          >
            <a
              className="footer__link"
              href="/services"
              role="menuitem"
            >
              Services
            </a>
          </li>

          <li
            className="footer__menu-item"
            role="none"
          >
            <a
              className="footer__link"
              href="/resources"
              role="menuitem"
            >
              Resources
            </a>
          </li>

          <li
            className="footer__menu-item"
            role="none"
          >
            <a
              className="footer__link"
              href="/contact"
              role="menuitem"
            >
              Contact
            </a>
          </li>
        </ul>

        <small className="footer__copyright">&copy; {new Date().getFullYear()} Debut.tv. All rights reserved.</small>
      </Container>
    </footer>
  );
};

export default Footer;
