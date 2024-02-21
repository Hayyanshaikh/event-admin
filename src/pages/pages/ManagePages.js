import React, { useState } from "react";
import * as Icons from "react-icons/tb";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input.js";
import Modal from "../../components/common/Modal.js";
import Badge from "../../components/common/Badge.js";
import Button from "../../components/common/Button.js";
import Profile from "../../components/common/Profile.js";
import { pages, showEvents } from "../../api/api.js";
import CheckBox from "../../components/common/CheckBox.js";
import Dropdown from "../../components/common/Dropdown.js";
import Textarea from "../../components/common/Textarea.js";
import Pagination from "../../components/common/Pagination.js";
import PageHeading from "../../components/common/PageHeading.js";
import SelectOption from "../../components/common/SelectOption.js";

const ManagePages = () => {
  const [formData, setFormData] = useState({
    title: "",
    template: "",
    status: "",
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
    { value: "title", label: "Title" },
    { value: "template", label: "Template" },
    { value: "status", label: "Status" },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  // Function to handle advance filter selection

  const [advanceForm, setAdvanceForm] = useState(false);

  // Function to toggle advance filter form
  const hanldeAdvanceFilterForm = () => {
    setAdvanceForm(!advanceForm);
    setSelectedOptions([]);
    setUpdatedFilter(pages);
  };

  const handleAdvanceFilter = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };

  const [updatedFilter, setUpdatedFilter] = useState(pages);

  // Function to handle filter input
  const handleFilter = (e) => {
    var filterValue = new RegExp(e, "i");
    setUpdatedFilter(
      pages.filter((item) =>
        [item.title, item.template, item.publish, item.status].some((field) =>
          filterValue.test(field)
        )
      )
    );
  };

  const handleAdvanceFormSubmit = () => {
    const { title, template, status } = formData;

    const filters = {
      title: new RegExp(title, "i"),
      template: new RegExp(template, "i"),
      status: new RegExp(status, "i"),
    };

    const advanceFilteredData = pages.filter((event) => {
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
      pages.forEach((page) => {
        newRowActions[page.id] = true;
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
          (page) => page.id === selectedRow
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
    setUpdatedFilter(pages);
  };
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
          <Link to="/event-managment/pages/add" className="button sm">
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
                    if (option.value === "title") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.title || ""}
                            onChange={(value) =>
                              handleInputChange("title", value)
                            }
                            placeholder={`Event ${option.value}`}
                            label={`Event ${option.value}`}
                            className={formData.title === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "template") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="template"
                            value={formData.template || ""}
                            onChange={(value) =>
                              handleInputChange("template", value)
                            }
                            placeholder={`Event ${option.value}`}
                            label={`Event ${option.value}`}
                            className={formData.template === "" ? "valid" : ""}
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
                    <th>Template</th>
                    <th>Publish</th>
                    <th>Status</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedFilter &&
                    updatedFilter.map((page, index) => (
                      <tr key={index}>
                        <td>
                          <CheckBox
                            checked={rowActions[page.id] || false}
                            onChange={() => handleSingleRowAction(page.id)}
                            className="custom-checkbox"
                            id={`featureCheckbox${page.id}`}
                          />
                        </td>
                        <td>{page.id}</td>
                        <td>
                          <Link to={page.id}>{page.title}</Link>
                        </td>
                        <td>{page.template}</td>
                        <td>{page.publish}</td>
                        <td>
                          {page.status === "published" ? (
                            <Badge
                              label={page.status}
                              className="light-success"
                            />
                          ) : page.status === "pending" ? (
                            <Badge
                              label={page.status}
                              className="light-warning"
                            />
                          ) : (
                            <Badge
                              label={page.status}
                              className="light-secondary"
                            />
                          )}
                        </td>
                        <td>
                          <div className="actions">
                            <Button
                              className="sm danger"
                              onClick={() => handleDelete(index)}
                              icon={<Icons.TbTrash />}
                            />
                            <Link to={page.id.toString()}>
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

export default ManagePages;
