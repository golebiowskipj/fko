import React, { useState, useEffect, useContext } from "react";

import { AppDatePicker } from "../../components/appDatePicker";
import { AppTrainingPicker } from "../../components/appTrainingPicker";
import { CounterDisplay } from "../../components/counterDisplay";
import { Logo } from "../../components/logo";

import { AppDataContext } from "../../contexts/appDataContext";
import { FirebaseContext } from "../../firebase/";
import { UserContext } from "../../contexts/userContext/UserContext";

import { labels } from "../../configs/labels";
import { SIGN_IN } from "../../configs/routes";

import { LinkStyled, Wrapper, WrapperColLeft, WrapperColRight } from "./styled";

export const LandingPage = () => {
  const [availablePlaces, setAvailablePlaces] = useState(null);
  const firebaseContext = useContext(FirebaseContext);
  const userContext = useContext(UserContext);
  const {
    handleSelectTraining,
    selectedDate,
    selectedTraining,
    trainings,
  } = useContext(AppDataContext);

  useEffect(() => {
    const getAvailablePlaces = async () => {
      const places = await firebaseContext.getAvailablePlaces(
        selectedTraining,
        selectedDate
      );

      setAvailablePlaces(places);
    };

    getAvailablePlaces();

    return () => getAvailablePlaces();
    // eslint-disable-next-line
  }, [selectedTraining, selectedDate]);

  const handleTrainingChange = (e) => {
    const training = trainings.find((t) => t.value === e.target.value);
    handleSelectTraining(training);
  };

  return (
    <Wrapper>
      <WrapperColLeft>
        <Logo />
      </WrapperColLeft>
      <WrapperColRight>
        <AppDatePicker headerLabel={labels.selectTrainingDay} />
        <AppTrainingPicker
          handleTrainingChange={handleTrainingChange}
          headerLabel={labels.selectTraining}
          selectedTraining={selectedTraining}
        />
        <CounterDisplay label={labels.availableSpots} value={availablePlaces} />
        {!userContext && (
          <LinkStyled to={SIGN_IN}>{labels.signInToReservSpot}</LinkStyled>
        )}
      </WrapperColRight>
    </Wrapper>
  );
};
