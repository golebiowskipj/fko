import React from "react";
import { useFormikContext } from "formik";

import { AppFormInput } from "../appFormInput";
import { ErrorMessage } from "../errorMessage";

import { AppFormFieldWrapper } from "./styled";

export const AppFormField = ({ name, type, width = "100%", ...otherProps }) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <AppFormFieldWrapper style={{ width }}>
      <AppFormInput
        name={name}
        type={type}
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange(name)}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} isVisible={touched[name]} />
    </AppFormFieldWrapper>
  );
};
