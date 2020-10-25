import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 0 10px;
  margin: 30px auto;

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    max-width: 90vw;
    flex-direction: row;
  }
`;

export const WrapperColLeft = styled.div``;

export const WrapperColRight = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding: 0;

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    margin-top: 0;
    padding: 0 30px;
  }
`;
