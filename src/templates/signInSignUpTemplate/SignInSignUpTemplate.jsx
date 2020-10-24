import React from "react";

import { Logo } from "../../components/logo";

import { Wrapper } from "./styled";

export const SignInSignUpTemplate = ({ children }) => (
  <Wrapper>
    <Logo styles={{ width: "200px", marginBottom: "30px" }} />
    {children}
  </Wrapper>
);
