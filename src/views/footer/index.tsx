import React from "react";

// Styles
import "./footer.scss";

const Footer = () => {
  const baseClass = "footer";

  const classes = [baseClass].filter(Boolean).join(" ");

  return (
    <footer
      className={classes}
      data-testid="footer"
    >
      <div className="footer__inner">
        <ul className="footer__list">
          <li className="footer__list-item">
            Powered by{" "}
            <a
              href="https://developer.themoviedb.org/docs/getting-started"
              className="footer__list-link"
            >
              TMDB
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
