import React from 'react'
import Button from '../../../components/Button/Button'
import Table from '../../../components/table/Table'
import Toggle from '../../../components/ToggleSlide/ToggleSlide'

import "../SuperAdmin.css"


const AddUser = () => {
    return (
        <div className='ms-4 me-4'>
            <div className='row mt-4'>
                <div className='col-lg-8'>
                    <div>
                        <p className='fs-13 fw-550 black'>Add User Form</p>
                        <p className='fs-11 fw-550 gray'>Manage the available fields of add user form</p>
                    </div>
                </div>

                <div className='col-lg-4'>
                    <div className='d-flex align-items-center gap-4'>
                        <p className='fs-12 fw-550 gray ml-auto' style={{ color: "#ADADAD" }}>Show To</p>
                        <Button label="Save" buttonStyle="savebtn ps-4 pe-4" />
                    </div>
                </div>
            </div>

            <Table>
                <thead className='fieldmanagementthead'>
                    <tr>
                        <th>FIELD</th>
                        <th>HIDDEN</th>
                        <th>MANDATORY</th>
                    </tr>
                </thead>
                <tbody className='fieldmanagementbody'>
                    <tr>
                        <td>Profile Photo</td>
                        <td>
                            <Toggle />
                        </td>
                        <td>
                            <Toggle />
                        </td>
                    </tr>
                    <tr>
                        <td>First Name</td>
                        <td>
                            <Toggle />
                        </td>
                        <td>
                            <Toggle />
                        </td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td>
                            <Toggle />
                        </td>
                        <td>
                            <Toggle />
                        </td>
                    </tr>
                    <tr>
                        <td>Acronym</td>
                        <td>
                            <Toggle />
                        </td>
                        <td>
                            <Toggle />
                        </td>
                    </tr>
                    <tr>
                        <td>Birthday</td>
                        <td>
                            <Toggle />
                        </td>
                        <td>
                            <Toggle />
                        </td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>
                            <Toggle />
                        </td>
                        <td>
                            <Toggle />
                        </td>
                    </tr>
                    <tr>
                        <td>Phone Number</td>
                        <td>
                            <Toggle />
                        </td>
                        <td>
                            <Toggle />
                        </td>
                    </tr>
                    <tr>
                        <td>Company</td>
                        <td>
                            <Toggle />
                        </td>
                        <td>
                            <Toggle />
                        </td>
                    </tr>
                    <tr>
                        <td>Function</td>
                        <td>
                            <Toggle />
                        </td>
                        <td>
                            <Toggle />
                        </td>
                    </tr>
                    <tr>
                        <td>Department</td>
                        <td>
                            <Toggle />
                        </td>
                        <td>
                            <Toggle />
                        </td>
                    </tr>
                    <tr>
                        <td>Assign A Role</td>
                        <td>
                            <Toggle />
                        </td>
                        <td>
                            <Toggle />
                        </td>
                    </tr>
                    <tr>
                        <td>Qr Code</td>
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
    )
}

export default AddUser