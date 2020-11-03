import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
  padding: 10px;
  max-width: 900px;

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    width: 90vw;
    padding: 0;
    margin: 100px auto;
  }
`;
