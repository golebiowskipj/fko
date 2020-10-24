import styled from "styled-components";

export const AppFormFieldWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  & > p:last-child {
    position: absolute;
    left: 0;
    bottom: -15px;
    font-size: 10px;
    color: ${({ theme }) => theme.primary};
  }
`;
