import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "../../contexts/userContext/UserContext";
import { FirebaseContext } from "../../firebase/";

export const WithAuth = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const firebaseContext = useContext(FirebaseContext);

  useEffect(() => {
    const authSub = () => {
      firebaseContext.auth.onAuthStateChanged(async (authUser) => {
        if (authUser) {
          const user = await firebaseContext.getUser(authUser.uid);
          setCurrentUser(user);
          setIsAuth(true);
        } else {
          setCurrentUser(null);
          setIsAuth(false);
        }
      });
    };

    authSub();

    return () => {
      authSub();
    };
    // eslint-disable-next-line
  }, []);

  console.log(currentUser);

  return (
    <UserContext.Provider value={{ currentUser, isAuth }}>
      {children}
    </UserContext.Provider>
  );
};
