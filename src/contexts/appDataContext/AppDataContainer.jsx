import React, { useState, useEffect, useContext } from "react";

import { AppDataContext } from "./AppDataContext";
import { FirebaseContext } from "../../firebase/";

export const AppDataContainer = ({ children }) => {
  const firebaseContext = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(false);
  const [trainings, setTrainings] = useState([]);

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

  console.log("app data render");

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
