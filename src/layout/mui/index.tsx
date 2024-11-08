import React from "react";

// MUI
import CssBaseline from "@mui/material/CssBaseline";

// Styles
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface Props {
  children: any;
}

const theme = createTheme({
  typography: {
    fontFamily: "Inter,Arial,sans-serif",
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
