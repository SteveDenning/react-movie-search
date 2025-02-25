import React, { useState } from "react";

// Components
import Button from "../../components/button";
import List from "../../components/list";

// Config
import { config } from "../../config/routes";

// Hocs
import { useUserUpdate } from "../../hocs/with-user-provider";

// MUI
import { Box, Drawer } from "@mui/material";

// MUI Icons
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ClearIcon from "@mui/icons-material/Clear";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TheatersIcon from "@mui/icons-material/Theaters";

// Styles
import "./navigation.scss";

interface Props {
  toggleDrawer: (boolean) => void;
  user: any;
  open: boolean;
}

const Navigation: React.FC<Props> = ({ toggleDrawer, user, open }) => {
  const handleUpdateUser = useUserUpdate();

  const navOptions = [
    { label: config.home.name, path: config.home.path, icon: <TheatersIcon /> },
    { label: config.aiMedia.name, path: config.aiMedia.path, icon: <AutoAwesomeIcon /> },
    { label: config.favorites.name, path: config.favorites.path, icon: <FavoriteIcon /> },
  ];

  return (
    <div
      className="navigation"
      data-testid="navigation"
    >
      <Drawer
        className="navigation"
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
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="icon"
              onClick={() => toggleDrawer(false)}
            >
              <ClearIcon />
            </Button>
          </div>
          {user && (
            <List
              resources={navOptions}
              variant="link"
            />
          )}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
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
    </div>
  );
};

export default Navigation;
