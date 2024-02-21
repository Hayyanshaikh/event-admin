import React, { useState } from "react";
import * as Icons from "react-icons/tb";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input.js";
import Modal from "../../components/common/Modal.js";
import Badge from "../../components/common/Badge.js";
import Button from "../../components/common/Button.js";
import Profile from "../../components/common/Profile.js";
import { categories, showEvents } from "../../api/api.js";
import CheckBox from "../../components/common/CheckBox.js";
import Dropdown from "../../components/common/Dropdown.js";
import Textarea from "../../components/common/Textarea.js";
import Pagination from "../../components/common/Pagination.js";
import PageHeading from "../../components/common/PageHeading.js";
import SelectOption from "../../components/common/SelectOption.js";

const ManageCategories = () => {
  const [formData, setFormData] = useState({
	  name: "",
	  description: "",
	  status: "",
	  created_at: "",
	  updated_at: "",
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
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "Draft", label: "Draft" },
    { value: "Archived", label: "Archived" },
    { value: "Deleted", label: "Deleted" },
    { value: "Hidden", label: "Hidden" },
    { value: "Featured", label: "Featured" },
  ];

  const advanceFilterOptions = [
    { value: "name", label: "Name" },
    { value: "description", label: "Description" },
    { value: "status", label: "Status" },
    { value: "created_at", label: "Create At" },
    { value: "updated_at", label: "Updated At" },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  // Function to handle advance filter selection

  const [advanceForm, setAdvanceForm] = useState(false);

  // Function to toggle advance filter form
  const hanldeAdvanceFilterForm = () => {
    setAdvanceForm(!advanceForm);
    setSelectedOptions([]);
    setUpdatedFilter(categories);
  };

  const handleAdvanceFilter = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };

  const [updateedFilter, setUpdatedFilter] = useState(categories);

  // Function to handle filter input
  const handleFilter = (e) => {
    var filterValue = e.toLowerCase();
    var regexPattern = new RegExp(filterValue, "i");

    setUpdatedFilter(
      categories.filter((item) => {
        return (
          regexPattern.test(item.name) ||
          regexPattern.test(item.status) ||
          regexPattern.test(item.description)
        );
      })
    );
  };

  const handleAdvanceFormSubmit = () => {
    const { name, description, status, created_at, updated_at } = formData;

    const filters = {
      name: new RegExp(name, "i"),
      description: new RegExp(description, "i"),
      status: new RegExp(status, "i"),
      created_at: new RegExp(created_at, "i"),
      updated_at: new RegExp(updated_at, "i"),
    };

    const advanceFilteredData = categories.filter((category) => {
      return Object.keys(filters).every((key) => {
        return filters[key].test(category[key]);
      });
    });

    setUpdatedFilter(advanceFilteredData);
    setFormData({
      name: "",
      description: "",
      status: "",
      created_at: "",
      updated_at: "",
    });
  };

  const [bulkAction, setBulkAction] = useState(false);
  const [rowActions, setRowActions] = useState({});
  const handleBulkAction = (isChecked) => {
    setBulkAction(isChecked);
    if (isChecked) {
      const newRowActions = {};
      categories.forEach((category) => {
        newRowActions[category.id] = true;
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
          (category) => category.id.toString() === selectedRow
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
  const handleReload = () => {
    setUpdatedFilter(categories);
  };
  return (
    <section className="manage_event">
      <PageHeading>
        <h2 className="page_heading">Manage Categories</h2>

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
          <Link to="/event-managment/categories/manage/add" className="button sm">
            <span>Add Category</span>
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
                            placeholder={`Category ${option.label}`}
                            label={`Category ${option.label}`}
                            className={formData.name === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "description") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.description || ""}
                            onChange={(value) =>
                              handleInputChange("description", value)
                            }
                            placeholder={`Category ${option.label}`}
                            label={`Category ${option.label}`}
                            className={
                              formData.description === "" ? "valid" : ""
                            }
                          />
                        </div>
                      );
                    } else if (option.value === "status") {
                      return (
                        <div key={option.value} className="form_control">
                          <SelectOption
                            options={status}
                            value={formData.status || ""}
                            onChange={(value) =>
                              handleInputChange("status", value)
                            }
                            placeholder={`Select ${option.label}`}
                            label={`Category ${option.label}`}
                          />
                        </div>
                      );
                    } else if (option.value === "created_at") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.created_at || ""}
                            onChange={(value) =>
                              handleInputChange("created_at", value)
                            }
                            placeholder={`Category ${option.label}`}
                            label={`Category ${option.label}`}
                            className={
                              formData.created_at === "" ? "valid" : ""
                            }
                          />
                        </div>
                      );
                    } else if (option.value === "updated_at") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.updated_at || ""}
                            onChange={(value) =>
                              handleInputChange("updated_at", value)
                            }
                            placeholder={`Category ${option.label}`}
                            label={`Category ${option.label}`}
                            className={
                              formData.updated_at === "" ? "valid" : ""
                            }
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
                placeholder="Search Categorys..."
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
                    <th>Category Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Create At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {updateedFilter &&
                    updateedFilter.map((category, index) => (
                      <tr key={index}>
                        <td>
                          <CheckBox
                            checked={rowActions[category.id] || false}
                            onChange={() => handleSingleRowAction(category.id)}
                            className="custom-checkbox"
                            id={`featureCheckbox${category.id}`}
                          />
                        </td>
                        <td>{category.id}</td>
                        <td>
                          <Profile
                            src={category.image}
                            label={category.name}
                            link={category.id.toString()}
                          />
                        </td>
                        <td>{category.description}</td>
                        <td>
                          {category.status === "Active" ? (
                            <Badge
                              label={category.status}
                              className="light-success"
                            />
                          ) : category.status === "Inactive" ? (
                            <Badge
                              label={category.status}
                              className="light-danger"
                            />
                          ) : category.status === "Draft" ? (
                            <Badge
                              label={category.status}
                              className="light-warning"
                            />
                          ) : category.status === "Archived" ? (
                            <Badge
                              label={category.status}
                              className="light-info"
                            />
                          ) : category.status === "Deleted" ? (
                            <Badge
                              label={category.status}
                              className="light-danger"
                            />
                          ) : category.status === "Hidden" ? (
                            <Badge
                              label={category.status}
                              className="light-warning"
                            />
                          ) : category.status === "Featured" ? (
                            <Badge
                              label={category.status}
                              className="light-primary"
                            />
                          ) : (
                            <Badge
                              label={category.status}
                              className="light-secondary"
                            />
                          )}
                        </td>
                        <td>{category.created}</td>
                        <td>{category.updated}</td>
                        <td>
                          <div className="actions">
                            <Button
                              className="sm danger"
                              onClick={() => handleDelete(index)}
                              icon={<Icons.TbTrash />}
                            />
                            <Link to={category.id.toString()}>
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

export default ManageCategories;
