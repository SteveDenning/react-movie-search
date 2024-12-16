import React from "react";

// Icons
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";

// Components
import Button from "../../components/button";

// Styles
import "./login.scss";

type UserType = {
  name: string;
  avatar: {
    tmdb: {
      avatar_path: string;
    };
  };
};

interface Props {
  children?: React.ReactNode;
  onClick: (boolean) => void;
  user: UserType;
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
          className="login__avatar"
          src={`https://image.tmdb.org/t/p/original/${user.avatar.tmdb.avatar_path}`}
          alt={user.name}
        />
      ) : user?.name ? (
        <span className="login__user">{user.name.match(/\b(\w)/g).join("")}</span>
      ) : (
        <Person3OutlinedIcon />
      )}
    </Button>
  );
};

export default Login;
