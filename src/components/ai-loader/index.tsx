import React from "react";

// Styles
import "./ai-loader.scss";

const AILoader = () => {
  return (
    <div
      className="ai-loader"
      data-testid="ai-loader"
    >
      <div className="ai-loader__phrases ">
        <p className="ai-loader__phrase ai-loader__phrase--one">Just a moment while we discover new things...</p>
        <p className="ai-loader__phrase ai-loader__phrase--two">Hang tight! We&#39;re working on it...</p>
        <p className="ai-loader__phrase ai-loader__phrase--three">Almost there! Just putting the final touches on your answer.</p>
      </div>
      <div className="ai-loader__ball-sack">
        <div className="ai-loader__balls"></div>
      </div>
    </div>
  );
};

export default AILoader;
