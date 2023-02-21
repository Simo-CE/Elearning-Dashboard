import React from 'react';
import './Signin.css' 
import NewPasswordForm from '../../components/authentication/NewPasswordForm';
import LogoImg from '../../components/authentication/LogoImg';

const NewPassword = () => {
    return ( 
        <div className="container-fluid p-0 main-div" >
            <div className="row">
               <LogoImg/>
               <NewPasswordForm/>
            </div>
        </div>
    )
}

export default NewPassword