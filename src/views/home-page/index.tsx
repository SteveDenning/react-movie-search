import { useState, useEffect } from "react";
import GetMedia from "./../../utils/get-media";

// Components
import { Fade } from "@mui/material";
import Button from "../../components/button";

const HomePage = () => {
  const [results, setResults] = useState<any>(undefined);
  const service = GetMedia();
  // const imagePath = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    service.then((response: any) => {
      setResults(response.data.results);
    });
  }, [service]);

  return (
    <Fade in={true}>
      <div>
        <h3 data-testid="home-page-title">Home Page</h3>
        {results ? (
          <>
            <ul>
              {results.map((item: any, i: number) => {
                return (
                  <li
                    style={{ marginBottom: "20px" }}
                    key={i}
                  >
                    <Button onClick={() => (window.location.href = `/details/${item.id}`)}>{item.title}</Button>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <p>Error</p>
        )}
      </div>
    </Fade>
  );
};

export default HomePage;
