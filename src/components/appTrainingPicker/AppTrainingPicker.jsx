import React, { useContext } from "react";

import { AppPickerHeader } from "../appPickerHeader";
import { TrainingButton } from "../trainingButton";

import { AppDataContext } from "../../contexts/appDataContext";

import { List, ListItem, Wrapper } from "./styled";

export const AppTrainingPicker = ({
  headerLabel,
  handleTrainingChange,
  selectedTraining,
}) => {
  const { trainings } = useContext(AppDataContext);

  return (
    <Wrapper>
      <AppPickerHeader>{headerLabel}</AppPickerHeader>
      <List>
        {trainings.map((training) => (
          <ListItem key={training.name}>
            <TrainingButton
              training={training}
              onClick={handleTrainingChange}
              isActive={selectedTraining.value === training.value}
            />
          </ListItem>
        ))}
      </List>
    </Wrapper>
  );
};
