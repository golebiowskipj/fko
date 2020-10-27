import React, { useState, useEffect, useContext } from "react";

import { AppDataContext } from "./AppDataContext";
import { FirebaseContext } from "../../firebase/";

export const AppDataContainer = ({ children }) => {
  const firebaseContext = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(false);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    let isCanceled = false;
    setIsLoading(true);
    const getTrainings = async () => {
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

  console.log(trainings);
  return (
    <AppDataContext.Provider
      value={{
        isLoading,
        trainings,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
