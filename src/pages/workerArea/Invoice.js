import React from "react";
import {
  logoAsset,
  newlecAsset,
  paidAsset,
  processedAsset,
} from "../../assets";
import "./WorkerArea.css";

const Invoice = () => {
  return (
    <>
      <div
        className="bg-white p-5 mt-5"
        style={{ marginLeft: "20%", marginRight: "20%" }}
      >
        <div className="row d-flex justify-content-center">
          <img
            src={processedAsset}
            width="201.7px"
            height="178.86px"
            style={{ position: "absolute", top: "230px" }}
          />

          <div className="col-md-12 d-flex justify-content-between">
            <div>
              <h1 className="fs-36 fw-600 ">Invoice</h1>
              <p className="fs-10 fw-400 mt-3">
                <b>Date:</b> 01/02/2022{" "}
              </p>
              <p className="fs-10 fw-400 mt-2">
                <b>Invoice:</b> 2022-001
              </p>
              <p className="fs-10 fw-400 mt-2">
                <b>Payment method:</b> Visa | Last digits: 1111
              </p>
            </div>

            <img
              src={newlecAsset}
              width="184px"
              height="58px"
              className="cover"
            />
          </div>
          <div className="col-md-12 d-flex justify-content-between mt-5">
            <div>
              <p className="fs-10 fw-500" style={{ color: "#ABABAB" }}>
                BILL TO
              </p>
              <p className="text-heading fs-12 fw-500 mt-2">Client Name</p>
              <p className="fs-10 fw-400 mt-1">
                Avenue des Sartiaux 165
                <br />
                8431 Wilskerke{" "}
              </p>
            </div>
            <div>
              <p className="fs-10 fw-500" style={{ color: "#ABABAB" }}>
                PAY TO
              </p>
              <p className="text-heading fs-12 fw-500 mt-2">
                Newelec luminus Ltd
              </p>
              <p className="fs-10 fw-400 mt-1">
                Rue de Fontigny 85
                <br />
                5651 Rognée
              </p>
            </div>
          </div>
        </div>

        <div className="row d-flex justify-content-center mt-5">
          <div className="col-md-12">
            <table className="table invoice-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Rate</th>
                  <th>Discount</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr className="first-row table-text">
                  <td>
                    Training: Working at height
                    <br />
                    <span className="fw-400">SECURITY</span>
                  </td>
                  <td>€ 29.99</td>
                  <td>-40%</td>
                  <td>€ 19.99</td>
                </tr>
                <tr className="table-text">
                  <th></th>
                  <td>Subtotal</td>
                  <td></td>
                  <td>€ 19.99</td>
                </tr>
                <tr className="table-text">
                  <th></th>
                  <td>VAT (20%)</td>
                  <td></td>
                  <td>€ 3.99</td>
                </tr>
                <tr className="last-row">
                  <th></th>
                  <td>
                    <p className="fs-14">Total EUR</p>
                  </td>
                  <td></td>
                  <td>
                    <p className="fs-14">€ 23.98</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="footer d-flex justify-content-center">
          <div className="col-md-12 d-flex justify-content-between footer-text">
            <div className="mt-3">
              <p className="fs-10">
                <b>Bank:</b> Bank name <b>VAT No:</b> BE123456789
              </p>
              <p className="fs-10">
                <b>VAT No:</b> BE123456789 <b>SWIFT:</b> BEBE1234
              </p>
              <p className="fs-10">
                <b>IBAN:</b> BE10 AAAA 1111 2222 3333 44
              </p>
            </div>

            <div className="mt-3">
              <div className="d-flex gap-2">
                <img src={logoAsset} width="17px" height="18px" />
                <p className="fs-16 fw-600" style={{ color: "#1B8BCE" }}>
                  APP
                </p>
                <p className="fs-16 fw-600" style={{ color: "#61AFDC" }}>
                  Name
                </p>
              </div>
              <p className="fs-9" style={{ color: "#ABABAB" }}>
                Page 1 of 1 for invoice #2022-001{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
