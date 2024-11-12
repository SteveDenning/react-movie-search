import React, { useEffect, useState } from "react";

// Utils
import { getMediaByID, getMediaVideos } from "../../utils/get-resources";

// Components
import Button from "../../components/button";
import Image from "../../components/image";
import Video from "../../components/video";

// MUI
import Grid from "@mui/material/Grid2";
import { Backdrop, Box, CircularProgress, Container, Fade } from "@mui/material";

// Layout
import DefaultLayout from "../../layout/default";

// Styles
import "./details-view.scss";

const DetailsView = () => {
  const [backDrop, setBackDrop] = useState<string>("");
  const [heading, setHeading] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);
  const [resource, setResource] = useState<any>({});
  const [video, setVideo] = useState<string>("");

  const programmeId = window.location.pathname.split("/")[3] as string;
  const type = window.location.pathname.split("/")[2];
  const backgroundImage = backDrop ? `url(${process.env.REACT_APP_TMDB_PATH}/t/p/original/${backDrop})` : "";

  const getMedia = () => {
    if (programmeId && type) {
      getMediaByID(programmeId, type)
        .then((response: any) => {
          setResource(response.data);
          setHeading(`${response.data.title || response.data["original_name"] || response.data.name} : ${type}`); // Add type to details
          setBackDrop(response.data.backdrop_path);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const getVideos = (id: string, type: string) => {
    if (type !== "person") {
      getMediaVideos(id, type)
        .then((response: any) => {
          setVideo(response.data.results[0]?.key);
          setLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setLoaded(true);
    }
  };

  useEffect(() => {
    getVideos(programmeId, type);
  }, [resource]);

  useEffect(() => {
    getMedia();
  }, [programmeId]);

  return (
    <DefaultLayout heading={heading as string}>
      <Fade in={loaded}>
        <div
          data-testid="details-view"
          className="details-view"
          style={{ backgroundImage: backgroundImage }}
        >
          <Container>
            {!!video && (
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={2}
                >
                  <Grid size={12}>
                    <Video url={video} />
                  </Grid>
                </Grid>
              </Box>
            )}
            <div data-testid="details-view__inner">
              <div className="details-view__content">
                {resource["profile_path"] && (
                  <Image
                    resource={resource}
                    size="medium"
                    imagePath="profile_path"
                  />
                )}
                <p>{resource.overview || resource.biography || "Description not available"}</p>
                {!!resource.genres?.length && (
                  <>
                    <ul>
                      {resource.genres.map((genre: any, i: number) => (
                        <li
                          className="genre-tag"
                          key={genre.id + i}
                        >
                          {genre["name"]}
                          <span>|</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {resource.seasons?.length && (
                  <>
                    <p>Seasons: {resource.seasons?.length}</p>
                  </>
                )}
                {resource.networks?.length && (
                  <>
                    <p>Networks</p>
                    <ul>
                      {resource.networks.map((network: any, i: number) => (
                        <li key={network.id + i}>
                          <img
                            src={`${process.env.REACT_APP_TMDB_PATH}/t/p/original/${network["logo_path"]}`}
                            alt=""
                            style={{ width: "100px", background: "#ccc", padding: "10px", marginRight: "10px", borderRadius: "10px" }}
                          />
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <br />
                <div className="details-view__back-button">
                  <Button onClick={() => (window.location.href = "/")}>Back</Button>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Fade>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={!loaded}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </DefaultLayout>
  );
};
export default DetailsView;
