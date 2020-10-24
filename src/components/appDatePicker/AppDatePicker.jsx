import React from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { addDays } from "../../helpers/helpers";

export const AppDatePicker = ({ selected, onChange, headerLabel }) => {
  return (
    <>
      <h2>{headerLabel}</h2>
      <div>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={selected}
          onChange={onChange}
          minDate={new Date()}
          maxDate={addDays(5)}
        />
      </div>
    </>
  );
};
