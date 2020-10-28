import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.white};
  width: 300px;
  height: 50px;
  top: 50%;
  right: 0;
  transition: transform 0.5s ease;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.isVisible
      ? "transform: translateX(-20px) translateY(50%)"
      : "transform: translateX(100%) translateY(50%)"};
`;
