import styled from "styled-components";
import { Link } from "react-router-dom";

export const RegisterLink = styled(Link)`
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontM};
  color: ${({ theme }) => theme.primary};
  margin-left: 5px;
`;

export const RegisterWrapper = styled.div`
  display: flex;
  margin-top: 30px;
`;

export const SignInPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 25px auto;
`;
