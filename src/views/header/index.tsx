import React, { useEffect, useState } from "react";

// Utils

// Config
import { config } from "../../config/routes";

// Components
import Button from "../../components/button";
import List from "../../components/list";
import Login from "../../views/login";
import Search from "../../views/search";

// MUI
import { Box, Container, Drawer } from "@mui/material";

// MUI Icons
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ClearIcon from "@mui/icons-material/Clear";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TheatersIcon from "@mui/icons-material/Theaters";

// Hocs
import { useUser, useUserUpdate } from "../../hocs/with-user-provider";

// Styles
import "./header.scss";

interface Props {
  heading: string;
}

const Header: React.FC<Props> = ({ heading }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [hideMessage, setHideMessage] = useState<boolean>(true);

  const user = useUser();
  const handleUpdateUser = useUserUpdate();

  const navOptions = [
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

  useEffect(() => {
    console.log("REACT_APP_TEST", process.env.REACT_APP_AI_API_KEY);
  }, []);

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
        {/* TODO - move to navigation component */}
        <Drawer
          className="navigation"
          open={open}
          onClose={() => toggleDrawer(false)}
          anchor="right"
          PaperProps={{
            sx: {
              width: 300,
              bgcolor: "#000",
            },
          }}
        >
          <Box sx={{ mt: 2, mx: 2.5 }}>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="icon"
                onClick={() => {
                  toggleDrawer(false);
                }}
              >
                <ClearIcon />
              </Button>
            </div>
            {user && (
              <List
                resources={navOptions}
                variant="link"
              />
            )}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
              <Button
                variant="link"
                // @ts-ignore
                onClick={handleUpdateUser}
                color="red"
              >
                {user ? "Log Out" : "Login"}
              </Button>
            </div>
          </Box>
        </Drawer>
      </Container>
    </header>
  );
};

export default Header;
