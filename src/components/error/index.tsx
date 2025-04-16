import React from "react";

// Styles
import "./error.scss";
import { Container } from "@mui/material";

interface Props {
  content: string;
  testId?: string;
}

const Error: React.FC<Props> = ({ content, testId = "error" }) => {
  return (
    <Container>
      <div
        className="error"
        data-testid={testId}
      >
        <p data-testid="error-content">{content}</p>
      </div>
    </Container>
  );
};

export default Error;
