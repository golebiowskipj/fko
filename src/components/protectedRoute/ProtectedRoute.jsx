import React, { useContext, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { FirebaseContext } from "../../firebase";

import { LANDING } from "../../configs/routes";

export const ProtectedRoute = ({
  children,
  path,
  isAdmin = false,
  isAdminRoute = false,
}) => {
  const firebaseContext = useContext(FirebaseContext);
  const { currentUser } = firebaseContext.auth;

  const granted = <Route path={path}>{children}</Route>;
  const denied = <Redirect to={LANDING} />;

  if (isAdminRoute) {
    return isAdmin ? granted : denied;
  } else {
    return currentUser ? granted : denied;
  }
};
