import React, { useContext, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { AdminPage } from "./pages/adminPage";
import { HomePage } from "./pages/homePage";
import { LandingPage } from "./pages/landingPage";
import { MyReservationsPage } from "./pages/myReservationsPage";
import { NotFoundPage } from "./pages/notFoundPage";
import { SignUpPage } from "./pages/signUpPage";
import { SignInPage } from "./pages/signInPage";
import { VerifyEmailPage } from "./pages/verifyEmailPage";

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
    const setAppHeight = () => {
      const vh = window.innerHeight * 0.01;

      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    window.addEventListener("resize", setAppHeight);

    return () => {
      window.removeEventListener("resize", setAppHeight);
    };
  }, []);

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
            <Route exact path={ROUTES.SIGN_UP}>
              <SignUpPage />
            </Route>
            <Route exact path={ROUTES.SIGN_IN}>
              <SignInPage />
            </Route>
            <ProtectedRoute exact path={ROUTES.HOME}>
              <HomePage />
            </ProtectedRoute>
            {/* <ProtectedRoute path={ROUTES.MY_RESERVATIONS}>
              <MyReservationsPage />
            </ProtectedRoute> */}
            <ProtectedRoute
              exact
              path={ROUTES.ADMIN}
              isAdmin={isAdmin}
              isAdminRoute
            >
              <AdminPage />
            </ProtectedRoute>
            <Route exact path={ROUTES.VERIFY_EMAIL}>
              <VerifyEmailPage />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
