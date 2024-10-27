import { useEffect, useState } from "react";
import axios from "axios";

// Components
import Button from "../../components/button";
import { Container, Fade } from "@mui/material";

// Layout
import DefaultLayout from "../../layout/default";

const DetailsView = () => {
  const [details, setDetails] = useState<any>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [trailer, setTrailer] = useState<string>("");

  const programmeId = window.location.pathname.split("/")[2];

  const trailerUrl = "https://api-gate2.movieglu.com/trailers/?film_id=227902";

  useEffect(() => {
    if (process.env) {
      axios
        .get(trailerUrl, {
          headers: {
            "api-version": "v200",
            Authorization: "Basic U0Q6YlBzaEdXYUtYRFNF",
            client: "ABCD",
            "x-api-key": "Npa0skZGpC4jGoV11eig2jZC0p8Dn027yhPWoXfg",
            "device-datetime": "2020-06-18T12:07:57.296Z",
            territory: "UK",
          },
        })
        .then((response) => {
          setLoaded(true);
          setDetails(response.data);
          setTrailer(response.data.trailers.high?.[0]["film_trailer"]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [programmeId]);

  return (
    <DefaultLayout heading={details?.title}>
      <Container>
        <Fade in={loaded}>
          <div data-testid="details-page">
            <Button onClick={() => (window.location.href = "/")}>Back</Button>
            {trailer ? (
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
            )}
          </div>
        </Fade>
      </Container>
    </DefaultLayout>
  );
};
export default DetailsView;
