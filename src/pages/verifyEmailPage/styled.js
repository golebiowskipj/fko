import styled from "styled-components";

export const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
`;

export const Text = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontM};
  margin-bottom: 20px;
`;
