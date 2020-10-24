import React from "react";

export const TrainingButton = ({ training, onClick }) => (
  <button value={training.value} onClick={onClick}>
    {training.name}
  </button>
);
