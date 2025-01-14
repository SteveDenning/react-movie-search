import React from "react";

// Styles
import "./ai-loader.scss";

const AILoader = () => {
  return (
    <div
      className="ai-loader"
      data-testid="ai-loader"
    >
      <div className="ai-loader__balls"></div>
    </div>
  );
};

export default AILoader;
