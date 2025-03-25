import React from "react";

// Styles
import "./footer.scss";
import { Container } from "@mui/material";
import { config } from "../../config/routes";

const Footer = () => {
  return (
    <footer
      className="footer"
      data-testid="footer"
    >
      <Container>
        <div className="footer__inner">
          <div>
            <a href={config.terms.path}>{config.terms.name}</a>
          </div>
          <div>
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
          <div>
            <p className="copy copy--small">© 2025 my-mdb.co.uk. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
