import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { AppDataContainer } from "./contexts/appDataContext";
import { FirebaseContext, Firebase } from "./firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <AppDataContainer>
      <App />
    </AppDataContainer>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
