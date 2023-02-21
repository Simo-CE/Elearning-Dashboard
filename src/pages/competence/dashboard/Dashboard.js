import { Dropdown } from "react-bootstrap";
import React from "react";
import TableComponent from "../../../components/table/Table";
import {
  clockImgAsset,
  deleteBlankAsset,
  downloadgreenAsset,
  editAsset,
  englishAsset,
  greenArrowAsset,
  iconAsset,
  infoAsset,
  profilePageAsset,
  securityAsset,
  viewblueAsset,
} from "../../../assets";
import TraningActivityChart from "./TraningActivityChart";
import AgeChart from "./AgeChart";
import TopicsPiechart from "./TopicsPiechart";
import langKey from "../../../localization/locale.json";
import { useSelector } from "react-redux";
import CompetenceTabs from "../CompetenceTabs";

const AdminDashboard = () => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  return (
    <>
      <div>
        <div className="row">
          <div className="col-lg-12 col-xl-6 mt-3">
            <div className="dashbordDiv-bg h-100">
              <div className="d-flex justify-content-between align-items-center">
                <p className="fs-14 fw-550">
                  {(keywordTranslation &&
                    keywordTranslation["trainingActivity"]) ||
                    langKey.trainingActivity}
                </p>
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="dashbordDropdown"
                    style={{ width: "117px" }}
                  >
                    Last 7 days
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      {" "}
                      {(keywordTranslation && keywordTranslation["action"]) ||
                        langKey.action}
                    </Dropdown.Item>
                    <Dropdown.Item>Another action</Dropdown.Item>
                    <Dropdown.Item>Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <TraningActivityChart />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3 col-md-6 mt-3">
            <div className="dashbordDiv-bg">
              <div className="d-flex justify-content-between align-items-center">
                <p className="fs-14 fw-550">
                  {" "}
                  {(keywordTranslation &&
                    keywordTranslation["totalTraining"]) ||
                    langKey.totalTraining}s
                </p>
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="dashbordDropdown"
                    style={{ width: "97px" }}
                  >
                    {(keywordTranslation && keywordTranslation["alltime"]) ||
                      langKey.alltime}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Action</Dropdown.Item>
                    <Dropdown.Item>Another action</Dropdown.Item>
                    <Dropdown.Item>Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div>
                <div className="d-flex justify-content-center mt-4">
                  <div className="totalBall">
                    <p className="fs-12 fw-500 text-white">50</p>
                    <p className="fs-12 fw500 text-white">100%</p>
                  </div>
                </div>
                <p
                  className="fs-12 fw-500 text-center mt-2"
                  style={{ color: "#737373" }}
                >
                  {(keywordTranslation && keywordTranslation["total"]) ||
                    langKey.total}
                </p>
              </div>

              <div className="d-flex justify-content-around mt-4 mb-3">
                <div>
                  <div className="internalBall">
                    <p className="fs-12 fw-500 text-white">40</p>
                    <p className="fs-12 fw500 text-white">80%</p>
                  </div>
                  <p
                    className="fs-12 fw-500 text-center mt-2"
                    style={{ color: "#737373" }}
                  >
                    {(keywordTranslation && keywordTranslation["internal"]) ||
                      langKey.internal}
                  </p>
                </div>
                <div>
                  <div className="externalBall">
                    <p className="fs-12 fw-500 text-white">10</p>
                    <p className="fs-12 fw500 text-white">20%</p>
                  </div>
                  <p
                    className="fs-12 fw-500 text-center mt-2"
                    style={{ color: "#737373" }}
                  >
                    {(keywordTranslation && keywordTranslation["external"]) ||
                      langKey.external}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3 col-md-6 mt-3">
            <div
              className="dashbordDiv-bg clock-bg"
              style={{ background: "#2C8EFF" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <p className="fs-14 fw-550 text-white">
                  {" "}
                  {(keywordTranslation && keywordTranslation["avgTrainTime"]) ||
                    langKey.avgTrainTime}
                </p>
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="dashbordDropdown bg-white"
                    style={{ width: "92px" }}
                  >
                    {(keywordTranslation && keywordTranslation["all"]) ||
                      langKey.all}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Action</Dropdown.Item>
                    <Dropdown.Item>Another action</Dropdown.Item>
                    <Dropdown.Item>Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="d-flex justify-content-end  mt-3">
                {/* <img src={clockImgAsset} alt="" /> */}
                <div>
                  <h4 className="fs-25 fw-550 text-white">00:22:05</h4>
                  <div className="d-flex gap-2 align-items-center">
                    <p className="fs-13 fw-500" style={{ color: "#C5DFFE" }}>
                      {(keywordTranslation && keywordTranslation["longest"]) ||
                        langKey.longest}
                    </p>
                    <p className="fs-13 fw-500" style={{ color: "#C5DFFE" }}>
                      02:30:54
                    </p>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <p className="fs-13 fw-500" style={{ color: "#C5DFFE" }}>
                      {(keywordTranslation && keywordTranslation["shortest"]) ||
                        langKey.shortest}
                    </p>
                    <p className="fs-13 fw-500" style={{ color: "#C5DFFE" }}>
                      00:20:11
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashbordDiv-bg user-bg mt-3">
              <div className="d-flex justify-content-between align-items-center">
                <p className="fs-14 fw-550">
                  {" "}
                  {(keywordTranslation && keywordTranslation["totalUsers"]) ||
                    langKey.totalUsers}
                </p>
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="dashbordDropdown bg-white"
                    style={{ width: "92px" }}
                  >
                    {(keywordTranslation && keywordTranslation["all"]) ||
                      langKey.all}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Action</Dropdown.Item>
                    <Dropdown.Item>Another action</Dropdown.Item>
                    <Dropdown.Item>Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="d-flex mt-3">
                <img
                  src={infoAsset}
                  width="14.34px"
                  height="14.34px"
                  className="ml-auto"
                  alt=""
                />
              </div>
              <div className="d-flex justify-content-end mr-4  mt-2">
                <div>
                  <div>
                    <h4 className="fs-40 fw-550" style={{ color: "#B9B9B9" }}>
                      400
                    </h4>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <img
                      src={greenArrowAsset}
                      width="16px"
                      height="9px"
                      alt=""
                    />
                    <p className="fs-12 fw-500" style={{ color: "#47CA5B" }}>
                      2%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-xl-6  mt-3">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="dashbordDiv-bg">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="fs-14 fw-550">
                      {" "}
                      {(keywordTranslation && keywordTranslation["age"]) ||
                        langKey.age}
                    </p>
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="dashbordDropdown"
                        style={{ width: "117px" }}
                      >
                        {(keywordTranslation && keywordTranslation["all"]) ||
                          langKey.all}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>Action</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <div>
                    <AgeChart />
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-6">
                <div className="dashbordDiv-bg h-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="fs-14 fw-550">
                      {" "}
                      {(keywordTranslation && keywordTranslation["language"]) ||
                        langKey.language}
                    </p>
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="dashbordDropdown"
                        style={{ width: "100px" }}
                      >
                        {(keywordTranslation && keywordTranslation["all"]) ||
                          langKey.all}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>Action</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mt-3">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={englishAsset}
                        width="28px"
                        height="28px"
                        alt=""
                      />
                      <div>
                        <p className="fs-13 fw-550">
                          {" "}
                          {(keywordTranslation &&
                            keywordTranslation["english"]) ||
                            langKey.english}
                        </p>
                        <p
                          className="fs-11 fw-500"
                          style={{ color: "#A5A5A5" }}
                        >
                          150 user
                        </p>
                      </div>
                    </div>
                    <p className="fs-12 fw-550" style={{ color: "#686868" }}>
                      50%
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mt-2">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={englishAsset}
                        width="28px"
                        height="28px"
                        alt=""
                      />
                      <div>
                        <p className="fs-13 fw-550">
                          {" "}
                          {(keywordTranslation &&
                            keywordTranslation["english"]) ||
                            langKey.english}
                        </p>
                        <p
                          className="fs-11 fw-500"
                          style={{ color: "#A5A5A5" }}
                        >
                          150 user
                        </p>
                      </div>
                    </div>
                    <p className="fs-12 fw-550" style={{ color: "#686868" }}>
                      50%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-xl-6  mt-3">
            <div className="dashbordDiv-bg h-100">
              <div className="d-flex justify-content-between align-items-center">
                <p className="fs-14 fw-550">
                  {(keywordTranslation &&
                    keywordTranslation["trainByCatTop"]) ||
                    langKey.trainByCatTop}
                </p>
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="dashbordDropdown"
                    style={{ width: "117px" }}
                  >
                    {(keywordTranslation && keywordTranslation["all"]) ||
                      langKey.all}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Action</Dropdown.Item>
                    <Dropdown.Item>Another action</Dropdown.Item>
                    <Dropdown.Item>Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="d-flex align-items-center mt-2">
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <TopicsPiechart />
                  <div className="d-flex gap-2 align-items-center">
                    <img src={securityAsset} alt="" />
                    <p className="fs-12 fw-500">{(keywordTranslation && keywordTranslation["safety"]) ||
                      langKey.safety}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <TopicsPiechart />
                  <div className="d-flex gap-2 align-items-center">
                    <img src={iconAsset} alt="" />
                    <p className="fs-12 fw-500">{(keywordTranslation && keywordTranslation["vca"]) ||
                      langKey.vca}</p>
                  </div>
                </div>
                <div>
                  <p
                    className="fs-12 fw-550 text-center ml-3"
                    style={{ color: "#A3A3A3" }}
                  >
                    There are <br />
                    <span style={{ color: "#757575" }}>30% (15)</span> of <br />
                    tranings in <br />
                    <span style={{ color: "#757575" }}>Safety VCA</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-7 mt-3">
            <div className="dashbordDiv-bg h-100">
              <div className="d-flex justify-content-between align-items-center">
                <p className="fs-14 fw-550"> {(keywordTranslation && keywordTranslation["lastTrainings"]) ||
                  langKey.lastTrainings}</p>
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="dashbordDropdown"
                    style={{ width: "117px" }}
                  >
                    {(keywordTranslation && keywordTranslation["all"]) ||
                      langKey.all}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Action</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <TableComponent>
                <thead className="lastAddTraningTableHead">
                  <tr>
                    <th>#</th>
                    <th>TRAINING</th>
                    <th>CATEGORY</th>
                    <th>TOPIC</th>
                    <th>VALIDITY</th>
                    <th>DATE</th>
                    <th className="d-revert">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <img src={iconAsset} alt="" />
                        <p
                          className="mb-0"
                          style={{
                            color: "#2C8EFF",
                            textDecorationLine: "underline",
                          }}
                        >
                          Working at height
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <img src={securityAsset} alt="" />
                        <p className="mb-0">{(keywordTranslation && keywordTranslation["safety"]) ||
                          langKey.safety}</p>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <img src={iconAsset} alt="" />
                        <p className="mb-0">{(keywordTranslation && keywordTranslation["vca"]) ||
                          langKey.vca}</p>
                      </div>
                    </td>
                    <td>2 years</td>
                    <td>10/05/2021</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <img src={deleteBlankAsset} alt="" />
                        <img src={editAsset} alt="" />
                        <img src={downloadgreenAsset} alt="" />
                        <img src={viewblueAsset} alt="" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </TableComponent>
            </div>
          </div>
          <div className="col-lg-5 mt-3">
            <div className="dashbordDiv-bg h-100">
              <div className="d-flex justify-content-between align-items-center">
                <p className="fs-14 fw-550">Last Added Users</p>
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="dashbordDropdown"
                    style={{ width: "117px" }}
                  >
                    {(keywordTranslation && keywordTranslation["all"]) ||
                      langKey.all}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Action</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <TableComponent>
                <thead className="lastAddTraningTableHead">
                  <tr>
                    <th>#</th>
                    <th>USER</th>
                    <th>TYPE</th>
                    <th>DATE</th>
                    <th className="d-revert">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <img
                          src={profilePageAsset}
                          className="rounded-circle"
                          alt=""
                          width="22px"
                          height="22px"
                        />
                        <p className="mb-0">Prewitt Lemaître</p>
                      </div>
                    </td>
                    <td>
                      <p className="internal">Internal</p>
                    </td>
                    <td>10/05/2021</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <img src={deleteBlankAsset} alt="" />
                        <img src={editAsset} alt="" />
                        <img src={downloadgreenAsset} alt="" />
                        <img src={viewblueAsset} alt="" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </TableComponent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
