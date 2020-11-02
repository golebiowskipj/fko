import styled, { css } from "styled-components";
import { rgba } from "polished";

const activeState = css`
  background: ${({ theme }) => rgba(theme.secondary, 0.1)};
`;

export const AppPickerButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;

  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;

  width: 100%;

  & > span {
    margin-bottom: 10px;
    font-size: 18px;
  }

  & > svg {
    margin: 0;
    width: 40px;
    height: auto;
  }

  &:focus {
    outline: none;
    border-width: 2px;
    padding: 4px 9px;
  }

  ${(props) => (props.isActive ? activeState : null)}

  @media(min-width: ${({ theme }) => theme.mobileBP} ) {
    width: auto;
  }
`;
