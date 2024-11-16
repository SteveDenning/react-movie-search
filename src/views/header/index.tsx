import React from "react";

// Views
import Search from "./../search";

// Components
import Button from "../../components/button";

// MUI
import { Container, Typography } from "@mui/material";

// Icons
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import TheatersIcon from "@mui/icons-material/Theaters";

// Styles
import "./header.scss";

interface Props {
  heading: string;
}

const Header: React.FC<Props> = ({ heading }) => {
  return (
    <header>
      <Container>
        <div
          className="header"
          data-testid="header"
        >
          <Button
            variant="icon"
            className="header__logo"
            onClick={() => {
              window.location.href = "/";
              sessionStorage.removeItem("query");
            }}
          >
            <span className="sr-only">Home</span>
            <TheatersIcon />
          </Button>
          <div className="header__inner">
            <Typography
              className="sr-only"
              variant="h1"
              sx={{ fontSize: 24, fontWeight: "200" }}
            >
              {heading}
            </Typography>
            <Search />
          </div>
          <Button
            variant="icon"
            onClick={() => alert("TODO - Log in")}
            className="header__login"
          >
            <span className="sr-only">Log in</span>
            <Person3OutlinedIcon />
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
