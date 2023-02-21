import React, { useState } from 'react'
import { bluearrowAsset, downloadAsset, downloadgreenAsset, iconAsset, securityAsset, settingAsset, settingGreyAsset, shareAsset, statusGreenAsset, viewAsset, viewblueAsset } from '../../assets'
import Button from '../../components/Button/Button'
import Dropdown from 'react-bootstrap/Dropdown';
import "./WorkerArea.css"
import Table from '../../components/table/Table';
import { Prev } from 'react-bootstrap/esm/PageItem';
import TraningDetailModal from './TraningDetailModal';

const Dashboard = () => {


    const [showTraningDetail, setShowTraningDetail] = useState(false);

    const traningDetailModalHandler = () => {
        setShowTraningDetail((Prev) => !Prev);
    }


    return (
        <div className='ms-5 me-5'>
            <div className='row mt-4'>
                <div className='col-lg-12'>
                    <div className='d-flex'>
                        <div>
                            <h3 className='pageHeading'>Welcome Back, Blaise DEFLOO!</h3>
                            <p className='para13'>Dashboard</p>
                        </div>

                        <div className='ms-auto'>
                            <Button label="My Trainings" icon={bluearrowAsset} buttonStyle="mytraning-btn ps-3 pe-3" onClick={() => traningDetailModalHandler()} />
                        </div>
                        {showTraningDetail && <TraningDetailModal
                            traningDetailModalHandler={traningDetailModalHandler} />}
                    </div>
                </div>
            </div>

            <div className="row mt-3 mb-3">
                <div className="col-lg-12">
                    <div className='backgroundwhite p-3'>
                        <div className='d-flex align-items-center'>
                            <div>
                                <p className='para14'>Total trainings</p>
                            </div>
                            <div className='d-flex gap-4 ms-auto'>
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" className="internalDropdown">
                                        Internal
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" className="internalDropdown">
                                        Completed
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>

                        <Table>
                            <thead className='totalTraningTableHead'>
                                <tr>
                                    <th>#</th>
                                    <th>TRAINING</th>
                                    <th>CATEGORY</th>
                                    <th>TOPIC</th>
                                    <th>STATUS</th>
                                    <th>SCORE</th>
                                    <th>SOURCE</th>
                                    <th>ISSUE DATE</th>
                                    <th>EXPIRE DATE</th>
                                    <th>ACTION <img src={settingGreyAsset} className="theadSettingImg mr-2" style={{ float: "right" }} /></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        <div className='d-flex gap-2 align-items-center'>
                                            <img src={iconAsset} alt="" width="25px" height="25px" />
                                            <p className='mb-0'>Working at height</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex gap-2 align-items-center'>
                                            <img src={securityAsset} alt="" width="18px" height="18px" />
                                            <p className='mb-0'>Safety</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex gap-2 align-items-center'>
                                            <img src={iconAsset} alt="" width="25px" height="25px" />
                                            <p className='mb-0'>VCA</p>
                                        </div>
                                    </td>
                                    <td>
                                        <img src={statusGreenAsset} alt="" width="20px" height="20px" />
                                    </td>
                                    <td>
                                        <p className='score mb-0'>90.5%</p>
                                    </td>
                                    <td>
                                        <p className='internal mb-0'>Internal</p>
                                        {/* <p className='external'>External</p> */}
                                    </td>
                                    <td>10/05/2021</td>
                                    <td>10/05/2021</td>
                                    <td>
                                        <div className='d-flex align-items-center gap-2'>
                                            <img src={shareAsset} width="15px" height="13px" alt="" />
                                            <img src={downloadgreenAsset} width="12px" height="13px" alt="" />
                                            <img src={viewblueAsset} width="18px" height="13px" alt="" />

                                        </div>
                                    </td>

                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard