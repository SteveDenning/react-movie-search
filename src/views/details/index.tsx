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

  const programmeId = window.location.pathname.split("/")[2];

  const backgroundImage = backDrop ? `url(${process.env.REACT_APP_TMDB_PATH}/t/p/original/${backDrop})` : "";

  useEffect(() => {
    getMediaByID(programmeId)
      .then((response: any) => {
        setResource(response.data);
        setHeading(response.data.title);
        setBackDrop(response.data.backdrop_path);
        console.log(response.data);
        setLoaded(true);
        setTimeout(() => {}, 100);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [programmeId]);

  return (
    <DefaultLayout heading={heading}>
      <Fade in={loaded}>
        <div
          data-testid="details-view"
          className="details-view"
          style={{ backgroundImage: backgroundImage }}
        >
          <div data-testid="details-view__inner">
            <Container>
              <div className="details-view__content">
                <h1>{resource.title}</h1>
                <p>{resource.overview}</p>
                <Button onClick={() => (window.location.href = "/")}>Back</Button>
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
