import React from "react";
import {List, ListGroup, ListGroupItem} from "reactstrap";
import { useLocation } from "react-router-dom";

const EmpTeamSidebar=()=>{

    let empName = localStorage.getItem('empName');
    let empPass= localStorage.getItem('empPassword');
    
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    return (
        
        <ListGroup style={{marginTop:'15px'}}>            
            <ListGroupItem tag="a" href="/admin_dashboard1" action className={splitLocation[1] === "admin_dashboard1" ? "list-group-item-success" : ""}>Home</ListGroupItem>
            {/* <ListGroupItem tag="a" href="/issue_list_team" action>ViewList</ListGroupItem> */}
        </ListGroup>
    )
};

export default EmpTeamSidebar;