import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { AppDataContext } from "./AppDataContext";
import { FirebaseContext } from "../../firebase/";

import { initialSelectedTraining } from "../../configs/initialValues";
import {
  convertDateToMidnightTimestamp,
  getDayFromDate,
  getTodaysMidnight,
  getNow,
  setUpInAppUserData,
} from "../../helpers/helpers";
import { ADMIN } from "../../configs/roles";
import { SIGN_IN, VERIFY_EMAIL } from "../../configs/routes";

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

  const history = useHistory();

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
        //   1. if user sign-in correctly
        if (authUser) {
          //   3. get user data from db
          try {
            const user = await firebaseContext.getUser(authUser.uid);
            // 4.. if user is not in db yet, go to sign-in page and sign-out
            if (!user) {
              await firebaseContext.doSignOut();
              history.push(SIGN_IN);
            } else {
              //  4.. if user is in db, set his data to app context
              setUserData(setUpInAppUserData(user));
              setIsAdmin(user.role === ADMIN);
              setIsLoading(false);
            }
            //   3. error in getting user data from db
          } catch (error) {
            console.log(error);
            setIsLoading(false);
          }
          //   1. if user sign-out
        } else {
          setUserData(null);
          setIsAdmin(false);
          setIsLoading(false);
          history.push(SIGN_IN);
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
    const now = getNow();
    const filtered = trainings.filter(
      (training) =>
        doesTrainingOccureOnDay(training, getDayFromDate(selectedDate)) &&
        !hasTrainingAlreadyStarted(training, now, getDayFromDate(selectedDate))
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

  const hasTrainingAlreadyStarted = (training, now, selectedDateDay) => {
    if (now.day === selectedDateDay) {
      return training.startsAt + 1 <= now.hour;
    } else {
      return false;
    }
  };

  const handleSelectDate = (date) => {
    setSelectedDate(convertDateToMidnightTimestamp(date));
    setSelectedTraining(initialSelectedTraining);
  };

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
