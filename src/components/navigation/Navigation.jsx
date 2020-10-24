import React, { useContext, useEffect, useState } from "react";

import { withSignOut } from "../withSignOut/withSignOut";

import { UserContext } from "../../contexts/userContext/UserContext";
import { FirebaseContext } from "../../firebase";

import * as ROUTES from "../../configs/routes";
import { labels } from "../../configs/labels";
import { ADMIN } from "../../configs/roles";

import { LinkStyled, NavWrapper, NavList, SignOutButtonStyled } from "./styled";

const SignOutButton = withSignOut(SignOutButtonStyled);

const AuthNav = (isAdmin) => (
  <>
    <li>
      <LinkStyled to={ROUTES.HOME}>{labels.reservations}</LinkStyled>
    </li>
    {isAdmin ? (
      <li>
        <LinkStyled to={ROUTES.ADMIN}>{labels.adminPanel}</LinkStyled>
      </li>
    ) : null}
    <li>
      <SignOutButton>{labels.signOut}</SignOutButton>
    </li>
  </>
);

const NoAuthNav = (
  <>
    <li>
      <LinkStyled to={ROUTES.LANDING}>{labels.homePage}</LinkStyled>
    </li>
    <li>
      <LinkStyled to={ROUTES.SIGN_IN}>{labels.signIn}</LinkStyled>
    </li>
  </>
);

export const Navigation = () => {
  const [role, setRole] = useState(null);
  const firebaseContext = useContext(FirebaseContext);
  const userContext = useContext(UserContext);

  const { currentUser } = firebaseContext.auth;

  useEffect(() => {
    if (userContext) {
      setRole(userContext.role);
    }
  }, [userContext]);

  return (
    <NavWrapper>
      <NavList>{currentUser ? AuthNav(role === ADMIN) : NoAuthNav}</NavList>
    </NavWrapper>
  );
};
