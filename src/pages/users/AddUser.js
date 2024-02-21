import { Link } from "react-router-dom";
import React, { useState } from "react";
import * as Icons from "react-icons/tb";
import Badge from "../../components/common/Badge.js";
import Input from "../../components/common/Input.js";
import Button from "../../components/common/Button.js";
import CheckBox from "../../components/common/CheckBox.js";
import Textarea from "../../components/common/Textarea.js";
import Thumbnail from "../../components/common/Thumbnail.js";
import TextEditor from "../../components/common/TextEditor.js";
import PageHeading from "../../components/common/PageHeading.js";
import SelectOption from "../../components/common/SelectOption.js";
import {
  ticketTypes,
  userPaymentMethods,
  transactions,
} from "../../api/api.js";

const AddUser = () => {
  const [formData, setFormData] = useState({
    orgName: "",
    orgBio: "",
    orgDOB: "",
    orgStreetAddress: "",
    orgCity: "",
    orgStateProvince: "",
    orgPastolCode: "",
    orgCountry: "",
    orgEmail: "",
    orgPhoneNumber: "",
    orgIdentification: "",
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

  const [selectedTicketTypes, setSelectedTicketTypes] = useState([]);

  const handleTicketType = (event) => {
    const selectedType = event.target;
    const typeId = selectedType.id;

    if (selectedType.checked) {
      setSelectedTicketTypes([...selectedTicketTypes, typeId]);
    } else {
      setSelectedTicketTypes(
        selectedTicketTypes.filter((type) => type !== typeId)
      );
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxChange = (newCheckedValue) => {
    setIsChecked(newCheckedValue);
  };
  return (
    <section>
      <PageHeading>
        <h2 className="page_heading">add users</h2>
        <div className="page_heading_btns">
          <Button label="disacrd" className="sm outline" icon={<Icons.TbX />} />
          <Button label="save" className="sm" icon={<Icons.TbCheck />} />
        </div>
      </PageHeading>
      <div className="container">
        <div className="sec_main">
          <div className="sec_main_sidebar">
            <div className="sec_main_sidebar_item">
              <h2 className="sub_heading">User image</h2>
              <div className="sidebar_item">
                <Thumbnail required="User profile" />
              </div>
            </div>
            <div className="sec_main_sidebar_item">
              <h2 className="sub_heading">
                <span>detail</span>
                <Badge label="premium user" className="light-primary" />
              </h2>
              <div className="sidebar_item">
                <div className="customer_detail_content">
                  <div className="customer_detail_content_item">
                    <h4 className="sub_2_heading">Account ID</h4>
                    <div className="sidebar_label">ID-45453423</div>
                  </div>
                  <div className="customer_detail_content_item">
                    <h4 className="sub_2_heading">Billing Email</h4>
                    <div className="sidebar_label">info@keenthemes.com</div>
                  </div>
                  <div className="customer_detail_content_item">
                    <h4 className="sub_2_heading">Delivery Address</h4>
                    <div className="sidebar_label">
                      101 Collin Street, Melbourne 3000 VIC Australia
                    </div>
                  </div>
                  <div className="customer_detail_content_item">
                    <h4 className="sub_2_heading">Language</h4>
                    <div className="sidebar_label">English</div>
                  </div>
                  <div className="customer_detail_content_item">
                    <h4 className="sub_2_heading">Latest Transaction</h4>
                    <div className="sidebar_label">#14534</div>
                  </div>
                </div>
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
                    placeholder="User Name"
                    label="User Name"
                    required={true}
                    icon={<Icons.TbUser />}
                    max={100}
                    className={formData.orgName === "" ? "valid" : ""}
                    valid="User Name"
                  />
                </div>
                <div className="form_control">
                  <Textarea
                    type="text"
                    value={formData.orgBio}
                    onChange={(value) => handleInputChange("orgBio", value)}
                    placeholder="User Bio"
                    label="User Bio"
                    required={true}
                    icon={<Icons.TbUserEdit />}
                    max={100}
                    className={formData.orgBio === "" ? "valid" : ""}
                    valid="User Bio"
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
                    placeholder="Gender..."
                    multiSelect={false}
                    valid="Select an Gender"
                  />
                </div>
                <div className="form_control">
                  <CheckBox
                    label="Agree to Terms and Conditions"
                    checked={isChecked}
                    onChange={handleCheckBoxChange}
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
                    type="number"
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
                <h2 className="sub_heading">Ticket Type</h2>
                <div className="form_control">
                  {selectedTicketTypes.length > 0 ? (
                    <div className="selected_types">
                      {selectedTicketTypes.map((selectedTicket, key) => {
                        return <span key={key}>{selectedTicket}</span>;
                      })}
                    </div>
                  ) : (
                    <div className="input_field">
                      <label>at least 3 ticket type select</label>
                    </div>
                  )}
                  <div className="select_types">
                    {ticketTypes.map((ticket, key) => (
                      <label key={ticket.id} className="ticket_type">
                        <input
                          type="checkbox"
                          name="ticketType"
                          id={ticket.id}
                          onChange={handleTicketType}
                        />
                        <Icons.TbTicket />
                        <small>{ticket.name}</small>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddUser;
