import React, { useEffect, useState } from "react";

// Services
// import { addFavourite } from "../../services/addFavourite";
import { getFavourites } from "../../services/getFavourites";

// MUI Icons
// import TvIcon from "@mui/icons-material/Tv";
// import TheatersIcon from "@mui/icons-material/Theaters";

// MUI Components
import { Container, Fade } from "@mui/material";

// Components
import List from "../../components/list";
import Tabs from "../../components/tabs";

// Styles
import "./favourites.scss";

interface Props {
  children?: React.ReactNode;
}

const Favourites: React.FC<Props> = () => {
  const [movies, setMovies] = useState<any>([]);
  const [favouriteTv, setFavouriteTv] = useState<any>([]);

  // const params = new URLSearchParams(window.location.search);
  // const type = params.get("type");
  const user = JSON.parse(sessionStorage.getItem("user") || null);

  const getFavouriteMovies = () => {
    getFavourites(user.id, "movies")
      .then((response) => {
        console.log(response);
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFavouriteTv = () => {
    getFavourites(user.id, "tv")
      .then((response) => {
        console.log(response);
        setFavouriteTv(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user) {
      getFavouriteMovies();
      getFavouriteTv();
    }
  }, []);

  const [selectedTab, setSelectedTab] = useState({ label: "Movies", value: "movies" });

  const handleTabChange = (tab: { label: string; value: string }) => {
    setSelectedTab(tab);
  };
  return (
    <Container>
      {user ? (
        <div
          className="favourites"
          data-testid="favourites"
        >
          <Tabs
            tabs={[
              { label: "Movies", value: "movies" },
              { label: "TV", value: "tv" },
            ]}
            onClick={handleTabChange}
          />
          <div className="favourites__inner">
            <Fade in={selectedTab.value === "tv"}>
              <div>{selectedTab.value === "tv" && <List items={favouriteTv} />}</div>
            </Fade>
            <Fade in={selectedTab.value === "movies"}>
              <div>{selectedTab.value === "movies" && <List items={movies} />}</div>
            </Fade>
          </div>
        </div>
      ) : (
        <h2 style={{ textAlign: "center", marginTop: "2rem" }}>You need to be logged in to see your favourites. Log in (TODO - Login)</h2>
      )}
    </Container>
  );
};

export default Favourites;
