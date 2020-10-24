import React, { useContext } from "react";
import * as Yup from "yup";

import { AppForm } from "../../components/appForm";
import { AppFormField } from "../../components/appFormField";
import { SubmitButton } from "../../components/submitButton";
import { SignInSignUpTemplate } from "../../templates/signInSignUpTemplate";

import { FirebaseContext } from "../../firebase";
import { HOME } from "../../configs/routes";
import * as ROLES from "../../configs/roles";
import { labels } from "../../configs/labels";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  userName: Yup.string().required().min(2).label("User name"),
  password: Yup.string().required().min(3).label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required()
    .label("Repeat password"),
});

export const SignUpPage = ({ history }) => {
  const firebaseContext = useContext(FirebaseContext);
  const initialValues = {
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values) => {
    const { email, password, userName } = values;

    firebaseContext
      .doCreateUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        firebaseContext.saveUserToFirestore(userAuth, {
          strikes: 0,
          assignedTo: [],
          role: ROLES.USER,
          userName: userName,
        });
        history.push(HOME);
      })
      .catch((error) => alert(error));
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
    </SignInSignUpTemplate>
  );
};
