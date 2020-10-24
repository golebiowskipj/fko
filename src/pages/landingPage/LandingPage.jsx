import React, { useState, useEffect, useContext } from "react";

import { AppDatePicker } from "../../components/appDatePicker";
import { AppTrainingPicker } from "../../components/appTrainingPicker";
import { CounterDisplay } from "../../components/counterDisplay";

import { FirebaseContext } from "../../firebase/";

import { labels } from "../../configs/labels";
import { initialTrainingSelected } from "../../configs/initialValues";

export const LandingPage = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedTraining, setSelectedTraining] = useState(
    initialTrainingSelected
  );
  const [availablePlaces, setAvailablePlaces] = useState(null);
  const [trainings, setTrainings] = useState([]);
  const firebaseContext = useContext(FirebaseContext);

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
    <div>
      <AppDatePicker
        selected={selectedDay}
        onChange={handleDateChange}
        headerLabel={labels.selectTrainingDay}
      />
      <AppTrainingPicker
        headerLabel={labels.selectTraining}
        trainings={trainings}
        handleTrainingChange={handleTrainingChange}
      />
      <CounterDisplay label={labels.availableSpots} value={availablePlaces} />
      <p>{labels.signInToReservSpot}</p>
    </div>
  );
};
