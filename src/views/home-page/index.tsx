import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Utils
import { getAllMedia } from "../../utils/get-resources";
// import useScreenSize from "../../utils/use-screen-size";

// Components
import { Container, Fade } from "@mui/material";
import Image from "../../components/image";
import LatestReleases from "../latest-releases";

// Layouts
import DefaultLayout from "../../layout/default";

// Styles
import "./home-page.scss";

const HomePage = () => {
  const [resources, setResources] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  // const screenSize = useScreenSize();
  const location = useLocation();

  const handleSearchInput = (query: string) => {
    getAllMedia(query)
      .then((response: any) => {
        setResources(response.data.results);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const checkUrlParams = () => {
    if (window.location.search) {
      const searchParams = new URLSearchParams(window.location.search);
      const query = searchParams.get("query");

      if (query) {
        handleSearchInput(query);
      }
    } else {
      setResources([]);
    }
  };

  useEffect(() => {
    checkUrlParams();
  }, [location]);

  return (
    <DefaultLayout>
      <div
        className="home-page"
        data-testid="home-page"
      >
        {resources.length ? (
          <Container>
            <Fade in={!!resources.length}>
              <ul className="home-page__list">
                {loaded &&
                  resources.map((item: any, i: number) => {
                    return (
                      <li
                        className="home-page__list-item"
                        style={{ marginBottom: "20px" }}
                        key={i}
                        onClick={() => (window.location.href = `/details/${item["media_type"]}/${item.id}`)}
                      >
                        <div className="image-wrapper">
                          <Image
                            resource={item}
                            size="small"
                          />
                        </div>
                        <div style={{ marginLeft: "40px" }}>
                          <h3>{item.title || item["original_name"]}</h3>
                          <p>{item.overview?.length > 300 ? `${item.overview.substring(0, 300)}. . .` : item.overview}</p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </Fade>
          </Container>
        ) : (
          <>
            <LatestReleases label="Movie" />
            <LatestReleases label="TV" />
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
