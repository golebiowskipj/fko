import styled from "styled-components";
import { rgba } from "polished";
export const LeftWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  padding: 20px 10px;

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    padding: 40px;
  }
`;

export const RightWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${({ theme }) => rgba(theme.primary, 0.8)};

  padding: 20px 10px;
`;

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
