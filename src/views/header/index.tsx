import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Utils
import { getRequestToken, createSessionWithLogin, deleteSession, getAccountDetails } from "../../utils/get-resources";

// Components
import Search from "../../components/search";
import Button from "../../components/button";

// MUI
import { Box, Container, Drawer, Typography } from "@mui/material";

// Icons
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import TheatersIcon from "@mui/icons-material/Theaters";

// Styles
import "./header.scss";

interface Props {
  heading: string;
}

interface UserType {
  avatar: {
    tmdb: {
      avatar_path: string;
    };
  };
  id: string;
  name: string;
  username: string;
}

const Header: React.FC<Props> = ({ heading }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserType>(JSON.parse(sessionStorage.getItem("user")));
  const [searchParams, setSearchParams] = useSearchParams(window.location.search);

  const params = new URLSearchParams(searchParams);
  const sessionId = sessionStorage.getItem("sessionId");
  const environment = process.env.NODE_ENV;
  const redirectTo = environment === "development" ? "http://localhost:3000/" : "https://sd-react-movie-search.web.app/";

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

  const handleAccountDetails = (sessionId) => {
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
            setOpen(false);
            setUser(null);
            sessionStorage.removeItem("sessionId");
            sessionStorage.removeItem("user");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    getSessionWithToken();
  }, [params.get("request_token")]);

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
            onClick={toggleDrawer(true)}
            className="header__login"
          >
            <span className="sr-only">User Profile</span>
            {user?.avatar?.tmdb?.avatar_path ? (
              <img
                className="header__avatar"
                src={`https://image.tmdb.org/t/p/original/${user.avatar.tmdb.avatar_path}`}
                alt={user.name}
              />
            ) : user?.name ? (
              <span className="header__user">{user.name.match(/\b(\w)/g).join("")}</span>
            ) : (
              <Person3OutlinedIcon />
            )}
          </Button>
        </div>
        {/* TODO - move to navigation component */}
        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
          anchor="right"
          PaperProps={{
            sx: {
              width: 300,
              bgcolor: "#555",
            },
          }}
        >
          <Box sx={{ mt: 5, mx: 2.5 }}>
            {sessionId && (
              <ul style={{ margin: "0", padding: "20px" }}>
                <li>
                  <a href="">TODO - Profile page</a>
                </li>
                <li>
                  <a href="">TODO - Lists</a>
                </li>
              </ul>
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
