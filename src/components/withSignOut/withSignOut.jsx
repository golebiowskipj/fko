import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase";

export const withSignOut = (WrappedComponent) => ({ ...props }) => {
  const firebaseContext = useContext(FirebaseContext);

  const handleOnClick = () => {
    firebaseContext.doSignOut();
  };

  return <WrappedComponent onClick={handleOnClick} {...props} />;
};
