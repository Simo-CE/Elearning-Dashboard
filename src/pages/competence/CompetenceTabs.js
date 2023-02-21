import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import paths from '../../routes/paths';
import langKey from "../../localization/locale.json";
import { useDownloadExcel } from 'react-export-table-to-excel';
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { arrowAsset } from '../../assets';
import AdminDashboard from './dashboard/Dashboard';
import WorkerDocument from './WorkerDocument';
import CompetencyMatrix from './CompetencyMatrix';
const CompetenceTabs = (props) => {
    const { keywordTranslation, language_direction } = useSelector((state) => state.localization?.selectedLanguage);


    let firstName = useSelector((state) => state.auth.userDetail.user.first_name);

    let lastName = useSelector((state) => state.auth.userDetail.user.last_name);

    return (
        <>
            {/* <div className="routerTabsStyling justify-content-end pr-3">
                <p className='fs-12 fw-500 blue cursor' onClick={() => props.ButtonClick('download')}> Export Excel </p>
                <NavLink to={paths.adminDashboard}>
                    {(keywordTranslation && keywordTranslation["dashboard"]) || langKey.dashboard}
                </NavLink>
                <NavLink to={paths.competence}>
                    {(keywordTranslation && keywordTranslation["competencyMatrix"]) || langKey.competencyMatrix}
                </NavLink>

                <NavLink to={paths.workerDocuments}>
                    {(keywordTranslation && keywordTranslation["workerDocuments"]) || langKey.workerDocuments}
                </NavLink>

            </div> */}
            <div className="ml-5 mr-5">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row className="mt-4 pt-2 ml-5 mr-5">
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
                                    <WorkerDocument />
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <CompetencyMatrix />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </>
    )
}

export default CompetenceTabs;