import styled from "styled-components";

export const Wrapper = styled.div`
  margin-bottom: 25px;

  & > span:last-child {
    color: ${({ theme }) => theme.primary};
  }
`;
