// import { useState } from "react";

// Components
import Button from "../../components/button";
import { Container, Fade } from "@mui/material";

// Layout
import DefaultLayout from "../../layout/default";
import Video from "../../components/video";

const DetailsView = () => {
  // const [details, setDetails] = useState<any>();
  // const [loaded, setLoaded] = useState<boolean>(false);
  // const programmeId = window.location.pathname.split("/")[2];

  return (
    <DefaultLayout heading={"TODO - set title"}>
      <Container>
        <Fade in={true}>
          <div data-testid="details-page">
            <Button onClick={() => (window.location.href = "/")}>Back</Button>
            <Video />
          </div>
        </Fade>
      </Container>
    </DefaultLayout>
  );
};
export default DetailsView;
