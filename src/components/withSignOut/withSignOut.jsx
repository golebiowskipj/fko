import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { useHistory } from "react-router-dom";

import { LANDING } from "../../configs/routes";

export const withSignOut = (WrappedComponent) => ({ ...props }) => {
  const firebaseContext = useContext(FirebaseContext);
  const history = useHistory();

  const handleOnClick = () => {
    firebaseContext.doSignOut();
    history.push(LANDING);
  };

  return <WrappedComponent onClick={handleOnClick} {...props} />;
};
