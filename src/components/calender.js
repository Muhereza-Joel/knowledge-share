import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import listPlugin from "@fullcalendar/list";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Calender = (props) => {
  const [events, setEvents] = useState([]);  
  const [eventTitle, setEventTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAddEvent = (e) => {
    e.preventDefault();

    const newEvent = {
        title: eventTitle,
        start: startDate,
        end: endDate,
        userId : localStorage.getItem("userId")
    }

    setEvents([...events, newEvent]);

    fetch("http://localhost:3001/api/v1/events/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
    })
    .then((response) => response.json())
    .then((data) => {
        toast.success("Event added successfully!", {
            style: { backgroundColor: "#cce6e8", color: "#333" },
          });
    })
    .catch((error) => {
        console.error("Error saving event", error);
    });

    setEventTitle("");
    setStartDate("");
    setEndDate("")

  };

  const getEvents = () => {
    // Retrieve user ID from localStorage
    const userId = localStorage.getItem("userId");
  
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }
  
    // Make a POST request with the user ID
    fetch("http://localhost:3001/api/v1/events/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        const transformedEvents = data.map((event) => ({
          title: event.title,
          start: new Date(event.start_date), // Convert to JavaScript Date object
          end: new Date(event.end_date), // Convert to JavaScript Date object
        }));
  
        setEvents(transformedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events", error);
      });
  };
  
  useEffect(() => {
    getEvents();
  }, []); // Empty dependency array ensures the effect runs only once, equivalent to componentDidMount
  

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
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                listPlugin,
                multiMonthPlugin,
              ]}
              initialView="dayGridMonth"
              events={events}
            />
          </div>
        </div>

        <div className="col-lg-3">
          <div className="card p-3 mt-2 mx-2">
            <div className="text-start">
              <h5>Add Event</h5>
            </div>
            <Form onSubmit={handleAddEvent}>
              <div className="mb-3">
                <Form.Group>
                  <Form.Label>Event Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={eventTitle}
                    placeholder="Enter event title here..."
                    id="eventTitle"
                    onChange={(e) => setEventTitle(e.target.value)}
                    name="eventTitle"
                    required
                  />
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    name="startDate"
                    required
                  />
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    name="endDate"
                    required
                  />
                </Form.Group>
              </div>
              <div>
                <Button type="submit" className="btn btn-sm btn-secondary">
                  Add Event
                </Button>
              </div>
            </Form>
            <ToastContainer
              position="bottom-left"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Calender;
