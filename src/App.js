import React, { useContext, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { AdminPage } from "./pages/adminPage";
import { HomePage } from "./pages/homePage";
import { LandingPage } from "./pages/landingPage";
import { MyReservationsPage } from "./pages/myReservationsPage";
import { SignUpPage } from "./pages/signUpPage";
import { SignInPage } from "./pages/signInPage";

import { AppLoader } from "./components/appLoader";
import { Navigation } from "./components/navigation";
import { ProtectedRoute } from "./components/protectedRoute";

import { AppDataContext } from "./contexts/appDataContext";

import * as ROUTES from "./configs/routes";
import { theme } from "./configs/theme";
import { GlobalStyle } from "./configs/globalStyles";

function App() {
  const { isLoading, isAdmin, userData } = useContext(AppDataContext);
  const history = useHistory();

  useEffect(() => {
    if (userData) {
      history.push(ROUTES.HOME);
    }
  }, [userData]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {isLoading ? (
        <AppLoader />
      ) : (
        <>
          <Navigation isAdmin={isAdmin} />
          <Switch>
            <Route exact path={ROUTES.LANDING}>
              <LandingPage />
            </Route>
            <Route path={ROUTES.SIGN_UP}>
              <SignUpPage />
            </Route>
            <Route path={ROUTES.SIGN_IN}>
              <SignInPage />
            </Route>
            <ProtectedRoute path={ROUTES.HOME}>
              <HomePage />
            </ProtectedRoute>
            {/* <ProtectedRoute path={ROUTES.MY_RESERVATIONS}>
              <MyReservationsPage />
            </ProtectedRoute> */}
            <ProtectedRoute path={ROUTES.ADMIN} isAdmin={isAdmin} isAdminRoute>
              <AdminPage />
            </ProtectedRoute>
          </Switch>
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
