import React from "react";

// MUI
import CssBaseline from "@mui/material/CssBaseline";

// Styles
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface Props {
  children: React.ReactNode;
}

const theme = createTheme({
  typography: {
    fontFamily: "Gothic,Arial,sans-serif",
  },
  palette: {
    mode: "dark",
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          "&.MuiContainer-maxWidthSm": {
            maxWidth: "400px",
          },
          "&.MuiContainer-maxWidthMd": {
            maxWidth: "600px",
          },
          "&.MuiContainer-maxWidthLg": {
            maxWidth: "1400px",
          },
        },
      },
    },
  },
});

const MUILayout: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MUILayout;
