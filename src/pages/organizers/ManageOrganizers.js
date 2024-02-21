import React, { useState } from "react";
import * as Icons from "react-icons/tb";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input.js";
import Modal from "../../components/common/Modal.js";
import Badge from "../../components/common/Badge.js";
import Button from "../../components/common/Button.js";
import Profile from "../../components/common/Profile.js";
import { organizers, showEvents } from "../../api/api.js";
import CheckBox from "../../components/common/CheckBox.js";
import Dropdown from "../../components/common/Dropdown.js";
import Textarea from "../../components/common/Textarea.js";
import Pagination from "../../components/common/Pagination.js";
import PageHeading from "../../components/common/PageHeading.js";
import SelectOption from "../../components/common/SelectOption.js";

const ManageOrganizers = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    country: "",
    identification: "",
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
    { value: "Verified", label: "Verified" },
    { value: "Pending", label: "Pending" },
    { value: "Cancel", label: "Cancel" },
  ];

  const advanceFilterOptions = [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "phonenumber", label: "Number" },
    { value: "city", label: "City" },
    { value: "country", label: "Country" },
    { value: "status", label: "Status" },
    { value: "createdAt", label: "Create At" },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  // Function to handle advance filter selection

  const [advanceForm, setAdvanceForm] = useState(false);

  // Function to toggle advance filter form
  const hanldeAdvanceFilterForm = () => {
    setAdvanceForm(!advanceForm);
    setSelectedOptions([]);
    setUpdatedFilter(organizers);
  };

  const handleAdvanceFilter = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };

  const [updateedFilter, setUpdatedFilter] = useState(organizers);

  // Function to handle filter input
  const handleFilter = (e) => {
    var filterValue = e;
    setUpdatedFilter(
      organizers.filter(
        (item) =>
          item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.email.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.city.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.country.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.identification.toLowerCase().includes(filterValue.toLowerCase())
      )
    );
  };

  const handleAdvanceFormSubmit = () => {
    const { name, email, phonenumber, country, city } = formData;

    const filters = {
      name: new RegExp(name, 'i'),
      email: new RegExp(email, 'i'),
      country: new RegExp(country, 'i'),
      city: new RegExp(city, 'i'),
      phonenumber: new RegExp(phonenumber, 'i'),
    };

    const advanceFilteredData = organizers.filter((organizer) => {
      return Object.keys(filters).every((key) => {
        return filters[key].test(organizer[key]);
      });
    });

    setUpdatedFilter(advanceFilteredData);
    setFormData({
      name: "",
      email: "",
      city: "",
      country: "",
      identification: "",
    });
  };



  const [bulkAction, setBulkAction] = useState(false);
  const [rowActions, setRowActions] = useState({});
  const handleBulkAction = (isChecked) => {
    setBulkAction(isChecked);
    if (isChecked) {
      const newRowActions = {};
      organizers.forEach((organizer) => {
        newRowActions[organizer.id] = true;
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
      const updatedFilterCopy = [...updateedFilter];

      // Iterate through selected rows and delete them
      selectedRows.forEach((selectedRow) => {
        const indexToDelete = updatedFilterCopy.findIndex(
          (organizer) => organizer.id === selectedRow
        );

        if (indexToDelete >= 0) {
          updatedFilterCopy.splice(indexToDelete, 1);
        }
      });

      setUpdatedFilter(updatedFilterCopy);

      setRowActions({});
    }
  };

  const handleDelete = (indexToDelete) => {
    if (indexToDelete >= 0 && indexToDelete < updateedFilter.length) {
      const updatedFilterCopy = [...updateedFilter];
      updatedFilterCopy.splice(indexToDelete, 1);
      setUpdatedFilter(updatedFilterCopy);
    }
  };
  return (
    <section className="manage_event">
      <PageHeading>
        <h2 className="page_heading">Manage Organizers</h2>
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
          <Link to="/organizers/add" className="button sm">
            <span>Add Orginazer</span>
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
                            placeholder={`Organizer ${option.value}`}
                            label={`Organizer ${option.value}`}
                            className={formData.name === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "email") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="email"
                            value={formData.email || ""}
                            onChange={(value) =>
                              handleInputChange("email", value)
                            }
                            placeholder={`Organizer ${option.value}`}
                            label={`Organizer ${option.value}`}
                            className={formData.email === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "phonenumber") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.phonenumber || ""}
                            onChange={(value) =>
                              handleInputChange("phonenumber", value)
                            }
                            placeholder={`Organizer ${option.value}`}
                            label={`Organizer ${option.value}`}
                            className={formData.phonenumber === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "status") {
                      return (
                        <div key={option.value} className="form_control">
                          <SelectOption
                            options={status}
                            placeholder={`Select ${option.value}`}
                            label={`Organizer ${option.value}`}
                          />
                        </div>
                      );
                    } else if (option.value === "city") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.city || ""}
                            onChange={(value) =>
                              handleInputChange("city", value)
                            }
                            placeholder={`Organizer ${option.value}`}
                            label={`Organizer ${option.value}`}
                            className={formData.city === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "country") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.country || ""}
                            onChange={(value) =>
                              handleInputChange("country", value)
                            }
                            placeholder={`Organizer ${option.value}`}
                            label={`Organizer ${option.value}`}
                            className={formData.country === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "createdAt") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.createdAt || ""}
                            onChange={(value) =>
                              handleInputChange("createdAt", value)
                            }
                            placeholder={`Organizer ${option.value}`}
                            label={`Organizer ${option.value}`}
                            className={formData.createdAt === "" ? "valid" : ""}
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
                placeholder="Search Organizers..."
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
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Status</th>
                    <th>Identification</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {updateedFilter &&
                    updateedFilter.map((organizer, index) => (
                      <tr key={index}>
                        <td>
                          <CheckBox
                            checked={rowActions[organizer.id] || false}
                            onChange={() => handleSingleRowAction(organizer.id)}
                            className="custom-checkbox"
                            id={`featureCheckbox${organizer.id}`}
                          />
                        </td>
                        <td>{organizer.id}</td>
                        <td>
                          <Profile
                            src={organizer.image}
                            label={organizer.name}
                            category={organizer.package}
                            link={organizer.id}
                          />
                        </td>
                        <td>{organizer.email}</td>
                        <td>{organizer.phonenumber}</td>
                        <td>{organizer.city}</td>
                        <td>{organizer.country}</td>
                        <td>
                          {organizer.status === "verified" ? (
                            <Badge
                              label={organizer.status}
                              className="light-success"
                            />
                          ) : organizer.status === "cancel" ? (
                            <Badge
                              label={organizer.status}
                              className="light-danger"
                            />
                          ) : (
                            <Badge
                              label={organizer.status}
                              className="light-warning"
                            />
                          )}
                        </td>
                        <td>{organizer.identification}</td>
                        <td>
                          <div className="actions">
                            <Button
                              className="sm danger"
                              onClick={() => handleDelete(index)}
                              icon={<Icons.TbTrash />}
                            />
                            <Link to={organizer.id}>
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

export default ManageOrganizers;
