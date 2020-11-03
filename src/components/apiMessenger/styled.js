import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  background-color: ${({ theme }) => theme.white};
  width: 300px;
  height: 50px;
  top: 0;
  right: 0;
  transition: transform 0.2s ease;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.isVisible
      ? "transform: translateX(0)"
      : "transform: translateX(100%)"};
`;
