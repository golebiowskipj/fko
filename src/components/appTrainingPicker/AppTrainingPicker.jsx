import React, { useContext } from "react";

import { AppPickerHeader } from "../appPickerHeader";
import { TrainingButton } from "../trainingButton";

import { AppDataContext } from "../../contexts/appDataContext";

import { List, ListItem, Wrapper } from "./styled";

export const AppTrainingPicker = ({ headerLabel }) => {
  const { trainings, handleSelectTraining, selectedTraining } = useContext(
    AppDataContext
  );

  console.log(selectedTraining);

  return (
    <Wrapper>
      <AppPickerHeader>{headerLabel}</AppPickerHeader>
      <List>
        {trainings.map((training) => (
          <ListItem key={training.name}>
            <TrainingButton
              isActive={selectedTraining.value === training.value}
              trainingName={training.name}
              onClick={() => handleSelectTraining(training)}
            />
          </ListItem>
        ))}
      </List>
    </Wrapper>
  );
};
