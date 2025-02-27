import React from "react";

// Components
import Button from "../../components/button";
import List from "../../components/list";

// Hocs
import { useUser, useUserUpdate } from "../../hocs/with-user-provider";

// MUI
import { Drawer } from "@mui/material";

// MUI Icons
import ClearIcon from "@mui/icons-material/Clear";

// Types
import { NavItemType } from "../../models/types";

// Utils
import useScreenSize from "../../utils/use-screen-size";

// Styles
import "./navigation.scss";

interface Props {
  toggleDrawer: (boolean) => void;
  open: boolean;
  navItems: NavItemType[];
}

const Navigation: React.FC<Props> = ({ toggleDrawer, open, navItems }) => {
  const handleUpdateUser = useUserUpdate();
  const user = useUser();

  const screenSize = useScreenSize();
  const navWidth = screenSize.width <= 1024 ? 200 : 300;

  return (
    <Drawer
      className="navigation"
      data-testid="navigation"
      open={open}
      onClick={() => toggleDrawer(false)}
      anchor="right"
      PaperProps={{
        sx: {
          width: navWidth,
          bgcolor: "#000",
        },
      }}
    >
      <div className="navigation__inner">
        <div className="navigation__action-close">
          <Button
            variant="icon"
            onClick={() => toggleDrawer(false)}
            testId="navigation-action-close"
          >
            <ClearIcon />
          </Button>
        </div>
        {user && (
          <List
            resources={navItems}
            variant="link"
          />
        )}
        <div className="navigation__action-login">
          <Button
            variant="link"
            // @ts-ignore
            onClick={handleUpdateUser}
            testId="navigation-action-login"
          >
            {user ? "Log Out" : "Login"}
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default Navigation;
