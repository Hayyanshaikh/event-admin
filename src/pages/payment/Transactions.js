import React, { useState } from "react";
import * as Icons from "react-icons/tb";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input.js";
import Modal from "../../components/common/Modal.js";
import Badge from "../../components/common/Badge.js";
import Button from "../../components/common/Button.js";
import Profile from "../../components/common/Profile.js";
import { transactions, showEvents } from "../../api/api";
import CheckBox from "../../components/common/CheckBox.js";
import Dropdown from "../../components/common/Dropdown.js";
import Textarea from "../../components/common/Textarea.js";
import Pagination from "../../components/common/Pagination.js";
import PageHeading from "../../components/common/PageHeading.js";
import SelectOption from "../../components/common/SelectOption.js";

const Transactions = () => {
  const [formData, setFormData] = useState({
    status: "",
    chargeId: "",
    payerName: "",
    amount: "",
    paymentChannel: "",
    createdAt: "",
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
    { value: "payerName", label: "Payer Name" },
    { value: "chargeId", label: "Charge ID" },
    { value: "paymentChannel", label: "Payment Channel" },
    { value: "status", label: "Status" },
    { value: "amount", label: "Amount" },
    { value: "createdAt", label: "Created At" },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  // Function to handle advance filter selection

  const [advanceForm, setAdvanceForm] = useState(false);

  // Function to toggle advance filter form
  const hanldeAdvanceFilterForm = () => {
    setAdvanceForm(!advanceForm);
    setSelectedOptions([]);
    setUpdatedFilter(transactions);
  };

  const handleAdvanceFilter = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };

  const [updatedFilter, setUpdatedFilter] = useState(transactions);

  // Function to handle filter input
  const handleFilter = (e) => {
    var filterValue = new RegExp(e, "i");
    setUpdatedFilter(
      transactions.filter((item) =>
        [
          item.status,
          item.chargeId,
          item.payerName,
          item.amount,
          item.paymentChannel,
          item.createdAt,
        ].some((field) => filterValue.test(field))
      )
    );
  };

  const handleAdvanceFormSubmit = () => {
    const { status, chargeId, payerName, amount, paymentChannel, createdAt } =
      formData;

    const filters = {
      status: new RegExp(status, "i"),
      chargeId: new RegExp(chargeId, "i"),
      payerName: new RegExp(payerName, "i"),
      amount: new RegExp(amount, "i"),
      paymentChannel: new RegExp(paymentChannel, "i"),
      createdAt: new RegExp(createdAt, "i"),
    };

    const advanceFilteredData = transactions.filter((event) => {
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
      transactions.forEach((page) => {
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
    setUpdatedFilter(transactions);
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
          <Link to="/event-managment/transactions/add" className="button sm">
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
                    if (option.value === "status") {
                      return (
                        <div key={option.value} className="form_control">
                          <SelectOption
                            options={status}
                            placeholder={`Select ${option.value}`}
                            label={`Event ${option.value}`}
                          />
                        </div>
                      );
                    } else if (option.value === "chargeId") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.chargeId || ""}
                            onChange={(value) =>
                              handleInputChange("chargeId", value)
                            }
                            placeholder={`Event ${option.value}`}
                            label={`Event ${option.value}`}
                            className={formData.chargeId === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "payerName") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.payerName || ""}
                            onChange={(value) =>
                              handleInputChange("payerName", value)
                            }
                            placeholder={`Event ${option.value}`}
                            label={`Event ${option.value}`}
                            className={formData.payerName === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "amount") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.amount || ""}
                            onChange={(value) =>
                              handleInputChange("amount", value)
                            }
                            placeholder={`Event ${option.value}`}
                            label={`Event ${option.value}`}
                            className={formData.amount === "" ? "valid" : ""}
                          />
                        </div>
                      );
                    } else if (option.value === "paymentChannel") {
                      return (
                        <div key={option.value} className="form_control">
                          <Input
                            type="text"
                            value={formData.paymentChannel || ""}
                            onChange={(value) =>
                              handleInputChange("paymentChannel", value)
                            }
                            placeholder={`Event ${option.value}`}
                            label={`Event ${option.value}`}
                            className={
                              formData.paymentChannel === "" ? "valid" : ""
                            }
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
                            placeholder={`Event ${option.value}`}
                            label={`Event ${option.value}`}
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
                    <th>Id</th>
                    <th>Charge id</th>
                    <th>Payer name</th>
                    <th>Amount</th>
                    <th>Payment channel</th>
                    <th>Status</th>
                    <th>Created at</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedFilter &&
                    updatedFilter.map((transaction, index) => (
                      <tr key={index}>
                        <td>
                          <CheckBox
                            checked={rowActions[transaction.id] || false}
                            onChange={() =>
                              handleSingleRowAction(transaction.id)
                            }
                            className="custom-checkbox"
                            id={`featureCheckbox${transaction.id}`}
                          />
                        </td>
                        <td>{transaction.id}</td>
                        <td>{transaction.chargeId}</td>
                        <td>
                          <Link to={transaction.id}>
                            {transaction.payerName}
                          </Link>
                        </td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.paymentChannel}</td>
                        <td>
                          {transaction.status === "Completed" ? (
                            <Badge
                              label={transaction.status}
                              className="light-success"
                            />
                          ) : transaction.status === "Refunding" ? (
                            <Badge
                              label={transaction.status}
                              className="light-warning"
                            />
                          ) : transaction.status === "Refunded" ? (
                            <Badge
                              label={transaction.status}
                              className="light-info"
                            />
                          ) : transaction.status === "Fraud" ? (
                            <Badge
                              label={transaction.status}
                              className="light-danger"
                            />
                          ) : transaction.status === "Failed" ? (
                            <Badge
                              label={transaction.status}
                              className="light-danger"
                            />
                          ) : (
                            <Badge
                              label={transaction.status}
                              className="light-secondary"
                            />
                          )}
                        </td>
                        <td>{transaction.createdAt}</td>
                        <td>
                          <div className="actions">
                            <Button
                              className="sm danger"
                              onClick={() => handleDelete(index)}
                              icon={<Icons.TbTrash />}
                            />
                            <Link to={transaction.id.toString()}>
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

export default Transactions;
