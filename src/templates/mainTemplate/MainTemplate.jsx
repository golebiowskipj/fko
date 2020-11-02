import React from "react";

import { Col, InnerWrapper, Wrapper } from "./styled";

export const MainTemplate = ({ Left, Right }) => {
  return (
    <Wrapper>
      <InnerWrapper>
        <Col width="40%">
          <Left />
        </Col>
        <Col>
          <Right />
        </Col>
      </InnerWrapper>
    </Wrapper>
  );
};
