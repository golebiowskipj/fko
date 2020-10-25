import styled from "styled-components";
import { Link } from "react-router-dom";

export const LinkStyled = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.secondary};
`;

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 10px;
  margin: 30px auto;

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    max-width: 90vw;
    flex-direction: row;
  }
`;

export const WrapperColLeft = styled.div``;

export const WrapperColRight = styled.div`
  padding: 0;
  margin-top: 30px;

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    padding: 30px 50px;
    margin-top: 0;
  }
`;