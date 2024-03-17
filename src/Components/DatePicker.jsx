import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

const DatePicker = ({
  startDate,
  endDate,
  label,
  isRequired,
  ranges,
  handleDateRange,
  showDropdowns,
  errorMessage,
  formGroup,
  labelClass,
  title,
  opens,
  minDate,
  singleDatePicker,
  maxDate
}) => {
  const selectedDateRange = () => {
    //console.log(startDate,endDate);
    let start = startDate && startDate.format("DD/MM/YYYY");
    let end = endDate && endDate.format("DD/MM/YYYY");
    let selectedDate = start + " - " + end;
    if (start === end) {
      selectedDate = start + " - " + end;
    }
    return singleDatePicker ? start : selectedDate;
  };
  return (
    <div className={formGroup}>
      {label && <label className={labelClass} title={title}>{label}</label>}
      <div title={title}>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          maxDate={maxDate}
          minDate={minDate}
          ranges={ranges}
          onEvent={handleDateRange}
          showDropdowns={showDropdowns}
          opens={opens}
        >
        <div style={{border:'1px solid #3d3d3d3d',padding:'5px',borderRadius:'8px'}}>
            <i className="fa fa-calendar" />&nbsp;<span>{selectedDateRange()}</span>
        </div>
        </DateRangePicker>
      </div>
      {errorMessage && <div className="errorMsg">{errorMessage}</div>}
    </div>
  );
};
export default DatePicker;
