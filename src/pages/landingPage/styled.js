import styled from "styled-components";
import { rgba } from "polished";
import { Link } from "react-router-dom";

export const LinkStyled = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.secondary};
`;

export const LogoWrapper = styled.div`
  background-color: ${({ theme }) => rgba(theme.primary, 0.8)};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const RightWrapper = styled.div`
  background-color: ${({ theme }) => theme.white};
  width: 100%;
  height: 100%;
  padding: 20px 10px;

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    padding: 40px;
  }
`;
