import React, { useEffect, useState } from "react";

// Components
import Button from "../../components/button";
import Login from "../../components/login";
import Navigation from "../../components/navigation";
import Search from "../../views/search";

// Utils
import useScreenSize from "../../utils/use-screen-size";

// Config
import { config } from "../../config/routes";

// Hocs
import { useUser, useUserUpdate } from "../../hocs/with-user-provider";

// MUI
import { Container } from "@mui/material";

// MUI Icons
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ClearIcon from "@mui/icons-material/Clear";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TheatersIcon from "@mui/icons-material/Theaters";

// Styles
import "./header.scss";

// Types
import { NavItemType } from "../../models/types";
interface Props {
  heading: string;
}

const Header: React.FC<Props> = ({ heading }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [hideMessage, setHideMessage] = useState<boolean>(true);

  const user = useUser();
  const handleUpdateUser = useUserUpdate();
  const screenSize = useScreenSize();
  const isMobile = screenSize.width <= 768;

  // Class Definitions
  const baseClass = "header";
  const openClass = isSearchOpen ? "header--search-open" : "";
  const mobileClass = isMobile ? "header--mobile" : "";
  const classes = [baseClass, openClass, mobileClass].filter(Boolean).join(" ");

  const navItems: NavItemType[] = [
    { label: config.home.name, path: config.home.path, icon: <TheatersIcon /> },
    { label: config.aiMedia.name, path: config.aiMedia.path, icon: <AutoAwesomeIcon /> },
    { label: config.favorites.name, path: config.favorites.path, icon: <FavoriteIcon /> },
  ];

  if (user?.["admin"]) {
    navItems.push({
      label: config.admin.name,
      path: config.admin.path,
      icon: <AdminPanelSettingsIcon />,
    });
  }

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
        className={`header__message fade-in ${hideMessage ? "header__message--fade-out" : ""}`}
        data-testid="header-message"
      >
        <div className="header__message-inner">
          <p>
            This app uses OpenAI technology. You must{" "}
            <Button
              variant="link"
              // @ts-ignore
              onClick={handleUpdateUser}
              testId="navigation-action-login"
            >
              login
            </Button>{" "}
            to use this feature
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
        </div>
      </Container>
      <Container>
        <div
          className={classes}
          data-testid="header"
        >
          <div className="header__logo">
            <Button
              variant="icon"
              onClick={() => {
                window.location.href = "/";
                sessionStorage.removeItem("query");
              }}
              testId="header-logo"
            >
              MyMDb
              <span className="sr-only"> - My Movie Database Home page</span>
            </Button>
          </div>
          <div className="header__search">
            <h1 className="sr-only">{heading}</h1>
            <Search handleSearchState={setIsSearchOpen} />
          </div>
          <div className="header__login">
            <Login
              onClick={() => {
                toggleDrawer(true);
              }}
              user={user}
            />
          </div>
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
