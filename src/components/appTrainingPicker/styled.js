import styled from "styled-components";

export const Wrapper = styled.div`
  margin-bottom: 15px;
`;

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    flex-direction: row;
  }
`;

export const ListItem = styled.li`
  margin-right: 10px;
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  @media (min-width: ${({ theme }) => theme.mobileBP}) {
    margin-top: 0;
  }
`;
