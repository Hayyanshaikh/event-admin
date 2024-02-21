import Reac, { useState } from "react";
import * as Icons from "react-icons/tb";
import { useParams } from "react-router-dom";
import { transactions } from "../../api/api.js";
import Button from "../../components/common/Button.js";
import PageHeading from "../../components/common/PageHeading.js";
import SelectOption from "../../components/common/SelectOption.js";

const AddEvent = () => {
  const { transactionId } = useParams();

  const transaction = transactions.find((trans) => {
    return trans.id === transactionId;
  });

  const options = [
    { value: "completed", label: "Completed" },
    { value: "refunding", label: "Refunding" },
    { value: "refunded", label: "Refunded" },
    { value: "fraud", label: "Fraud" },
    { value: "failed", label: "Failed" },
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };
  return (
    <>
      <section className="add_event">
        <PageHeading>
          <h2 className="page_heading">transaction to John Doe</h2>
          <div className="page_heading_btns">
            <Button
              label="Downlowd"
              className="sm"
              icon={<Icons.TbDownload />}
            />
          </div>
        </PageHeading>
        <div className="container">
          <div className="sec_main">
            <div className="sec_main_wrapper">
              <div className="sec_main_wrapper_item">
                 <h2 className="sub_heading">transaction detail</h2>
              <div className="table_responsive">
                <table className="transaction_table">
                  <thead>
                    <tr>
                      <th>Transaction keys :</th>
                      <th>Transaction detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Id :</th>
                      <td>{transaction.id}</td>
                    </tr>
                    <tr>
                      <th>Charge id :</th>
                      <td>{transaction.chargeId}</td>
                    </tr>
                    <tr>
                      <th>Payer name :</th>
                      <td>{transaction.payerName}</td>
                    </tr>
                    <tr>
                      <th>Amount :</th>
                      <td>{transaction.amount}</td>
                    </tr>
                    <tr>
                      <th>Payment channel :</th>
                      <td>{transaction.paymentChannel}</td>
                    </tr>
                    <tr>
                      <th>Status :</th>
                      <td>{transaction.status}</td>
                    </tr>
                    <tr>
                      <th>Created at :</th>
                      <td>{transaction.createdAt}</td>
                    </tr>
                    <tr>
                      <th>Operations :</th>
                      <td>{transaction.operations}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </div>
            </div>
            <div className="sec_main_sidebar">
              <div className="sec_main_sidebar_item">
                <h2 className="sub_heading">action</h2>
                <div className="page_heading_btns">
                  <Button
                    label="Discard"
                    className="sm outline"
                    icon={<Icons.TbX />}
                  />
                  <Button
                    label="Save"
                    className="sm"
                    icon={<Icons.TbCheck />}
                  />
                </div>
              </div>
              <div className="sec_main_sidebar_item">
                <h2 className="sub_heading">Status</h2>
                <div className="">
                  <SelectOption
                    options={options}
                    placeholder="Select..."
                    valid="Change transaction status"
                    className="custom-select"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddEvent;
