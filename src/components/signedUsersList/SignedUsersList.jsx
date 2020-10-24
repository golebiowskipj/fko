import React, { useContext } from "react";

import { UserContext } from "../../contexts/userContext/UserContext";

export const SignedUsersList = ({
  users,
  headerLabel,
  handleSignOutFromTraining,
}) => {
  const userContext = useContext(UserContext);

  const me = userContext ? userContext.email : "";

  return (
    <>
      <p>{headerLabel}</p>
      <ul>
        {users.map((user) => (
          <li key={user}>
            <div>
              <div>{user}</div>
              <div>
                {me === user ? (
                  <button onClick={handleSignOutFromTraining}>
                    Wypisz się
                  </button>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
