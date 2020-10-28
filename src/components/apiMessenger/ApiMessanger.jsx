import React from "react";

import { Wrapper } from "./styled";

export const ApiMessenger = ({ children, isVisible }) => {
  return <Wrapper isVisible={isVisible}>{children}</Wrapper>;
};
