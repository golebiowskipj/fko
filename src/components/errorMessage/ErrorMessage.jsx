import React from "react";

export const ErrorMessage = ({ error, isVisible }) =>
  isVisible ? <p>{error}</p> : null;
