import React, { useEffect, useState } from "react";

// Components
import Button from "../../components/button";
import Login from "../../views/login";
import Navigation from "../../components/navigation";
import Search from "../../views/search";

// Config
import { config } from "../../config/routes";

// Hocs
import { useUser } from "../../hocs/with-user-provider";

// MUI
import { Container } from "@mui/material";

// MUI Icons
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ClearIcon from "@mui/icons-material/Clear";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TheatersIcon from "@mui/icons-material/Theaters";

// Styles
import "./header.scss";
import { NavItemType } from "../../models/types";

interface Props {
  heading: string;
}

const Header: React.FC<Props> = ({ heading }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [hideMessage, setHideMessage] = useState<boolean>(true);

  const user = useUser();

  const navItems: NavItemType[] = [
    { label: config.home.name, path: config.home.path, icon: <TheatersIcon /> },
    { label: config.aiMedia.name, path: config.aiMedia.path, icon: <AutoAwesomeIcon /> },
    { label: config.favorites.name, path: config.favorites.path, icon: <FavoriteIcon /> },
  ];

  const toggleDrawer = (state: boolean) => {
    setOpen(state);
  };

  const handleCloseMessage = () => {
    setHideMessage(true);
    sessionStorage.setItem("hide_message", "true");
  };

  useEffect(() => {
    setHideMessage(!!user || JSON.parse(sessionStorage.getItem("hide_message")));
  }, [user]);

  return (
    <header>
      <Container
        className={`header__message ${hideMessage ? "header__message--fade-out" : ""}`}
        data-testid="header-message"
      >
        <p>
          This app uses OpenAI technology. Create an account{" "}
          <a
            href="https://www.themoviedb.org/signup"
            target="_blank"
            rel="noreferrer"
          >
            here
            <span className="sr-only">(Create an account with TMDB)</span>
          </a>{" "}
          to access these features.
        </p>
        <Button
          variant="icon"
          onClick={() => {
            handleCloseMessage();
          }}
          testId="hide-message"
        >
          <ClearIcon />
        </Button>
      </Container>
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
            testId="header-logo"
          >
            <span className="sr-only">Home</span>
            <TheatersIcon />
          </Button>
          <div className="header__inner">
            <h1 className="sr-only">{heading}</h1>
            <Search />
          </div>
          <Login
            onClick={() => {
              toggleDrawer(true);
            }}
            user={user}
          />
        </div>
        <Navigation
          navItems={navItems}
          open={open}
          toggleDrawer={toggleDrawer}
        />
      </Container>
    </header>
  );
};

export default Header;
