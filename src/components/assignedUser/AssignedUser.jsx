import React, { useContext } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";

import { AppDataContext } from "../../contexts/appDataContext";

import { labels } from "../../configs/labels";

import { Button, Wrapper } from "./styled";

export const AssignedUser = ({ handleSignOutFromTraining, user }) => {
  const { userData } = useContext(AppDataContext);

  return (
    <Wrapper>
      {user.userName}
      {userData && user.uid === userData.uid ? (
        <Button onClick={handleSignOutFromTraining}>
          <IoIosRemoveCircleOutline />
        </Button>
      ) : null}
    </Wrapper>
  );
};
