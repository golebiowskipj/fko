import React, { useState, useEffect, useContext } from "react";

import { AppDatePicker } from "../../components/appDatePicker";
import { AppTrainingPicker } from "../../components/appTrainingPicker";
import { CounterDisplay } from "../../components/counterDisplay";
import { Logo } from "../../components/logo";

import { FirebaseContext } from "../../firebase/";
import { UserContext } from "../../contexts/userContext/UserContext";

import { labels } from "../../configs/labels";
import { HOME, SIGN_IN } from "../../configs/routes";
import {
  initialTrainingSelected,
  initialTrainings,
} from "../../configs/initialValues";

import { LinkStyled, Wrapper, WrapperColLeft, WrapperColRight } from "./styled";

export const LandingPage = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedTraining, setSelectedTraining] = useState(
    initialTrainingSelected
  );
  const [availablePlaces, setAvailablePlaces] = useState(null);
  const [trainings, setTrainings] = useState(initialTrainings);
  const firebaseContext = useContext(FirebaseContext);
  const userContext = useContext(UserContext);

  useEffect(() => {
    const getTrainings = async () => {
      const trainings = await firebaseContext.getTrainings();

      setTrainings(trainings);
    };

    getTrainings();
  }, []);

  useEffect(() => {
    getAvailablePlaces();
  }, [selectedTraining, selectedDay]);

  const handleDateChange = (date) => {
    setSelectedDay(date);
  };

  const handleTrainingChange = (e) => {
    const training = trainings.find((t) => t.value === e.target.value);
    setSelectedTraining(training);
  };

  const getAvailablePlaces = async () => {
    const places = await firebaseContext.getAvailablePlaces(
      selectedTraining,
      selectedDay
    );

    setAvailablePlaces(places);
  };

  return (
    <Wrapper>
      <WrapperColLeft>
        <Logo />
      </WrapperColLeft>
      <WrapperColRight>
        <AppDatePicker
          selected={selectedDay}
          onChange={handleDateChange}
          headerLabel={labels.selectTrainingDay}
        />
        <AppTrainingPicker
          handleTrainingChange={handleTrainingChange}
          headerLabel={labels.selectTraining}
          selectedTraining={selectedTraining}
          trainings={trainings}
        />
        <CounterDisplay label={labels.availableSpots} value={availablePlaces} />
        {!userContext && (
          <LinkStyled to={SIGN_IN}>{labels.signInToReservSpot}</LinkStyled>
        )}
      </WrapperColRight>
    </Wrapper>
  );
};
