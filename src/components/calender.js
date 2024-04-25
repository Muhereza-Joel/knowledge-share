import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import { Button, Form, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/fullCalendar.css";
import API_BASE_URL from "./appConfig";
import Cookies from "js-cookie";

const Calender = (props) => {
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({
    id: "",
    title: "",
    start: null,
    end: null,
  });

  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const userId = cookieData.USERID_KEY;

  const handleAddEvent = (e) => {
    e.preventDefault();

    // Validate start and end dates
    const isValidDates =
      startDate && endDate && new Date(startDate) < new Date(endDate);

    if (!isValidDates) {
      toast.error(
        "Invalid date range. Please select valid start and end dates.",
        {
          style: { backgroundColor: "#ffc2c2", color: "#333" },
        }
      );
      return;
    }

    // Validate that the start date is not in the past
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in "YYYY-MM-DD" format

    if (startDate < currentDate) {
      toast.error("Invalid start date. Please select a date in the future.", {
        style: { backgroundColor: "#ffc2c2", color: "#333" },
      });
      return;
    }

    const newEvent = {
      title: eventTitle,
      start: startDate,
      end: endDate,
      userId: userId,
    };

    fetch(`${API_BASE_URL}/api/v1/events/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        // Extract only the specific fields from eventData
        const { id, title, start_date, end_date } = data.eventData;
        const newData = {
          id: id,
          title: title,
          start: start_date,
          end: end_date,
        };

        // Use the extracted fields for updating the state
        setEvents([...events, newData]);

        toast.success("Event added successfully!", {
          style: { backgroundColor: "#cce6e8", color: "#333" },
        });
      })
      .catch((error) => {
        console.error("Error saving event", error);
      });

    setEventTitle("");
    setStartDate("");
    setEndDate("");
  };

  const getEvents = () => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    // Make a POST request with the user ID
    fetch(`${API_BASE_URL}/api/v1/events/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        const transformedEvents = data.map((event) => ({
          id: event.id,
          title: event.title,
          start: event.start_date,
          end: event.end_date,
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

  const deleteEvent = (eventId) => {
    fetch(`${API_BASE_URL}/api/v1/events/delete/${eventId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Event deleted successfully", data);

        // Update the local state by filtering out the deleted event
        const updatedEvents = events.filter((event) => event.id !== eventId);
        setEvents(updatedEvents);

        toast.success("Event deleted successfully!", {
          style: { backgroundColor: "#cce6e8", color: "#333" },
        });
      })
      .catch((error) => {
        console.error("Error deleting event", error);
        toast.error("Error deleting event. Please try again.", {
          style: { backgroundColor: "#fcd0d0", color: "#333" },
        });
      });
  };

  const updateEvent = (eventId, updatedEvent) => {
    fetch(`${API_BASE_URL}/api/v1/events/update/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Event updated successfully", data);

        // Update the local state with the updated event
        const updatedEvents = events.map((event) =>
          event.id === eventId ? { ...event, ...updatedEvent } : event
        );
        setEvents(updatedEvents);

        toast.success("Event updated successfully!", {
          style: { backgroundColor: "#cce6e8", color: "#333" },
        });
      })
      .catch((error) => {
        console.error("Error updating event", error);
        toast.error("Error updating event. Please try again.", {
          style: { backgroundColor: "#fcd0d0", color: "#333" },
        });
      });
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setShowEditModal(true);
    setUpdatedEvent({
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
    });

    console.log(updatedEvent);
  };

  const handleEditEvent = () => {
    // Implement your logic for editing
    updateEvent(selectedEvent.id, updatedEvent);
    setSelectedEvent(null);
    setShowEditModal(false);
  };

  const handleDeleteEvent = () => {
    if (window.confirm("Do you really want to delete this event?")) {
      // Call your deleteEvent function
      deleteEvent(selectedEvent.id);
      setSelectedEvent(null);
      setShowEditModal(false);
    }
  };

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
  };

  return (
    <div style={style}>
      <TopBar username={props.username} />
      <div className="row g-0">
        <div className="col-lg-2">
          <div style={{ position: "fixed", top: "50px", width: "18%" }}>
            <LeftSideBar username={props.username} />
          </div>
        </div>
        <div className="col-lg-7">
          <div className="card p-3 mt-2 ms-3">
            <FullCalendar
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                listPlugin,
                multiMonthPlugin,
              ]}
              initialView="dayGridMonth"
              events={events}
              eventClick={handleEventClick}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right:
                  "dayGridMonth,timeGridWeek,timeGridDay,listWeek,timeGridYear",
              }}
              themeSystem="Yeti"
            />
            {/* Modal for editing/deleting event */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
              <Modal.Body
                style={{
                  backgroundColor: "#f6f9ff",
                  borderRadius: "5px",
                  border: "5px solid #cce6e8",
                }}
              >
                <Form>
                  <Form.Group controlId="formEventTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={updatedEvent.title}
                      onChange={(e) =>
                        setUpdatedEvent({
                          ...updatedEvent,
                          title: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formEventStart">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      required
                      value={updatedEvent.start}
                      onChange={(e) =>
                        setUpdatedEvent({
                          ...updatedEvent,
                          start: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formEventEnd">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      required
                      value={updatedEvent.end}
                      onChange={(e) =>
                        setUpdatedEvent({
                          ...updatedEvent,
                          end: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Form>
                <div className="d-flex mb-0 mt-3">
                  <Button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleEditEvent}
                    className="btn btn-primary btn-sm mx-2"
                  >
                    Save Changes
                  </Button>
                  <Button
                    className="btn btn-danger btn-sm "
                    onClick={handleDeleteEvent}
                  >
                    Delete Event
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>

        <div className="col-lg-3">
          <div
            className="card p-3 mt-2 mx-2"
            style={{ border: "none", backgroundColor: "#f6f9ff" }}
          >
            <div className="text-start">
              <h5>New Event</h5>
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
