import React, { useState } from "react";
import * as Icons from "react-icons/tb";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input.js";
import Badge from "../../components/common/Badge.js";
import Button from "../../components/common/Button.js";
import Rating from '../../components/common/Rating.js';
import { reviews, showEvents } from "../../api/api.js";
import Profile from "../../components/common/Profile.js";
import CheckBox from "../../components/common/CheckBox.js";
import Dropdown from "../../components/common/Dropdown.js";
import Pagination from "../../components/common/Pagination.js";
import PageHeading from "../../components/common/PageHeading.js";
import SelectOption from "../../components/common/SelectOption.js";

const UserList = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
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

  const advanceFilterOptions = [
    { value: "name", label: "Name" },
    { value: "id", label: "ID" },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  // Function to handle advance filter selection

  const [advanceForm, setAdvanceForm] = useState(false);

  // Function to toggle advance filter form
  const hanldeAdvanceFilterForm = () => {
    setAdvanceForm(!advanceForm);
    setSelectedOptions([]);
    setUpdatedFilter(reviews);
  };

  const handleAdvanceFilter = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };

  const [updatedFilter, setUpdatedFilter] = useState(reviews);

  // Function to handle filter input
  const handleFilter = (e) => {
    var filterValue = e.trim(" ");
    setUpdatedFilter(
      reviews.filter(
        (item) =>
          item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.email.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.address.city.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.address.street
            .toString()
            .toLowerCase()
            .includes(filterValue.toString().toLowerCase()) ||
          item.phone
            .toString()
            .toLowerCase()
            .includes(filterValue.toString().toLowerCase())
      )
    );
  };

  const handleAdvanceFormSubmit = () => {
    const { id, name } = formData;

    const filters = {
      id: new RegExp(id, "i"),
      name: new RegExp(name, "i"),
    };

    const advanceFilteredData = reviews.filter((use) => {
      return Object.keys(filters).every((key) => {
        return filters[key].test(use[key]);
      });
    });

    setUpdatedFilter(advanceFilteredData);
    setFormData({
      id: "",
      name: "",
    });
  };

  const [bulkAction, setBulkAction] = useState(false);
  const [rowActions, setRowActions] = useState({});
  const handleBulkAction = (isChecked) => {
    setBulkAction(isChecked);
    if (isChecked) {
      const newRowActions = {};
      reviews.forEach((review) => {
        newRowActions[review.id] = true;
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

      selectedRows.forEach((selectedRow) => {
        const indexToDelete = updatedFilterCopy.findIndex(
          (review) => review.id === selectedRow
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
    if (indexToDelete >= 0 && indexToDelete < updatedFilter.length) {
      const updatedFilterCopy = [...updatedFilter];
      updatedFilterCopy.splice(indexToDelete, 1);
      setUpdatedFilter(updatedFilterCopy);
    }
  };
  return (
    <section className="manage_event">
      <PageHeading>
        <h2 className="page_heading">Reviews</h2>

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
                            placeholder={`Organizer ${option.label}`}
                            label={`Organizer ${option.label}`}
                            className={formData.name === "" ? "valid" : ""}
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
              <table className="striped">
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
                    <th>Review</th>
                    <th>Text</th>
                    <th>Date</th>
                    <th>Likes</th>
                    <th>Dislikes</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedFilter.map((review, index) => (
                   <tr key={index}>
                        <td>
                          <CheckBox
                            checked={rowActions[review.id] || false}
                            onChange={() => handleSingleRowAction(review.id)}
                            className="custom-checkbox"
                          />
                        </td>
                        <td>{review.id}</td>
                        <td>
                          <Profile
                            link={`${review.id}`}
                            src={review.image}
                            label={review.name}
                          />
                        </td>
                        <td>{review.date}</td>
                        <td>
                          <Rating value={review.review} max={5} />
                        </td>
                        <td>
                          <p className="review_text line_clamp line_clamp_2">
                            {review.text}
                          </p>
                        </td>
                        <td>
                          <div className="likes">
                            <Icons.TbThumbUp />
                            {review.likes}
                          </div>
                        </td>
                        <td>
                          <div className="likes">
                            <Icons.TbThumbDown />
                            {review.dislikes}
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

export default UserList;
