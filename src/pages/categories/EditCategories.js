import * as Icons from "react-icons/tb";
import { categories } from "../../api/api.js";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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

const EditCategories = () => {
  const { categoryid } = useParams();

  const category = categories.find(
    (category) => category.id.toString() === categoryid
  );

  const [formData, setFormData] = useState({
    categoryName: category.name,
    categoryDescription: category.description,
    slug: category.slug,
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

  var subCat = categories.filter((subCat) => {
	  return category.id === subCat.parentCategoryId;
	});
	var mainCat = categories.filter((mainCat) => {
	  return category.parentCategoryId === mainCat.id;
	});

	const [selectedStatus, setSelectedStatus] = useState([
	  { value: category.status, label: category.status },
	]);

	const initialSelectedParentCategory = mainCat.length > 0 ? [
	  {
	    value: mainCat[0].name,
	    label: mainCat[0].name,
	  }
	] : [];

	const [selectedParentCategory, setSelectedParentCategory] = useState(initialSelectedParentCategory);


  const handleChangeStatus = (selectedOption) => {
    setSelectedStatus(selectedOption);
  };
  const handleChangeCategory = (selectedOption) => {
    setSelectedParentCategory(selectedOption);
  };
  useEffect(() => {
    const parentCategories = categories.map((category) => category.name);
    setGetParentCategory(parentCategories);
  }, []);

  const [getParentCategory, setGetParentCategory] = useState([]);
  const parentCategoryOptions = getParentCategory.map((category) => ({
    value: category,
    label: category,
  }));

  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const [subCategories, setSubCategories] = useState(subCat);

  const handleSubCategoriesFilter = (value) => {
    var filterValue = new RegExp(value, "i");
    setSubCategories(
      subCat &&
        subCat.filter((category) =>
          [category.name].some((field) => filterValue.test(field))
        )
    );
    setSubCategoryFilter(value);
  };

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
                <h2 className="sub_heading">Organizer info</h2>
                <div className="user_sammery">
                  <figure className="user_sammery_img">
                    <img src="https://picsum.photos/1000?seed=7" alt="" />
                  </figure>
                  <div className="user_sammery_content">
                    <h2 className="user_sammery_name">Organizer Name</h2>
                    <span className="user_sammery_email">
                      organizer@example.com
                    </span>
                  </div>
                  <Link className="button sm">
                    <span>Visit organizer</span>
                    <Icons.TbLink />
                  </Link>
                </div>
              </div>
              <div className="sec_main_sidebar_item">
                <h2 className="sub_heading">Status</h2>
                <SelectOption
                  options={status}
                  label="Select status"
                  valid="Select status"
                  placeholder="Select status"
                  value={selectedStatus}
                  onChange={handleChangeStatus}
                />
              </div>
              <div className="sec_main_sidebar_item">
                <h2 className="sub_heading">Parent Category</h2>
                <SelectOption
                  options={parentCategoryOptions}
                  label="Select status"
                  valid="Select status"
                  onChange={handleChangeCategory}
                  placeholder="Select status"
                  value={selectedParentCategory}
                />
              </div>
              <div className="sec_main_sidebar_item">
                <h2 className="sub_heading">Category thumbnail</h2>
                <Thumbnail
                  required="Category thumbnail"
                  preloadedImage={category.image}
                />
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
                      value={formData.slug}
                      onChange={(value) => handleInputChange("slug", value)}
                      placeholder="Enter Slug URL..."
                      label="Category Slug URL"
                      required={true}
                      icon={<Icons.TbLink />}
                      className={formData.categoryName === "" ? "valid" : ""}
                      valid="Enter the Slug URL."
                    />
                  </div>
                </div>
                <div className="sec_main_wrapper_item">
                  <h2 className="sub_heading">
                    <span>Sub Categories</span>
                    <small className="label">{}</small>
                  </h2>
                  <div className="form_control">
                    <Input
                      type="text"
                      value={subCategoryFilter}
                      onChange={handleSubCategoriesFilter}
                      placeholder="Search sub category"
                      className={formData.categoryName === "" ? "valid" : ""}
                    />
                  </div>
                  <div className="manage_event_table table_responsive">
                    <table className=" striped">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Category Name</th>
                          <th>Description</th>
                          <th>Status</th>
                          <th>Create At</th>
                          <th>Updated At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subCategories.length > 0 ? (
                          subCategories.map((category, index) => (
                            <tr key={index}>
                              <td>{category.id}</td>
                              <td>
                                <Profile
                                  src={category.image}
                                  label={category.name}
                                  link={`/event-managment/categories/manage/${category.id.toString()}`}
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
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="no_data">
                              no data
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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

export default EditCategories;
