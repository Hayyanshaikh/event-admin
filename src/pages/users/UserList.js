import React, { useState } from "react";
import * as Icons from "react-icons/tb";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input.js";
import Button from "../../components/common/Button.js";
import Profile from "../../components/common/Profile.js";
import { users, showEvents } from "../../api/api.js";
import CheckBox from "../../components/common/CheckBox.js";
import Dropdown from "../../components/common/Dropdown.js";
import Pagination from "../../components/common/Pagination.js";
import PageHeading from "../../components/common/PageHeading.js";
import SelectOption from "../../components/common/SelectOption.js";

const UserList = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    city: "",
    phone: "",
    address: "",
    account_creation_date: "",
    user_roles: "",
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
    { value: "phone", label: "Phone" },
    { value: "city", label: "City" },
    { value: "id", label: "ID" },
    { value: "address", label: "Address" },
    { value: "account_creation_date", label: "Account Created" },
    { value: "user_roles", label: "User Roles" },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  // Function to handle advance filter selection

  const [advanceForm, setAdvanceForm] = useState(false);

  // Function to toggle advance filter form
  const hanldeAdvanceFilterForm = () => {
    setAdvanceForm(!advanceForm);
    setSelectedOptions([]);
    setUpdatedFilter(users);
  };

  const handleAdvanceFilter = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };

  const [updatedFilter, setUpdatedFilter] = useState(users);

  // Function to handle filter input
  const handleFilter = (e) => {
    var filterValue = e.trim(" ");
    setUpdatedFilter(
      users.filter(
        (item) =>
          item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.email.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.address.city.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.address.street.toString().toLowerCase().includes(filterValue.toString().toLowerCase()) ||
          item.phone.toString().toLowerCase().includes(filterValue.toString().toLowerCase())
      )
    );
  };

  const handleAdvanceFormSubmit = () => {
  const { id,name,email,phone,address,account_creation_date,user_roles} = formData;

  const filters = {
    id: new RegExp(id, 'i'),
    name: new RegExp(name, 'i'),
    email: new RegExp(email, 'i'),
    phone: new RegExp(phone, 'i'),
    address: new RegExp(address, 'i'),
    account_creation_date: new RegExp(account_creation_date, 'i'),
    user_roles: new RegExp(user_roles, 'i'),
  };

  const advanceFilteredData = users.filter((use) => {
    return Object.keys(filters).every((key) => {
      return filters[key].test(use[key]);
    });
  });

  setUpdatedFilter(advanceFilteredData);
  setFormData({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    account_creation_date: "",
    user_roles: "",
  });
};



  const [bulkAction, setBulkAction] = useState(false);
  const [rowActions, setRowActions] = useState({});
  const handleBulkAction = (isChecked) => {
    setBulkAction(isChecked);
    if (isChecked) {
      const newRowActions = {};
      users.forEach((user) => {
        newRowActions[user.id] = true;
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
          (user) => user.id === selectedRow
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
        <h2 className="page_heading">All users</h2>

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
          <Link to="/users/add" className="button sm">
            <span>Add user</span>
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
                            placeholder={`Organizer ${option.label}`}
                            label={`Organizer ${option.label}`}
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
                            placeholder={`Organizer ${option.label}`}
                            label={`Organizer ${option.label}`}
                            className={formData.email === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "phone") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.phone || ""}
                            onChange={(value) =>
                              handleInputChange("phone", value)
                            }
                            placeholder={`Organizer ${option.label}`}
                            label={`Organizer ${option.label}`}
                            className={formData.phone === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    }else if (option.value === "city") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.city || ""}
                            onChange={(value) =>
                              handleInputChange("city", value)
                            }
                            placeholder={`Organizer ${option.label}`}
                            label={`Organizer ${option.label}`}
                            className={formData.city === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "address") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.address || ""}
                            onChange={(value) =>
                              handleInputChange("address", value)
                            }
                            placeholder={`Organizer ${option.label}`}
                            label={`Organizer ${option.label}`}
                            className={formData.address === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "account_creation_date") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.account_creation_date || ""}
                            onChange={(value) =>
                              handleInputChange("account_creation_date", value)
                            }
                            placeholder={`Organizer ${option.label}`}
                            label={`Organizer ${option.label}`}
                            className={formData.account_creation_date === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "user_roles") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.user_roles || ""}
                            onChange={(value) =>
                              handleInputChange("user_roles", value)
                            }
                            placeholder={`Organizer ${option.label}`}
                            label={`Organizer ${option.label}`}
                            className={formData.user_roles === "" ? "valid" : ""}
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
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Account Created</th>
                    <th>User Roles</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedFilter.map((user,index) => (
                    <tr key={user.id}>
                      <td>
                        <CheckBox
                          checked={rowActions[user.id] || false}
                          onChange={() => handleSingleRowAction(user.id)}
                          className="custom-checkbox"
                          id={`featureCheckbox${user.id}`}
                        />
                      </td>
                      <td>{user.id}</td>
                      <td>
                        <Profile
                            src={user.image}
                            label={user.name}
                            link={user.id.toString()}
                          />
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        {`${user.address.street}, ${user.address.city}`}
                      </td>
                      <td>{user.account_creation_date}</td>
                      <td>{user.user_roles.join(', ')}</td>
                      <td>
                          <div className="actions">
                            <Button
                              className="sm danger"
                              onClick={() => handleDelete(index)}
                              icon={<Icons.TbTrash />}
                            />
                            <Link to={user.id}>
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

export default UserList;
