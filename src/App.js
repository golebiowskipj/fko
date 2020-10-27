import React, { useState, useContext, useEffect } from "react";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
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

import { FirebaseContext } from "./firebase";
import { UserContext } from "./contexts/userContext/UserContext";
import { AppDataContainer } from "./contexts/appDataContext";

import { ADMIN } from "./configs/roles";
import * as ROUTES from "./configs/routes";
import { theme } from "./configs/theme";
import { GlobalStyle } from "./configs/globalStyles";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const firebaseContext = useContext(FirebaseContext);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);

  useEffect(() => {
    const authSub = () => {
      setIsLoadingUserData(true);
      firebaseContext.auth.onAuthStateChanged(async (authUser) => {
        if (authUser) {
          try {
            const user = await firebaseContext.getUser(authUser.uid);
            setCurrentUser({
              email: user.email,
              uid: user.uid,
              userName: user.userName,
            });
            setIsAdmin(user.role === ADMIN);
            setIsLoadingUserData(false);
          } catch (error) {
            console.log(error);
            setIsLoadingUserData(false);
          }
        } else {
          setCurrentUser(null);
          setIsAdmin(false);
          setIsLoadingUserData(false);
        }
      });
    };

    authSub();

    return () => {
      authSub();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <AppDataContainer>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {isLoadingUserData ? (
          <AppLoader />
        ) : (
          <UserContext.Provider value={currentUser}>
            <Router basename="/">
              <Navigation />
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
                <ProtectedRoute path={ROUTES.MY_RESERVATIONS}>
                  <MyReservationsPage />
                </ProtectedRoute>
                <ProtectedRoute
                  path={ROUTES.ADMIN}
                  isAdmin={isAdmin}
                  isAdminRoute
                >
                  <AdminPage />
                </ProtectedRoute>
              </Switch>
            </Router>
          </UserContext.Provider>
        )}
      </ThemeProvider>
    </AppDataContainer>
  );
}

export default App;
