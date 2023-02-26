import React from "react";
import { NavLink } from "react-router-dom";
import '../CSS/SideBar.css'

function SideBar() {
    return(
        <div className="SideBar">
            <div className="title">
                <p className="panelText">Wave Scan</p>
            </div>
            <div className="panelContainer">
                {/* <div className='panelItem'> */}
                    <NavLink to='/' className="panelItem">
                        <p className="panelText">All Scanners</p>
                    </NavLink>
                {/* </div> */}
                {/* <div className='panelItem'> */}
                    <NavLink to='/form' className="panelItem">
                        <p className="panelText">Project Form</p>
                    </NavLink>
                {/* </div> */}
            </div> 
        </div>
    )
};

export default SideBar;