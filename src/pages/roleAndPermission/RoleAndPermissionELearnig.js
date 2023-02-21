import React from 'react'
import { settingAsset, settingGreyAsset } from '../../assets'
import TableComponent from '../../components/table/Table';
import ToggleSlide from '../../components/ToggleSlide/ToggleSlide'
import "./RoleAndPermission.css";

const RoleAndPermissionELearnig = () => {
    return (
        <>
            <div className="container">
                {/* <div className="row">
                    <div className="col-4">
                        <p className="heading">Manage Roles & Permissions</p>
                    </div>
                    <div className="col-8">
                        <table className="head">
                            <thead className="table-head">
                                <tr >
                                    <th>Administrator</th>
                                    <th className="qhse">QHSE</th>
                                    <th>HR</th>
                                    <th>Manager</th>
                                    <th>Worker</th>
                                    <th><img src={settingAsset} width="15px" height="15px" /></th>


                                </tr>
                            </thead>

                        </table>
                    </div>
                </div> */}
                {/* <div className="col-md-12">
                    <table className="table rolePermissionTable">

                        <tbody >
                            <tr className="table-row">
                                <td rowspan="5">
                                    <div className='d-flex'>
                                        <div>
                                            <p className="text-vertical">CONTRACTOR</p>
                                        </div>
                                        <p>Example</p>
                                    </div>
                                </td>
                                <td>
                                    <ToggleSlide Class='Medium' />
                                </td>
                                <td>
                                    <ToggleSlide Class='Medium' />
                                </td>
                                <td>
                                    <ToggleSlide Class='Medium' />
                                </td>
                                <td>
                                    <ToggleSlide Class='Medium' />
                                </td>
                                <td>
                                    <ToggleSlide Class='Medium' />
                                </td>
                            </tr>





                        </tbody>

                        <tbody style={{ position: "relative", top: "13px" }}>
                            <tr className="table-row" >
                                <th rowspan="5" className="text-vertical-1">SUB-CONTRACTOR</th>
                                <th colspan="3" className='text-align-start'>Example</th>
                                <td>
                                    <ToggleSlide Class='Medium' />
                                </td>
                                <td>
                                    <ToggleSlide Class='Medium' />
                                </td>
                                <td>
                                    <ToggleSlide Class='Medium' />
                                </td>
                                <td>
                                    <ToggleSlide Class='Medium' />
                                </td>
                                <td>
                                    <ToggleSlide Class='Medium' />
                                </td>
                            </tr>





                        </tbody>

                        <tbody style={{ position: "relative", top: "31px" }}>
                            <tr className="table-row" >
                                <th rowspan="5" className="text-vertical-2">EXTERNAL CONTRACTOR</th>
                                <th colspan="3" className='text-align-start'>Example</th>
                                <td>
                                    <ToggleSlide Class='Medium' />
                                </td>
                                <td>
                                    <ToggleSlide Class='Medium' />
                                </td>
                                <td>
                                    <ToggleSlide Class='Medium' />
                                </td>
                                <td>
                                    <ToggleSlide Class='Medium' />
                                </td>
                                <td>
                                    <ToggleSlide Class='Medium' />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div> */}

                <TableComponent>
                    <thead className="rolePermissionTablehead">
                        <tr>
                            <th>Manage Roles & Permissions</th>
                            <th>Administrator</th>
                            <th className="qhse">QHSE</th>
                            <th>HR</th>
                            <th>Manager</th>
                            <th>Worker</th>
                            <th><img src={settingGreyAsset} width="15px" height="15px" /></th>


                        </tr>
                    </thead>
                    <tbody >
                        <tr className="rolePermissionTableBody">
                            <td rowspan="5">
                                <div className='d-flex'>
                                    <div>
                                        <p className="text-vertical">CONTRACTOR</p>
                                    </div>
                                    <p className='fs-12 ml-2'>Example</p>
                                </div>
                            </td>
                            {/* <td colspan="3" className='text-align-start'></td> */}
                            <td>
                                <ToggleSlide Class='Medium' />
                            </td>
                            <td>
                                <ToggleSlide Class='Medium' />
                            </td>
                            <td>
                                <ToggleSlide Class='Medium' />
                            </td>
                            <td>
                                <ToggleSlide Class='Medium' />
                            </td>
                            <td>
                                <ToggleSlide Class='Medium' />
                            </td>
                        </tr>





                    </tbody>
                    <tbody >
                        <tr className="rolePermissionTableBody">
                            <td rowspan="5">
                                <div className='d-flex'>
                                    <div>
                                        <p className="text-vertical subContractor">SUB-CONTRACTOR</p>
                                    </div>
                                    <p className='fs-12 ml-2'>Example</p>
                                </div>
                            </td>
                            {/* <td colspan="3" className='text-align-start'></td> */}
                            <td>
                                <ToggleSlide Class='Medium' />
                            </td>
                            <td>
                                <ToggleSlide Class='Medium' />
                            </td>
                            <td>
                                <ToggleSlide Class='Medium' />
                            </td>
                            <td>
                                <ToggleSlide Class='Medium' />
                            </td>
                            <td>
                                <ToggleSlide Class='Medium' />
                            </td>
                        </tr>





                    </tbody>
                    <tbody >
                        <tr className="rolePermissionTableBody">
                            <td rowspan="5">
                                <div className='d-flex'>
                                    <div>
                                        <p className="text-vertical externalContractors">EXTERNAL CONTRACTOR</p>
                                    </div>
                                    <p className='fs-12 ml-2'>Example</p>
                                </div>
                            </td>
                            {/* <td colspan="3" className='text-align-start'></td> */}
                            <td>
                                <ToggleSlide Class='Medium' />
                            </td>
                            <td>
                                <ToggleSlide Class='Medium' />
                            </td>
                            <td>
                                <ToggleSlide Class='Medium' />
                            </td>
                            <td>
                                <ToggleSlide Class='Medium' />
                            </td>
                            <td>
                                <ToggleSlide Class='Medium' />
                            </td>
                        </tr>





                    </tbody>
                </TableComponent>


            </div>
        </>
    )
}

export default RoleAndPermissionELearnig