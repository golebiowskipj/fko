import React, { useContext, useState, useEffect } from "react";

import { AppDatePicker } from "../../components/appDatePicker";
import { AppTrainingPicker } from "../../components/appTrainingPicker";
import { SignToTrainingButton } from "../../components/signToTrainingButton";
import { CounterDisplay } from "../../components/counterDisplay";
import { SignedUsersList } from "../../components/signedUsersList";

import { AppDataContext } from "../../contexts/appDataContext";
import { FirebaseContext } from "../../firebase";
import { UserContext } from "../../contexts/userContext/UserContext";

import { convertDateToHumanReadable } from "../../helpers/helpers";
import { labels } from "../../configs/labels";
import { initialTrainingSelected } from "../../configs/initialValues";

import { Wrapper, WrapperColLeft, WrapperColRight } from "./styled";
import { ApiMessager } from "../../components/apiMessager/ApiMessager";

export const HomePage = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedTraining, setSelectedTraining] = useState(
    initialTrainingSelected
  );
  const [availablePlaces, setAvailablePlaces] = useState(null);
  const [apiResponseMessage, setApiResponseMessage] = useState(null);
  const [signedUsers, setSignedUsers] = useState([]);
  const firebaseContext = useContext(FirebaseContext);
  const userContext = useContext(UserContext);
  const { trainings } = useContext(AppDataContext);

  const apiMessageHandler = (message, ms) => {
    setApiResponseMessage(message);
    setTimeout(() => {
      setApiResponseMessage(null);
    }, ms);
  };

  const getSignedUsers = async () => {
    const users = await firebaseContext.getSignedUsers(
      selectedTraining,
      selectedDay
    );

    setSignedUsers(users);
  };

  useEffect(() => {
    getSignedUsers();
    getAvailablePlaces();
    // eslint-disable-next-line
  }, [selectedTraining, selectedDay, apiResponseMessage]);

  const handleDateChange = (date) => {
    setSelectedDay(date);
    setApiResponseMessage(null);
  };

  const handleTrainingChange = (e) => {
    const training = trainings.find((t) => t.value === e.target.value);
    setSelectedTraining(training);
    setApiResponseMessage(null);
  };

  const getAvailablePlaces = async () => {
    const places = await firebaseContext.getAvailablePlaces(
      selectedTraining,
      selectedDay
    );

    setAvailablePlaces(places);
  };

  const reserveTrainingSpot = async () => {
    const response = await firebaseContext.reserveTrainingSpot(
      userContext,
      selectedTraining,
      selectedDay,
      signedUsers
    );
    apiMessageHandler(response, 3000);
  };

  const handleSignOutFromTraining = async () => {
    const response = await firebaseContext.freeTrainingSpot(
      selectedTraining,
      selectedDay,
      signedUsers,
      userContext
    );
    apiMessageHandler(response, 3000);
  };

  const mapSelectedTrainingValueToName = (trainings) => {
    const training = trainings.find(
      (training) => training.value === selectedTraining.value
    );

    if (!training) return "";

    return training.name;
  };

  return (
    <Wrapper>
      <WrapperColLeft>
        <AppDatePicker
          selected={selectedDay}
          onChange={handleDateChange}
          headerLabel={labels.selectTrainingDay}
        />
        <AppTrainingPicker
          headerLabel={labels.selectTraining}
          handleTrainingChange={handleTrainingChange}
          selectedTraining={selectedTraining}
        />
        <CounterDisplay label={labels.availableSpots} value={availablePlaces} />
        <SignToTrainingButton
          label="Zapisz mnie"
          onClick={reserveTrainingSpot}
        />
      </WrapperColLeft>
      <WrapperColRight>
        <SignedUsersList
          headerLabel={`${labels.assignedTo} ${mapSelectedTrainingValueToName(
            trainings
          )} | ${convertDateToHumanReadable(selectedDay)}`}
          users={signedUsers}
          handleSignOutFromTraining={handleSignOutFromTraining}
        />
      </WrapperColRight>
      <ApiMessager isVisible={!!apiResponseMessage}>
        {apiResponseMessage}
      </ApiMessager>
    </Wrapper>
  );
};
