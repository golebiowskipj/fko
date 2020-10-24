import React from "react";

import { InputLabel, InputStyled, InputWrapper } from "./styled";

export const AppFormInput = ({ type, label, ...otherProps }) => (
  <InputWrapper>
    <InputLabel>{label}</InputLabel>
    <InputStyled type={type} {...otherProps} />
  </InputWrapper>
);
