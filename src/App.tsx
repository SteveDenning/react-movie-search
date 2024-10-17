import React from "react";
import "./App.scss";

import { AccessAlarm } from "@mui/icons-material";
import Button from "./components/button";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <div
      className="App"
      data-testid="app"
    >
      <header>
        <h1>Hello World test</h1>
        <Button>
          <AccessAlarm sx={{ color: "red" }} />
          Hello World
        </Button>
      </header>
    </div>
  );
};

export default App;
