import React, { useState, useEffect, useContext } from "react";

import { AppDataContext } from "./AppDataContext";
import { FirebaseContext } from "../../firebase/";

import { initialSelectedTraining } from "../../configs/initialValues";

export const AppDataContainer = ({ children }) => {
  const firebaseContext = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(
    initialSelectedTraining
  );

  useEffect(() => {
    let isCanceled = false;

    const getTrainings = async () => {
      console.log("api call for app data");
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

  const handleSelectTraining = (training) => setSelectedTraining(training);

  console.log("app data render");

  return (
    <AppDataContext.Provider
      value={{
        isLoading,
        handleSelectTraining,
        trainings,
        selectedTraining,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
