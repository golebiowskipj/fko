import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px auto;
  padding: 0 10px;

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    padding: 0;
  }
`;
