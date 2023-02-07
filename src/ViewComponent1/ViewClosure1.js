import { React, useState, useEffect } from "react";
import base_url from "../api/bootapi";
import Header from "./Header";
import EmpSidebar from "./EmpSidebar";
import { Table } from "reactstrap";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns'
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import history from "./ResponseVal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import ExportToExcel from "../ExtraComponent/PdfDemo1";
import GeneratePDF from "./GeneratePDF";
import GeneratePDF1 from "./GeneratePDF1";
import ExportToExcel2 from "../ExtraComponent/ExportToExcel2";
import Excel2 from "./Excel2";

function ViewClosure1() {

    let empID = localStorage.getItem('empID');
    const [closureList, setClosureList] = useState([]);

    const [employee, setEmployee] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isShownError, setIsShownError] = useState(false);
    const [isDownload, setIsDownload] = useState(true);

    const [inEditMode, setInEditMode,] = useState({
        status: true,
        rowKey: null
    });

    const [req, setReq] = useState(null);
    const [sub, setSub] = useState(null);
    const [first, setFirst] = useState(null);
    const [second, setSecond] = useState(null);
    const [closure, setClosure] = useState(null);
    const [category, setCategory] = useState();
    const [isShown, setIsShown] = useState(false);
    const [isSelected, setIsSelected] = useState("Download");

    localStorage.setItem("cate", category);
    let date1 = format(startDate, "dd-MMM-yyyy");
    let date2 = format(endDate, "dd-MMM-yyyy");
    localStorage.setItem("startdate", date1);
    localStorage.setItem("enddate", date2);

    useEffect(() => {
        // axios.get(`${base_url}/getRecordsOfCurMonth?empid=${empID}`).then(json => setClosureList(json.data))
        axios.get(`${base_url}/getRecordsOfCurMonth?empid=${empID}`)
            .then(
                json => setClosureList(json.data),
                setIsDownload(true),
            )
            .catch(error => {
                setIsShownError(true);
                setClosureList([]);
                setIsDownload(false);

            })

        // console.log("Employee list : " + JSON.stringify(closureList))
    }, []);


    const fetchInventory = () => {
        // axios.get(`${base_url}/get_cls_id?empid=${empID}`).then(json => setClosureList(json.data))
        axios.get(`${base_url}/getRecordsOfCurMonth?empid=${empID}`).then(json => setClosureList(json.data))
    }
    // fetchInventory();

    const onEdit = ({ clsid, currentreq, currentsub, currentfirst, currentsecond, currentclosure, style = { width: "5px" } }) => {
        setInEditMode({
            status: true,
            rowKey: clsid,
        })
        setReq(currentreq);
        setSub(currentsub);
        setFirst(currentfirst);
        setSecond(currentsecond);
        setClosure(currentclosure);
    }

    const updateInventory = ({ clsid, newReq, newSub, newFirst, newSecond, newClosure }) => {
        let req = parseInt(newReq );
        let sub = parseInt(newSub);
        let first = parseInt(newFirst );
        let second = parseInt(newSecond );
        let closure = parseInt(newClosure );

        if ((sub < 0) || (first < 0) || (second < 0) || (closure < 0)) {
            alert("Please enter positive numbers")
        }
        else if (newSub < newFirst) {
            alert("Please enter valid number for first interview")
        }
        else if (newFirst < newSecond) {
            alert("Please enter valid number for second interview")
        }
        else if (newSecond < newClosure) {
            alert("Please enter valid number for closure")
        }
        else if (newReq > 999) {
            alert("Please enter 3 digit number")
        }
        else if (newSub > 999) {
            alert("Please enter 3 digit number")
        }
        else if (newReq < 1) {
            alert("Atleast one requirement is needed")
        }
        else {
            axios.put(`${base_url}/update_record?clsid=${clsid}&req=${newReq}&sub=${newSub}&first=${newFirst}&second=${newSecond}&closure=${newClosure}`, {

            })
                .then(response => {
                    onCancel();

                    toast.success("Record updated successfully!", {
                        position: "top-right",
                        autoClose: 1000,
                        style: { position: "absolute", top: "5px", width: "300px" }
                    });
                    // fetch the updated data fetchInventory();
                    setIsShownError(false);

                    let cate = category
                    // setCategory(cate)

                    let date1 = format(startDate, "yyyy-MM-dd");
                    let date2 = format(endDate, "yyyy-MM-dd");

                    if (cate == 'Customize') {
                        setIsShown(true);
                        postGetDataBetDates(empID, date1, date2);
                    }
                    else if (cate == undefined) {
                        // postGetDataByCate(empID, cate);
                        fetchInventory();
                        setIsShown(false);
                    } else {
                        postGetDataByCate(empID, cate);
                        setIsShown(false);
                    }
                    // ---------------------------------------------------------------------------------------------------    
                },
                    (error) => {
                        alert("Enter valid number for all requirements");
                    }
                )
        }
    }

    const handleDownload = (evt) => {

        let d_cate = evt.DownloadOpt;

        if (d_cate == "ExportToCSV") {
            Excel2(closureList);
            // setIsDownload(false);

        } else {
            GeneratePDF1(closureList);
        }
        <option hidden value=""><button>Download</button></option>
    }

    const onSave = ({ clsid, newReq, newSub, newFirst, newSecond, newClosure }) => {
        console.log("sss");
        console.log("clsid," + clsid + " newReq," + newReq + "newSub," + newSub + " newFirst," + newFirst + " newSecond," + newSecond + " newClosure," + newClosure);

        updateInventory({ clsid, newReq, newSub, newFirst, newSecond, newClosure });
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
    }

    //Delete Book on the web page
    const deleteBook = (id) => {
        axios.delete(`${base_url}/delete_clsByID?closureid=${id}`).then(
            (response) => {

                toast.success("Record Deleted", {
                    position: "top-right",
                    autoClose: 1000,
                    style: { position: "absolute", top: "5px", width: "300px" }
                });
                // fetchInventory();//-------------------------------------------------------------------------------

                setIsShownError(false);
                let cate = category;

                let date1 = format(startDate, "yyyy-MM-dd");
                let date2 = format(endDate, "yyyy-MM-dd");

               /* if (cate == 'Customize') {
                    setIsShown(true);
                    postGetDataBetDates(empID, date1, date2);
                }
                else {
                    postGetDataByCate(empID, cate);
                    setIsShown(false);
                }*/

                if (cate == 'Customize') {
                    setIsShown(true);
                    postGetDataBetDates(empID, date1, date2);
                }
                else if (cate == undefined) {
                    // postGetDataByCate(empID, cate);
                    fetchInventory();
                    setIsShown(false);
                } else {
                    postGetDataByCate(empID, cate);
                    setIsShown(false);
                }
                // ---------------------------------------------------------------------------------------------------
            },
            (error) => {
                alert("Operation Failed Here");
            }
        )
    }

    const handleCate = (evt) => {
        setIsShownError(false);

        let cate = evt.newCate;
        setCategory(cate);

        let date1 = format(startDate, "yyyy-MM-dd");
        let date2 = format(endDate, "yyyy-MM-dd");

        if (cate == 'Customize') {
            setIsShown(true);
            postGetDataBetDates(empID, date1, date2);
        }
        else {
            postGetDataByCate(empID, cate);
            setIsShown(false);
        }
    };

    const postGetDataByCate = (d1, d2) => {
        // axios.get(`${base_url}/get_cls_by_Quarterly?empid=${d1}&category=${d2}`).then(json => setClosureList(json.data))
        // localhost:8082/get_cls_by_Quarterly?empid=3&category=Quarterly
        axios.get(`${base_url}/get_cls_by_Quarterly?empid=${d1}&category=${d2}`)
            .then(
                json => setClosureList(json.data),
                setIsDownload(true),
            )
            .catch(error => {
                setIsShownError(true);
                setClosureList([]);
                setIsDownload(false);
            })
        console.log(JSON.stringify(closureList));
    }
    // ---------------------------------------------End Get data by category-------------------------------------------

    // --------------------------------------------Get data between dates----------------------------------------------
    const handleDateChange1 = (date) => {
        setIsShownError(false);
        const d1 = date.date1;
        let d2 = endDate;

        let f1 = format(d1, 'yyyy-MM-dd');
        let f2 = format(d2, 'yyyy-MM-dd');

        if (f2 >= f1) {
            setStartDate(d1);
            postGetDataBetDates(empID, f1, f2);
        } else {
            alert("Enter valid date");
        }
    }

    const handleDateChange2 = (date) => {
        setIsShownError(false);
        const d2 = date.date2;
        let f = empID;
        let f1 = format(startDate, 'yyyy-MM-dd');
        let f2 = format(d2, 'yyyy-MM-dd');

        if (f2 >= f1) {
            setEndDate(d2);
            postGetDataBetDates(empID, f1, f2);
        } else {
            alert("Enter valid date");
        }
    }

    const postGetDataBetDates = (f, f1, f2) => {
        // axios.get(`${base_url}/get_cls_byDate?empid=${f}&date1=${f1}&date2=${f2}`).then(json => setClosureList(json.data))
        axios.get(`${base_url}/get_cls_byDate?empid=${f}&date1=${f1}&date2=${f2}`)
            .then(
                json => setClosureList(json.data),
                setIsDownload(true),
            )
            .catch(error => {
                setIsShownError(true);
                setClosureList([]);
                setIsDownload(false);
            })
        console.log(JSON.stringify(closureList));
    }
    // --------------------------------------------End data between dates----------------------------------------------

    // ---------------------------------------------Function to show-hide calender-------------------------------------
    function Box() {
        return (
            <div className="d-inline-flex w-50" >
                <span style={{ width: "270px" }}> Start Date:</span>
                <DatePicker dateFormat="dd-MMM-yyyy" maxDate={new Date()} style={{ width: '100' }} className="btn btn-sm btn-primary" selected={startDate} onChange={(date) => handleDateChange1({ date1: date })} />

                <span style={{ width: "270px" }}> End Date:</span>
                <DatePicker dateFormat="dd-MMM-yyyy" maxDate={new Date()} selected={endDate} className="btn btn-sm btn-primary" onChange={(date) => handleDateChange2({ date2: date })} />
            </div>
        );
    }
    // ---------------------------------------------Render table code--------------------------------------------------  

    // ---------------------------------------------Function to show-hide calender-------------------------------------
    function Download() {

        return (
            <div className="d-inline-flex w-50" >
                <select name="category" onChange={(evt) => handleDownload({ DownloadOpt: evt.target.value })} className="btn btn-warning btn-sm dropdown-toggle" style={{ width: '135px' }}>
                    <option hidden value=""><button>Download <i className="fa fa-download"></i></button></option>
                    <option value="ExportToPDF">Export to pdf</option>
                    <option value="ExportToCSV">Export to csv</option>
                </select>
            </div>
        );
    }
    // ---------------------------------------------Render table code--------------------------------------------------  



    // ---------------------------Empty Data Error Msg-----------------------------------------------------------
    function EmptyDataErrorMsg() {
        // console.log("Empty list");
        return (
            <div className="d-inline-flex w-50" >
                <h5> No data found</h5>
            </div>
        );
    }
    // ----------------------------------------------------------------------------------------------------------

    const renderTable = () => {
        return closureList.map(cls => {

            return (

                <tr key={cls.closureid}>
                    <td></td>

                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.closureid ? (
                                <input required value={req}
                                    onChange={(event) => setReq(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.requirement
                            )
                        }
                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.closureid ? (
                                <input required value={sub}
                                    onChange={(event) => setSub(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.submission
                            )
                        }

                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.closureid ? (
                                <input required value={first}
                                    onChange={(event) => setFirst(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.first
                            )
                        }
                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.closureid ? (
                                <input required value={second}
                                    onChange={(event) => setSecond(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.second
                            )
                        }
                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.closureid ? (
                                <input required value={closure}
                                    onChange={(event) => setClosure(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.closure
                            )
                        }
                    </td>
                    <td>{cls.clo_date}</td>

                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.closureid ? (
                                <>
                                    <button

                                        className={"btn btn-outline-success"}
                                        onClick={() => {

                                            onSave(
                                                {
                                                    clsid: cls.closureid, newReq: req, newSub: sub,
                                                    newFirst: first, newSecond: second, newClosure: closure
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
                                            clsid: cls.closureid, currentreq: cls.requirement, currentsub: cls.submission,
                                            currentfirst: cls.first, currentsecond: cls.second, currentclosure: cls.closure,
                                        })}
                                    >
                                        <i class="fa fa-edit"></i>

                                    </button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-outline-danger"
                                        onClick={() => { if (window.confirm('Are you sure to delete this requirement?')) deleteBook(cls.closureid) }}>{/*Delete*/}<i class="fa fa-trash"></i></button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </>

                            )
                        }

                    </td>
                </tr >
            )

        })
    }
    // ---------------------------------------------End Render table code ----------------------------------------------
    const isAuthenticated = localStorage.getItem('empID');

    return isAuthenticated ? (
        // return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-12 h-100 master_backgroung_heder">
                    <Header />
                </div>
                <div className="col-2 master_backgroung_side">
                    <EmpSidebar />
                </div>
                <div className="col-10 scroll-bar">
                    <div className="row" style={{ marginBottom: '10px', marginTop: '10px' }}>
                        <div className="col-2">
                            {/* <div className="name mb-3" style={{ marginTop: 10, marginBottom: 10 }}> */}
                            <select name="category1" onChange={(evt) => handleCate({ newCate: evt.target.value })} className="btn btn-success btn-sm dropdown-toggle" style={{ width: '150px' }}>
                                {
                                    <>
                                        <option hidden value="">Select Category</option>
                                        <option value="allcat">All Category</option>
                                        <option value="Last_Month">Last-month</option>
                                        <option value="Quarterly">Quarterly</option>
                                        <option value="Half-yearly">Half-yearly</option>
                                        <option value="Yearly">Yearly</option>
                                        <option value="Customize">Customize</option>
                                    </>
                                }
                            </select>
                        </div>

                        {/* call Calender to select date */}
                        {isShown && <Box />}
                    </div>

                    <Table bordered className="css-serial">
                        {/* <table id="issues" bordered className="css-serial"> */}
                        {/* //Your Table in post changed to table to make it work */}
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Requirement</th>
                                <th>Submission</th>
                                <th>1st Interview</th>
                                <th>2nd Interview</th>
                                <th>Closure</th>
                                <th>Date</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {renderTable()}

                        </tbody>

                    </Table>
                    <div className="row">
                        <div className="col-10">
                            {isShownError && <EmptyDataErrorMsg />}
                        </div>
                        <div className="col-2">
                            {isDownload && <Download />}
                        </div>
                    </div>
                </div>

            </div>
        </div>

        //)
    ) : (
        history.push("/"),
        window.location.reload()
    );
}

export default ViewClosure1;