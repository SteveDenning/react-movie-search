import React, { useEffect, useState } from "react";

// Utils
import { getRequestToken, createSessionWithLogin, deleteSession, getAccountDetails } from "../../utils/get-resources";

// Views
import Search from "./../search";

// Components
import Button from "../../components/button";
import Modal from "../../components/modal";

// MUI
import { Container, Typography } from "@mui/material";

// Icons
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import TheatersIcon from "@mui/icons-material/Theaters";

// Styles
import "./header.scss";
import { useSearchParams } from "react-router-dom";

interface Props {
  heading: string;
}

const Header: React.FC<Props> = ({ heading }) => {
  const [open, setOpen] = useState(false);
  const [requestToken, setRequestToken] = useState<string>(null);
  const [username, setUsername] = useState<string>(sessionStorage.getItem("user"));
  const [searchParams, setSearchParams] = useSearchParams(window.location.search);

  const params = new URLSearchParams(searchParams);
  const requestTokenParam = params.get("request_token");
  const requestApproved = params.get("approved");
  const sessionId = sessionStorage.getItem("session_id");

  const handleGetRequestToken = () => {
    getRequestToken()
      .then((response: any) => {
        setRequestToken(response.data["request_token"]);
      })
      .catch((error) => console.error(error));
  };

  const handleAccountDetails = (sessionId) => {
    getAccountDetails(sessionId)
      .then((response: any) => {
        if (response.data["name"]) {
          const userInitials = response.data["name"].match(/\b(\w)/g).join("");
          sessionStorage.setItem("user", userInitials);

          setUsername(userInitials);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteSession = () => {
    if (sessionId) {
      deleteSession(sessionId)
        .then((response: any) => {
          if (response.data["success"]) {
            sessionStorage.removeItem("session_id");
            sessionStorage.removeItem("user");
            setUsername(null);
            setOpen(false);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const getSessionWithToken = () => {
    createSessionWithLogin({
      request_token: requestTokenParam, // Approved request token
    })
      .then((response) => {
        if (response["data"]["session_id"]) {
          setSearchParams({});
          sessionStorage.setItem("session_id", response["data"]["session_id"]);
          handleAccountDetails(response["data"]["session_id"]);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (requestToken) {
      window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/`;
    }
  }, [requestToken]);

  useEffect(() => {
    if (requestApproved && requestTokenParam) {
      getSessionWithToken();
    }
  }, [requestApproved]);

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
            onClick={() => setOpen(true)}
            className="header__login"
          >
            <span className="sr-only">Log in</span>
            {username ? <span className="header__user">{username}</span> : <Person3OutlinedIcon />}
          </Button>
        </div>
      </Container>
      <Modal
        id="log-in-modal"
        open={open}
        handleClose={() => setOpen(false)}
      >
        <h2>Login</h2>
        <Button onClick={handleGetRequestToken}>Login</Button>
        <Button
          onClick={handleDeleteSession}
          color="red"
        >
          Log Out
        </Button>
      </Modal>
    </header>
  );
};

export default Header;
