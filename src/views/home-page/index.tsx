import { useState, useEffect } from "react";

// Utils
import { getMedia } from "./../../utils/get-media";

// Components
import Button from "../../components/button";
import { Container, Fade } from "@mui/material";

// Layouts
import DefaultLayout from "../../layout/default";

// Styles
import "./home-page.scss";

const HomePage = () => {
  const [results, setResults] = useState<any>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);

  const service = getMedia();
  // const imagePath = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    service.then((response: any) => {
      setResults(response.data.results);
      setLoaded(true);
    });
  }, [service]);

  return (
    <DefaultLayout heading="Search for a movie">
      <Container>
        <Fade in={loaded}>
          <div className="home-page">
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
      </Container>
    </DefaultLayout>
  );
};

export default HomePage;
