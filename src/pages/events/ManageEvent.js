
import React, { useState } from "react";
import * as Icons from "react-icons/tb";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input.js";
import Modal from "../../components/common/Modal.js";
import Badge from "../../components/common/Badge.js";
import Button from "../../components/common/Button.js";
import Profile from "../../components/common/Profile.js";
import { events, showEvents } from "../../api/api.js";
import CheckBox from "../../components/common/CheckBox.js";
import Dropdown from "../../components/common/Dropdown.js";
import Textarea from "../../components/common/Textarea.js";
import Pagination from "../../components/common/Pagination.js";
import PageHeading from "../../components/common/PageHeading.js";
import SelectOption from "../../components/common/SelectOption.js";

const ManageEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    organizer: "",
    time: "",
    laction: "",
    status: "",
    price: "",
    date: "",
  });

  // Function to handle input field changes
  const handleInputChange = (fieldName, newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: newValue,
    }));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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


  const advanceFilterOptions = [
    { value: "name", label: "Name" },
    { value: "time", label: "Time" },
    { value: "location", label: "Location" },
    { value: "status", label: "Status" },
    { value: "price", label: "Price" },
    { value: "date", label: "Date" },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  // Function to handle advance filter selection

  const [advanceForm, setAdvanceForm] = useState(false);

  // Function to toggle advance filter form
  const hanldeAdvanceFilterForm = () => {
    setAdvanceForm(!advanceForm);
    setSelectedOptions([]);
    setUpdatedFilter(events);
  };

  const handleAdvanceFilter = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };

  const [updatedFilter, setUpdatedFilter] = useState(events);

  // Function to handle filter input
  const handleFilter = (e) => {
    var filterValue = new RegExp(e, 'i'); // 'i' flag for case-insensitive matching
    setUpdatedFilter(
      events.filter((item) =>
        [
          item.name,
          item.time,
          item.location,
          item.status,
          item.price,
          item.date,
        ].some((field) => filterValue.test(field))
      )
    );
  };

  const handleAdvanceFormSubmit = () => {
  const { name, organizer, time, location, status, price, date } = formData;

  const filters = {
    name: new RegExp(name, 'i'),
    time: new RegExp(time, 'i'),
    location: new RegExp(location, 'i'),
    status: new RegExp(status, 'i'),
    price: new RegExp(price, 'i'),
    date: new RegExp(date, 'i'),
  };

  const advanceFilteredData = events.filter((event) => {
    return Object.keys(filters).every((key) => {
      return filters[key].test(event[key]);
    });
  });

  setUpdatedFilter(advanceFilteredData);

};

  const [bulkAction, setBulkAction] = useState(false);
  const [rowActions, setRowActions] = useState({});
  const handleBulkAction = (isChecked) => {
    setBulkAction(isChecked);
    if (isChecked) {
      const newRowActions = {};
      events.forEach((event) => {
        newRowActions[event.id] = true;
      });
      setRowActions(newRowActions);
    } else {
      setRowActions({});
    }
  };

  const handleSingleRowAction = (id) => {
    setRowActions((prevRowActions) => ({
      ...prevRowActions,
      [id]: !prevRowActions[id],
    }));
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const dropDown = [{ value: "delete" }];

  const bulkActionClick = (e) => {
    const selectedRows = Object.keys(rowActions).filter(
      (key) => rowActions[key]
    );

    if (selectedRows.length > 0) {
      const updatedFilterCopy = [...updatedFilter];

      // Iterate through selected rows and delete them
      selectedRows.forEach((selectedRow) => {
      const indexToDelete = updatedFilterCopy.findIndex(
        (event) => event.id === parseInt(selectedRow)
      );

      if (indexToDelete >= 0) {
        updatedFilterCopy.splice(indexToDelete, 1);
      }
    });

      setUpdatedFilter(updatedFilterCopy);

      // Clear rowActizons
      setRowActions({});
    }
  };

  const handleDelete = (indexToDelete) => {
    if (indexToDelete >= 0 && indexToDelete < updatedFilter.length) {
      const updatedFilterCopy = [...updatedFilter];
      updatedFilterCopy.splice(indexToDelete, 1);
      setUpdatedFilter(updatedFilterCopy);
    }
  };

  const handleReload = () => {
    setUpdatedFilter(events);
  }
  return (
    <section className="manage_event">
      <PageHeading>
        <h2 className="page_heading">Manage Events</h2>

        <Button
          className="sm show_600"
          onClick={hanldeAdvanceFilterForm}
          icon={<Icons.TbFilter />}
        />
        <div className="page_heading_btns hide_600">
          <Button
            label="Download List"
            className="sm outline"
            icon={<Icons.TbDownload />}
          />
          <Link to="/event-managment/events/add" className="button sm">
            <span>Add Event</span>
            <Icons.TbPlus />
          </Link>
        </div>
      </PageHeading>
      <div className="container">
        <div className="manage_event_main sec_main">
          {advanceForm && (
            <div className="sec_main_wrapper_item">
              <div className="advance_filter_form">
                <div className="advance_head">
                  <h2>Advance Filter</h2>
                </div>
                <div className="advance_body">
                  {selectedOptions.map((option) => {
                    if (option.value === "name") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.name || ""}
                            onChange={(value) =>
                              handleInputChange("name", value)
                            }
                            placeholder={`Event ${option.value}`}
                            label={`Event ${option.value}`}
                            className={formData.name === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "organizer") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="organizer"
                            value={formData.organizer || ""}
                            onChange={(value) =>
                              handleInputChange("organizer", value)
                            }
                            placeholder={`Event ${option.value}`}
                            label={`Event ${option.value}`}
                            className={formData.organizer === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "time") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.time || ""}
                            onChange={(value) =>
                              handleInputChange("time", value)
                            }
                            placeholder={`Event ${option.value}`}
                            label={`Event ${option.value}`}
                            className={formData.time === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "status") {
                      return (
                        <div key={option.value} className="form_control">
                          <SelectOption
                            options={status}
                            placeholder={`Select ${option.value}`}
                            label={`Event ${option.value}`}
                          />
                        </div>
                      );
                    } else if (option.value === "location") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.location || ""}
                            onChange={(value) =>
                              handleInputChange("location", value)
                            }
                            placeholder={`Event ${option.value}`}
                            label={`Event ${option.value}`}
                            className={formData.location === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "price") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.price || ""}
                            onChange={(value) =>
                              handleInputChange("price", value)
                            }
                            placeholder={`Event ${option.value}`}
                            label={`Event ${option.value}`}
                            className={formData.price === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "date") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.date || ""}
                            onChange={(value) =>
                              handleInputChange("date", value)
                            }
                            placeholder={`Event ${option.value}`}
                            label={`Event ${option.value}`}
                            className={formData.date === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="advance_footer">
                  <div className="form_control auto">
                    <SelectOption
                      options={advanceFilterOptions}
                      placeholder="select field"
                      onChange={handleAdvanceFilter}
                      multiSelect={true}
                    />
                  </div>
                  <Button
                    onClick={hanldeAdvanceFilterForm}
                    label="discard"
                    className="outline sm"
                  />
                  <Button
                    label="Apply"
                    onClick={handleAdvanceFormSubmit}
                    className="sm"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="sec_main_wrapper_item">
            <div className="manage_event_head">
              <Dropdown
                placeholder="Bulk Action"
                onClick={bulkActionClick}
                options={dropDown}
              />
              <Input
                placeholder="Search Events..."
                icon={<Icons.TbSearch />}
                onChange={handleFilter}
                className="me_filter"
              />
              <Button
                label="Advance Filter"
                className="hide_600 sm right"
                onClick={hanldeAdvanceFilterForm}
                icon={<Icons.TbFilter />}
              />
              <Button
                label="Refresh"
                className="hide_600 sm"
                onClick={handleReload}
                icon={<Icons.TbReload />}
              />
            </div>
            <div className="manage_event_table table_responsive">
              <table className=" striped">
                <thead>
                  <tr>
                    <th>
                      <CheckBox
                        checked={bulkAction}
                        onChange={handleBulkAction}
                        className="custom-checkbox"
                        id="featureCheckbox"
                      />
                    </th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Participants</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedFilter &&
                    updatedFilter.map((event, index) => (
                      <tr key={index}>
                        <td>
                          <CheckBox
                            checked={rowActions[event.id] || false}
                            onChange={() => handleSingleRowAction(event.id)}
                            className="custom-checkbox"
                            id={`featureCheckbox${event.id}`}
                          />
                        </td>
                        <td>{event.id}</td>
                        <td>
                          <Profile
                            src={event.image}
                            label={event.name}
                            category={event.topic}
                            link={event.id.toString()}
                          />
                        </td>
                        <td>
                          {
                            event.participants.length >= event.maxParticipants ? (
                              "Full"
                            ) : `${event.participants.length}/${event.maxParticipants}`
                          }
                        </td>
                        <td>{event.time}</td>
                        <td>{event.location}</td>
                        <td>
                          {event.status === "success" || event.status === "Completed" || event.status === "Registration Open" ? (
                            <Badge label={event.status} className="light-success" />
                          ) : event.status === "Cancelled" ? (
                            <Badge label={event.status} className="light-danger" />
                          ) : event.status === "Scheduled" ? (
                            <Badge label={event.status} className="light-primary" />
                          ) : event.status === "Postponed" ? (
                            <Badge label={event.status} className="light-warning" />
                          ) : event.status === "Ongoing" ? (
                            <Badge label={event.status} className="light-info" />
                          ) : event.status === "Sold Out" ? (
                            <Badge label={event.status} className="light-danger" />
                          ) : event.status === "Registration Closed" ? (
                            <Badge label={event.status} className="light-danger" />
                          ) : (
                            <Badge label={event.status} className="light-warning" />
                          )}

                        </td>
                        <td>{event.price}</td>
                        <td>{event.date}</td>
                        <td>
                          <div className="actions">
                            <Button
                              className="sm danger"
                              onClick={() => handleDelete(index)}
                              icon={<Icons.TbTrash />}
                            />
                            <Link to={event.id.toString()}>
                              <Button
                                className="sm primary"
                                icon={<Icons.TbEdit />}
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="manage_event_footer">
              <SelectOption
                options={showEvents}
                placeholder="select topics"
                className="event_filter"
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="event_pagination"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageEvent;
