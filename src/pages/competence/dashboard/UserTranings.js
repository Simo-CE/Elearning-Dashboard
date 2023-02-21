import React from "react";
import { profilePageAsset, statusGreenAsset } from "../../../assets";
import Button from "../../../components/Button/Button";
import TableComponent from "../../../components/table/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
const UserTranings = () => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      10/05/2022
    </Tooltip>
  );

  return (
    <>
      <div>
        <div className="row">
          <div className="col-lg-12">
            <div className="d-flex justify-content-end">
              <Button label="Internal" buttonStyle="internal-btn" />
              <Button label="External" buttonStyle="exnternal-btn" />
            </div>
          </div>

          <TableComponent>
            <thead className="userTraningTableHead">
              <tr>
                <th>#</th>
                <th>USER</th>
                <th>TYPE</th>
                <th>
                  <div className="d-flex flex-column w-100">
                    <div>
                      <p className="mb-0 text-white topicName">Santé</p>
                    </div>

                    <div className="w-100">
                      <p className="fs-10 topicNumber">22</p>
                      <p className="mb-0 topic">Visite médicale</p>
                      <p className="fs-10 perNumber">22</p>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="userTraningTableBody">
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
                        className="fs-11 fw-500 text-start"
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
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <img src={statusGreenAsset} alt="" />
                  </OverlayTrigger>
                </td>
              </tr>
            </tbody>
          </TableComponent>
        </div>
      </div>
    </>
  );
};

export default UserTranings;
