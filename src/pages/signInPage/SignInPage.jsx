import React, { useContext } from "react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import { AppForm } from "../../components/appForm";
import { AppFormField } from "../../components/appFormField";
import { Logo } from "../../components/logo";
import { SubmitButton } from "../../components/submitButton";

import { FirebaseContext } from "../../firebase";
import { HOME, SIGN_UP } from "../../configs/routes";
import { labels } from "../../configs/labels";

import { RegisterLink, RegisterWrapper, SignInPageWrapper } from "./styled";
import { SignInSignUpTemplate } from "../../templates/signInSignUpTemplate";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(6),
});

const initialValues = {
  email: "",
  password: "",
};

export const SignInPage = () => {
  const firebaseContext = useContext(FirebaseContext);
  const history = useHistory();

  const handleSubmit = (values) => {
    const { email, password } = values;

    firebaseContext
      .doSignInWithEmailAndPassword(email, password)
      .then(() => history.push(HOME))
      .catch((error) => console.log(error));
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
    </SignInSignUpTemplate>
  );
};
