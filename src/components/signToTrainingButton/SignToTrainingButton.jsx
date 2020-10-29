import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { FirebaseContext } from "../../firebase";

import { VERIFY_EMAIL } from "../../configs/routes";

import { Button } from "./styled";

export const SignToTrainingButton = ({ label, onClick }) => {
  const firebaseContext = useContext(FirebaseContext);
  const history = useHistory();

  const handleOnClick = () => {
    const isVerified = firebaseContext.auth.currentUser.emailVerified;
    if (isVerified) {
      onClick();
    } else {
      history.push(VERIFY_EMAIL);
    }
  };
  return <Button onClick={handleOnClick}>{label}</Button>;
};
