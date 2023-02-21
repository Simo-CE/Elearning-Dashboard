import React, { useState } from 'react';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { Dropdown } from 'react-bootstrap';
import "./DateRangeSelector.css";

const DateRangeSelector = ({ className, onCallback }) => {
    // let [todayDate, setTodayDate] = useState();
    // let [tomorrowDate, setTomorrowDate] = useState();

    // const current = new Date();
    // const DateToday = () => {
    //     setTodayDate(`${current.getFullYear()} - ${current.getMonth() + 1} - ${current.getDate()}`)
    // }


    // var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    // var day = currentDate.getDate()
    // var month = currentDate.getMonth() + 1
    // var year = currentDate.getFullYear()

    // const DateTomorrow = () => {
    //     setTomorrowDate(year + " - " + month + " - " + day)
    // }

    const handleCallback = (start, end, label) => {
        onCallback(`${moment(start._d).format("MMM DD YYYY")} - ${moment(end._d).format("MMM DD YYYY")}`)

    }

    return (
        <>
            {/* <Dropdown className={`w-50 rangeDropdown ${className}`}>
                <Dropdown.Toggle className='dateRangeDropdown'>
                    {todayDate ? todayDate : "Select date" && tomorrowDate ? tomorrowDate : "Select date"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <button className='mt-2 dateBtn pl-3' onClick={DateToday}>Today</button>
                    <button className='mt-2 dateBtn pl-3' onClick={DateTomorrow}>Tomorrow</button>
                    <DateRangePicker>
                        <button className='mt-2 customDateBtn pl-3'>Custom</button>
                    </DateRangePicker>
                </Dropdown.Menu>
            </Dropdown> */}

            <DateRangePicker onCallback={handleCallback}
            >
                <input
                    type="text"
                    className={`dateType text-center ${className}`}

                />
            </DateRangePicker>
        </>
    )
}

export default DateRangeSelector;