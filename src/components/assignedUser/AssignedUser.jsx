import React, { useContext } from "react";

import { UserContext } from "../../contexts/userContext/UserContext";

import { labels } from "../../configs/labels";

import { Button, Wrapper } from "./styled";

export const AssignedUser = ({ handleSignOutFromTraining, user }) => {
  const userContext = useContext(UserContext);

  const me = userContext ? userContext.email : "";
  return (
    <Wrapper>
      {user.userName}{" "}
      {user.email === me ? (
        <Button onClick={handleSignOutFromTraining}>{labels.freeSpot}</Button>
      ) : null}
    </Wrapper>
  );
};
