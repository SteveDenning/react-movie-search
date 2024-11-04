import { useEffect, useState } from "react";

// Utils
import { getMediaByID } from "../../utils/get-resources";

// Components
import Button from "../../components/button";
import { Backdrop, CircularProgress, Container, Fade } from "@mui/material";
// import Video from "../../components/video";

// Layout
import DefaultLayout from "../../layout/default";

// Styles
import "./details-view.scss";

const DetailsView = () => {
  const [resource, setResource] = useState<any>({});
  const [heading, setHeading] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);
  const [backDrop, setBackDrop] = useState<string>("");

  const programmeId = window.location.pathname.split("/")[3] as string;
  const type = window.location.pathname.split("/")[2];

  const backgroundImage = backDrop ? `url(${process.env.REACT_APP_TMDB_PATH}/t/p/original/${backDrop})` : "";

  useEffect(() => {
    getMediaByID(programmeId, type)
      .then((response: any) => {
        setResource(response.data);
        setHeading(response.data.title || response.data["original_name"]);
        setBackDrop(response.data.backdrop_path);
        console.log(response.data);
        setLoaded(true);
        setTimeout(() => {}, 100);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [programmeId, type]);

  return (
    <DefaultLayout heading={heading as string}>
      <Fade in={loaded}>
        <div
          data-testid="details-view"
          className="details-view"
          style={{ backgroundImage: backgroundImage }}
        >
          <div data-testid="details-view__inner">
            <Container>
              <div className="details-view__content">
                <p>{resource.overview || "Description not available"}</p>
                <p>Genres</p>
                {!!resource.genres?.length && (
                  <>
                    <ul>
                      {resource.genres.map((genre: any, i: number) => (
                        <li
                          className="genre-tag"
                          key={genre.id + i}
                        >
                          {genre["name"]}
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
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button onClick={() => (window.location.href = "/")}>Back</Button>
                </div>
              </div>
            </Container>
          </div>
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
