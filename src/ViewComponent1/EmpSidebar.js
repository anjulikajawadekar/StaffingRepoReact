import React from "react";
import {ListGroup, ListGroupItem} from "reactstrap";
import { useLocation } from "react-router-dom";

const EmpSidebar=()=>{

    let empName = localStorage.getItem('empName');
    let empPass= localStorage.getItem('empPassword');

    const location = useLocation();
    
    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

    return (        
        <ListGroup style={{marginTop:'15px'}}>            
            <ListGroupItem tag="a" href="/add_closure1" action  className={splitLocation[1] === "add_closure1" ? "list-group-item-success" : ""}>Add Requirements</ListGroupItem>
            {/* <ListGroupItem tag="a" href="/add_closure" action >Add RequirementsDemo</ListGroupItem> */}
            {/* <ListGroupItem tag="a" href="/view_closure" action>View Requirements</ListGroupItem> */}
            <ListGroupItem tag="a" href="/view_closure1" action className={splitLocation[1] === "view_closure1" ? "list-group-item-success" : ""}>View Requirements</ListGroupItem>
        </ListGroup>
    )
};

export default EmpSidebar;