import React from "react";

import { AppPickerButton } from "../appPickerButton";

export const TrainingButton = ({ onClick, isActive = false, training }) => {
  return (
    <AppPickerButton
      isActive={isActive}
      value={training.value}
      onClick={onClick}
    >
      {training.name}
    </AppPickerButton>
  );
};
