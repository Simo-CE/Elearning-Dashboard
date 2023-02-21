import React from 'react'
import './Signin.css' 
import LogoImg from '../../components/authentication/LogoImg';
import ResetPasswordForm from '../../components/authentication/ResetPassword';

const ResetPassword = () => {
    return (
        <div className="container-fluid p-0 main-div" >
            <div className="row">
               <LogoImg/>
               <ResetPasswordForm/>
            </div>
        </div>
    )
}

export default ResetPassword