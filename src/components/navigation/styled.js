import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const navLink = css`
  color: ${({ theme }) => theme.secondary};
  font-size: ${({ theme }) => theme.fontM};
  padding: 10px;
  margin-left: 10px;
  text-decoration: none;

  &:first-child {
    margin-left: 0;
  }

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    font-size: ${({ theme }) => theme.fontL};
  }
`;

export const LinkStyled = styled(Link)`
  ${navLink}
`;

export const NavWrapper = styled.nav`
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  border-bottom: 2px solid ${({ theme }) => theme.secondary};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px 10px;
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
