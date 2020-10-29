import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter as Router } from "react-router-dom";

import { AppDataContainer } from "./contexts/appDataContext";
import { FirebaseContext, Firebase } from "./firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <AppDataContainer>
      <Router basename="/">
        <App />
      </Router>
    </AppDataContainer>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
