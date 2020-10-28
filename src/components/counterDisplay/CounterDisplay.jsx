import React, { useContext } from "react";

import { AppDataContext } from "../../contexts/appDataContext";

import { Wrapper } from "./styled";

export const CounterDisplay = ({ label }) => {
  const { availableSpots } = useContext(AppDataContext);
  return (
    <Wrapper>
      <span>{label}</span>
      <span>{availableSpots}</span>
    </Wrapper>
  );
};
