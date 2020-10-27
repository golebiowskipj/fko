import React, { useState, useEffect, useContext } from "react";

import { AppDataContext } from "./AppDataContext";
import { FirebaseContext } from "../../firebase/";

import { initialSelectedTraining } from "../../configs/initialValues";
import {
  convertDateToMidnightTimestamp,
  getTodaysMidnight,
} from "../../helpers/helpers";

const initDate = getTodaysMidnight();

export const AppDataContainer = ({ children }) => {
  const firebaseContext = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(
    initialSelectedTraining
  );
  const [selectedDate, setSelectedDate] = useState(initDate);

  useEffect(() => {
    let isCanceled = false;

    const getTrainings = async () => {
      console.log("api call for data - trainings");
      setIsLoading(true);
      const trainings = await firebaseContext.getTrainings();

      if (!isCanceled) {
        setTrainings(trainings);
        setIsLoading(false);
      }
    };

    getTrainings();

    return () => {
      isCanceled = true;
    };
  }, []);

  const handleSelectDate = (date) =>
    setSelectedDate(convertDateToMidnightTimestamp(date));

  const handleSelectTraining = (training) => setSelectedTraining(training);

  return (
    <AppDataContext.Provider
      value={{
        isLoading,
        handleSelectDate,
        handleSelectTraining,
        trainings,
        selectedDate,
        selectedTraining,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
