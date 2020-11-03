import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary};
  padding: 20px;
  border-radius: 3px;
  cursor: pointer;

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.secondary};
  }
`;
