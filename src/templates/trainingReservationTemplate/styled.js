import styled from "styled-components";

export const Wrapper = styled.section`
  background-color: tomato;
  padding: 10px;
  margin: 0 auto;
  display: flex;

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    padding: 0;
    max-width: 90vw;
    justify-content: space-between;
  }
`;
