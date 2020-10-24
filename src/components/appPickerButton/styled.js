import styled, { css } from "styled-components";

const activeState = css`
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.white};
`;

export const AppPickerButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-width: 2px;
    padding: 4px 9px;
  }

  ${(props) => (props.isActive ? activeState : null)}
`;
