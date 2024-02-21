import {Link} from 'react-router-dom';
import Reac, { useState } from "react";
import * as Icons from "react-icons/tb";
import {paymentMethods} from '../../api/api.js';
import Input from '../../components/common/Input.js';
import Button from "../../components/common/Button.js";
import Textarea from '../../components/common/Textarea.js';
import PageHeading from "../../components/common/PageHeading.js";

const PaymentMethod = () => {
  const [formData, setFormData] = useState({
    methodName: "",
    methodDescription: "",
    methodPublickKey: "",
    methodPrivateKey: "",
  });

  const handleInputChange = (fieldName, newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: newValue,
    }));
  };

  const [activeMethod, setActiveMethod] = useState(null);

  const handleMethodHideShow = (id) => {
    setActiveMethod(id === activeMethod ? null : id);
  };
  return (
    <>
      <section className="add_event">
        <PageHeading>
          <h2 className="page_heading">Payment Methods</h2>
        </PageHeading>
        <div className="container">
          <div className="sec_main">
          <div className="sec_main_sidebar"></div>
            <div className="sec_main_wrapper">
              <div className="sec_main_wrapper_item">
                
              <div className="payment_method">
                {
                  paymentMethods.map((method, key)=>{
                    return(
                      <div key={key} className="payment_method_card">
                        <div className="payment_method_head">
                          <figure className="payment_method_img">
                            <img src={method.image} alt={method.name} />
                          </figure>
                          <div className="payment_method_content">
                            <Link target="_blank" to={method.link} className="payment_method_name">{method.name}</Link>
                            <h2 className="payment_method_title line_clamp line_clamp_2">{method.description}</h2>
                          </div>
                        </div>
                        <div className="payment_method_body">
                          <div className="payment_method_body_item">
                            <h4 className="payment_method_use_heading">To use {method.name}, you need</h4>
                            <ul className={method.id === activeMethod ? "" : "none"}>
                              {method.stepsToUse.map((step, index) => (
                                <li key={index}>{step}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="payment_method_body_item">
                            <h4 className="payment_method_use_heading">
                              <span className={`${method.id === activeMethod ? "" : "none"}`}>Method detail:</span>
                              <Button
                                label="edit"
                                className="sm right"
                                onClick={()=>handleMethodHideShow(method.id)}
                              />
                            </h4>
                            <form className={`form ${method.id === activeMethod ? "" : "none"}`}>
                              <div className="form_control">
                                <Input
                                  type="text"
                                  value={method.name || formData.methodName}
                                  onChange={(value) => handleInputChange("methodName", value)}
                                  placeholder="Method name"
                                  label="Method name"
                                  className={formData.methodName === "" ? "valid" : ""}
                                />
                              </div>
                              <div className="form_control">
                                <Textarea
                                  type="text"
                                  value={method.description || formData.methodDescription}
                                  onChange={(value) => handleInputChange("methodDescription", value)}
                                  placeholder="Method Discription"
                                  label="Method Discription"
                                  max={100}
                                  className={formData.methodDescription === "" ? "valid" : ""}
                                />
                              </div>
                              <div className="form_control">
                                <Input
                                  type="text"
                                  value={method.publicKey||formData.methodPublickKey}
                                  onChange={(value) => handleInputChange("methodPublickKey", value)}
                                  placeholder={`${method.name} Public Key`}
                                  label={`${method.name} Public Key`}
                                  max={100}
                                  className={formData.methodPublickKey === "" ? "valid" : ""}
                                />
                              </div>
                              <div className="form_control">
                                <Input
                                  type="text"
                                  value={method.privateKey||formData.methodPrivateKey}
                                  onChange={(value) => handleInputChange("methodPrivateKey", value)}
                                  placeholder={`${method.name} Private Key`}
                                  label={`${method.name} Private Key`}
                                  max={100}
                                  className={formData.methodPrivateKey === "" ? "valid" : ""}
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


export default PaymentMethod;