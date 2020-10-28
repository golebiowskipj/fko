import React, { useContext } from "react";

import { withSignOut } from "../withSignOut/withSignOut";
import { AppDataContext } from "../../contexts/appDataContext";

import * as ROUTES from "../../configs/routes";
import { labels } from "../../configs/labels";
import { ADMIN } from "../../configs/roles";

import { LinkStyled, NavWrapper, NavList, SignOutButtonStyled } from "./styled";

const SignOutButton = withSignOut(SignOutButtonStyled);

const AuthNav = (isAdmin) => (
  <>
    <li>
      <LinkStyled to={ROUTES.HOME}>{labels.reserve}</LinkStyled>
    </li>
    <li>
      <LinkStyled to={ROUTES.MY_RESERVATIONS}>
        {labels.myReservations}
      </LinkStyled>
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

export const Navigation = ({ isAdmin }) => {
  const { userData } = useContext(AppDataContext);

  return (
    <NavWrapper>
      <NavList>{userData ? AuthNav(isAdmin === ADMIN) : NoAuthNav}</NavList>
    </NavWrapper>
  );
};
