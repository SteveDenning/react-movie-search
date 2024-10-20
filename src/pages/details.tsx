import React from "react";

import DefaultLayout from "../layout/default";

// Components
import { Container } from "@mui/material";
import DetailsPage from "../views/details";

const Details = () => {
  return (
    <DefaultLayout heading="Details">
      <Container>
        <DetailsPage />
      </Container>
    </DefaultLayout>
  );
};

export default Details;
