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
            <span>
              Powered by
              <a
                href="https://developer.themoviedb.org/docs/getting-started"
                target="_blank"
                rel="noreferrer"
              >
                &nbsp;TMDB&nbsp;
              </a>
              <span>&</span>
              <a href="https://platform.openai.com/docs/api-reference/introduction">&nbsp;OpenAI</a>
            </span>
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
