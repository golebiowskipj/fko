import React, { useContext } from "react";

import { AppDatePicker } from "../../components/appDatePicker";
import { AppTrainingPicker } from "../../components/appTrainingPicker";
import { CounterDisplay } from "../../components/counterDisplay";
import { Logo } from "../../components/logo";

import { AppDataContext } from "../../contexts/appDataContext";

import { labels } from "../../configs/labels";
import { SIGN_IN } from "../../configs/routes";

import { MainTemplate } from "../../templates/mainTemplate";

import { LinkStyled, RightWrapper, LogoWrapper } from "./styled";

const Left = () => (
  <LogoWrapper>
    <Logo />
  </LogoWrapper>
);

const Right = ({ display }) => (
  <RightWrapper>
    <AppDatePicker headerLabel={labels.selectTrainingDay} />
    <AppTrainingPicker headerLabel={labels.selectTraining} />
    <CounterDisplay label={labels.availableSpots} />
    {display && (
      <LinkStyled to={SIGN_IN}>{labels.signInToReservSpot}</LinkStyled>
    )}
  </RightWrapper>
);

export const LandingPage = () => {
  const { trainings, userData } = useContext(AppDataContext);

  return (
    <MainTemplate
      Left={Left}
      Right={() => <Right display={trainings.length > 0 && !userData} />}
    />
  );
};
