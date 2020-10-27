import React, { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { AppPickerButton } from "../appPickerButton";
import { AppPickerHeader } from "../appPickerHeader";

import { AppDataContext } from "../../contexts/appDataContext";

import { addDays, getTodaysMidnight } from "../../helpers/helpers";

import { Wrapper } from "./styled";

const CustomDateInput = ({ onClick, value }) => (
  <AppPickerButton onClick={onClick}>{value}</AppPickerButton>
);

const MIN_DATE = getTodaysMidnight();
const MAX_DATE = addDays(2);

export const AppDatePicker = ({ headerLabel }) => {
  const { handleSelectDate, selectedDate } = useContext(AppDataContext);
  return (
    <Wrapper>
      <AppPickerHeader>{headerLabel}</AppPickerHeader>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={selectedDate}
        onChange={(date) => handleSelectDate(date)}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
        customInput={<CustomDateInput />}
      />
    </Wrapper>
  );
};
