import React, { useState } from "react";
import * as Icons from "react-icons/tb";
import Input from "../../components/common/Input.js";
import Button from "../../components/common/Button.js";
import Textarea from '../../components/common/Textarea.js';
import Thumbnail from "../../components/common/Thumbnail.js";
import TextEditor from "../../components/common/TextEditor.js";
import PageHeading from "../../components/common/PageHeading.js";
import SelectOption from "../../components/common/SelectOption.js";

const AddOrganizers = () => {
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
    orgLink1: "",
    orgLink2: "",
    orgLink3: "",
    orgLink4: "",
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
    { value: "Verified", label: "Verified" },
    { value: "Pending", label: "Pending" },
    { value: "Cencle", label: "Cencle" },
  ];
  return (
    <section>
      <PageHeading>
        <h2 className="page_heading">add organizers</h2>
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
                <Icons.TbDiscountCheckFilled className="verified_icon"/>
              </h2>
              <div className="sidebar_item">
                <div className="form_control">
                  
                  <SelectOption
                    label="Select status"
                    options={status}
                    placeholder="status..."
                  />
                </div>
              </div>
            </div>
            <div className="sec_main_sidebar_item">
              <h2 className="sub_heading">Organizer image</h2>
              <div className="sidebar_item">
                <Thumbnail required="Organizer profile" />
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
                <div className="form_control">
                  <Textarea
                    type="text"
                    value={formData.orgBio}
                    onChange={(value) => handleInputChange("orgBio", value)}
                    placeholder="Organizer Bio"
                    label="Organizer Bio"
                    required={true}
                    icon={<Icons.TbUserEdit />}
                    max={100}
                    className={formData.orgBio === "" ? "valid" : ""}
                    valid="Organizer Bio"
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
                    value={formData.orgEmai4}
                    onChange={(value) => handleInputChange("orgEmai4", value)}
                    placeholder="Website Link 4"
                    label="Website Link 4"
                    required={true}
                    icon={<Icons.TbLink />}
                    max={100}
                    className={formData.orgEmai4 === "" ? "valid" : ""}
                    valid="Website Link 4"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddOrganizers;
