import React from "react";

import { Wrapper } from "./styled";

export const CounterDisplay = ({ label, value }) => (
  <Wrapper>
    <span>{label}</span>
    <span>{value}</span>
  </Wrapper>
);
