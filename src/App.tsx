import React from "react";
import "./App.scss";

import Button from "./components/button";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <div
      className="App"
      data-testid="app"
    >
      <header>
        <h1>Hello World test - auto deploy worked !!</h1>
        <Button>A Button</Button>
      </header>
    </div>
  );
};

export default App;
