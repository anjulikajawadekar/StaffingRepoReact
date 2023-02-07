import React from "react";
import { Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import ModalWithCSS from "./ModalWithCSS";

function Header() {

    let empName = localStorage.getItem('empName');
    // let empPassword = localStorage.getItem('empPassword');
    let empID = localStorage.getItem('empID');

    let navigate = useNavigate();

    // console.log(empName);
    // console.log(empID);   

    function logout() {
        localStorage.clear();
        navigate('/');
        toast.success("Logout successfully!",
                        { position: "top-right" })
    }

    return (
        <div className="h3-heading">
            <div class="row">
                <div class="col-10">
                <h2 style={{margin: '15px'}}>Welcome Employee </h2>
                    {/* <>{ValidateName()}</>  {empName}*/}
                </div>
                <div class='col-2'>
                    <ModalWithCSS />
                </div>


                {/* <div class="col-2">
                    <div className="text-center">
                        <button className="btn btn-primary w-100 theme-btn mx-auto"
                            style={{ color: 'white', margin:'15px' }} onClick={logout}>
                            Logout
                        </button>

                    </div> 
                </div> */}
            </div>
        </div>
    );
}

export default Header;