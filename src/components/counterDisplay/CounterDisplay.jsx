import React, { useContext } from "react";

import { AppDataContext } from "../../contexts/appDataContext";

import { Wrapper } from "./styled";

export const CounterDisplay = ({ label }) => {
  const { availableSpots, trainings } = useContext(AppDataContext);
  return (
    trainings.length !== 0 && (
      <Wrapper>
        <span>{label}</span>
        <span>{availableSpots}</span>
      </Wrapper>
    )
  );
};
