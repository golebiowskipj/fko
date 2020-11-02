import styled, { css } from "styled-components";

export const Col = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ width }) =>
    !width
      ? css`
          flex-grow: 1;
        `
      : null}

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    width: ${({ width }) => (width ? width : "50%")};
  }
`;

export const InnerWrapper = styled.div`
  width: ${({ width }) => (width ? width : "100%")};
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    flex-direction: row;
  }
`;

export const Wrapper = styled.section`
  width: 100%;
  max-width: 1000px;

  margin: 0 auto;

  display: flex;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    width: 80vw;
    padding: 20px 0;
    margin: 100px auto;
  }
`;
