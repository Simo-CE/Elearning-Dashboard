import React from "react";
import { NavLink } from "react-router-dom";
import "./WorkerArea.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import TableComponent from "../../components/table/Table";
import {
  downloadgreenAsset,
  embededAsset,
  failedIconAsset,
  iconAsset,
  markAsset,
  passedIconAsset,
  settingGreyAsset,
  shareAsset,
  viewblueAsset,
} from "../../assets";
import paths from "../../routes/paths";

const InvoiceHistory = () => {
  return (
    <>
      <div className="ml-5 mr-5">
        <div className="row mt-4">
          <div className="col-lg-6">
            <h3 className="pageHeading">Invoices history</h3>
          </div>
          <div className="col-lg-6">
            <div className="d-flex gap-2">
              <DropdownButton
                className="invoiceDropdown ml-auto"
                title="Most recent"
              >
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>

              <DropdownButton className="invoiceDropdown" title="Status">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>

              <DropdownButton
                className="invoiceDropdown"
                title="Payment method"
              >
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </div>

        <TableComponent>
          <thead>
            <tr>
              <th>
                <input type="checkbox" name="" id="" />
              </th>
              <th>Invoice Nº</th>
              <th>DATE</th>
              <th>TRAINING</th>
              <th>AMOUNT</th>
              <th>PAYMENT METHOD </th>
              <th>STATUS</th>
              <th>
                ACTION{" "}
                <img src={settingGreyAsset} alt="" style={{ float: "right" }} />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" name="" id="" />
              </td>
              <td>#2022-1</td>
              <td>31/12/2021 - 18:36</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <img src={iconAsset} alt="" />
                  <p className="mb-0">Working at height</p>
                </div>
              </td>
              <td>€ 19.99</td>
              <td>Visa | Last digits: 1111</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <img src={markAsset} width="14px" height="14px" alt="" />
                  <p className="mb-0" style={{ color: "#47CA5B" }}>
                    Processed
                  </p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <img src={embededAsset} width="14px" height="14px" alt="" />
                  <p className="mb-0" style={{ color: "#ED4C5C" }}>
                    Cancelled
                  </p>
                </div>
              </td>
              <td>
                <div className="d-flex gap-3">
                  <img src={shareAsset} width="15px" height="13.85px" alt="" />
                  <img
                    src={downloadgreenAsset}
                    width="12px"
                    height="13.85px"
                    alt=""
                  />
                  <NavLink to={paths.invoice}>
                    <img
                      src={viewblueAsset}
                      width="18px"
                      height="13.85px"
                      alt=""
                    />
                  </NavLink>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </TableComponent>
      </div>
    </>
  );
};

export default InvoiceHistory;
