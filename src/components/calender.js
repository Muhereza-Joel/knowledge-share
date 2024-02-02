import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from '@fullcalendar/multimonth'
import listPlugin from "@fullcalendar/list";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";

const Calender = (props) => {
  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
  };

  return (
    <div style={style}>
      <TopBar username={props.username} />
      <div className="row g-0">
        <div className="col-lg-2">
          <LeftSideBar username={props.username} />
        </div>
        <div className="col-lg-7">
            <div className="card p-3 mt-2">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, multiMonthPlugin]}
                    initialView="dayGridMonth"
                    events={[]}
                />

            </div>
        </div>

        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default Calender;
