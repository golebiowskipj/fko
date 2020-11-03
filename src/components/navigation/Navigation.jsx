import React, { useContext } from "react";
import {
  IoIosLogIn,
  IoIosCalendar,
  IoIosHome,
  IoIosLogOut,
  IoIosPeople,
} from "react-icons/io";

import { withSignOut } from "../withSignOut/withSignOut";
import { AppDataContext } from "../../contexts/appDataContext";

import * as ROUTES from "../../configs/routes";

import { LinkStyled, NavWrapper, NavList, SignOutButtonStyled } from "./styled";

const SignOutButton = withSignOut(SignOutButtonStyled);

const AuthNav = (isAdmin) => (
  <>
    <li>
      <LinkStyled to={ROUTES.HOME}>
        <IoIosCalendar />
      </LinkStyled>
    </li>
    {isAdmin ? (
      <li>
        <LinkStyled to={ROUTES.ADMIN}>
          <IoIosPeople />
        </LinkStyled>
      </li>
    ) : null}
    <li>
      <SignOutButton>
        <IoIosLogOut />
      </SignOutButton>
    </li>
  </>
);

const NoAuthNav = (
  <>
    <li>
      <LinkStyled to={ROUTES.LANDING}>
        <IoIosHome />
      </LinkStyled>
    </li>
    <li>
      <LinkStyled to={ROUTES.SIGN_IN}>
        <IoIosLogIn />
      </LinkStyled>
    </li>
  </>
);

export const Navigation = ({ isAdmin }) => {
  const { userData } = useContext(AppDataContext);

  return (
    <NavWrapper>
      <NavList>{userData ? AuthNav(isAdmin) : NoAuthNav}</NavList>
    </NavWrapper>
  );
};
