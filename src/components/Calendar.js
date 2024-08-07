import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Form, Modal, Button, InputGroup } from "react-bootstrap";
import Datetime from "react-datetime";
import { CalendarIcon } from "@heroicons/react/solid";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import interactionPlugin from "@fullcalendar/interaction";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from "moment";
import Layout from "../views/Layout";
import useAxios from "../utils/useAxios";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import "./calendarStyles.css";
const SwalWithBootstrapButtons = withReactContent(
  Swal.mixin({
    customClass: {
      confirmButton: "btn btn-primary me-3",
      cancelButton: "btn btn-gray",
    },
    buttonsStyling: false,
  })
);

const EventModal = (props) => {
  const [title, setTitle] = useState(props.title);
  const [start, setStart] = useState(props.start);
  const [end, setEnd] = useState(props.end);

  const { show = false, edit = false, id } = props;
  const startDate = start
    ? moment(start).format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");
  const endDate = end
    ? moment(end).endOf("day").format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");

  const onTitleChange = (e) => setTitle(e.target.value);

  const onConfirm = () => {
    const finalStart = moment(startDate).toDate();
    const finalEnd = moment(endDate).toDate();
    const payload = { id, title, start: finalStart, end: finalEnd };

    if (edit) {
      return props.onUpdate && props.onUpdate(payload);
    }

    return props.onAdd && props.onAdd(payload);
  };
  const onDelete = () => edit && props.onDelete && props.onDelete(id);
  const onHide = () => props.onHide && props.onHide();

  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={onHide}>
      <Form className="modal-content">
        <Modal.Body>
          <Form.Group id="title" className="mb-4">
            <Form.Label>Event title</Form.Label>
            <Form.Control
              required
              autoFocus
              type="text"
              value={title}
              onChange={onTitleChange}
            />
          </Form.Group>
          <Row>
            <Col xs={12} lg={6}>
              <Form.Group id="startDate">
                <Form.Label>Select start date</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setStart}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <CalendarIcon className="icon icon-xs" />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        placeholder="YYYY-MM-DD"
                        value={startDate}
                        onFocus={openCalendar}
                        onChange={() => {}}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
            <Col xs={12} lg={6}>
              <Form.Group id="endDate" className="mb-2">
                <Form.Label>Select end date</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setEnd}
                  isValidDate={(currDate) => currDate.isAfter(start)}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="fa fa-calendar-alt"></i>
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        placeholder="YYYY-MM-DD"
                        value={endDate}
                        onFocus={openCalendar}
                        onChange={() => {}}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="me-2" onClick={onConfirm} style={{backgroundColor:'#0d6efd'}}>
            {edit ? "Update event" : "Add new event"}
          </Button>

          {edit ? (
            <Button variant="danger" onClick={onDelete} style={{backgroundColor:'#dc3545'}}>
              Delete event
            </Button>
          ) : null}

          <Button variant="link" className="text-gray ms-auto" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
