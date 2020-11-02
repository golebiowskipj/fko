import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { ApiMessenger } from "../../components/apiMessenger";
import { AppForm } from "../../components/appForm";
import { AppFormField } from "../../components/appFormField";
import { SubmitButton } from "../../components/submitButton";

import { SignInSignUpTemplate } from "../../templates/signInSignUpTemplate";

import { FirebaseContext } from "../../firebase";

import * as apiCodes from "../../configs/apiCodes";
import { VERIFY_EMAIL } from "../../configs/routes";
import * as ROLES from "../../configs/roles";
import { labels, apiLabels, validationLabels } from "../../configs/labels";

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
  userName: Yup.string().required().min(6).label(labels.userName),
  password: Yup.string().required().min(6).label(labels.password),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], validationLabels.passwordsMustMatch)
    .required()
    .label(labels.repeatPassword),
});

const initialValues = {
  email: "",
  userName: "",
  password: "",
  confirmPassword: "",
};

export const SignUpPage = () => {
  const [apiMessage, setApiMessage] = useState(null);
  const history = useHistory();
  const firebaseContext = useContext(FirebaseContext);

  const handleSubmit = (values) => {
    const { email, password, userName } = values;

    firebaseContext
      .doCreateUserWithEmailAndPassword(email, password)
      .then(async (userAuth) => {
        console.log(userAuth);
        await firebaseContext.saveUserToFirestore(userAuth, {
          strikes: 0,
          assignedTo: [],
          role: ROLES.USER,
          userName: userName,
        });
        firebaseContext.sendEmailVerification();
        history.push(VERIFY_EMAIL);
        firebaseContext.doSignOut();
      })
      .catch((error) => {
        console.log(error);
        if (error.code === apiCodes.USER_ALREADY_EXISTS) {
          apiMessageHandler(apiLabels.userAlreadyExists, 3000);
        } else if (error.code === apiCodes.PASSWORD_TOO_WEAK) {
          apiMessageHandler(apiLabels.passwordToWeak, 3000);
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
        <AppFormField name="userName" type="text" label={labels.userName} />
        <AppFormField name="password" type="password" label={labels.password} />
        <AppFormField
          name="confirmPassword"
          type="password"
          label={labels.repeatPassword}
        />
        <SubmitButton label={labels.registerButton} />
      </AppForm>
      <ApiMessenger isVisible={!!apiMessage}>{apiMessage}</ApiMessenger>
    </SignInSignUpTemplate>
  );
};
