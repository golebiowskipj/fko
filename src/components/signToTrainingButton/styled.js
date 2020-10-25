import styled from "styled-components";

export const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.primary};
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;
