import React, { useEffect, useContext, useState } from "react";

import { AssignedUser } from "../assignedUser/AssignedUser";

import { AppDataContext } from "../../contexts/appDataContext";
import { FirebaseContext } from "../../firebase/";

import { labels } from "../../configs/labels";
import {
  convertDateToHumanReadable,
  generateTrainingId,
} from "../../helpers/helpers";

import { List, ListItem } from "./styled";

export const SignedUsersList = ({ handleSignOutFromTraining }) => {
  const [reservations, setReservations] = useState([]);
  const [title, setTitle] = useState("");
  const firebaseContext = useContext(FirebaseContext);
  const { selectedDate, selectedTraining, trainings, userData } = useContext(
    AppDataContext
  );

  useEffect(() => {
    let isCanceled = false;

    const getReservations = async () => {
      const trainingId = generateTrainingId(selectedDate, selectedTraining);
      const reservations = await firebaseContext.getReservations(
        trainingId,
        selectedTraining.value
      );
      if (!isCanceled) {
        setReservations(reservations);
      }
    };

    getReservations();

    if (!isCanceled) {
      setTitle(
        `${selectedTraining.name} ${" | "} ${convertDateToHumanReadable(
          selectedDate
        )}`
      );
    }

    return () => {
      isCanceled = true;
    };
  }, [selectedDate, selectedTraining, userData]);

  return (
    trainings.length > 0 && (
      <>
        <p>
          {labels.assignedTo} {title}
        </p>
        <List>
          {reservations.length === 0
            ? labels.noAssignmentsYet
            : reservations.map((reservation) => (
                <ListItem key={reservation.email}>
                  <AssignedUser
                    handleSignOutFromTraining={handleSignOutFromTraining}
                    user={reservation}
                  />
                </ListItem>
              ))}
        </List>
      </>
    )
  );
};
