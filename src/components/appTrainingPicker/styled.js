import styled from "styled-components";

export const Wrapper = styled.div`
  margin-bottom: 15px;
`;

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    flex-direction: row;
  }
`;

export const ListItem = styled.li`
  margin-top: 10px;

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    margin-top: 10px;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
`;
