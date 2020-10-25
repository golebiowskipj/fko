import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../../contexts/userContext/UserContext";
import { FirebaseContext } from "../../firebase/";

import { convertDateToHumanReadable, todaysStart } from "../../helpers/helpers";
import { labels } from "../../configs/labels";

import { List, Wrapper } from "./styled";

export const MyReservationsPage = () => {
  const [usersReservations, setUsersReservations] = useState([]);
  const userContext = useContext(UserContext);
  const firebaseContext = useContext(FirebaseContext);

  useEffect(() => {
    const getReservations = async () => {
      const user = await firebaseContext.getUser(userContext.uid);

      const { assignedTo } = user;

      const decodedAssignedTo = assignedTo.map((item) => {
        const array = item.split("-");
        const [date, name] = array;

        return { name, date };
      });

      const filteredAssignedTo = decodedAssignedTo.filter(
        (d) => d.date >= todaysStart()
      );

      setUsersReservations(filteredAssignedTo);
    };

    getReservations();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <List>
        {usersReservations.length === 0
          ? labels.youAreNotAssignedYet
          : usersReservations.map((t, idx) => (
              <li key={idx}>
                {convertDateToHumanReadable(Number(t.date))} {t.name}
              </li>
            ))}
      </List>
    </Wrapper>
  );
};
