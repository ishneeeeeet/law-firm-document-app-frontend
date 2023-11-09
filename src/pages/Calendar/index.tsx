import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import { isEmpty } from "lodash";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";

/** Import Full Calendar  */
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import listPlugin from "@fullcalendar/list";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  addNewEvent,
  deleteEvent,
  getCategories,
  getEvents,
  updateEvent,
} from "../../slices/thunks";

import DeleteModal from "./DeleteModal";

//css
import "@fullcalendar/bootstrap/main.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import { db } from "src/models/db";

interface CalendarProps {
  className: string;
}
const Calender = ({ className }: CalendarProps) => {
  const dispatch = useDispatch();

  // const { events, categories } = useSelector((state: any) => {
  //   console.log("cat == ", state.calendar.categories)
  //   console.log("events == ", state.calendar.events)

  //   return {
  //   events: state.calendar.events,
  //   categories: state.calendar.categories,
  //   }
  // });



  const categories = [
    {id: 1, title: 'Purchase', type: 'bg-success text-white', text: 'text-success'},
    {id: 2, title: 'Sale', type: 'bg-danger text-white', text: 'text-danger'},
    {id: 3, title: 'Refinance', type: 'bg-info text-white', text: 'text-info'},
  ]

  const [modal, setModal] = useState<boolean>(false);
  const [setCalenderView, updatedCalenderView] = useState("dayGridMonth");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [modalcategory, setModalcategory] = useState<boolean>(false);
  const [event, setEvent] = useState<any>({});
  const [events, setEvents] = useState<any>([]);
  const [selectedDay, setSelectedDay] = useState<any>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const calendarRef = useRef<any>();

  useEffect(() => {
    fetchDeals()
  }, [])

  useEffect(() => {
    let external: any = document.getElementById("external-events");
    dispatch(getCategories());
    dispatch(getEvents());
    new Draggable(external, {
      itemSelector: ".external-event",
    });
    getInitialView();
    changeView(setCalenderView);

  }, [dispatch]);

  async function fetchDeals() {
    const all = await db.dealItems.toArray()
    const formattedEvents = all.reverse().map((elem) => {
      return {
            ...elem,
            allDay: false,
            className: (elem.params.dealtype === 'Purchase' ? 'bg-success' : elem.params.dealtype === 'Sale' ? 'bg-danger' : 'bg-info') + " text-white",
            start: formatDate(elem.params.closing_date),
            // @ts-ignore
            title: elem.no
      }
    })
    setEvents(formattedEvents)
  }

  const formatDate = (date: string) => {
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
       if(date && date != '' && date[0] != '{') {
         const splittedDate = date.split(' ')
         if(splittedDate.length > 2) {
           let month: any = months.findIndex((elem) => elem === splittedDate[0].toUpperCase()) + 1
           month = month.toString().length > 1 ? month : '0' + month
           let date = splittedDate[1] 
           let year = splittedDate[2]
           return `${year}-${month}-${date}T09:00:00.000Z`
         }
       }
  }

  const changeView = (view: any) => {
    const API = getApi();

    API && API.changeView(view);
  };

  const getInitialView = () => {
    if (window.innerWidth >= 768 && window.innerWidth < 1200) {
      updatedCalenderView("dayGridWeek");
      changeView("dayGridWeek");
    } else if (window.innerWidth <= 768) {
      updatedCalenderView("listWeek");
      changeView("listWeek");
    } else {
      updatedCalenderView("dayGridMonth");
      changeView("dayGridMonth");
    }
  };

  const getApi = () => {
    const { current: calendarDom } = calendarRef;

    return calendarDom ? calendarDom.getApi() : null;
  };

  useEffect(() => {
    if (!modal && !isEmpty(event) && !!isEdit) {
      setTimeout(() => {
        setEvent({});
        setIsEdit(false);
      }, 500);
    }
  }, [modal, event]);

  /**
   * Handling the modal state
   */
   const toggle = () => {
    setModal(!modal);
  };

  const toggleCategory = () => {
    setModalcategory(!modalcategory);
  };

  /**
   * Handling date click on calendar
   */
  const handleDateClick = (arg: any) => {
    const date = arg["date"];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currectDate = new Date();
    const currentHour = currectDate.getHours();
    const currentMin = currectDate.getMinutes();
    const currentSec = currectDate.getSeconds();
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    );
    const modifiedData = { ...arg, date: modifiedDate };

    setSelectedDay(modifiedData);
    toggle();
  };

  /**
   * Handling click on event on calendar
   */
  const handleEventClick = (arg: any) => {
    const event = arg.event;
    setEvent({
      id: event.id,
      title: event.title,
      title_category: event.title_category,
      start: event.start,
      className: event.classNames,
      category: event.classNames[0],
      event_category: event.classNames[0],
      dealtype: event.extendedProps.params.dealtype
    });
    setIsEdit(true);
    toggle();
  };

  /**
   * Handling submit event on event form
   */
  const handleValidEventSubmit = (values: any) => {
    if (isEdit) {
      const updatedEvent = {
        id: event.id,
        title: values.title,
        className: (values.params.dealtype === 'Purchase' ? 'bg-success' : values.params.dealtype === 'Sale' ? 'bg-danger' : 'bg-info' )+ " text-white",
        start: event.start,
      };
      const allEvents = [...events]
     const foundIndex = allEvents.findIndex((elem) => elem.id === updatedEvent.id)
      if(foundIndex != -1) allEvents[foundIndex] = updateEvent
      setEvents(allEvents)
    } else {
      const newEvent = {
        id: Math.floor(Math.random() * 100),
        title: values.title,
        start: event.start ?  event.start + 'T09:00:00.000Z' : new Date(),
        className: (values.dealtype === 'Purchase' ? 'bg-success' : values.dealtype === 'Sale' ? 'bg-danger' : 'bg-info' )+ " text-white",
      };
      setEvents([...events, newEvent])
      // dispatch(addNewEvent(newEvent));
    }
    setSelectedDay(null);
    toggle();
  };

  const handleValidEventSubmitcategory = (values: any) => {
    const newEvent = {
      id: Math.floor(Math.random() * 100),
      title: values["title_category"],
      start: selectedDay ? selectedDay.date : new Date(),
      className: values.event_category
        ? values.event_category + " text-white"
        : "bg-danger text-white",
    };
    // save new event

    dispatch(addNewEvent(newEvent));
    toggleCategory();
  };

  /**
   * On delete event
   */
  const handleDeleteEvent = () => {
    dispatch(deleteEvent(event));
    setDeleteModal(false);
    toggle();
  };

  /**
   * On category darg event
   */
  const onDrag = (event: any) => {
    event.preventDefault();
  };

  /**
   * On calendar drop event
   */
  const onDrop = (event: any) => {
    const date = event["date"];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currectDate = new Date();
    const currentHour = currectDate.getHours();
    const currentMin = currectDate.getMinutes();
    const currentSec = currectDate.getSeconds();
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    );

    const draggedEl = event.draggedEl;
    const modifiedData = {
      id: Math.floor(Math.random() * 100),
      title: draggedEl.innerText,
      start: modifiedDate,
      className: draggedEl.className,
    };
    dispatch(addNewEvent(modifiedData));
  };

  return (
    <React.Fragment>
{/*      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEvent}
        onCloseClick={() => setDeleteModal(false)}
      /> */}
      <div className="page-content">
        <MetaTags>
          <title>Calendar | John Dhillon Law</title>
        </MetaTags>
        <Container fluid={true}>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Apps" breadcrumbItem="Calendar" />
          <Row>
            <Col xs={12}>
              <Row>
                <Col xl={3}>
                  <Card className="card-h-100">
                    <CardBody>
                      <div className="d-grid">
                        <Button
                          color="primary"
                          className="w-100"
                          onClick={toggle}
                        >
                          <i className="mdi mdi-plus" />
                          Create New Event
                        </Button>
                      </div>
                      <div id="external-events">
                        <br />
                        <p className="text-muted">
                          Drag and drop your event or click in the calendar
                        </p>
                        {categories &&
                          categories.map((category: any, i: any) => (
                            <div
                              className={`${category.type + " " + category.text
                                } fc-event external-event`}
                              key={"cat-" + category.id}
                              draggable
                              onDrag={event => onDrag(event)}
                            >
                              <i className="mdi mdi-checkbox-blank-circle font-size-11 me-2" />
                              {category.title}
                            </div>
                          ))}
                      </div>
                    </CardBody>
                  </Card>
                </Col>

                <Col xl={9}>
                  <Card className="card-h-100">
                    <CardBody>
                      {/* fullcalendar control */}
                      <FullCalendar
                        plugins={[
                          BootstrapTheme,
                          dayGridPlugin,
                          interactionPlugin,
                          listPlugin
                        ]}
                        slotDuration={"00:15:00"}
                        handleWindowResize={true}
                        themeSystem="bootstrap"
                        headerToolbar={{
                          left: "prev,next today",
                          center: "title",
                          right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
                        }}
                        events={events}
                        editable={true}
                        droppable={true}
                        selectable={true}
                        dateClick={handleDateClick}
                        eventClick={handleEventClick}
                        drop={onDrop}
                        ref={calendarRef}
                        initialView={setCalenderView}
                        windowResize={getInitialView}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <div style={{ clear: "both" }}></div>
              {/* New/Edit event modal */}
              <Modal isOpen={modal} className={className}>
                <ModalHeader toggle={toggle} tag="h5" className="py-3 px-4 border-bottom-0">
                  {!!isEdit ? "Edit Event" : "Create Event"}
                </ModalHeader>
                <ModalBody className="p-4">
                  <AvForm
                    onValidSubmit={(e: any, values: any) => {
                      handleValidEventSubmit(values);
                    }}
                  >
                    <Row form>
                    <Col className="col-12 mb-3">
                        <AvField
                          type="select"
                          name="dealtype"
                          label="Choose Deal Type"
                          value={event ? event.dealtype : ""}
                          errorMessage="Invalid Deal Type"
                          validate={{
                            required: { value: true },
                          }}
                        >
                          <option value="">Select Deal Type</option>
                          <option value="Purchase">Purchase</option>
                          <option value="Sale">Sale</option>
                          <option value="Refinance">Refinance</option>
                        </AvField>
                      </Col>
                      <Col className="col-12 mb-3">
                        <AvField
                          name="title"
                          label="File Number"
                          type="text"
                          errorMessage="Invalid File Number"
                          validate={{
                            required: { value: true },
                          }}
                          value={
                            event.title ? event.title : ""
                          }
                        />
                      </Col>
                      <Col className="col-12 mb-3">
                        <AvField
                          type="date"
                          name="start"
                          label="Closing Date"
                          value={event.start ? new Date(event.start).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
                        }
                        errorMessage="Invalid Closing Date"
                        validate={{
                          required: { value: true },
                        }}
                        >
                        </AvField>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col xs={6}>

                        <button
                          type="button"
                          className="btn btn-light me-2"
                          onClick={toggle}
                        >
                          Close
                        </button>
                      </Col>
                      <Col xs={6} className="text-end">
                        {/* {!!isEdit && (
                          <button
                            type="button"
                            className="btn btn-light me-1"
                            onClick={() => setDeleteModal(true)}
                          >
                            Delete
                          </button>
                        )} */}
                        <button
                          type="submit"
                          className="btn btn-success"
                        >
                          Save
                        </button>
                      </Col>
                    </Row>
                  </AvForm>
                </ModalBody>
              </Modal>

              <Modal
                isOpen={modalcategory}
                toggle={toggleCategory}
                className={className}
              >
                <ModalHeader toggle={toggleCategory} tag="h4">
                  Create an Event
                </ModalHeader>
                <ModalBody>
                  <AvForm onValidSubmit={handleValidEventSubmitcategory}>
                    <Row form>
                    <Col className="col-12 mb-3">
                        <AvField
                          type="select"
                          name="event_category"
                          label="Choose Deal Type"
                          value={event ? event.dealtype : "Purchase"}
                          errorMessage="Invalid Deal Type"
                          validate={{
                            required: { value: true },
                          }}
                        >
                          <option value="Purchase">Purchase</option>
                          <option value="Sale">Sale</option>
                          <option value="Refinance">Refinance</option>
                        </AvField>
                      </Col>
                      <Col className="col-12 mb-3">
                        <AvField
                          name="title_category"
                          label="File Number"
                          type="text"
                          errorMessage="Invalid File Number"
                          validate={{
                            required: { value: true },
                          }}
                          value={
                            event.title ? event.title : ""
                          }
                        />
                      </Col>
                      <Col className="col-12 mb-3">
                        <AvField
                          type="date"
                          name="event_category"
                          label="Closing Date"
                          errorMessage="Invalid Closing Date"
                          validate={{
                            required: { value: true },
                          }}
                          value={new Date()}
                        >
                        </AvField>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="text-end">
                          <button
                            type="button"
                            className="btn btn-light me-2"
                            onClick={toggleCategory}
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="btn btn-success save-event"
                          >
                            Save
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </AvForm>
                </ModalBody>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Calender;
