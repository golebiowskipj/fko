import React, { useState, useEffect, useContext } from "react";

import { AppDataContext } from "./AppDataContext";
import { FirebaseContext } from "../../firebase/";

import { initialSelectedTraining } from "../../configs/initialValues";
import {
  convertDateToMidnightTimestamp,
  getDayFromDate,
  getTodaysMidnight,
  setUpInAppUserData,
} from "../../helpers/helpers";
import { ADMIN } from "../../configs/roles";

const initDate = getTodaysMidnight();

export const AppDataContainer = ({ children }) => {
  const firebaseContext = useContext(FirebaseContext);
  const [availableSpots, setAvailableSposts] = useState(15);
  const [filteredTrainings, setFilteredTrainings] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(
    initialSelectedTraining
  );
  const [selectedDate, setSelectedDate] = useState(initDate);
  const [trainings, setTrainings] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let isCanceled = false;

    const getTrainings = async () => {
      setIsLoading(true);
      const trainings = await firebaseContext.getTrainings();

      if (!isCanceled) {
        setTrainings(trainings.sort((a, b) => a.startsAt - b.startsAt));
        setIsLoading(false);
      }
    };

    getTrainings();

    return () => {
      isCanceled = true;
    };
  }, []);

  useEffect(() => {
    const authSub = () => {
      setIsLoading(true);
      firebaseContext.auth.onAuthStateChanged(async (authUser) => {
        if (authUser) {
          try {
            const user = await firebaseContext.getUser(authUser.uid);
            setUserData(setUpInAppUserData(user));
            setIsAdmin(user.role === ADMIN);
            setIsLoading(false);
          } catch (error) {
            console.log(error);
            setIsLoading(false);
          }
        } else {
          setUserData(null);
          setIsAdmin(false);
          setIsLoading(false);
        }
      });
    };

    authSub();
  }, []);

  useEffect(() => {
    let isCanceled = false;

    const getAvailableSpots = async () => {
      const spots = await firebaseContext.getAvailableSpots(
        selectedDate,
        selectedTraining
      );

      if (!isCanceled) {
        setAvailableSposts(spots);
      }
    };

    getAvailableSpots();

    return () => {
      isCanceled = true;
    };
  }, [selectedDate, selectedTraining, userData]);

  useEffect(() => {
    let isCanceled = false;
    const filtered = trainings.filter((training) =>
      doesTrainingOccureOnDay(training, getDayFromDate(selectedDate))
    );

    if (!isCanceled) {
      setFilteredTrainings(filtered);
    }

    return () => {
      isCanceled = true;
    };
  }, [trainings, selectedDate]);

  const doesTrainingOccureOnDay = (training, day) =>
    training.occure.indexOf(day) > -1 ? true : false;

  const handleSelectDate = (date) =>
    setSelectedDate(convertDateToMidnightTimestamp(date));

  const handleSelectTraining = (training) => setSelectedTraining(training);

  const refreshUserData = async () => {
    const user = await firebaseContext.getUser(userData.uid);

    setUserData(user);
  };

  return (
    <AppDataContext.Provider
      value={{
        availableSpots,
        isLoading,
        isAdmin,
        handleSelectDate,
        handleSelectTraining,
        refreshUserData,
        selectedDate,
        selectedTraining,
        trainings: filteredTrainings,
        userData,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
