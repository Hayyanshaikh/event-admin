import React, { useState } from "react";
import * as Icons from "react-icons/tb";
import Input from "../../components/common/Input.js";
import Button from "../../components/common/Button.js";
import Textarea from "../../components/common/Textarea.js";
import Thumbnail from "../../components/common/Thumbnail.js";
import TextEditor from "../../components/common/TextEditor.js";
import PageHeading from "../../components/common/PageHeading.js";
import SelectOption from "../../components/common/SelectOption.js";

const AddPage = () => {
  const [formData, setFormData] = useState({
    pageName: "",
    pageUrlSlug: "",
    pageDesc: "",
    pageContent: "",
    pageMetaTitle: "",
    pageMetaDescription: "",
    faqQuestion: "",
    faqAnswer: "",
  });

  const handleInputChange = (fieldName, newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: newValue,
    }));
  };

  const handleFaqQuestion = (e) => {
    e.preventDefault();
    if (formData.faqQuestion && formData.faqAnswer) {
      setFaqs([
        ...faqs,
        {
          question: formData.faqQuestion,
          answer: formData.faqAnswer,
        },
      ]);
      setFormData({
        ...formData,
        faqQuestion: "",
        faqAnswer: "",
      });
    }
  };

  const [faqs, setFaqs] = useState([]);

  const pageStatusOptions = [
    {
      value: "published",
      label: "Published",
    },
    {
      value: "draft",
      label: "Draft",
    },
    {
      value: "pending",
      label: "Pending",
    },
  ];

  const pageTemplateOptions = [
    {
      value: "default",
      label: "Default",
    },
    {
      value: "blog-sidebar",
      label: "Blog Sidebar",
    },
    {
      value: "full-width",
      label: "Full Width",
    },
    {
      value: "homepage",
      label: "Homepage",
    },
    {
      value: "coming-soon",
      label: "Coming Soon",
    },
  ];

  const pageVisibilityOptions = [
    {
      value: "visible",
      label: "Visible",
    },
    {
      value: "hidden",
      label: "Hidden",
    },
    {
      value: "private",
      label: "Private",
    },
    {
      value: "restricted",
      label: "Restricted",
    },
    {
      value: "archived",
      label: "Archived",
    },
  ];
  const pageCategoryTagOptions = [
    {
      value: "technology",
      label: "Technology",
    },
    {
      value: "travel",
      label: "Travel",
    },
    {
      value: "food",
      label: "Food",
    },
    {
      value: "health",
      label: "Health",
    },
    {
      value: "sports",
      label: "Sports",
    },
  ];

  return (
    <section>
      <PageHeading>
        <h2 className="page_heading">new Page Create</h2>
        <div className="page_heading_btns">
          <Button label="disacrd" className="sm outline" icon={<Icons.TbX />} />
          <Button label="save" className="sm" icon={<Icons.TbCheck />} />
        </div>
      </PageHeading>
      <div className="container">
        <div className="sec_main">
          <div className="sec_main_sidebar">
            <div className="sec_main_sidebar_item bordered">
              <h2 className="sub_heading">status</h2>
              <div className="form_control">
                <SelectOption
                  options={pageStatusOptions}
                  label="Page status"
                  placeholder="select status"
                />
              </div>
            </div>
            <div className="sec_main_sidebar_item bordered">
              <h2 className="sub_heading">Template</h2>
              <div className="form_control">
                <SelectOption
                  options={pageTemplateOptions}
                  label="Page template"
                  placeholder="select template"
                />
              </div>
            </div>
            <div className="sec_main_sidebar_item bordered">
              <h2 className="sub_heading">Image</h2>
              <Thumbnail
                className="custom-thumbnail"
                required="Choose image"
                preloadedImage=""
              />
            </div>
            <div className="sec_main_sidebar_item bordered">
              <h2 className="sub_heading">Category/Tags</h2>
              <div className="form_control">
                <SelectOption
                  options={pageCategoryTagOptions}
                  label="Page Category/Tags"
                  placeholder="select Category/Tags"
                />
              </div>
            </div>
            <div className="sec_main_sidebar_item bordered">
              <h2 className="sub_heading">Visibility</h2>
              <div className="form_control">
                <SelectOption
                  options={pageVisibilityOptions}
                  label="Page Visibility"
                  placeholder="select Visibility"
                />
              </div>
            </div>
          </div>
          <div className="sec_main_wrapper">
            <form className="form">
              <h2 className="sub_heading">Page Detail</h2>
              <div className="form_control">
                <Input
                  type="text"
                  value={formData.pageName}
                  onChange={(value) => handleInputChange("pageName", value)}
                  placeholder="Name"
                  label="Name"
                  required={true}
                  icon={<Icons.TbScreenshot />}
                  max={100}
                  className={formData.pageName === "" ? "valid" : ""}
                  valid="Enter the page Name"
                />
              </div>
              <div className="form_control">
                <Input
                  type="text"
                  value={formData.pageUrlSlug}
                  onChange={(value) => handleInputChange("pageUrlSlug", value)}
                  placeholder="URL Slug"
                  label="URL Slug"
                  required={true}
                  icon={<Icons.TbLink />}
                  max={100}
                  className={formData.pageUrlSlug === "" ? "valid" : ""}
                  valid="Enter the page URL Slug"
                />
              </div>
              <div className="form_control">
                <Textarea
                  type="text"
                  value={formData.pageName}
                  onChange={(value) => handleInputChange("pageName", value)}
                  placeholder="Description"
                  label="Description"
                  required={true}
                  icon={<Icons.TbFileText />}
                  max={100}
                  className={formData.pageName === "" ? "valid" : ""}
                  valid="Enter the page Description"
                />
              </div>
              <div className="form_control">
                <TextEditor
                  label="Content"
                  placeholder="Content..."
                  value={formData.pageContent}
                  onChange={(value) => handleInputChange("pageContent", value)}
                  valid="Enter the page Page Content"
                  className={formData.pageContent === "" ? "valid" : ""}
                />
              </div>

              <h2 className="sub_heading">meta Detail</h2>
              <div className="form_control">
                <Input
                  type="text"
                  value={formData.pageMetaTitle}
                  onChange={(value) =>
                    handleInputChange("pageMetaTitle", value)
                  }
                  placeholder="Meta Title"
                  icon={<Icons.TbTag/>}
                  label="Meta Title"
                  required={true}
                  max={100}
                  className={formData.pageMetaTitle === "" ? "valid" : ""}
                  valid="Enter the page Meta Title"
                />
              </div>
              <div className="form_control">
                <Textarea
                  type="text"
                  value={formData.pageMetaDescription}
                  onChange={(value) =>
                    handleInputChange("pageMetaDescription", value)
                  }
                  placeholder="Meta Descrpition"
                  label="Meta Descrpition"
                  icon={<Icons.TbFileDescription/>}
                  required={true}
                  max={100}
                  className={formData.pageMetaDescription === "" ? "valid" : ""}
                  valid="Enter the page Meta Descrpition"
                />
              </div>
              <div className="faq_sec">
                {!faqs.length == 0 ? (
                  <h2 className="sub_heading">FAQ's</h2>
                ) : (
                  ""
                )}
                {faqs.map((faq, key) => {
                  return (
                    <div className="faq" key={key}>
                      <h3>{faq.question}</h3>
                      <p>{faq.answer}</p>
                    </div>
                  );
                })}
                <h2 className="sub_heading">Add Question</h2>
                <div className="form_control">
                  <div className="form_control">
                    <Input
                      type="text"
                      value={formData.faqQuestion}
                      onChange={(value) =>
                        handleInputChange("faqQuestion", value)
                      }
                      placeholder="Question"
                      label="Question"
                      required={true}
                      icon={<Icons.TbQuestionMark />}
                      max={100}
                      className={formData.faqQuestion === "" ? "valid" : ""}
                      valid="Enter the page Question"
                    />
                  </div>
                  <div className="form_control">
                    <Textarea
                      type="text"
                      value={formData.faqAnswer}
                      onChange={(value) =>
                        handleInputChange("faqAnswer", value)
                      }
                      placeholder="Answere"
                      label="Answere"
                      required={true}
                      icon={<Icons.TbCircleCheck />}
                      max={100}
                      className={formData.faqAnswer === "" ? "valid" : ""}
                      valid="Enter the page Answer"
                    />
                  </div>
                </div>
                <Button
                  label="Add Question"
                  icon={<Icons.TbCheck />}
                  className="sm right"
                  onClick={handleFaqQuestion}
                />
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddPage;
