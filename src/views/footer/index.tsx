import React from "react";

// Styles
import "./footer.scss";

const Footer = () => {
  return (
    <footer
      className="footer"
      data-testid="footer"
    >
      <div className="footer__inner">
        <ul className="footer__list">
          <li className="footer__list-item">
            Powered by
            <a
              href="https://developer.themoviedb.org/docs/getting-started"
              className="footer__list-link"
              target="_blank"
              rel="noreferrer"
            >
              TMDB{" "}
            </a>
            <span>&nbsp; &</span>
            <a
              href="https://platform.openai.com/docs/api-reference/introduction"
              className="footer__list-link"
            >
              OpenAI
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
