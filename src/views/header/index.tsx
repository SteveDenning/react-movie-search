import React, { useState } from "react";

// Config
import { config } from "../../config/routes";

// Components
import Button from "../../components/button";
import List from "../../components/list";
import Login from "../../components/login";
import Search from "../../views/search";

// MUI
import { Box, Container, Drawer } from "@mui/material";

// MUI Icons
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import TheatersIcon from "@mui/icons-material/Theaters";
import ClearIcon from "@mui/icons-material/Clear";

// Styles
import "./header.scss";

interface Props {
  heading: string;
}

const Header: React.FC<Props> = ({ heading }) => {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user") || null);

  const sessionId = sessionStorage.getItem("sessionId");

  const navOptions = [
    { label: config.home.name, path: config.home.path },
    { label: config.favorites.name, path: config.favorites.path },
    // { label: config.profile.name, path: config.profile.path },
  ];

  const toggleDrawer = (state: boolean) => {
    setOpen(state);
  };

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
            <h1 className="sr-only">{heading}</h1>
            <Search />
          </div>
          <Button
            className="header__user-icon"
            variant="icon"
            onClick={() => setOpen(true)}
            testId="login"
          >
            <span className="sr-only">User Avatar</span>
            {user?.avatar?.tmdb?.avatar_path ? (
              <img
                className="header__user-icon-avatar"
                src={`${process.env.REACT_APP_TMDB_IMAGE_PATH}/${user.avatar.tmdb.avatar_path}`}
                alt={user.name}
              />
            ) : user?.name ? (
              <span className="header__user-icon-initials">{user.name.match(/\b(\w)/g).join("")}</span>
            ) : (
              <Person3OutlinedIcon />
            )}
          </Button>
        </div>
        {/* TODO - move to navigation component */}
        <Drawer
          className="navigation"
          open={open}
          onClose={() => toggleDrawer(false)}
          anchor="right"
          PaperProps={{
            sx: {
              width: 200,
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
            {sessionId && (
              <List
                items={navOptions}
                variant="link"
              />
            )}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
              <Login />
            </div>
          </Box>
        </Drawer>
      </Container>
    </header>
  );
};

export default Header;
