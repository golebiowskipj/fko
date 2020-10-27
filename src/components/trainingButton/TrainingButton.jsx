import React from "react";

import { AppPickerButton } from "../appPickerButton";

export const TrainingButton = ({ isActive = false, onClick, trainingName }) => {
  return (
    <AppPickerButton isActive={isActive} onClick={onClick}>
      {trainingName}
    </AppPickerButton>
  );
};
