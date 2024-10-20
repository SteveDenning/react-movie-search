import React from "react";

interface Props {
  results?: any;
}

const HomePage: React.FC<Props> = ({ results }) => {
  // const imagePath = "https://image.tmdb.org/t/p/original/";

  return (
    <div data-testid="home-page">
      <h3>Home Page</h3>
      <button onClick={() => (window.location.href = "/details")}>Details Page</button>
      {results ? (
        <>
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

export default HomePage;
