import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppMain from "./AppMain";

const App = () => {
  return (
    <BrowserRouter>
      <AppMain />
    </BrowserRouter>
  );
};

export default App;
