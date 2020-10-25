import React from "react";

import { Wrapper } from "./styled";

export const ApiMessager = ({ children, isVisible }) => {
  return <Wrapper isVisible={isVisible}>{children}</Wrapper>;
};
