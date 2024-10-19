import React from "react";

interface Props {
  results: any;
}

const Results: React.FC<Props> = ({ results }) => {
  const imagePath = "https://image.tmdb.org/t/p/original/";

  return (
    <div>
      {results ? (
        <>
          <p>results</p>
          <ul>
            {results.map((image: any, i: number) => {
              return (
                image.poster_path && (
                  <li
                    style={{ width: "100px", marginRight: "10px" }}
                    key={i}
                  >
                    <img
                      style={{ width: "100%" }}
                      src={`${imagePath}${image.poster_path}`}
                      alt={image.Title}
                    />
                  </li>
                )
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
