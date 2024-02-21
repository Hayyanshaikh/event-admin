import * as Icons from "react-icons/tb";
import { organizers } from "../../api/api.js";
import { Link,useParams } from "react-router-dom";
import { transactions,events } from "../../api/api.js";
import React, { useState, useEffect } from "react";
import Input from "../../components/common/Input.js";
import Badge from '../../components/common/Badge.js';
import Button from "../../components/common/Button.js";
import CheckBox from '../../components/common/CheckBox.js';
import Profile from '../../components/common/Profile.js'
import Thumbnail from "../../components/common/Thumbnail.js";
import TextEditor from "../../components/common/TextEditor.js";
import PageHeading from "../../components/common/PageHeading.js";
import SelectOption from "../../components/common/SelectOption.js";

const EditOrganizers = () => {
  const { organizerId } = useParams();
  const organizer = organizers.find((organizer) => {
    return organizer.id === organizerId;
  });
  const [formData, setFormData] = useState({
    orgName: organizer.name,
    orgDOB: organizer.dob,
    orgStreetAddress: organizer.streetaddress,
    orgCity: organizer.city,
    orgStateProvince: organizer.stateprovince,
    orgPastolCode: organizer.postalcode,
    orgCountry: organizer.country,
    orgEmail: organizer.email,
    orgPhoneNumber: organizer.phonenumber,
    orgIdentification: organizer.identification,
    orgLink1: organizer.link1,
    orgLink2: organizer.link2,
    orgLink3: organizer.link3,
    orgLink4: organizer.link4,
  });

  const handleInputChange = (fieldName, newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: newValue,
    }));
  };
  const gender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "custom", label: "Custom" },
  ];
  const status = [
    { value: "verified", label: "Verified" },
    { value: "pending", label: "Pending" },
    { value: "cancel", label: "Cancel" },
  ];

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  useEffect(() => {
    setSelectedStatus(
      status.find((option) => option.value === organizer.status)
    );
    setSelectedGender(
      gender.find((option) => option.value === organizer.gender)
    );
  }, []);
  return (
    <section>
      <PageHeading>
        <h2 className="page_heading">edit organizers</h2>
        <div className="page_heading_btns">
          <Button label="disacrd" className="sm outline" icon={<Icons.TbX />} />
          <Button label="save" className="sm" icon={<Icons.TbCheck />} />
        </div>
      </PageHeading>
      <div className="container">
        <div className="sec_main">
          <div className="sec_main_sidebar">
            <div className="sec_main_sidebar_item">
              <h2 className="sub_heading">
                <span>Status</span>
                <Icons.TbDiscountCheckFilled className="verified_icon" />
              </h2>
              <div className="sidebar_item">
                <div className="form_control">
                  <SelectOption
                    label="Select status"
                    options={status}
                    placeholder="status..."
                    onChange={(newValue) => setSelectedStatus(newValue)}
                    value={selectedStatus}
                  />
                </div>
              </div>
            </div>
            <div className="sec_main_sidebar_item">
              <h2 className="sub_heading">Organizer image</h2>
              <div className="sidebar_item">
                <Thumbnail preloadedImage={organizer.image} required="Organizer profile" />
              </div>
            </div>
            <div className="sec_main_sidebar_item">
              <h2 className="sub_heading">ID Card front</h2>
              <div className="sidebar_item">
                <Thumbnail required="ID card front" />
              </div>
            </div>
            <div className="sec_main_sidebar_item">
              <h2 className="sub_heading">ID Card back</h2>
              <div className="sidebar_item">
                <Thumbnail required="ID card back" />
              </div>
            </div>
          </div>
          <div className="sec_main_wrapper">
            <form className="form">
              <div className="sec_main_wrapper_item">
                <h2 className="sub_heading">Personal info</h2>
                <div className="form_control">
                  <Input
                    type="text"
                    value={formData.orgName}
                    onChange={(value) => handleInputChange("orgName", value)}
                    placeholder="Organizer Name"
                    label="Organizer Name"
                    required={true}
                    icon={<Icons.TbUser />}
                    max={100}
                    className={formData.orgName === "" ? "valid" : ""}
                    valid="Organizer Name"
                  />
                </div>
                <div className="form_control half">
                  <Input
                    type="date"
                    value={formData.orgDOB}
                    onChange={(value) => handleInputChange("orgDOB", value)}
                    placeholder="Date of Birth"
                    label="Date of Birth"
                    required={true}
                    icon={<Icons.TbCalendar />}
                    max={100}
                    className={formData.orgDOB === "" ? "valid" : ""}
                    valid="Date of Birth"
                  />
                </div>
                <div className="form_control half">
                  <SelectOption
                    label="Select an Gender"
                    options={gender}
                    icon={<Icons.TbGenderMale />}
                    onChange={(newValue) => setSelectedGender(newValue)}
                    value={selectedGender}
                    placeholder="Gender..."
                    multiSelect={false}
                    valid="Select an Gender"
                  />
                </div>
              </div>
              <div className="sec_main_wrapper_item">
                <h2 className="sub_heading">Address</h2>
                <div className="form_control">
                  <Input
                    type="text"
                    value={formData.orgStreetAddress}
                    onChange={(value) =>
                      handleInputChange("orgStreetAddress", value)
                    }
                    placeholder="Street Address"
                    label="Street Address"
                    required={true}
                    icon={<Icons.TbHomeCheck />}
                    max={100}
                    className={formData.orgStreetAddress === "" ? "valid" : ""}
                    valid="Street Address"
                  />
                </div>
                <div className="form_control half">
                  <Input
                    type="text"
                    value={formData.orgCity}
                    onChange={(value) => handleInputChange("orgCity", value)}
                    placeholder="City"
                    label="City"
                    required={true}
                    icon={<Icons.TbBuildingCommunity />}
                    max={100}
                    className={formData.orgCity === "" ? "valid" : ""}
                    valid="City"
                  />
                </div>
                <div className="form_control half">
                  <Input
                    type="text"
                    value={formData.orgStateProvince}
                    onChange={(value) =>
                      handleInputChange("orgStateProvince", value)
                    }
                    placeholder="State/Province"
                    label="State/Province"
                    required={true}
                    icon={<Icons.TbMapPin />}
                    max={100}
                    className={formData.orgStateProvince === "" ? "valid" : ""}
                    valid="State/Province"
                  />
                </div>
                <div className="form_control half">
                  <Input
                    type="text"
                    value={formData.orgPastolCode}
                    onChange={(value) =>
                      handleInputChange("orgPastolCode", value)
                    }
                    placeholder="Postal Code"
                    label="Postal Code"
                    required={true}
                    icon={<Icons.TbZip />}
                    max={100}
                    className={formData.orgPastolCode === "" ? "valid" : ""}
                    valid="Postal Code"
                  />
                </div>
                <div className="form_control half">
                  <Input
                    type="text"
                    value={formData.orgCountry}
                    onChange={(value) => handleInputChange("orgCountry", value)}
                    placeholder="Country"
                    label="Country"
                    required={true}
                    icon={<Icons.TbWorld />}
                    max={100}
                    className={formData.orgCountry === "" ? "valid" : ""}
                    valid="Country"
                  />
                </div>
              </div>
              <div className="sec_main_wrapper_item">
                <h2 className="sub_heading">Contact information</h2>
                <div className="form_control">
                  <Input
                    type="email"
                    value={formData.orgEmail}
                    onChange={(value) => handleInputChange("orgEmail", value)}
                    placeholder="Email Address"
                    label="Email Address"
                    required={true}
                    icon={<Icons.TbMailOpened />}
                    max={100}
                    className={formData.orgEmail === "" ? "valid" : ""}
                    valid="Email Address"
                  />
                </div>
                <div className="form_control half">
                  <Input
                    type="text"
                    value={formData.orgPhoneNumber}
                    onChange={(value) =>
                      handleInputChange("orgPhoneNumber", value)
                    }
                    placeholder="Phone Number"
                    label="Phone Number"
                    required={true}
                    icon={<Icons.TbPhone />}
                    max={100}
                    className={formData.orgPhoneNumber === "" ? "valid" : ""}
                    valid="Phone Number"
                  />
                </div>
                <div className="form_control half">
                  <Input
                    type="text"
                    value={formData.orgIdentification}
                    onChange={(value) =>
                      handleInputChange("orgIdentification", value)
                    }
                    placeholder="ID Card Number (NIC)"
                    label="ID Card Number (NIC)"
                    required={true}
                    icon={<Icons.TbCreditCard />}
                    max={100}
                    className={formData.orgIdentification === "" ? "valid" : ""}
                    valid="ID Card Number (NIC)"
                  />
                </div>
              </div>
              <div className="sec_main_wrapper_item">
                <h2 className="sub_heading">Website & social Links</h2>
                <div className="form_control half">
                  <Input
                    type="url"
                    value={formData.orgLink1}
                    onChange={(value) => handleInputChange("orgLink1", value)}
                    placeholder="Website Link 1"
                    label="Website Link 1"
                    required={true}
                    icon={<Icons.TbLink />}
                    max={100}
                    className={formData.orgLink1 === "" ? "valid" : ""}
                    valid="Website Link 1"
                  />
                </div>
                <div className="form_control half">
                  <Input
                    type="url"
                    value={formData.orgLink2}
                    onChange={(value) => handleInputChange("orgLink2", value)}
                    placeholder="Website Link 2"
                    label="Website Link 2"
                    required={true}
                    icon={<Icons.TbLink />}
                    max={100}
                    className={formData.orgLink2 === "" ? "valid" : ""}
                    valid="Website Link 2"
                  />
                </div>
                <div className="form_control half">
                  <Input
                    type="url"
                    value={formData.orgLink4}
                    onChange={(value) => handleInputChange("orgLink4", value)}
                    placeholder="Website Link 3"
                    label="Website Link 3"
                    required={true}
                    icon={<Icons.TbLink />}
                    max={100}
                    className={formData.orgLink4 === "" ? "valid" : ""}
                    valid="Website Link 3"
                  />
                </div>
                <div className="form_control half">
                  <Input
                    type="url"
                    value={formData.orgLink4}
                    onChange={(value) => handleInputChange("orgLink4", value)}
                    placeholder="Website Link 4"
                    label="Website Link 4"
                    required={true}
                    icon={<Icons.TbLink />}
                    max={100}
                    className={formData.orgLink4 === "" ? "valid" : ""}
                    valid="Website Link 4"
                  />
                </div>
              </div>
              <div className="sec_main_wrapper_item">
                <h2 className="sub_heading">
                  <span>Events</span>
                  <Link to="/event-managment/events/add" className="button sm">
                    <span>Add Event</span>
                    <Icons.TbPlus/>
                  </Link>
                </h2>
                <div className="manage_event_table table_responsive">
                  <table className="striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Time</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map(event => (
                        <tr key={event.id}>
                          <td>{event.id}</td>

                          <td>
                            <Profile
                              src={event.image}
                              label={event.name}
                              category={event.topic}
                              link={`/event-managment/events/${event.id}`}
                            />
                          </td>
                          <td>{event.date}</td>
                          <td>{event.location}</td>
                          <td>{event.time}</td>
                          <td>{event.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="sec_main_wrapper_item">
                <h2 className="sub_heading">Payment</h2>
                <div className="table_responsive">
                  <table className="striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Charge Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Method</th>
                            <th>Status</th>
                            <th>Create At</th>
                        </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction, key) => (
                        <tr key={key}>
                          <td>
                            <Link to={`/payment/transactions/${transaction.id}`}>{transaction.id}</Link>
                          </td>
                          <td>{transaction.chargeId}</td>
                          <td>{transaction.payerName}</td>
                          <td>{transaction.amount}</td>
                          <td>{transaction.paymentChannel}</td>
                          <td>
                            {transaction.status === "Completed" ? (
                              <Badge
                                label={transaction.status}
                                className="light-success"
                              />
                            ) : transaction.status === "Draft" ? (
                              <Badge
                                label={transaction.status}
                                className="light-secondary"
                              />
                            ) : (
                              <Badge
                                label={transaction.status}
                                className="light-warning"
                              />
                            )}
                          </td>
                          <td>{transaction.createdAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditOrganizers;
