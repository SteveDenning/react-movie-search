import React from "react";

// Components
import Button from "../../components/button";
import List from "../../components/list";

// Hocs
import { useUser, useUserUpdate } from "../../hocs/with-user-provider";

// MUI
import { Box, Drawer } from "@mui/material";

// MUI Icons
import ClearIcon from "@mui/icons-material/Clear";

// Types
import { NavItemType } from "../../models/types";

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

  return (
    <Drawer
      className="navigation"
      data-testid="navigation"
      open={open}
      onClose={toggleDrawer}
      anchor="right"
      PaperProps={{
        sx: {
          width: 300,
          bgcolor: "#000",
        },
      }}
    >
      <Box sx={{ mt: 2, mx: 2.5 }}>
        <div className="navigation__action-close">
          <Button
            variant="icon"
            onClick={() => toggleDrawer(false)}
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
            color="red"
          >
            {user ? "Log Out" : "Login"}
          </Button>
        </div>
      </Box>
    </Drawer>
  );
};

export default Navigation;
