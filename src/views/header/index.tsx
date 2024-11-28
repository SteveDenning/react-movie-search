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
  const [searchParams, setSearchParams] = useSearchParams(window.location.search);

  const params = new URLSearchParams(searchParams);
  const requestTokenParam = params.get("request_token");
  const sessionId = sessionStorage.getItem("session_id");

  const handleGetRequestToken = () => {
    getRequestToken()
      .then((response: any) => {
        setRequestToken(response.data["request_token"]);
      })
      .catch((error) => console.error(error));
  };

  const handleAccountDetails = () => {
    getAccountDetails(sessionId)
      .then((response: any) => {
        console.log(response);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteSession = () => {
    if (sessionId) {
      deleteSession(sessionId)
        .then((response) => {
          if (response["data"]["success"]) {
            sessionStorage.removeItem("session_id");
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
        setSearchParams({});
        sessionStorage.setItem("session_id", response["data"]["session_id"]);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (requestToken) {
      // window.open(`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/`, "_blank");
      window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/`;
    }
  }, [requestToken]);

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
            <Person3OutlinedIcon />
          </Button>
        </div>
      </Container>
      <Modal
        id="log-in-modal"
        open={open}
        handleClose={() => setOpen(false)}
      >
        <h2>TODO - Login in</h2>
        <Button onClick={handleGetRequestToken}>Approve Login</Button>
        <br /> <br />
        <Button
          onClick={getSessionWithToken}
          color="purple"
        >
          Create Session
        </Button>
        <br /> <br />
        <Button
          onClick={handleDeleteSession}
          color="red"
        >
          Delete Session
        </Button>
        <br /> <br />
        <Button onClick={handleAccountDetails}>Get Account Details</Button>
      </Modal>
    </header>
  );
};

export default Header;
