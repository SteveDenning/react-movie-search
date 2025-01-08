import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Utils
import { getRequestToken, createSessionWithLogin, deleteSession, getAccountDetails } from "../../services/user";

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
import TheatersIcon from "@mui/icons-material/Theaters";
import ClearIcon from "@mui/icons-material/Clear";

// Styles
import "./header.scss";

interface Props {
  heading: string;
}

const Header: React.FC<Props> = ({ heading }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserType>(JSON.parse(sessionStorage.getItem("user")));
  const [searchParams, setSearchParams] = useSearchParams(window.location.search);

  const params = new URLSearchParams(searchParams);
  const token = params.get("request_token");
  const sessionId = sessionStorage.getItem("sessionId");
  const environment = process.env.NODE_ENV;
  const redirectTo = environment === "development" ? "http://localhost:3000/" : "https://sd-react-movie-search.web.app/";

  const navOptions = [
    { label: config.home.name, path: config.home.path },
    { label: config.favorites.name, path: config.favorites.path },
    { label: config.profile.name, path: config.profile.path },
  ];

  const handleGetRequestToken = () => {
    getRequestToken()
      .then((response: any) => {
        const requestToken = response.data["request_token"];

        if (requestToken) {
          window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectTo}`;
        }
      })
      .catch((error) => console.error(error));
  };

  const getSessionWithToken = () => {
    const requestToken = params.get("request_token");

    if (requestToken) {
      createSessionWithLogin({
        request_token: requestToken,
      })
        .then((response: any) => {
          const sessionID = response.data["session_id"];

          if (sessionID) {
            setSearchParams({});
            sessionStorage.setItem("sessionId", sessionID);
            handleAccountDetails(sessionID);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const handleAccountDetails = (sessionId: string) => {
    getAccountDetails(sessionId)
      .then((response: any) => {
        if (response.data["name"]) {
          setUser(response.data);
          sessionStorage.setItem("user", JSON.stringify(response.data));
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteSession = () => {
    if (sessionId) {
      deleteSession(sessionId)
        .then((response: any) => {
          if (response.data["success"]) {
            sessionStorage.removeItem("sessionId");
            sessionStorage.removeItem("user");
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
    getSessionWithToken();
  }, [token]);

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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="link"
                onClick={() => {
                  sessionId ? handleDeleteSession() : handleGetRequestToken();
                }}
                color="red"
              >
                {sessionId ? "Log Out" : "Login"}
              </Button>
            </div>
          </Box>
        </Drawer>
      </Container>
    </header>
  );
};

export default Header;
