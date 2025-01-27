import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Utils
import {
  createSessionWithV4Token,
  getRequestToken,
  createSessionWithLogin,
  deleteSession,
  getAccountDetails,
  getAccountDetailsV4,
  getAccessToken,
} from "../../services/user";

// Config
import { config } from "../../config/routes";

// Types
import { UserType } from "../../models/types";

// Components
import Button from "../../components/button";
import List from "../../components/list";
import Login from "../../views/login";
import Search from "../../views/search";

// MUI
import { Box, Container, Drawer, Typography } from "@mui/material";

// MUI Icons
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ClearIcon from "@mui/icons-material/Clear";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TheatersIcon from "@mui/icons-material/Theaters";

// Styles
import "./header.scss";

interface Props {
  heading: string;
}

const Header: React.FC<Props> = ({ heading }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserType>(JSON.parse(sessionStorage.getItem("user")));

  const sessionId = sessionStorage.getItem("sessionId");

  const navOptions = [
    { label: config.home.name, path: config.home.path, icon: <TheatersIcon /> },
    { label: config.aiMedia.name, path: config.aiMedia.path, icon: <AutoAwesomeIcon /> },
    { label: config.favorites.name, path: config.favorites.path, icon: <FavoriteIcon /> },
    // { label: config.profile.name, path: config.profile.path },
  ];

  const handleGetRequestToken = () => {
    getRequestToken()
      .then((response: any) => {
        const requestToken = response.data["request_token"];

        if (requestToken) {
          sessionStorage.setItem("request_token", requestToken);
          window.location.href = `https://www.themoviedb.org/auth/access?request_token=${requestToken}`;
        }
      })
      .catch((error) => console.error(error));
  };

  const getAccessTokenForSession = () => {
    const requestToken = sessionStorage.getItem("request_token");

    if (requestToken) {
      getAccessToken({
        request_token: requestToken,
      })
        .then((response: any) => {
          console.log("Create Access Token", response);
          const accessToken = response.data["access_token"];
          const accountId = response.data["account_id"];
          sessionStorage.setItem("access_token", accessToken);
          sessionStorage.setItem("account_id", accountId);

          if (accessToken) {
            createSessionWithToken(accessToken);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const createSessionWithToken = (token: string) => {
    const accessToken = sessionStorage.getItem("access_token");

    if (accessToken) {
      createSessionWithV4Token({
        access_token: accessToken,
      })
        .then((response: any) => {
          handleAccountDetails(response.data["session_id"]);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleAccountDetails = (sessionId: string) => {
    getAccountDetails(sessionId)
      .then((response: any) => {
        if (response.data["username"]) {
          setUser(response.data);
          sessionStorage.setItem("user", JSON.stringify(response.data));
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteSession = () => {
    const accessToken = sessionStorage.getItem("access_token");
    if (accessToken) {
      deleteSession(accessToken)
        .then((response: any) => {
          if (response.data["success"]) {
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("request_token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("account_id");
            setUser(null);
            window.location.href = "/";
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const toggleDrawer = (state: boolean) => {
    setOpen(state);
  };

  useEffect(() => {
    getAccessTokenForSession();
  }, []);

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
                items={navOptions}
                variant="link"
              />
            )}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
              <Button
                variant="link"
                onClick={() => {
                  user ? handleDeleteSession() : handleGetRequestToken();
                }}
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
