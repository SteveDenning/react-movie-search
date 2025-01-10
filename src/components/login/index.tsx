import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// Utils
import { getRequestToken, createSessionWithLogin, deleteSession, getAccountDetails } from "../../services/user";

// Components
import Button from "../button";

// MUI Icons

// Styles
import "./login.scss";

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams(window.location.search);

  const params = new URLSearchParams(searchParams);
  const token = params.get("request_token");
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

  const handleAccountDetails = (sessionId: string) => {
    getAccountDetails(sessionId)
      .then((response: any) => {
        if (response.data["name"]) {
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
            window.location.href = "/";
          }
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    getSessionWithToken();
  }, [token]);

  return (
    <Button
      variant="link"
      onClick={() => {
        sessionId ? handleDeleteSession() : handleGetRequestToken();
      }}
      color="red"
    >
      {sessionId ? "Log Out" : "Login"}
    </Button>
  );
};

export default Login;
