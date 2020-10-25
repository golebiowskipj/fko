import React from "react";

import { Button } from "./styled";

export const SignToTrainingButton = ({ label, onClick }) => (
  <Button onClick={onClick}>{label}</Button>
);
