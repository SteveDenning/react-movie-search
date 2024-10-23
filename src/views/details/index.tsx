import { useEffect, useState } from "react";
import axios from "axios";

// Components
import { Fade } from "@mui/material";

const DetailsPage = () => {
  const [details, setDetails] = useState<any>();
  const programmeId = window.location.pathname.split("/")[2];

  useEffect(() => {
    if (process.env) {
      axios
        .get(`https://api.themoviedb.org/3/movie/${programmeId}?language=en-US&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        .then((response) => {
          console.log(response.data);
          setDetails(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [programmeId]);

  return (
    <Fade in={details}>
      <div data-testid="details-page">
        <button onClick={() => (window.location.href = "/")}>Back</button>
        {details ? <p>{JSON.stringify(details, undefined, 4)}</p> : <p>Loading.....</p>}
      </div>
    </Fade>
  );
};
export default DetailsPage;
