import React, { useContext } from "react";

import { UserContext } from "../../contexts/userContext/UserContext";

import { List, ListItem } from "./styled";
import { AssignedUser } from "../assignedUser/AssignedUser";

export const SignedUsersList = ({
  handleSignOutFromTraining,
  headerLabel,
  users,
}) => {
  return (
    <>
      <p>{headerLabel}</p>
      <List>
        {users.map((user) => (
          <ListItem key={user.email}>
            <AssignedUser
              handleSignOutFromTraining={handleSignOutFromTraining}
              user={user}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};
