import React, { useState } from "react";
import * as Icons from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
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
  users
} from "../../api/api.js";

const AddUser = () => {
	const { userid } = useParams();

	const user = users.find((user) => {
    return user.id.toString() === userid.toString();
  });

  const payment = user.payment_info.map(payment =>{
  	return userPaymentMethods.find(method => method.id.toString() === payment.toString());
  });

  const [formData, setFormData] = useState({
    userBio: user.bio,
    userName: user.name,
    userEmail: user.email,
    userIdentification: "",
    userDOB: user.birthdate,
    userCity: user.address.city,
    userPhoneNumber: user.phone,
    userCountry:  user.address.country,
    userStateProvince: user.address.state,
    userPastolCode: user.address.zip_code,
    userStreetAddress: user.address.street,
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

  const [selectedGender, setSelectedGender] = useState([
	  { value: user.gender, label: user.gender },
	]);
	const handleGender = (selectedOption) => {
    setSelectedGender(selectedOption);
  };
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

  const [isChecked, setIsChecked] = useState(user.agreeToTerms);

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
                <Thumbnail required="User profile" preloadedImage={user.image} />
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
                    value={formData.userName}
                    onChange={(value) => handleInputChange("userName", value)}
                    placeholder="User Name"
                    label="User Name"
                    required={true}
                    icon={<Icons.TbUser />}
                    max={100}
                    className={formData.userName === "" ? "valid" : ""}
                    valid="User Name"
                  />
                </div>
                <div className="form_control">
                  <Textarea
                    type="text"
                    value={formData.userBio}
                    onChange={(value) => handleInputChange("userBio", value)}
                    placeholder="User Bio"
                    label="User Bio"
                    required={true}
                    icon={<Icons.TbUserEdit />}
                    max={100}
                    className={formData.userBio === "" ? "valid" : ""}
                    valid="User Bio"
                  />
                </div>
                <div className="form_control half">
                  <Input
                    type="date"
                    value={formData.userDOB}
                    onChange={(value) => handleInputChange("userDOB", value)}
                    placeholder="Date of Birth"
                    label="Date of Birth"
                    required={true}
                    icon={<Icons.TbCalendar />}
                    max={100}
                    className={formData.userDOB === "" ? "valid" : ""}
                    valid="Date of Birth"
                  />
                </div>
                <div className="form_control half">
                  <SelectOption
                    label="Select an Gender"
                    options={gender}
                    icon={<Icons.TbGenderMale />}
                    placeholder="Gender..."
                    value={selectedGender}
                    onChange={handleGender}
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
                    value={formData.userStreetAddress}
                    onChange={(value) =>
                      handleInputChange("userStreetAddress", value)
                    }
                    placeholder="Street Address"
                    label="Street Address"
                    required={true}
                    icon={<Icons.TbHomeCheck />}
                    max={100}
                    className={formData.userStreetAddress === "" ? "valid" : ""}
                    valid="Street Address"
                  />
                </div>
                <div className="form_control half">
                  <Input
                    type="text"
                    value={formData.userCity}
                    onChange={(value) => handleInputChange("userCity", value)}
                    placeholder="City"
                    label="City"
                    required={true}
                    icon={<Icons.TbBuildingCommunity />}
                    max={100}
                    className={formData.userCity === "" ? "valid" : ""}
                    valid="City"
                  />
                </div>
                <div className="form_control half">
                  <Input
                    type="text"
                    value={formData.userStateProvince}
                    onChange={(value) =>
                      handleInputChange("userStateProvince", value)
                    }
                    placeholder="State/Province"
                    label="State/Province"
                    required={true}
                    icon={<Icons.TbMapPin />}
                    max={100}
                    className={formData.userStateProvince === "" ? "valid" : ""}
                    valid="State/Province"
                  />
                </div>
                <div className="form_control half">
                  <Input
                    type="number"
                    value={formData.userPastolCode}
                    onChange={(value) =>
                      handleInputChange("userPastolCode", value)
                    }
                    placeholder="Postal Code"
                    label="Postal Code"
                    required={true}
                    icon={<Icons.TbZip />}
                    max={100}
                    className={formData.userPastolCode === "" ? "valid" : ""}
                    valid="Postal Code"
                  />
                </div>
                <div className="form_control half">
                  <Input
                    type="text"
                    value={formData.userCountry}
                    onChange={(value) => handleInputChange("userCountry", value)}
                    placeholder="Country"
                    label="Country"
                    required={true}
                    icon={<Icons.TbWorld />}
                    max={100}
                    className={formData.userCountry === "" ? "valid" : ""}
                    valid="Country"
                  />
                </div>
              </div>
              <div className="sec_main_wrapper_item">
                <h2 className="sub_heading">Contact information</h2>
                <div className="form_control">
                  <Input
                    type="email"
                    value={formData.userEmail}
                    onChange={(value) => handleInputChange("userEmail", value)}
                    placeholder="Email Address"
                    label="Email Address"
                    required={true}
                    icon={<Icons.TbMailOpened />}
                    max={100}
                    className={formData.userEmail === "" ? "valid" : ""}
                    valid="Email Address"
                  />
                </div>
                <div className="form_control half">
                  <Input
                    type="text"
                    value={formData.userPhoneNumber}
                    onChange={(value) =>
                      handleInputChange("userPhoneNumber", value)
                    }
                    placeholder="Phone Number"
                    label="Phone Number"
                    required={true}
                    icon={<Icons.TbPhone />}
                    max={100}
                    className={formData.userPhoneNumber === "" ? "valid" : ""}
                    valid="Phone Number"
                  />
                </div>
                <div className="form_control half">
                  <Input
                    type="text"
                    value={formData.userIdentification}
                    onChange={(value) =>
                      handleInputChange("userIdentification", value)
                    }
                    placeholder="ID Card Number (NIC)"
                    label="ID Card Number (NIC)"
                    required={true}
                    icon={<Icons.TbCreditCard />}
                    max={100}
                    className={formData.userIdentification === "" ? "valid" : ""}
                    valid="ID Card Number (NIC)"
                  />
                </div>
              </div>
              <div className="sec_main_wrapper_item">
                <h2 className="sub_heading">payment methods</h2>
                <div className="form_control">
                  {payment.map((method, key) => {
                    return (
                      <div key={key} className="user_payment_method">
                        <div className="user_payment_method_head">
                          <figure className="user_payment_method_image">
                            <img src={method.methodImage} alt="" />
                          </figure>
                          <div className="user_payment_method_content">
                            <span className="method_type">
                              {method.methodType}
                            </span>
                            <span className="method_expire">
                              {method.methodExpire}
                            </span>
                          </div>
                          <div className="user_payment_method_action">
                            <Icons.TbEdit className="edit" />
                            <Icons.TbTrash />
                          </div>
                        </div>
                        <div className="user_p_m_body">
                          <table>
                            <tbody>
                              <tr>
                                <td>Name</td>
                                <td>{method.name}</td>
                              </tr>
                              <tr>
                                <td>Number</td>
                                <td>{method.number}</td>
                              </tr>
                              <tr>
                                <td>Expires</td>
                                <td>{method.expires}</td>
                              </tr>
                              <tr>
                                <td>Type</td>
                                <td>{method.type}</td>
                              </tr>
                              <tr>
                                <td>Issuer</td>
                                <td>{method.issuer}</td>
                              </tr>
                              <tr>
                                <td>ID</td>
                                <td>{method.id}</td>
                              </tr>
                            </tbody>
                          </table>
                          <table>
                            <tbody>
                              <tr>
                                <td>Billing address</td>
                                <td>{method.billingAddress}</td>
                              </tr>
                              <tr>
                                <td>Phone</td>
                                <td>{method.phone}</td>
                              </tr>
                              <tr>
                                <td>Email</td>
                                <td>{method.email}</td>
                              </tr>
                              <tr>
                                <td>Origin</td>
                                <td>{method.origin}</td>
                              </tr>
                              <tr>
                                <td>CVC check</td>
                                <td>{method.cvcCheck}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })}
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
                            <Link
                              to={`/payment/transactions/${transaction.id}`}
                            >
                              {transaction.id}
                            </Link>
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
