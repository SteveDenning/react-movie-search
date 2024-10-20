import React from "react";

interface Props {
  results: any;
}

const Results: React.FC<Props> = ({ results }) => {
  // const imagePath = "https://image.tmdb.org/t/p/original/";

  return (
    <div data-testid="results">
      {results ? (
        <>
          <p>results</p>
          <ul>
            {results.map((item: any, i: number) => {
              return (
                <li
                  style={{ marginBottom: "20px" }}
                  key={i}
                >
                  {item && JSON.stringify(item)}
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>Error</p>
      )}
    </div>
  );
};

export default Results;