function formatDate(date, formatString = "YYYY-MM-DD") {
  const formattedDatetime = new Date(date).toLocaleDateString();

  return formattedDatetime;
}
const Calendar = () => {
  const api = useAxios();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events/");
        const fetchedEvents = response.data;
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  const defaultModalProps = { id: "", title: "", start: null, end: null };
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalProps, setModalProps] = useState(defaultModalProps);
  const [events, setEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const calendarRef = useRef();
  const currentDate = moment().format("YYYY-MM-DD");

  const onDateClick = (props) => {
    const { date } = props;
    const endDate = new Date(date).setDate(date.getDate() + 1);

    setModalProps({ ...modalProps, start: date, end: endDate });
    setShowAddModal(true);
  };

  const onEventClick = (props) => {
    const {
      event: { id, title, start, end },
    } = props;
    setModalProps({ id, title, start, end });
    setShowEditModal(true);
  };

  const onEventUpdate = async (props) => {
    const { id, title, start, end } = props;
    const calendarApi = calendarRef.current.getApi();
    const calendarElem = calendarApi.getEventById(id);
    console.log(calendarElem);
    await api.put(`/events/${id}/`, props).then((res) => {
      let responseJson = res;
      console.log(responseJson);
      if (responseJson) {
        calendarElem.setProp("title", title);
        calendarElem.setStart(start);
        calendarElem.setEnd(end);
      }
    });
    setShowEditModal(false);
  };

  const onEventAdd = async (props) => {
    const newEvent = {
      ...props,
      dragable: true,
      className: "bg-blue text-white",
      allDay: true,
    };
    try {
      const response = await api.post("/events/", newEvent);

      if (response) {
        setShowAddModal(false);
        setEvents([...events, newEvent]);
        setModalProps(defaultModalProps);
        handleClose();
      } else {
        console.error("Error creating event:", response.data);
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  const onEventDelete = async function (id) {
    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "Confirm deletion",
      text: "Are you sure you want to delete this event?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    setShowEditModal(false);
    setModalProps(defaultModalProps);

    if (result.isConfirmed) {
      await api.delete(`/events/${id}/`);
      SwalWithBootstrapButtons.fire(
        "Deleted!",
        "The event has been deleted.",
        "success"
      );
      const newEvents = events.filter((e) => e.id !== id);
      setEvents(newEvents);
      location.reload();
    }
  };
  const handleEventDrop = async (eventDropInfo) => {
    const updatedEvent = {
      ...eventDropInfo.event.extendedProps,
      start: eventDropInfo.event.start.toISOString(),
      end: eventDropInfo.event.end?.toISOString(),
    };

    try {
      const response = await api.patch(
        `/events/${eventDropInfo.event.id}/`,
        updatedEvent
      );

      if (response.status === 200) {
        setEvents(
          events.map((event) =>
            event.id === eventDropInfo.event.id
              ? {
                  ...event,
                  start: eventDropInfo.event.start,
                  end: eventDropInfo.event.end,
                }
              : event
          )
        );
      } else {
        console.error("Error updating event:", response.data);
      }
    } catch (error) {
      console.error("Error updating event:", error);
      eventDropInfo.revert(); // Revert the change if the API call fails
    }
  };
  const handleClose = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  return (
    <>
      {showEditModal ? (
        <EventModal
          {...modalProps}
          edit={true}
          show={showEditModal}
          onUpdate={onEventUpdate}
          onDelete={onEventDelete}
          onHide={handleClose}
        />
      ) : null}

      {showAddModal ? (
        <EventModal
          {...modalProps}
          show={showAddModal}
          onAdd={onEventAdd}
          onHide={handleClose}
        />
      ) : null}
      <Layout>
        <div>

   
          <div className="content-wrapper">
            <div className="content-header">
              <div className="container-fluid py-5 px-5">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    {/* <h1 className="m-0">Scheduler</h1> */}
                  </div>
                </div>
                <section className="content">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <div className="card-header" style={{backgroundColor: "#f9fafd"}}>
                            <h3
                              className="card-title"
                              style={{
                                backgroundColor: "white",
                                color: "#6c757d",
                                fontSize: 18,
                                margin: "0",
                                padding: "0",
                                fontStyle: "normal",
                                fontFamily: "inherit",
                              }}
                            >
                              Schedule Your Events
                            </h3>
                          </div>
                          <div className="card-body">
                            <Box display="flex" justifyContent="space-between">
                              <Box flex="1 1 20%" p="15px" borderRadius="4px">
                                <Typography variant="h5">Events</Typography>
                                <List>
                                  {currentEvents.map((event) => (
                                    <ListItem
                                      key={event.id}
                                      sx={{
                                        background: "#3788d8",
                                        color: "#ffffff",
                                        margin: "10px 0",
                                        borderRadius: "2px",
                                      }}
                                    >
                                      <ListItemText
                                        primary={
                                          <Typography>{event.title}</Typography>
                                        }
                                        secondary={
                                          <Typography>
                                            {formatDate(event.start, {
                                              year: "numeric",
                                              month: "short",
                                              day: "numeric",
                                              hour: "",
                                              minute: "2-digit",
                                              hour12: true,
                                            })}
                                          </Typography>
                                        }
                                      />
                                    </ListItem>
                                  ))}
                                </List>
                              </Box>

                              <Box flex="1 1 100%" ml="15px">
                                <FullCalendar
                                  height="500px"
                                  editable={true}
                                  selectable={true}
                                  selectMirror={true}
                                  dayMaxEvents={true}
                                  events={events}
                                  ref={calendarRef}
                                  themeSystem="bootstrap"
                                  initialView="dayGridMonth"
                                  displayEventTime={false}
                                  initialDate={currentDate}
                                  dateClick={onDateClick}
                                  eventClick={onEventClick}
                                  plugins={[
                                    dayGridPlugin,
                                    timeGridPlugin,
                                    bootstrapPlugin,
                                    interactionPlugin,
                                  ]}
                                  headerToolbar={{
                                    left:"prev,next today",
                                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                                    center: "title",
                                  }}
                                  buttonText={{
                                    prev: "Previous",
                                    next: "Next",
                                    month: "Month",
                                    week: "Week",
                                    day: "Day",
                                    today: "Today",
                                  }}
                                  eventsSet={(updatedEvents) =>
                                    setCurrentEvents(updatedEvents)
                                  }
                                  eventDrop={handleEventDrop}
                                />
                              </Box>
                            </Box>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Calendar;
