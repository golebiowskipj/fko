import React from "react";

import logo from "../../assets/logo.png";

export const Logo = ({ styles }) => (
  <img
    alt="Fight Kompany"
    src={logo}
    style={{ display: "block", maxWidth: "100%", ...styles }}
  />
);
