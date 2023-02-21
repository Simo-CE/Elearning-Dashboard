import React from 'react'
import { Card, Dropdown } from 'react-bootstrap'
import { binSimpleAsset, editAsset, editiconAsset, editIconAsset, profileAsset, subjectAsset } from '../../assets'
import SaveButton from '../../components/Button/Button'
import ToggleSlide from '../../components/ToggleSlide/ToggleSlide'
import "./EmailTemplate.css"
import { NavLink, useNavigate } from 'react-router-dom';
import paths from '../../routes/paths'

const ManageEmailTeplate = () => {
    return (
        <>
            <div className='sideMargin'>
                <div className='row'>
                    <div className='col-lg-12 mt-4'>
                        <h4 className='email_heading'>Manage Email Templates</h4>
                    </div>

                    <div className='col-lg-12 mt-4'>
                        <div className='d-flex'>
                            <div>
                                <Dropdown>
                                    <Dropdown.Toggle className='statusDropdown' id="dropdown-basic">
                                        Status
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            <div className='ml-auto'>
                                <NavLink to={paths.addEmailTemplate} >
                                    <SaveButton label="Add New Template" buttonStyle="newTemplate_btn pl-3 pr-3" />
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-3 mt-3'>
                        <Card>
                            {/* <Card.Header as="h5">Featured</Card.Header> */}
                            <Card.Body>
                                <Card.Title> <div className='d-flex align-items-center'>
                                    <div>
                                        <p className='cardHeading'>Confirmation email</p>
                                        <p className='blueborder'></p>
                                    </div>
                                    <div className='d-flex align-items-center ml-auto'>
                                        <img src={editAsset} width="15px" height="15px" className='mr-2 cursor' />
                                        <img src={binSimpleAsset} width="15px" height="15px" className='cursor' />
                                    </div>
                                </div></Card.Title>
                                <Card.Text>
                                    <div className="media mt-3">
                                        <img className="mr-2" src={subjectAsset} width="16px" height="14px" alt="" />
                                        <div className="media-body">
                                            <h5 className="mt-0 subject">SUBJECT</h5>
                                            <p className='subjectTitle'>Account confirmation for SafetyTracker</p>
                                        </div>
                                    </div>

                                    <div className="media mt-3">
                                        <img className="mr-2" src={profileAsset} width="16px" height="18px" alt="" />
                                        <div className="media-body">
                                            <h5 className="mt-0 subject">FOR</h5>
                                            <p className='subjectTitle'>New user registration </p>
                                        </div>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className='bg-white'>
                                <div className='d-flex align-items-center'>
                                    <p className='subject'>STATUS</p>
                                    <div className='ml-auto'>
                                        <ToggleSlide Class='Medium' />
                                    </div>
                                </div>
                            </Card.Footer>

                        </Card>

                    </div>

                    <div className='col-lg-3 mt-3'>
                        <Card>
                            {/* <Card.Header as="h5">Featured</Card.Header> */}
                            <Card.Body>
                                <Card.Title> <div className='d-flex align-items-center'>
                                    <div>
                                        <p className='cardHeading'>Reset password email</p>
                                        <p className='blueborder'></p>
                                    </div>
                                    <div className='d-flex align-items-center ml-auto'>
                                        <img src={editAsset} width="15px" height="15px" className='mr-2 cursor' />
                                        <img src={binSimpleAsset} width="15px" height="15px" className='cursor' />
                                    </div>
                                </div></Card.Title>
                                <Card.Text>
                                    <div className="media mt-3">
                                        <img className="mr-2" src={subjectAsset} width="16px" height="14px" alt="" />
                                        <div className="media-body">
                                            <h5 className="mt-0 subject">SUBJECT</h5>
                                            <p className='subjectTitle'>Reset your SafetyTracker password</p>
                                        </div>
                                    </div>

                                    <div className="media mt-3">
                                        <img className="mr-2" src={profileAsset} width="16px" height="18px" alt="" />
                                        <div className="media-body">
                                            <h5 className="mt-0 subject">FOR</h5>
                                            <p className='subjectTitle'>User lost password</p>
                                        </div>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className='bg-white'>
                                <div className='d-flex align-items-center'>
                                    <p className='subject'>STATUS</p>
                                    <div className='ml-auto'>
                                        <ToggleSlide Class='Medium' />
                                    </div>
                                </div>
                            </Card.Footer>

                        </Card>

                    </div>

                    <div className='col-lg-3 mt-3'>
                        <Card>
                            {/* <Card.Header as="h5">Featured</Card.Header> */}
                            <Card.Body>
                                <Card.Title> <div className='d-flex align-items-center'>
                                    <div>
                                        <p className='cardHeading'>Welcome email</p>
                                        <p className='blueborder'></p>
                                    </div>
                                    <div className='d-flex align-items-center ml-auto'>
                                        <img src={editAsset} width="15px" height="15px" className='mr-2 cursor' />
                                        <img src={binSimpleAsset} width="15px" height="15px" className='cursor' />
                                    </div>
                                </div></Card.Title>
                                <Card.Text>
                                    <div className="media mt-3">
                                        <img className="mr-2" src={subjectAsset} width="16px" height="14px" alt="" />
                                        <div className="media-body">
                                            <h5 className="mt-0 subject">SUBJECT</h5>
                                            <p className='subjectTitle'>Welcome to SafetyTracker </p>
                                        </div>
                                    </div>

                                    <div className="media mt-3">
                                        <img className="mr-2" src={profileAsset} width="16px" height="18px" alt="" />
                                        <div className="media-body">
                                            <h5 className="mt-0 subject">FOR</h5>
                                            <p className='subjectTitle'>User email confirmed</p>
                                        </div>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className='bg-white'>
                                <div className='d-flex align-items-center'>
                                    <p className='subject'>STATUS</p>
                                    <div className='ml-auto'>
                                        <ToggleSlide Class='Medium' />
                                    </div>
                                </div>
                            </Card.Footer>

                        </Card>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageEmailTeplate