import DefaultLayout from "../layout/default";

// Components
import { Container } from "@mui/material";
import HomePage from "../views/home-page";

const MovieSearch = () => {
  return (
    <DefaultLayout heading="Search">
      <Container>
        <HomePage />
      </Container>
    </DefaultLayout>
  );
};

export default MovieSearch;
