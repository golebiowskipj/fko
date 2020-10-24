import React from "react";

import { TrainingButton } from "../trainingButton";

export const AppTrainingPicker = ({
  headerLabel,
  handleTrainingChange,
  trainings,
}) => {
  return (
    <>
      <h2>{headerLabel}</h2>
      <ul></ul>
      {trainings.map((training) => (
        <li key={training.name}>
          <TrainingButton training={training} onClick={handleTrainingChange} />
        </li>
      ))}
    </>
  );
};
