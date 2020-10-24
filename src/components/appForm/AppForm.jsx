import React from "react";

import { Formik } from "formik";

export const AppForm = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {() => <>{children}</>}
  </Formik>
);
