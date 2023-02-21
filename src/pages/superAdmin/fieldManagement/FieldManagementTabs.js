import React from 'react'
import "../SuperAdmin.css"
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { addUserAsset, categoryAsset, certAsset, documentAsset, externalWorkshopAsset, fileDocAsset, topicAsset, userCertiAsset, workshopAsset } from '../../../assets';
import AddNewTraining from './AddNewTraining';
import AddUser from './AddUser';
import FieldManagement from './FieldManagement';
import UploadUserDocument from './UploadUserDocument';
import UploadUserCertificate from './UploadUserCertificate';
import AddExternalCertificate from './AddExternalCertificate';
import AddExternalTraining from './AddExternalTraining';
import AddCategory from './AddCategory';
import AddTopics from './AddTopics';
import AddDocument from './AddDocument';
const FieldManagementTabs = () => {
    return (
        <>
            <div className='ms-5 me-5 mt-4'>
                <FieldManagement />

                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row className="bg-white" style={{ border: "1px solid #F2F2F2", height: "560px" }}>
                        <Col sm={3} style={{ borderRight: "1px solid #F2F2F2" }} >
                            <Nav variant="pills" className="flex-column fieldManagementTabs mt-3">
                                <Nav.Item>
                                    <Nav.Link eventKey="first" href="#">
                                        <img src={addUserAsset} width="11px" height="12.57px" />
                                        Add User
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second" href="#">
                                        <img src={workshopAsset} width="12px" height="10.57px" />
                                        Add New Training
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third" href="#">
                                        <img src={documentAsset} width="12px" height="13px" />
                                        Upload User Document
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fourth" href="#">
                                        <img src={userCertiAsset} width="12px" height="16px" />
                                        Uplaod User Certification
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fifth" href="#">
                                        <img src={certAsset} width="12px" height="16.8px" />
                                        Add External Certificate
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="sixth" href="#">
                                        <img src={externalWorkshopAsset} width="12px" height="10.51px" />
                                        Add External Training
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="seven" href="#">
                                        <img src={categoryAsset} width="12px" height="12px" />
                                        Add Category
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="eight" href="#">
                                        <img src={topicAsset} width="12px" height="10.8px" />
                                        Add Topic
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="nine" href="#">
                                        <img src={fileDocAsset} width="10px" height="12.5px" />
                                        Add Document
                                    </Nav.Link>
                                </Nav.Item>

                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <AddUser />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <AddNewTraining />
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <UploadUserDocument />
                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth">
                                    <UploadUserCertificate />
                                </Tab.Pane>
                                <Tab.Pane eventKey="fifth">
                                    <AddExternalCertificate />
                                </Tab.Pane>
                                <Tab.Pane eventKey="sixth">
                                    <AddExternalTraining />
                                </Tab.Pane>
                                <Tab.Pane eventKey="seven">
                                    <AddCategory />
                                </Tab.Pane>
                                <Tab.Pane eventKey="eight">
                                    <AddTopics />
                                </Tab.Pane>
                                <Tab.Pane eventKey="nine">
                                    <AddDocument />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </>
    )
}

export default FieldManagementTabs