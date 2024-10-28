// import { useState } from "react";

// Components
import Button from "../../components/button";
import { Container, Fade } from "@mui/material";

// Layout
import DefaultLayout from "../../layout/default";

const DetailsView = () => {
  // const [details, setDetails] = useState<any>();
  // const [loaded, setLoaded] = useState<boolean>(false);
  // const [trailer, setTrailer] = useState<string>("");

  // const programmeId = window.location.pathname.split("/")[2];

  // const trailerUrl = "https://api-gate2.movieglu.com/trailers/?film_id=227902";

  return (
    <DefaultLayout heading={"TODO - set title"}>
      <Container>
        <Fade in={true}>
          <div data-testid="details-page">
            <Button onClick={() => (window.location.href = "/")}>Back</Button>
            {/* {trailer ? (
              <video
                controls
                width="100%"
                height="100%"
                autoPlay
              >
                <source
                  src={trailer}
                  type="video/webm"
                />
                <source
                  src={trailer}
                  type="video/mp4"
                />
                Download the
                <a href={trailer}>WEBM</a>
                or
                <a href={trailer}>MP4</a>
                video.
              </video>
            ) : (
              <p>Loading.....</p>
            )} */}
          </div>
        </Fade>
      </Container>
    </DefaultLayout>
  );
};
export default DetailsView;
