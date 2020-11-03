import React, { useContext, useState } from "react";

import { ApiMessenger } from "../../components/apiMessenger";

import { BasicPageTemplate } from "../../templates/basicPageTemplate";

import { FirebaseContext } from "../../firebase";

import { Link, Text } from "./styled";

export const VerifyEmailPage = () => {
  const [apiMessage, setApiMessage] = useState(null);
  const firebaseContext = useContext(FirebaseContext);

  const resendEmail = async () => {
    const response = await firebaseContext.sendEmailVerification();

    apiMessageHandler(response, 3000);
  };

  const apiMessageHandler = (message, ms) => {
    setApiMessage(message);
    setTimeout(() => {
      setApiMessage(null);
    }, ms);
  };

  return (
    <>
      <BasicPageTemplate>
        <Text>Żeby zapisać się na trening musisz aktywować konto.</Text>
        <Text>Link aktywacyjny został wysłany na podany adres email.</Text>
        <Text>
          <Link onClick={resendEmail}>Kliknij</Link> żeby wysłać nowy link
          aktywacyjny.
        </Text>
      </BasicPageTemplate>
      <ApiMessenger isVisible={!!apiMessage}>{apiMessage}</ApiMessenger>
    </>
  );
};
