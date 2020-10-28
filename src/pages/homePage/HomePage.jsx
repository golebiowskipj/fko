import React, { useContext, useState } from "react";

import { AppDatePicker } from "../../components/appDatePicker";
import { ApiMessenger } from "../../components/apiMessenger/ApiMessanger";
import { AppTrainingPicker } from "../../components/appTrainingPicker";
import { SignToTrainingButton } from "../../components/signToTrainingButton";
import { CounterDisplay } from "../../components/counterDisplay";
import { SignedUsersList } from "../../components/signedUsersList";

import { AppDataContext } from "../../contexts/appDataContext";
import { FirebaseContext } from "../../firebase";

import { labels } from "../../configs/labels";

import { Wrapper, WrapperColLeft, WrapperColRight } from "./styled";

export const HomePage = () => {
  const [apiResponseMessage, setApiResponseMessage] = useState(null);
  const firebaseContext = useContext(FirebaseContext);
  const {
    refreshUserData,
    selectedDate,
    selectedTraining,
    userData,
  } = useContext(AppDataContext);

  const apiMessageHandler = (message, ms) => {
    setApiResponseMessage(message);
    setTimeout(() => {
      setApiResponseMessage(null);
    }, ms);
  };

  const reserveTrainingSpot = async () => {
    const response = await firebaseContext.reserveTrainingSpot(
      selectedDate,
      selectedTraining,
      userData
    );

    refreshUserData();

    apiMessageHandler(response.message, 3000);
  };

  const handleSignOutFromTraining = async () => {
    const response = await firebaseContext.freeTrainingSpot(
      selectedDate,
      selectedTraining,
      userData
    );

    refreshUserData();

    apiMessageHandler(response.message, 3000);
  };

  return (
    <Wrapper>
      <WrapperColLeft>
        <AppDatePicker headerLabel={labels.selectTrainingDay} />
        <AppTrainingPicker headerLabel={labels.selectTraining} />
        <CounterDisplay label={labels.availableSpots} />
        <SignToTrainingButton
          label="Zapisz mnie"
          onClick={reserveTrainingSpot}
        />
      </WrapperColLeft>
      <WrapperColRight>
        <SignedUsersList
          handleSignOutFromTraining={handleSignOutFromTraining}
        />
      </WrapperColRight>
      <ApiMessenger isVisible={!!apiResponseMessage}>
        {apiResponseMessage}
      </ApiMessenger>
    </Wrapper>
  );
};
