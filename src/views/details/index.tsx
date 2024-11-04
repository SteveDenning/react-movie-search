// import { useState } from "react";

// Components
import Button from "../../components/button";
import { Container, Fade } from "@mui/material";

// Layout
import DefaultLayout from "../../layout/default";

const DetailsView = () => {
  return (
    <DefaultLayout heading={"TODO - set title"}>
      <Container>
        <Fade in={true}>
          <div data-testid="details-page">
            <Button onClick={() => (window.location.href = "/")}>Back</Button>
          </div>
        </Fade>
      </Container>
    </DefaultLayout>
  );
};
export default DetailsView;
