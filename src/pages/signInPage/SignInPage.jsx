import React, { useContext, useState } from "react";
import * as Yup from "yup";

import { ApiMessenger } from "../../components/apiMessenger";
import { AppForm } from "../../components/appForm";
import { AppFormField } from "../../components/appFormField";
import { SubmitButton } from "../../components/submitButton";

import { FirebaseContext } from "../../firebase";
import { SIGN_UP } from "../../configs/routes";
import { labels, apiLabels, validationLabels } from "../../configs/labels";
import * as apiCodes from "../../configs/apiCodes";

import { RegisterLink, RegisterWrapper } from "./styled";
import { SignInSignUpTemplate } from "../../templates/signInSignUpTemplate";

Yup.setLocale({
  mixed: {
    required: validationLabels.thisFieldIsRequired,
  },
  string: {
    email: validationLabels.thisFieldMustBeAnEmail,
    min: (field) =>
      `${field.label} ${validationLabels.mustBeAtLeast} ${field.min} ${validationLabels.passwordChars}`,
  },
});

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label(labels.email),
  password: Yup.string().required().min(6).label(labels.password),
});

const initialValues = {
  email: "",
  password: "",
};

export const SignInPage = () => {
  const [apiMessage, setApiMessage] = useState(null);
  const firebaseContext = useContext(FirebaseContext);

  const handleSubmit = (values) => {
    const { email, password } = values;

    firebaseContext
      .doSignInWithEmailAndPassword(email, password)
      .then(async (authUser) => {})
      .catch((error) => {
        if (error.code === apiCodes.USER_NOT_FOUND) {
          apiMessageHandler(apiLabels.userDoesntExist, 3000);
        } else if (error.code === apiCodes.WRONG_PASSWORD) {
          apiMessageHandler(apiLabels.wrongPassword, 3000);
        }
      });
  };

  const apiMessageHandler = (message, ms) => {
    setApiMessage(message);
    setTimeout(() => {
      setApiMessage(null);
    }, ms);
  };

  return (
    <SignInSignUpTemplate>
      <AppForm
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        <AppFormField name="email" type="email" label={labels.email} />
        <AppFormField name="password" type="password" label={labels.password} />
        <SubmitButton label={labels.logIn} />
      </AppForm>
      <RegisterWrapper>
        <p>{labels.doesntHaveAccount}</p>
        <RegisterLink to={SIGN_UP}>{labels.register}</RegisterLink>
      </RegisterWrapper>
      <ApiMessenger isVisible={!!apiMessage}>{apiMessage}</ApiMessenger>
    </SignInSignUpTemplate>
  );
};
