import React, { useEffect} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import listPlugin from "@fullcalendar/list";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import { Button, Form, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/fullCalendar.css";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import {
  getEvents,
  setEventTitle,
  setStartDate,
  setEndDate,
  setSelectedEvent,
  setShowEditModal,
  setUpdatedEvent,
  addEvent,
  updateEvent,
  deleteEvent,
  clearSuccess,
  clearError,
} from "../redux/reducers/calendarSlice";

const Calender = (props) => {
  const dispatch = useDispatch();
  const {
    events,
    eventTitle,
    startDate,
    endDate,
    showEditModal,
    selectedEvent,
    updatedEvent,
    success,
    error,
  } = useSelector((state) => state.calendar);

  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const userId = cookieData.USERID_KEY;

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const handleEventClick = (info) => {
    const selectedEvent = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
    };

    dispatch(setSelectedEvent(selectedEvent));
    dispatch(setShowEditModal(true));
    dispatch(setUpdatedEvent(selectedEvent));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        style: { backgroundColor: "#ffc2c2", color: "#333" },
      });

      dispatch(clearError());
    }
  }, [error, dispatch]);


  useEffect(() => {
    if (success) {
      toast.success(success, {
        style: { backgroundColor: "#cce6e8", color: "#333" },
      });

      dispatch(clearSuccess());
    }
  }, [success, dispatch]);

  const handleAddEvent = (e) => {
    e.preventDefault();
    dispatch(addEvent());
  };

  const handleEditEvent = () => {
    dispatch(updateEvent(selectedEvent.id, updatedEvent));
    if (success) {
      dispatch(setSelectedEvent(null));
      dispatch(setShowEditModal(false));
    }
    
  };

  const handleDeleteEvent = () => {
    if (window.confirm("Do you really want to delete this event?")) {
      dispatch(deleteEvent());
      dispatch(setSelectedEvent(null));
      dispatch(setShowEditModal(false));
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
            <Modal
              show={showEditModal}
              onHide={() => dispatch(setShowEditModal(false))}
            >
              <Modal.Body
                style={{
                  backgroundColor: "#f6f9ff",
                  borderRadius: "5px",
                  border: "5px solid #cce6e8",
                }}
              >
                <small className="fw-bold text-success">
                  Edit Event Information
                </small>
                <br></br>
                <br></br>
                <Form>
                  <Form.Group controlId="formEventTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={updatedEvent.title}
                      onChange={(e) =>
                        dispatch(
                          setUpdatedEvent({
                            ...updatedEvent,
                            title: e.target.value,
                          })
                        )
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formEventStart">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={updatedEvent.start}
                      disabled
                      className="mb-1"
                    />

                    <Form.Control
                      type="date"
                      required
                      value={updatedEvent.start}
                      onChange={(e) =>
                        dispatch(
                          setUpdatedEvent({
                            ...updatedEvent,
                            start: e.target.value,
                          })
                        )
                      }
                    />
                  </Form.Group>
                  <br></br>
                  <Form.Group controlId="formEventEnd">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={updatedEvent.end}
                      disabled
                      className="mb-1"
                    />
                    <Form.Control
                      type="date"
                      required
                      value={updatedEvent.end}
                      onChange={(e) =>
                        dispatch(
                          setUpdatedEvent({
                            ...updatedEvent,
                            end: e.target.value,
                          })
                        )
                      }
                    />
                  </Form.Group>
                </Form>
                <div className="d-flex mb-0 mt-3">
                  <Button
                    className="btn btn-secondary btn-sm"
                    onClick={() => dispatch(setShowEditModal(false))}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleEditEvent}
                    className="btn btn-success btn-sm mx-2"
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
                    onChange={(e) => dispatch(setEventTitle(e.target.value))}
                    name="eventTitle"
                    required
                    style={{ border: "1px solid #217537" }}
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
                    onChange={(e) => dispatch(setStartDate(e.target.value))}
                    name="startDate"
                    required
                    style={{ border: "1px solid #217537" }}
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
                    onChange={(e) => dispatch(setEndDate(e.target.value))}
                    name="endDate"
                    required
                    style={{ border: "1px solid #217537" }}
                  />
                </Form.Group>
              </div>
              <div>
                <Button type="submit" className="btn btn-sm btn-success">
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
