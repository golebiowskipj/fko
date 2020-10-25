import styled from "styled-components";

export const List = styled.ul`
  list-style: none;
`;

export const Wrapper = styled.section`
  padding: 10px;
  margin: 0 auto;
  margin-top: 30px;

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    padding: 0;
    max-width: 90vw;
  }
`;

export const Item = styled.li``;
