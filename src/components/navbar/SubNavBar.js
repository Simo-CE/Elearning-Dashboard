import React from 'react';
import "./Navbar.css";

const SubNavBar = (props) => {
    return (
        <div>
            <div className='col-12 d-flex nav-border subNavbar pl-4 pr-2 fontsize-12'>
                <p className="subNavColor mb-0">{props.pageName}</p>
            </div>
        </div>
    )
}

export default SubNavBar;