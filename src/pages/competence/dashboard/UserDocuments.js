import React from "react";
import { profilePageAsset, settingAsset } from "../../../assets";
import TableComponent from "../../../components/table/Table";

const UserDocuments = () => {
  return (
    <>
      <div>
        <div className="row">
          <div className="col-lg-12">
            <TableComponent>
              <thead className="userDocumentTableHead">
                <tr>
                  <th>#</th>
                  <th>USER</th>
                  <th>TYPE</th>
                  <th>ID/Passport</th>
                  <th>Medical Certificate</th>
                  <th>Driving license</th>
                  <th>DIMONA</th>
                  <th>LIMOSA</th>
                  <th>A1</th>
                  <th>Criminal Record</th>
                  <th>
                    Example{" "}
                    <img src={settingAsset} alt="" style={{ float: "right" }} />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <div className="d-flex gap-2">
                      <img
                        src={profilePageAsset}
                        className="rounded-circle"
                        width="26px"
                        height="26px"
                        alt=""
                      />
                      <div>
                        <p className="fs-12">Prewitt Lemaître</p>
                        <p
                          className="fs-11 fw-500"
                          style={{ color: "#ADADAD " }}
                        >
                          Electrician{" "}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="internal">Internal</p>
                  </td>
                  <td>
                    <p className="passport_td">10/05/2021</p>
                  </td>
                  <td>
                    <p className="medical_td">10/05/2021</p>
                  </td>
                  <td>
                    <p className="drivingLicence_td">10/05/2021</p>
                  </td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>
                    <p className="passport_td">10/05/2021</p>
                  </td>
                  <td>
                    <p className="medical_td">10/05/2021</p>
                  </td>
                </tr>
              </tbody>
            </TableComponent>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDocuments;
