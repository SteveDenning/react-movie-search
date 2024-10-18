import React from "react";

// Components
import CssBaseline from "@mui/material/CssBaseline";

// Styles
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface Props {
  children: any;
}

const setSpacing = (factor: any) => {
  const width = window.innerWidth;
  if (width < 600) {
    return 12 * factor;
  } else {
    return 8 * factor;
  }
};

const theme = createTheme({
  spacing: setSpacing,
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
