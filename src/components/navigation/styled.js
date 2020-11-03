import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const navLink = css`
  color: ${({ theme }) => theme.secondary};
  font-size: 32px;
  /* padding: 10px; */
  margin-left: 10px;
  text-decoration: none;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    font-size: 24px;
  }
`;

export const LinkStyled = styled(Link)`
  ${navLink}
`;

export const NavWrapper = styled.nav`
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px;
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 400px;
  margin: 0;

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    justify-content: flex-end;
    max-width: 100%;
  }
`;

export const SignOutButtonStyled = styled.a`
  ${navLink};
  cursor: pointer;
`;
