import React from 'react';
import axios from 'axios';
import base_url from '../api/bootapi';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import history from './ResponseVal';
// import Header from './Header';
import Header from '../ViewComponent1/Header';
// import EmpSidebar from './EmpSidebar';
import EmpSidebar from '../ViewComponent1/EmpSidebar';
import { useRef } from 'react';
import { getValue } from '@testing-library/user-event/dist/utils';

class AddRequisition extends React.Component {

    componentDidMount() {
        this.refInput.focus();
    }

    constructor(props) {
        super(props);

        this.state = {
            input: {},
            errors: {},
            empID: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    resetForm = () => {
        // alert("Clear");
        // this.setState(this.baseState)
        let inputs = {};
        inputs["req"] = undefined;
        inputs["id"] = undefined;
        inputs["client"] = undefined;
        inputs["jobTitle"] = undefined;
        inputs["duration"] = undefined;
        inputs["clientrate"] = undefined;
        inputs["location"] = undefined;
        inputs["positionType"] = undefined;
        inputs["skills"] = undefined;

        // inputs["sub"] = undefined;
        // inputs["first"] = undefined;
        // inputs["second"] = undefined;
        // inputs["closure"] = undefined;

        this.setState({ input: inputs });

        let errors1 = {};
        errors1["req"] = "";
        errors1["id"] = "";
        errors1["client"] = "";
        errors1["jobTitle"] = "";
        errors1["duration"] = "";
        errors1["clientrate"] = "";
        errors1["location"] = "";
        errors1["positionType"] = "";
        errors1["skills"] = "";
        this.setState({ errors: errors1 });
    }

    handleChange(e) {
        let add_cls = this.state.input;
        add_cls[e.target.name] = e.target.value;
        console.log(add_cls);

        this.setState({
            add_cls
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.validate()) {

            let add_cls = this.state.input;
            add_cls[e.target.name] = e.target.value;

            this.postdata(add_cls);
        }
        // 👇️ clear all input values in the form
        e.target.reset();
    }

    postdata = (data) => {
        let z = this.state.empID = localStorage.getItem("empID")
        let d1 = data["req"];
        let d2 = data["sub"];
        let d3 = data["first"];
        let d4 = data["second"];
        let d5 = data["closure"];

        axios.post(`${base_url}/add_cls?req=${d1}&sub=${d2}&first=${d3}&second=${d4}&closure=${d5}&empid=${z}`).then(

            (response) => {
                toast.success("Requirement added successfully!",
                    { position: "top-right" }
                );
            },
            (error) => {
                console.log(error);
                console.log("Error");
                alert("Please enter valid details.")
            }
        );

        let inputs = {};
        inputs["req"] = undefined;
        inputs["sub"] = undefined;
        inputs["first"] = undefined;
        inputs["second"] = undefined;
        inputs["closure"] = undefined;

        this.setState({ input: inputs });
    }
    // --------------------------------------------Validation Code ----------------------------------------------------------

    validate() {

        let input = this.state.input;
        let errors = {};
        let isValid = true;
        let addNew1 = true;
        let addNew2 = true;

        console.log("type of input " + typeof (input["req"]));

        console.log("req " + input["req"]);
        console.log("id " + input["id"]);
        console.log("client " + input["client"]);
        console.log("jobTitle " + input["jobTitle"]);
        console.log("duration " + input["duration"]);
        console.log("clientrate " + input["sub"]);
        console.log("location " + input["first"]);
        console.log("positionType " + input["second"]);
        console.log("skills " + input["closure"]);

        let reqNum = parseInt(input["req"]);
        let subNum = parseInt(input["sub"]);
        let fNum = parseInt(input["first"]);
        let sNum = parseInt(input["second"]);
        let clsNum = parseInt(input["closure"]);

        console.log("type of reqNum " + typeof (reqNum));

        if ((!input["req"])) {
            isValid = false;
            errors["req"] = "This req field is required";
        }
        if ((input["req"]) != undefined) {

            var pattern = new RegExp(/^[^\s][a-zA-Z\s]+[^\s]$/);
            if (!pattern.test(input["req"])) {
                isValid = false;
                errors["req"] = "Please enter only characters.";
            }

        }
        // -------------id---------------------------------------------------------------------------------------------
        if ((!input["id"])) {
            isValid = false;
            errors["id"] = "This id field is required";
        }
        let id1 = parseInt(input["id"]);
        console.log(id1);
        console.log("typeOf id1: " + typeof (id1));
        if ((input["id"]) != undefined) {


            var pattern = new RegExp(/^(?=.*[0-9]).{1,10}$/); //new RegExp(/^[A-Za-z#+.\b]+$/);
            if (!pattern.test(id1)) {
                isValid = false;
                errors["id"] = "Only 10 digit number is accepted!";
            }
            if (id1 < 0) {
                isValid = false;
                errors["id"] = "Only +ve digit number is accepted!";
            }
        }

        // -------------client-----------------------------------------------------------------------------------------
        if ((!input["client"])) {
            isValid = false;
            errors["client"] = "This client field is required";
        }
        if ((input["client"]) != undefined) {

            var pattern = new RegExp(/^[^\s][a-zA-Z\s]+[^\s]+[@#$%^&*,!? \b]$/);
            if (!pattern.test(input["client"])) {
                isValid = false;
                errors["client"] = "Please enter only characters.";
            }
        }
        // -------------jobTitle-----------------------------------------------------------------------------------------
        if ((!input["jobTitle"])) {
            isValid = false;
            errors["jobTitle"] = "This jobTitle field is required";
        }
        if ((input["jobTitle"]) != undefined) {

            var pattern = new RegExp(/^[^\s][a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+[^\s]{2,50}$/);
            // new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&*,!? \b]).{6,15}$/); 

            if (!pattern.test(input["jobTitle"])) {
                isValid = false;
                errors["jobTitle"] = "Please enter only characters.";
            }
        }
        // -------------duration-----------------------------------------------------------------------------------------
        if ((!input["duration"])) {
            isValid = false;
            errors["duration"] = "This duration field is required";
        }
        // -------------clientrate-----------------------------------------------------------------------------------------
        if ((!input["clientrate"])) {
            isValid = false;
            errors["clientrate"] = "This clientrate field is required";
        }
        // -------------location-----------------------------------------------------------------------------------------
        if ((!input["location"])) {
            isValid = false;
            errors["location"] = "This location field is required";
        }
        if ((input["location"]) != undefined) {

            var pattern = new RegExp(/^[^\s][a-zA-Z0-9 &*()_;':",./\s]+[^\s]{2,50}$/);

            if (!pattern.test(input["location"])) {
                isValid = false;
                errors["location"] = "Please enter valid location name.";
            }
        }
        // -------------positionType-----------------------------------------------------------------------------------------
        if ((!input["positionType"])) {
            isValid = false;
            errors["positionType"] = "This positionType field is required";
        }
        // -------------skills-----------------------------------------------------------------------------------------
        if ((!input["skills"])) {
            isValid = false;
            errors["skills"] = "This skills field is required";
        }
        if ((input["skills"]) != undefined) {

            var pattern = new RegExp(/^[^\s][a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+[^\s]{2,50}$/);
            // new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&*,!? \b]).{6,15}$/); 

            if (!pattern.test(input["skills"])) {
                isValid = false;
                errors["skills"] = "Please enter valid skills.";
            }
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }
    // -------------------------------------------- End Validation Code ----------------------------------------------------------

    render() {
        const isAuthenticated = localStorage.getItem('empID');
        let empID = localStorage.getItem('empID');

        return isAuthenticated ? (
            <div className="container-fluid">
                <div className="row">

                    <div className="col-12 h-100 master_backgroung_heder">
                        <Header />
                    </div>
                    <div className="col-2 master_backgroung_side side">
                        <EmpSidebar />
                    </div>

                    <div className="col-10 master_backgroung_work scroll-bar">

                        <div className="row">
                            <form onSubmit={this.handleSubmit}>

                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-12">
                                            <div class="form-group" style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '20px' }}>
                                                {/* req field is here */}
                                            </div>

                                        </div>


                                        <div className="col-6" style={{ paddingLeft: '35px', paddingRight: '20px' }}>

                                            <label for="req"><b>Requisition From:</b></label><br />

                                            <select class="btn btn-secondary dropdown-toggle form-group"
                                                ref={(input) => { this.refInput = input; }}
                                                style={{ width: '475px' }} name="req" id="req"
                                                onChange={this.handleChange}
                                                onKeyUp={this.keyUpHandlerReq}
                                                value={this.state.input.req}>
                                                <option value='' default selected> Select Requisition </option>

                                                <option value="volvo">Volvo</option>
                                                <option value="saab">Saab</option>
                                                <option value="mercedes">Mercedes</option>
                                                <option value="audi">Audi</option>
                                            </select>

                                            <div className="text-danger">{this.state.errors.req}</div>

                                            <div class="form-group">
                                                <label for="id"><b>ID:</b></label>
                                                <input
                                                    minLength={1}
                                                    maxLength={10}
                                                    type="number"
                                                    name="id"
                                                    value={this.state.input.id}

                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerSub}
                                                    placeholder="ID"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.id}</div>
                                            </div>

                                            <div class="form-group">
                                                <label for="client"><b>Client:</b></label>
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '475px' }}
                                                    name="client" id="client"
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerReq}
                                                    value={this.state.input.client}>

                                                    <option value='' default selected> Select Requisition </option>
                                                    <option value="volvo">Client1</option>
                                                    <option value="saab">client2</option>
                                                    <option value="mercedes">Client3</option>
                                                    <option value="audi">client4</option>
                                                </select>

                                                <div className="text-danger">{this.state.errors.client}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="jobTitle"><b>Job title:</b></label>
                                                <input
                                                    minLength={1}
                                                    maxLength={50}
                                                    type="text"
                                                    name="jobTitle"
                                                    value={this.state.input.jobTitle}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerSecond}
                                                    placeholder="Job title"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.jobTitle}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="duration"><b>Duration:</b></label>
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '475px' }}
                                                    name="duration" id="duration"
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerReq}
                                                    value={this.state.input.duration}>

