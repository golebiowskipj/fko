import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.secondary};
  padding: 5px;
  margin-left: 10px;

  cursor: pointer;
`;
