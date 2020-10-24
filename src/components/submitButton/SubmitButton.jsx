import React from "react";
import { useFormikContext } from "formik";

import { Button } from "./styled";

export const SubmitButton = ({ label, style }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <Button type="submit" onClick={handleSubmit} style={style}>
      {label}
    </Button>
  );
};
