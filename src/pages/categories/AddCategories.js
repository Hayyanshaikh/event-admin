import { Link } from "react-router-dom";
import * as Icons from "react-icons/tb";
import { categories } from "../../api/api.js";
import React, { useState, useEffect } from "react";
import Input from "../../components/common/Input.js";
import Badge from "../../components/common/Badge.js";
import Button from "../../components/common/Button.js";
import Profile from "../../components/common/Profile.js";
import Toggler from "../../components/common/Toggler.js";
import Textarea from "../../components/common/Textarea.js";
import CheckBox from "../../components/common/CheckBox.js";
import Thumbnail from "../../components/common/Thumbnail.js";
import TextEditor from "../../components/common/TextEditor.js";
import PageHeading from "../../components/common/PageHeading.js";
import SelectOption from "../../components/common/SelectOption.js";

const AddCategories = () => {
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDescription: "",
    slugUrl: "",
    categoryTime: "",
    categoryDate: "",
    subCategories: "",
  });

  const handleInputChange = (fieldName, newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: newValue,
    }));
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

  const [getParentCategory, setGetParentCategory] = useState([]);

  useEffect(() => {
    const parentCategories = categories.map((category) => category.name);
    setGetParentCategory(parentCategories);
  }, []);

  const parentCategoryOptions = getParentCategory.map((category) => ({
    value: category,
    label: category,
  }));
  
  return (
    <>
      <section className="add_category">
        <PageHeading>
          <h2 className="page_heading">add Category</h2>
          <div className="page_heading_btns">
            <Button
              label="disacrd"
              className="sm outline"
              icon={<Icons.TbX />}
            />
            <Button label="save" className="sm" icon={<Icons.TbCheck />} />
          </div>
        </PageHeading>
        <div className="container">
          <div className="sec_main">
            <div className="sec_main_sidebar">
              <div className="sec_main_sidebar_item">
                <h2 className="sub_heading">Status</h2>
                <SelectOption
                  options={status}
                  label="Select status"
                  valid="Select status"
                  placeholder="Select status"
                />
              </div>
              <div className="sec_main_sidebar_item">
                <h2 className="sub_heading">Parent Category</h2>
                <SelectOption
                  options={parentCategoryOptions}
                  label="Select status"
                  valid="Select status"
                  placeholder="Select status"
                />
              </div>
              <div className="sec_main_sidebar_item">
                <h2 className="sub_heading">Category thumbnail</h2>
                <Thumbnail required="Category thumbnail" />
              </div>
            </div>
            <div className="sec_main_wrapper">
              <form action="#" className="form">
                <div className="sec_main_wrapper_item">
                  <h2 className="sub_heading">Category detail</h2>
                  <div className="form_control">
                    <Input
                      type="text"
                      value={formData.categoryName}
                      onChange={(value) =>
                        handleInputChange("categoryName", value)
                      }
                      placeholder="Enter category name..."
                      label="Category Name"
                      required={true}
                      icon={<Icons.TbCategory />}
                      max={100}
                      className={formData.categoryName === "" ? "valid" : ""}
                      valid="Enter the solid category name."
                    />
                  </div>
                  <div className="form_control">
                    <TextEditor
                      value={formData.categoryDescription}
                      onChange={(value) =>
                        handleInputChange("categoryDescription", value)
                      }
                      placeholder="Enter category description..."
                      valid="Enter category description."
                      label="Category description"
                    />
                  </div>
                  <div className="form_control">
                    <Input
                      type="url"
                      value={formData.slugUrl}
                      onChange={(value) => handleInputChange("slugUrl", value)}
                      placeholder="Enter Slug URL..."
                      label="Category Slug URL"
                      required={true}
                      icon={<Icons.TbLink />}
                      className={formData.categoryName === "" ? "valid" : ""}
                      valid="Enter the Slug URL."
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddCategories;
