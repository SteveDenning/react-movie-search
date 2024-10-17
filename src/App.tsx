import React from "react";
import "./App.scss";

import { AccessAlarm } from "@mui/icons-material";
import Button from "./components/button";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World</h1>
        <Button>
          <AccessAlarm sx={{ color: "red" }} />
          Hello World
        </Button>
      </header>
    </div>
  );
};

export default App;
