import { React, useState, useEffect } from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import Header from "../ViewComponent1/Header";
import EmpSidebar from "../ViewComponent1/EmpSidebar";
import { Table } from "reactstrap";

function ReqView() {

    const [closureList, setClosureList] = useState([]);

    const [reqFrom, setReqFrom] = useState(null);
    const [id, setId] = useState(null);
    const [client, setClient] = useState(null);
    const [jobTitle, setJobTitle] = useState(null);
    const [duration, setDuration] = useState(null);
    const [clientRate, setClientRate] = useState(null);
    const [location, setLocation] = useState(null);
    const [skills, setSkills] = useState(null);

    const [inEditMode, setInEditMode,] = useState({
        status: true,
        rowKey: null
    });

    useEffect(() => {
        axios.get(`${base_url}/getAllRequisition`).then(json => setClosureList(json.data))
        // axios.get(`${base_url}/getEmpList_TM`).then(json => setEmployee(json.data))
    }, []);

    const deleteBook = (id) => { }

    const updateInventory = ({ newReqid, newReqFrom, newId, newClient, newJobTitle, newDuration,
        newClientRate, newLocation, newSkills }) => {
        alert("update val successfully")
    }

    const onSave = ({ newReqid, newReqFrom, newId, newClient, newJobTitle, newDuration,
        newClientRate, newLocation, newSkills }) => {

        // console.log("clsid,"+clsid+" newReq,"+newReq+ "newSub,"+newSub+" newFirst,"+newFirst+" newSecond,"+newSecond+" newClosure,"+newClosure+" y "+y);
        updateInventory({
            newReqid, newReqFrom, newId, newClient, newJobTitle, newDuration,
            newClientRate, newLocation, newSkills
        });
    }

    // ----------------------------------------------------------------------------------------------------------
    const onEdit = ({ crrReqid, crrReqFrom, crrId, crrClient, crrJobTitle, crrDuration,
        crrClientRate, crrLocation, crrSkills}) => {
        setInEditMode({
            status: true,
            rowKey: crrReqid,
        })
        setReqFrom(crrReqFrom);
        setId(crrId);
        setClient(crrClient);
        setJobTitle(crrJobTitle);
        setDuration(crrDuration);
        setClientRate(crrClientRate);
        setLocation(crrLocation);
        setSkills(crrSkills);
        // console.log("currentdate" + currentdate);
    }

    const onCancel = () => {
        setInEditMode({
            status: false,
            rowKey: null
        })
    }

    const fetchInventory = () => {
        axios.get(`${base_url}/CurMonthAll`).then(json => setClosureList(json.data))

    }

    const renderTable = () => {
        return closureList.map(cls => {

            return (

                <tr key={cls.requisition_id}>
                    <td></td>
                    <td style={{ width: '50px' }}>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition_id ? (
                                <input required value={reqFrom}
                                    onChange={(event) => setReqFrom(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.requisition_from
                            )
                        }
                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition_id ? (
                                <input required value={id}
                                    onChange={(event) => setId(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.id
                            )
                        }

                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition_id ? (
                                <input required value={client}
                                    onChange={(event) => setClient(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.client
                            )
                        }
                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition_id ? (
                                <input required value={jobTitle}
                                    onChange={(event) => setJobTitle(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.job_title
                            )
                        }
                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition_id ? (
                                <input required value={duration}
                                    onChange={(event) => setDuration(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.duration
                            )
                        }
                    </td>
                    <td>{cls.client_rate}</td>
                    <td>{cls.location}</td>
                    <td>{cls.skills}</td>

                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition_id ? (
                                <>
                                    <button

                                        className={"btn btn-outline-success"}
                                        onClick={() => {

                                            onSave(
                                                {
                                                    newReqid: cls.requirement_id, newReqFrom: reqFrom, newId: id,
                                                    newClient: client, newJobTitle: jobTitle, newDuration: duration,
                                                    newClientRate: clientRate, newLocation: location, newSkills: skills
                                                })
                                        }
                                        }
                                    >
                                        <i class="fa fa-save"></i>

                                    </button>

                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button
                                        className={"btn btn-outline-warning"}

                                    onClick={() => onCancel()}
                                    >
                                        <i class="fa fa-close"></i>
                                    </button>
                                </>

                            ) : (
                                <>
                                    <button
                                        className="btn btn-outline-success"

                                        onClick={() => onEdit({
                                            // clsid: cls.closureid, currentreq: cls.requirement, currentsub: cls.submission,
                                            // currentfirst: cls.first, currentsecond: cls.second, currentclosure: cls.closure,

                                            crrReqid: cls.requirement_id, crrReqFrom: reqFrom, crrId: id,
                                            crrClient: client, crrJobTitle: jobTitle, crrDuration: duration,
                                            crrClientRate: clientRate, crrLocation: location, crrSkills: skills
                                        })}
                                    >
                                        <i class="fa fa-edit"></i>

                                    </button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-outline-danger"
                                        onClick={() => { if (window.confirm('Are you sure to delete this requirement?')) deleteBook(cls.closureid) }}>
                                        {/*Delete*/}<i class="fa fa-trash"></i></button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </>

                            )
                        }

                    </td>
                </tr >

            );
        })
    }

    return (
        // return (
        <div className="container-fluid">

            <div className="row">
                
            </div>
            <div className="row">

                <div className="col-12 h-100 master_backgroung_heder">
                    <Header />
                </div>
                {/* <div className="col-2 master_backgroung_side">
                    <EmpSidebar />
                </div> */}
                <div className="col-12 scroll-bar">
                    <Table bordered className="css-serial">

                        <thead>
                            <tr>
                                <th style={{ width: '100px' }}>Sr No.</th>
                                <th style={{ width: '270px' }}>Requisition From</th>
                                <th style={{ width: '100px' }}>ID</th>
                                <th style={{ width: '160px' }}>Client</th>
                                <th style={{ width: '160px' }}>Job Title</th>
                                <th style={{ width: '160px' }}>Duration</th>
                                <th style={{ width: '240px' }}>Client Rate</th>
                                <th style={{ width: '160px' }}>Location</th>
                                <th style={{ width: '160px' }}>Skills</th>
                                <th style={{ width: '240px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTable()}

                        </tbody>
                    </Table>
                </div>
            </div>


            <div className="row scroll-bar-horizontal" style={{backgroundColor: 'cyan', width: '1560px'}}>ggggggggggg  hhhhhhhhhhhhhhh   jjjjjjjjjjjjjjjjjj  kkkkkkkkkkkkkkkk  nnnnnnnnnn
            
            <div className="col-12 ">
                    <Table bordered className="css-serial">

                        <thead>
                            <tr>
                                <th style={{ width: '100px' }}>Sr No.</th>
                                <th style={{ width: '270px' }}>Requisition From</th>
                                <th style={{ width: '100px' }}>ID</th>
                                <th style={{ width: '160px' }}>Client</th>
                                <th style={{ width: '160px' }}>Job Title</th>
                                <th style={{ width: '160px' }}>Duration</th>
                                <th style={{ width: '240px' }}>Client Rate</th>
                                <th style={{ width: '160px' }}>Location</th>
                                <th style={{ width: '160px' }}>Skills</th>
                                <th style={{ width: '240px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {renderTable()} */}

                        </tbody>
                    </Table>
                </div>
            
            </div>
        </div>
        //)
    );
}
export default ReqView;