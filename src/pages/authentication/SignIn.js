import React from "react";

import "./Signin.css";
import LogImg from "../../components/authentication/LogoImg";
import SignInn from "../../components/authentication/SignInn";

const Login = () => {
  return (
    <div className="container-fluid p-0 main-div">
      <div className="row">
        <LogImg />
        <SignInn />
      </div>
    </div>
  );
};

export default Login;
