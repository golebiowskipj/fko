import React from "react";

import { AppPickerButton } from "../appPickerButton";

import { BeltIcon } from "../beltIcon";
import { PunchingBagIcon } from "../punchingBagIcon";
import { RoundIcon } from "../roundIcon";
import { ShoeIcon } from "../shoeIcon";

const iconsMap = {
  boks19: <PunchingBagIcon />,
  boks20: <BeltIcon />,
  obwody18: <RoundIcon />,
  poranny: <ShoeIcon />,
};

const trainingIcon = (trainingValue) => {
  return iconsMap.hasOwnProperty(trainingValue)
    ? iconsMap[trainingValue]
    : null;
};

export const TrainingButton = ({
  isActive = false,
  onClick,
  trainingName,
  trainingValue,
}) => {
  return (
    <AppPickerButton isActive={isActive} onClick={onClick}>
      <span>{trainingName}</span>
      {trainingIcon(trainingValue)}
    </AppPickerButton>
  );
};
