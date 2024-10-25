import { useEffect, useState } from "react";
import axios from "axios";

// Components
import { Container, Fade } from "@mui/material";
import DefaultLayout from "../../layout/default";

const DetailsView = () => {
  const [details, setDetails] = useState<any>();
  const [loaded, setLoaded] = useState<boolean>(false);

  const programmeId = window.location.pathname.split("/")[2];

  const trailer = "https://api-gate2.movieglu.com/trailers/?film_id=227902";

  useEffect(() => {
    if (process.env) {
      axios
        .get(trailer, {
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
            <button onClick={() => (window.location.href = "/")}>Back</button>
            {details ? <p>{details.overview}</p> : <p>Loading.....</p>}
          </div>
        </Fade>
      </Container>
    </DefaultLayout>
  );
};
export default DetailsView;
