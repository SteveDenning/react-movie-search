import React from "react";

// Icons
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";

// Components
import Button from "../button";

// Styles
import "./login.scss";

interface Props {
  children?: React.ReactNode;
  onClick: (boolean) => void;
  user: any;
}

const Login: React.FC<Props> = ({ onClick, user }) => {
  return (
    <Button
      className="login"
      variant="icon"
      onClick={() => onClick(true)}
      testId="login"
    >
      <span className="sr-only">User Profile</span>
      {user?.avatar?.tmdb?.avatar_path ? (
        <img
          className="login__avatar login__user--logged-in"
          src={`${process.env.REACT_APP_TMDB_IMAGE_PATH}/${user.avatar.tmdb.avatar_path}`}
          alt={user.name}
          data-testid="login-avatar"
        />
      ) : user?.name ? (
        <span
          className="login__user-initials login__user--logged-in"
          data-testid="login-user-initials"
        >
          {user.name.match(/\b(\w)/g).join("")}
        </span>
      ) : user ? (
        <span
          className="login__user-initials login__user--logged-in"
          data-testid="login-user-initial"
        >
          {user.username?.slice(0, 1).toUpperCase()}
        </span>
      ) : (
        <Person3OutlinedIcon />
      )}
    </Button>
  );
};

export default Login;
