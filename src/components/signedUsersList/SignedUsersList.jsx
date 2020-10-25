import React from "react";

import { AssignedUser } from "../assignedUser/AssignedUser";

import { labels } from "../../configs/labels";

import { List, ListItem } from "./styled";

export const SignedUsersList = ({
  handleSignOutFromTraining,
  headerLabel,
  users,
}) => {
  return (
    <>
      <p>{headerLabel}</p>
      <List>
        {users.length === 0
          ? labels.noAssignmentsYet
          : users.map((user) => (
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
