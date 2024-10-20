import React from "react";

const DetailsPage = () => {
  return (
    <div data-testid="details-page">
      <h3>Details Page</h3>
      <button onClick={() => (window.location.href = "/")}>Back</button>
    </div>
  );
};
export default DetailsPage;
