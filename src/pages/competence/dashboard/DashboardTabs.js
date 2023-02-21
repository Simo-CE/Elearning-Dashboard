import React from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import "../../adminArea/adminArea.css";
import { arrowAsset } from "../../../assets";
import AdminDashboard from "./Dashboard";
import UserDocuments from "./UserDocuments";
import UserTranings from "./UserTranings";
import langKey from "../../../localization/locale.json";
import { useSelector } from "react-redux";

const DashboardTabs = () => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  let firstName = useSelector((state) => state.auth.userDetail.user.first_name);

  let lastName = useSelector((state) => state.auth.userDetail.user.last_name);

  return (
    <>
      <div className="ml-5 mr-5">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="mt-4 ml-5 mr-5">
            <Col sm={6}>
              <div>
                <h2 className="fs-18 fw-500" style={{ color: "#7C7C7C " }}>
                  Welcome Back, {firstName} {lastName}!
                </h2>
                <p className="fs-13 fw-500" style={{ color: "#B4B4B4 " }}>
                  {" "}
                  {(keywordTranslation && keywordTranslation["dashboard"]) ||
                    langKey.dashboard}
                </p>
              </div>
            </Col>
            <Col
              sm={6}
              className="d-flex align-items-center justify-content-end"
            >
              <Nav variant="pills" className="dashboardTabs">
                <Nav.Item>
                  <Nav.Link eventKey="first">
                    {" "}
                    {(keywordTranslation && keywordTranslation["dashboard"]) ||
                      langKey.dashboard}
                  </Nav.Link>
                </Nav.Item>
                <img src={arrowAsset} alt="" />
                <Nav.Item>
                  <Nav.Link eventKey="second">
                    {" "}
                    {(keywordTranslation &&
                      keywordTranslation["usersDocuments"]) ||
                      langKey.usersDocuments}
                  </Nav.Link>
                </Nav.Item>
                <img src={arrowAsset} alt="" />
                <Nav.Item>
                  <Nav.Link eventKey="third">
                    {" "}
                    {(keywordTranslation &&
                      keywordTranslation["usersTrainings"]) ||
                      langKey.usersTrainings}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={12} className="mt-3">
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <AdminDashboard />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <UserDocuments />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <UserTranings />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
};

export default DashboardTabs;
