import styled from "styled-components";

export const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.fontS};
  margin-bottom: 5px;
`;

export const InputStyled = styled.input`
  display: block;
  width: 100%;
  padding: 5px;
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.secondary};

  &:focus {
    outline: none;
    border: 2px solid black;
    padding: 4px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
