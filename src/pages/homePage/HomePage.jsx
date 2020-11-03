import React, { useContext } from "react";

import { AppDatePicker } from "../../components/appDatePicker";
import { AppTrainingPicker } from "../../components/appTrainingPicker";
import { SignToTrainingButton } from "../../components/signToTrainingButton";
import { CounterDisplay } from "../../components/counterDisplay";
import { SignedUsersList } from "../../components/signedUsersList";

import { AppDataContext } from "../../contexts/appDataContext";
import { FirebaseContext } from "../../firebase";

import { labels } from "../../configs/labels";

import { LeftWrapper, RightWrapper } from "./styled";

import { MainTemplate } from "../../templates/mainTemplate";

export const HomePage = () => {
  const firebaseContext = useContext(FirebaseContext);
  const {
    refreshUserData,
    selectedDate,
    selectedTraining,
    trainings,
    userData,
  } = useContext(AppDataContext);

  const reserveTrainingSpot = async () => {
    const response = await firebaseContext.reserveTrainingSpot(
      selectedDate,
      selectedTraining,
      userData
    );

    refreshUserData();
  };

  const handleSignOutFromTraining = async () => {
    const response = await firebaseContext.freeTrainingSpot(
      selectedDate,
      selectedTraining,
      userData
    );

    refreshUserData();
  };

  const Left = () => (
    <LeftWrapper>
      <AppDatePicker headerLabel={labels.selectTrainingDay} />
      <AppTrainingPicker headerLabel={labels.selectTraining} />
      <CounterDisplay label={labels.availableSpots} />
      {trainings.length > 0 && (
        <SignToTrainingButton
          label="Zapisz mnie"
          onClick={reserveTrainingSpot}
        />
      )}
    </LeftWrapper>
  );

  const Right = () => (
    <RightWrapper>
      <SignedUsersList handleSignOutFromTraining={handleSignOutFromTraining} />
    </RightWrapper>
  );

  return (
    <MainTemplate Left={Left} Right={Right} leftWidth="60%" rightWidth="40%" />
  );
};
