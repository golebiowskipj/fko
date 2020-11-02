import React, { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { AppPickerHeader } from "../appPickerHeader";
import { CalendarIcon } from "../calendarIcon";

import { AppDataContext } from "../../contexts/appDataContext";

import { addDays, getTodaysMidnight } from "../../helpers/helpers";

import { Button, Wrapper } from "./styled";

const CustomDateInput = ({ onClick, value }) => (
  <Button onClick={onClick}>
    <span>{value}</span>
    <CalendarIcon />
  </Button>
);

const MIN_DATE = getTodaysMidnight();
const MAX_DATE = addDays(7);

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
