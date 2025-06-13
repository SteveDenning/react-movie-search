import React from "react";

// Styles
import "./rating.scss";

interface Props {
  resource: number;
  percentage?: boolean;
}

const Rating: React.FC<Props> = ({ resource, percentage }) => {
  const color = resource >= 7 ? "#00b500" : "#d3d300";

  return (
    <div
      data-testid="rating"
      className="rating"
    >
      <span
        className="rating__score"
        data-testid="rating__score"
        style={{ color }}
      >
        {Number(resource)?.toFixed(1)}
      </span>
      {percentage && (
        <span className="rating__percentage">
          <span>/</span>
          <span>10</span>
        </span>
      )}
    </div>
  );
};

export default Rating;
