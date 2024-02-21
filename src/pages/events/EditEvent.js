import * as Icons from "react-icons/tb";
import React, { useState,useEffect } from "react";
import { eventTopics,events } from "../../api/api.js";
import { Link, useParams } from "react-router-dom";
import Input from "../../components/common/Input.js";
import Button from "../../components/common/Button.js";
import Profile from "../../components/common/Profile.js";
import Toggler from "../../components/common/Toggler.js";
import Textarea from "../../components/common/Textarea.js";
import CheckBox from "../../components/common/CheckBox.js";
import Thumbnail from "../../components/common/Thumbnail.js";
import TextEditor from "../../components/common/TextEditor.js";
import PageHeading from "../../components/common/PageHeading.js";
import SelectOption from "../../components/common/SelectOption.js";

const EditEvent = () => {
  const {eventId} = useParams();

  const event = events.find(event=> event.id.toString() === eventId)

  const [formData, setFormData] = useState({
    eventName: event.name,
    eventDescription: event.description,
    eventVideoUrl: event.videoUrl,
    eventTime: event.time,
    eventDate: event.date,
    eventDuration: event.duration,
    eventLocation: event.location,
    eventTicketName: event.ticket.name,
    eventTicketSale: event.ticketsOnSale,
    eventTicketPrice: event.ticket.price,
    eventTicketCurrency: event.ticket.currency,
    participantLimit: event.maxParticipants,
  });

  const handleInputChange = (fieldName, newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: newValue,
    }));
  };

  const [activeTab, setActiveTab] = useState(event.indoor ? "indoor" : "outdoor");

  const handleTabChange = (tabName, e) => {
    setActiveTab(tabName);
  };

  const [toggle, setToggle] = useState(event.repetition === "N/A");
  const [daily, setDaily] = useState(false);
  const [weekly, setWeekly] = useState(false);

  const [dayChange, setDayChange] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const [weekChange, setWeekChange] = useState({
    "week 1": false,
    "week 2": false,
    "week 3": false,
    "week 4": false,
  });

  const handleToggleChange = () => {
    setToggle(!toggle);
    setDaily(false);
    setWeekly(false);
    setDayChange({
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    });
    setWeekChange({
      "week 1": false,
      "week 2": false,
      "week 3": false,
      "week 4": false,
    });
  };

  const handleDailyEvent = (newCheckedState) => {
    setDaily(newCheckedState);
    setWeekly(false);
    setWeekChange({
      "week 1": false,
      "week 2": false,
      "week 3": false,
      "week 4": false,
    });
    setDayChange({
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    });
  };

  const handleWeeklyEvent = (newCheckedState) => {
    setWeekly(newCheckedState);
    setDaily(false);
    setDayChange({
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    });
    setWeekChange({
      "week 1": false,
      "week 2": false,
      "week 3": false,
      "week 4": false,
    });
  };

  const handleDaysEvent = (day) => {
    if (toggle) {
      setDayChange((prevDayChange) => ({
        ...prevDayChange,
        [day]: !prevDayChange[day],
      }));
    }
  };

  const handleWeeksEvent = (week) => {
    if (toggle) {
      setWeekChange((prevWeekChange) => ({
        ...prevWeekChange,
        [week]: !prevWeekChange[week],
      }));
    }
  };

  const tickets = [
    {
      icon: <Icons.TbTicketOff />,
      type: "free",
    },
    {
      icon: <Icons.TbTicket />,
      type: "paid",
    },
  ];

  const status = [
    { value: "Published", label: "Published" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Scheduled", label: "Scheduled" },
    { value: "Postponed", label: "Postponed" },
    { value: "Completed", label: "Completed" },
    { value: "Ongoing", label: "Ongoing" },
    { value: "Sold Out", label: "Sold Out" },
    { value: "Registration Open", label: "Registration Open" },
    { value: "Registration Closed", label: "Registration Closed" },
    { value: "Rescheduled", label: "Rescheduled" },
  ];

  const [participantsFilter, setParticipantsFilter] = useState("");
  const [participants, setParticipants] = useState(event.participants);

  const handleParticipantsFilter = (value) => {
    var filterValue = new RegExp(value, 'i');
    setParticipants(
      event.participants.filter((participant) =>
        [
          participant.name,
          participant.email,
        ].some((field) => filterValue.test(field))
      )
    )
    setParticipantsFilter(value);
  };

  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    setSelectedStatus(
      status.find((option) => option.value === event.status)
    );
  }, []);
  return (
    <>
      <section className="add_event">
        <PageHeading>
          <h2 className="page_heading">add events</h2>
          <div className="page_heading_btns">
            <Button
              label="disacrd"
              className="sm outline"
              icon={<Icons.TbX />}
            />
            <Button label="save" className="sm" icon={<Icons.TbCheck />} />
          </div>
        </PageHeading>
        <div className="container">
          <div className="sec_main">
            <div className="sec_main_sidebar">
              <div className="sec_main_sidebar_item">
                <h2 className="sub_heading">Organizer info</h2>
                <div className="user_sammery">
                  <figure className="user_sammery_img">
                    <img src={event.organizer.image} alt={`${event.organizer.name} profile`} />
                  </figure>
                  <div className="user_sammery_content">
                    <h2 className="user_sammery_name">{event.organizer.name}</h2>
                    <span className="user_sammery_email">
                      {event.organizer.email}
                    </span>
                  </div>
                  <Link className="button sm" to={`/organizers/manage/${event.id}`}>
                    <span>Visit organizer</span>
                    <Icons.TbLink />
                  </Link>
                </div>
              </div>
              <div className="sec_main_sidebar_item">
                <h2 className="sub_heading">Event info</h2>
                <Thumbnail required="Event thumbnail" preloadedImage={event.image}/>
              </div>
              <div className="sec_main_sidebar_item">
                <h2 className="sub_heading">Event info</h2>
                <SelectOption
                  options={eventTopics}
                  multiSelect={true}
                  label="Select Topics"
                  valid="Select at least 3 topics"
                  placeholder="select topics"
                />
              </div>
              <div className="sec_main_sidebar_item">
                <h2 className="sub_heading">Status</h2>
                <SelectOption
                  options={status}
                  label="Select status"
                  valid="Select status"
                  placeholder="Select status"
                  value={selectedStatus}
                />
              </div>
              <div className="sec_main_sidebar_item">
                <h2 className="sub_heading">participants limit</h2>
                <div className="form_control">
                  <Input
                    type="text"
                    value={formData.participantLimit}
                    onChange={(value) =>
                      handleInputChange("participantLimit", value)
                    }
                    placeholder="Participants Limit"
                    label="Participants Limit"
                    className={formData.participantLimit === "" ? "valid" : ""}
                    valid="Enter the Participants Limit."
                  />
                </div>
              </div>
              <div className="sec_main_sidebar_item">
                <h2 className="sub_heading">
                  <span>participants</span>
                  <small className="label">
                    {`${participants.length} / ${formData.participantLimit}`}
                  </small>
                </h2>
                <div className="form_control">
                  <Input
                    type="text"
                    value={participantsFilter}
                    onChange={handleParticipantsFilter}
                    placeholder="Search participants"
                    className={formData.eventName === "" ? "valid" : ""}
                  />
                </div>
                <ul className="participants_list">
                  {!participants.length == 0
                    ? participants.map((participant, key) => (
                        <li key={key}>
                          <Profile
                            label={participant.name}
                            category={participant.email}
                            src={participant.image}
                          />
                        </li>
                      ))
                    : "No participants"}
                </ul>
              </div>
            </div>
            <div className="sec_main_wrapper">
              <form action="#" className="form">
                <div className="sec_main_wrapper_item">
                  <h2 className="sub_heading">Event detail</h2>
                  <div className="form_control">
                    <Input
                      type="text"
                      value={formData.eventName}
                      onChange={(value) =>
                        handleInputChange("eventName", value)
                      }
                      placeholder="Enter event name..."
                      label="Event Name"
                      required={true}
                      icon={<Icons.TbCalendarCheck />}
                      max={100}
                      className={formData.eventName === "" ? "valid" : ""}
                      valid="Enter the solid event name."
                    />
                  </div>
                  <div className="form_control">
                    <TextEditor
                      value={formData.eventDescription}
                      onChange={(value) =>
                        handleInputChange("eventDescription", value)
                      }
                      placeholder="Enter event description..."
                      valid="Enter event description."
                      label="Event description"
                    />
                  </div>
                  <div className="form_control">
                    <Input
                      type="url"
                      value={formData.eventVideoUrl}
                      onChange={(value) =>
                        handleInputChange("eventVideoUrl", value)
                      }
                      placeholder="Enter Video URL..."
                      label="Event Video URL"
                      required={true}
                      icon={<Icons.TbVideo />}
                      className={formData.eventName === "" ? "valid" : ""}
                      valid="Enter the Video URL."
                    />
                  </div>
                </div>
                <div className="sec_main_wrapper_item">
                  <h2 className="sub_heading">Event Management</h2>
                  <div className="form_control">
                    <div className="event_laction_radio">
                      <button
                        className={`event_laction_tab ${
                          activeTab === "indoor" ? "active" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleTabChange("indoor");
                        }}
                      >
                        <span>in door</span>
                        <Icons.TbArrowBigLeftLine />
                      </button>
                      <button
                        className={`event_laction_tab ${
                          activeTab === "outdoor" ? "active" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleTabChange("outdoor");
                        }}
                      >
                        <span>out door</span>
                        <Icons.TbArrowBigRightLine />
                      </button>
                    </div>
                  </div>
                  <div className="form_control">
                    <Input
                      type="url"
                      value={formData.eventLocation}
                      onChange={(value) =>
                        handleInputChange("eventLocation", value)
                      }
                      placeholder="Enter the event location..."
                      label="Select Location"
                      required={true}
                      icon={<Icons.TbSearch />}
                      className={formData.eventName === "" ? "valid" : ""}
                      valid="Enter the location."
                    />
                  </div>
                </div>
                <div className="sec_main_wrapper_item">
                  <h2 className="sub_heading">Schedule Information</h2>
                  <div className="form_control">
                    <Input
                      type="date"
                      value={formData.eventDate}
                      onChange={(value) =>
                        handleInputChange("eventDate", value)
                      }
                      placeholder="Set the Date of event"
                      label="Select date"
                      required={true}
                      icon={<Icons.TbCalendarCheck />}
                      className={formData.eventName === "" ? "valid" : ""}
                      valid="Enter the date."
                    />
                  </div>
                  <div className="form_control">
                    <Input
                      type="time"
                      value={formData.eventTime}
                      onChange={(value) =>
                        handleInputChange("eventTime", value)
                      }
                      placeholder="Search Cities or ZIP codes..."
                      label="Select Time"
                      required={true}
                      icon={<Icons.TbClockHour2 />}
                      className={formData.eventName === "" ? "valid" : ""}
                      valid="Enter the Time."
                    />
                  </div>
                  <div className="form_control">
                    <Input
                      type="text"
                      value={formData.eventDuration}
                      onChange={(value) =>
                        handleInputChange("eventDuration", value)
                      }
                      placeholder="Duration..."
                      label="Duration"
                      required={true}
                      icon={<Icons.TbClockPlay />}
                      className={formData.eventName === "" ? "valid" : ""}
                      valid="Duration."
                    />
                  </div>
                </div>
                <div className="sec_main_wrapper_item">
                  <h2 className="sub_heading">Scheduled Repetitions</h2>
                  <div className="form_control">
                    <Toggler
                      label="Repeatative events"
                      checked={toggle}
                      onChange={handleToggleChange}
                    />
                    <div
                      className={`event_repeat_main ${
                        !toggle ? "disable" : ""
                      }`}
                    >
                      <div className="event_repeat daily">
                        <div className="event_repeat_head">
                          <CheckBox
                            checked={daily}
                            label="Daily Repeat"
                            onChange={handleDailyEvent}
                          />
                        </div>
                        <div
                          className={`event_repeat_body ${
                            !daily ? "disable" : ""
                          }`}
                        >
                          {Object.keys(dayChange).map((day, key) => (
                            <label htmlFor={day} key={key}>
                              <input
                                type="checkbox"
                                id={day}
                                checked={dayChange[day] || false}
                                onChange={() => handleDaysEvent(day)}
                                name="days"
                              />
                              <span>{day}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="event_repeat weekly">
                        <div className="event_repeat_head">
                          <CheckBox
                            checked={weekly}
                            label="Weekly Repeat"
                            onChange={handleWeeklyEvent}
                          />
                        </div>
                        <div
                          className={`event_repeat_body ${
                            !weekly ? "disable" : ""
                          }`}
                        >
                          {Object.keys(weekChange).map((week, key) => (
                            <label htmlFor={week} key={key}>
                              <input
                                checked={weekChange[week] || false}
                                type="checkbox"
                                id={week}
                                onChange={() => handleWeeksEvent(week)}
                                name="weeks"
                              />
                              <span>{week}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sec_main_wrapper_item">
                  <h2 className="sub_heading">Event tickets</h2>
                  <div className="form_control">
                    <div className="tickets">
                      {tickets.map(function (ticket, key) {
                        const isChecked = ticket.type === "free" && event.price === "Free";
                        return (
                          <label className="event_laction_tab ticket" key={key}>
                            <input
                              type="radio"
                              name="ticket"
                              value={ticket.type}
                              checked={isChecked}
                            />
                            <span>{ticket.type}</span>
                            {ticket.icon}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="sec_main_wrapper_item">
                  <h2 className="sub_heading">Free ticket booking</h2>
                  <div className="form_control">
                    <Input
                      type="text"
                      value={formData.eventTicketName}
                      onChange={(value) =>
                        handleInputChange("eventTicketName", value)
                      }
                      placeholder="Ticket name..."
                      label="Event Ticket Name"
                      required={true}
                      icon={<Icons.TbTicket />}
                      max={100}
                      className={formData.eventName === "" ? "valid" : ""}
                      valid="Enter the event ticket name."
                    />
                  </div>
                  <div className="form_control">
                    <Input
                      type="number"
                      value={formData.eventTicketSale}
                      onChange={(value) =>
                        handleInputChange("eventTicketSale", value)
                      }
                      placeholder="200"
                      label="Number of Tickets on sale"
                      required={true}
                      icon={<Icons.TbListNumbers />}
                      max={100}
                      className={formData.eventName === "" ? "valid" : ""}
                      valid="Number of Tickets on sale"
                    />
                  </div>
                  <div className="form_control">
                    <Input
                      type="number"
                      value={formData.eventTicketPrice}
                      onChange={(value) =>
                        handleInputChange("eventTicketPrice", value)
                      }
                      placeholder="Ticket Price..."
                      label="Event Ticket Price"
                      required={true}
                      icon={<Icons.TbMoneybag />}
                      max={100}
                      className={formData.eventName === "" ? "valid" : ""}
                      valid="Enter the event ticket Price."
                    />
                  </div>
                  <div className="form_control">
                    <Input
                      type="text"
                      value={formData.eventTicketCurrency}
                      onChange={(value) =>
                        handleInputChange("eventTicketCurrency", value)
                      }
                      placeholder="Ticket currency..."
                      label="Event Ticket currency"
                      required={true}
                      icon={<Icons.TbCurrency />}
                      max={100}
                      className={formData.eventName === "" ? "valid" : ""}
                      valid="Enter the event ticket currency."
                    />
                  </div>
                  <div className="form_control">
                    <Textarea
                      type="text"
                      value={formData.eventTicketName}
                      onChange={(value) =>
                        handleInputChange("eventTicketName", value)
                      }
                      placeholder="Additional Instruction..."
                      label="Additional Instruction (will be sent in the Ticket Email)"
                      required={true}
                      icon={<Icons.TbBook />}
                      max={100}
                      className={formData.eventName === "" ? "valid" : ""}
                      valid="Enter the event Additional Instruction."
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditEvent;
