import React from "react";
import Button from "../../../components/Button/Button";
import Table from "../../../components/table/Table";
import Toggle from "../../../components/ToggleSlide/ToggleSlide";

import "../SuperAdmin.css";

const UploadUserDocument = () => {
  return (
    <>
      <div className="ms-4 me-4">
        <div className="row mt-4">
          <div className="col-lg-8">
            <div>
              <p className="fs-13 fw-550 black">Upload User Document Form</p>
              <p className="fs-11 fw-550 gray">
                Manage the available fields of upload user document form
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-4">
              <p
                className="fs-12 fw-550 gray ml-auto"
                style={{ color: "#ADADAD" }}
              >
                Show To
              </p>
              <Button label="Save" buttonStyle="savebtn ps-4 pe-4" />
            </div>
          </div>
        </div>

        <Table>
          <thead className="fieldmanagementthead">
            <tr>
              <th>FIELD</th>
              <th>HIDDEN</th>
              <th>MANDATORY</th>
            </tr>
          </thead>
          <tbody className="fieldmanagementbody">
            <tr>
              <td>Document</td>
              <td>
                <Toggle />
              </td>
              <td>
                <Toggle />
              </td>
            </tr>
            <tr>
              <td>Expire Date</td>
              <td>
                <Toggle />
              </td>
              <td>
                <Toggle />
              </td>
            </tr>
            <tr>
              <td>Document File</td>
              <td>
                <Toggle />
              </td>
              <td>
                <Toggle />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default UploadUserDocument;
