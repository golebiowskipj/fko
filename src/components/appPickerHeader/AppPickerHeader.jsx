import React from "react";

import { AppPickerHeaderStyled } from "./styled";

export const AppPickerHeader = ({ children, styles }) => (
  <AppPickerHeaderStyled style={styles}>{children}</AppPickerHeaderStyled>
);
