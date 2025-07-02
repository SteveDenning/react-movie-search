import React, { useState, createContext, useContext, useEffect } from "react";

// Utils
import {
  getUserDoc,
  getAllUsers,
  addUser,
  createSessionWithAccessToken,
  deleteAccessToken,
  getRequestToken,
  getAccountDetails,
  getAccessToken,
} from "../services/user";

// Types
import { UserType } from "models/types";

const UserContext = createContext({});
const UserUpdateContext = createContext({});

export function useUser() {
  return useContext(UserContext);
}

export function useUserUpdate() {
  return useContext(UserUpdateContext);
}

interface Props {
  children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserType>(JSON.parse(sessionStorage.getItem("user")));

  const handleLogin = () => {
    getRequestToken()
      .then((response: any) => {
        const requestToken = response.data?.request_token;

        if (requestToken) {
          sessionStorage.setItem("request_token", requestToken);
          window.location.href = `https://www.themoviedb.org/auth/access?request_token=${requestToken}`;
        }
      })
      .catch((error) => console.error(error));
  };

  const handleLogOut = () => {
    const accessToken = sessionStorage.getItem("access_token");

    if (accessToken) {
      deleteAccessToken(accessToken)
        .then((response: any) => {
          if (response.data?.success) {
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("session_id");
            sessionStorage.removeItem("hide_message");

            setUser(null);
            window.location.href = "/";
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const getAccessTokenForSession = () => {
    const requestToken = sessionStorage.getItem("request_token");

    if (requestToken && !user) {
      getAccessToken({
        request_token: requestToken,
      })
        .then((response: any) => {
          const accessToken = response.data?.access_token;
          const accountId = response.data?.account_id;

          sessionStorage.setItem("access_token", accessToken);
          sessionStorage.setItem("account_id", accountId);

          if (accessToken) {
            createSession(accessToken);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const createSession = (accessToken: string) => {
    if (accessToken) {
      createSessionWithAccessToken({
        access_token: accessToken,
      })
        .then((response: any) => {
          const sessionId = response.data?.session_id;
          sessionStorage.setItem("session_id", sessionId);
          handleGetAccountDetails(sessionId);
        })
        .catch((error) => console.error(error));
    }
  };

  const addUserToDatabase = (user: UserType) => {
    getAllUsers().then((users: any[]) => {
      const userId = user?.id.toString();
      const existingUser = users.find((u) => u.id == userId);

      if (!existingUser) {
        addUser({ ...user, admin: false });
      }
    });
  };

  const handleIsUserAdmin = (userId: number, user: any) => {
    if (userId) {
      getUserDoc(userId.toString()).then((userData) => {
        const admin = userData?.admin || false;
        const update = { ...user, admin };

        setUser(update);
        sessionStorage.setItem("user", JSON.stringify(update));
        addUserToDatabase(update);
      });
    }
  };

  const handleGetAccountDetails = (sessionId: string) => {
    getAccountDetails(sessionId)
      .then((response: any) => {
        if (response.data?.username) {
          const accountId = sessionStorage.getItem("account_id");
          const accessToken = sessionStorage.getItem("access_token");
          const sessionId = sessionStorage.getItem("session_id");
          const update = { ...response.data, account_id: accountId, access_token: accessToken, session_id: sessionId };

          handleIsUserAdmin(update.id, update);
          sessionStorage.removeItem("account_id");
          sessionStorage.removeItem("request_token");
          sessionStorage.removeItem("session_id");
        }
      })
      .catch((error) => console.error(error));
  };

  function handleUpdateUser() {
    if (user) {
      handleLogOut();
    } else {
      handleLogin();
    }
  }

  useEffect(() => {
    getAccessTokenForSession();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={handleUpdateUser}>{children}</UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};