                                                    <option value='' default selected> Select Requisition </option>
                                                    <option value="volvo">1 month</option>
                                                    <option value="saab">2 month</option>
                                                    <option value="mercedes">3 month</option>
                                                    <option value="audi">6 month</option>
                                                </select>
                                                <div className="text-danger">{this.state.errors.duration}</div>
                                            </div>

                                        </div>
                                        <div className="col-6" style={{ paddingLeft: '35px', paddingRight: '30px' }}>
                                            <div class="form-group">
                                                <label for="clientrate"><b>Client rate:</b></label>
                                                <input
                                                    minLength={2}
                                                    maxLength={10}
                                                    type="text"
                                                    name="clientrate"
                                                    value={this.state.input.clientrate}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerClosure}
                                                    placeholder="Client rate"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.clientrate}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="location"><b>Location:</b></label>
                                                <input
                                                    minLength={2}
                                                    maxLength={50}
                                                    type="text"
                                                    name="location"
                                                    value={this.state.input.location}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerClosure}
                                                    placeholder="Location"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.location}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="positionType"><b>Position type:</b></label>
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '466px' }}
                                                    name="positionType" id="positionType"
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerReq}
                                                    value={this.state.input.positionType}>

                                                    <option value='' default selected> Select Requisition </option>
                                                    <option value="On-site">On-site</option>
                                                    <option value="Remote">Remote</option>
                                                    <option value="Hybrid">Hybrid</option>
                                                    <option value="audi">Remote until Pandamic</option>
                                                </select>

                                                <div className="text-danger">{this.state.errors.positionType}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="closure"><b>Skills:</b></label>
                                                <textarea
                                                    minLength={1}
                                                    maxLength={200}
                                                    type="text"
                                                    name="skills"
                                                    value={this.state.input.skills}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerClosure}
                                                    placeholder="Skills"

                                                    class="form-control"
                                                    style={{height: '130px'}} />

                                                <div className="text-danger">{this.state.errors.skills}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-11" style={{ padding: '0px', marginLeft: '0px' }}>
                                    <br />

                                    <div className="text-center">
                                        <div className='row'>
                                            <div className='col-4'></div>
                                            <div className='col-2'>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-100 theme-btn mx-auto"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                            <div className='col-2'>
                                                <button
                                                    type="reset"
                                                    className="btn btn-warning w-100 theme-btn mx-auto"
                                                    onClick={this.resetForm}
                                                >
                                                    Reset
                                                </button>

                                            </div>
                                            <div className='col-4'></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3"></div>
                            </form>
                        </div>

                    </div>

                </div >
            </div >
        ) : (
            history.push("/"),
            window.location.reload()
        );
    }
}

export default AddRequisition;