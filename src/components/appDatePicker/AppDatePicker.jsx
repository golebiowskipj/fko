import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { AppPickerButton } from "../appPickerButton";
import { AppPickerHeader } from "../appPickerHeader";

import { addDays, daysStart, todaysStart } from "../../helpers/helpers";

import { Wrapper } from "./styled";

const CustomDateInput = ({ onClick, value }) => (
  <AppPickerButton onClick={onClick}>{value}</AppPickerButton>
);

export const AppDatePicker = ({ headerLabel, onChange, selected }) => {
  return (
    <Wrapper>
      <AppPickerHeader>{headerLabel}</AppPickerHeader>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={selected}
        onChange={(date) => onChange(daysStart(date))}
        minDate={todaysStart()}
        maxDate={addDays(5)}
        customInput={<CustomDateInput />}
      />
    </Wrapper>
  );
};