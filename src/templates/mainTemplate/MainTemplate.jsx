import React from "react";

import { Col, InnerWrapper, Wrapper } from "./styled";

export const MainTemplate = ({
  Left,
  Right,
  leftWidth = "40%",
  rightWidth = "60%",
}) => {
  return (
    <Wrapper>
      <InnerWrapper>
        <Col width={leftWidth}>
          <Left />
        </Col>
        <Col width={rightWidth}>
          <Right />
        </Col>
      </InnerWrapper>
    </Wrapper>
  );
};
