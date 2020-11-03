import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid ${({ theme }) => theme.secondary};
`;

export const Button = styled.button`
  color: ${({ theme }) => theme.secondary};
  border: none;
  background-color: transparent;
  font-size: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;
