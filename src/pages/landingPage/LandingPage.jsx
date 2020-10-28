import React, { useContext } from "react";

import { AppDatePicker } from "../../components/appDatePicker";
import { AppTrainingPicker } from "../../components/appTrainingPicker";
import { CounterDisplay } from "../../components/counterDisplay";
import { Logo } from "../../components/logo";

import { AppDataContext } from "../../contexts/appDataContext";

import { labels } from "../../configs/labels";
import { SIGN_IN } from "../../configs/routes";

import { LinkStyled, Wrapper, WrapperColLeft, WrapperColRight } from "./styled";

export const LandingPage = () => {
  const { userData } = useContext(AppDataContext);

  return (
    <Wrapper>
      <WrapperColLeft>
        <Logo />
      </WrapperColLeft>
      <WrapperColRight>
        <AppDatePicker headerLabel={labels.selectTrainingDay} />
        <AppTrainingPicker headerLabel={labels.selectTraining} />
        <CounterDisplay label={labels.availableSpots} />
        {!userData && (
          <LinkStyled to={SIGN_IN}>{labels.signInToReservSpot}</LinkStyled>
        )}
      </WrapperColRight>
    </Wrapper>
  );
};
