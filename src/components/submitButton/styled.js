import styled from "styled-components";

export const Button = styled.button`
  display: block;
  background-color: ${({ theme }) => theme.secondary};
  border: none;
  padding: 10px 15px;
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontM};
  text-transform: uppercase;
  cursor: pointer;
`;
