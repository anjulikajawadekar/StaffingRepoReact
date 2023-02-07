import React from 'react';
import axios from 'axios';
import base_url from '../api/bootapi';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import history from './ResponseVal';
import Header from './Header';
import EmpSidebar from './EmpSidebar';
import { useRef } from 'react';
import { getValue } from '@testing-library/user-event/dist/utils';

class AddClosure1 extends React.Component {

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
        inputs["sub"] = undefined;
        inputs["first"] = undefined;
        inputs["second"] = undefined;
        inputs["closure"] = undefined;

        this.setState({ input: inputs });

        let errors1 = {};
        errors1["req"] = "";
        errors1["sub"] = "";
        errors1["first"] = "";
        errors1["second"] = "";
        errors1["closure"] = "";
        this.setState({ errors: errors1 });
    }

    handleChange(e) {
        let add_cls = this.state.input;
        add_cls[e.target.name] = e.target.value;

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

        console.log("type of input " + typeof(input["req"]));

        console.log("Req " + input["req"]);
        console.log("Sub " + input["sub"]);
        console.log("First " + input["first"]);
        console.log("Second " + input["second"]);
        console.log("Closure " + input["closure"]);

        let reqNum = parseInt(input["req"] );
        let subNum = parseInt(input["sub"] );
        let fNum = parseInt(input["first"] );
        let sNum = parseInt(input["second"] );
        let clsNum = parseInt(input["closure"] );
        
        console.log("type of reqNum " + typeof(reqNum));


        if ((!reqNum)) {
            isValid = false;
            errors["req"] = "This field is required";
        }

        else if (reqNum < 1) {
            isValid = false;
            errors["req"] = "Atleast 1 requirement is needed";
        }
        else if (reqNum !== undefined) {

            var pattern = new RegExp(/^(?=.*[0-9]).{1,3}$/); //new RegExp(/^[A-Za-z#+.\b]+$/);
            if (!pattern.test(input["req"])) {
                isValid = false;
                errors["req"] = "Only 3 digit number is accepted!";
            }
        }
        // -----------------------------------------------------------------------------------------------------------------------
        if (!subNum) {
            isValid = false;
            errors["sub"] = "This field is required";
        }
        else if (subNum < 0) {
            isValid = false;
            errors["sub"] = "Enter positive number";
        }
        else if ((subNum !== undefined)) {

            var pattern = new RegExp(/^(?=.*[0-9]).{1,3}$/); //new RegExp(/^[A-Za-z#+.\b]+$/);
            if (!pattern.test(input["sub"])) {
                isValid = false;
                errors["sub"] = "Only 3 digit number is accepted!";
            }
        }
        // ----------------------------------------------------------------------------------------------------------------------
        if (!fNum) {
            isValid = false;
            errors["first"] = "This field is required";
        }
        else if (fNum < 0) {

            isValid = false;
            errors["first"] = "Enter positive number";
        }
        else if ((fNum !== undefined)) {

            var pattern = new RegExp(/^(?=.*[0-9]).{1,3}$/); //new RegExp(/^[A-Za-z#+.\b]+$/);
            if (!pattern.test(input["first"])) {
                isValid = false;
                errors["first"] = "Only 3 digit number is accepted!";
            }
        }

        if (fNum > subNum) {
            isValid = false;
            errors["first"] = "Enter valid number for first interview";
        }
        // ----------------------------------------------------------------------------------------------------------------------
        if (!sNum) {
            isValid = false;
            errors["second"] = "This field is required";
        }
        else if (sNum < 0) {
            isValid = false;
            errors["second"] = "Enter positive number";
        }
        else if ((sNum !== undefined)) {

            var pattern = new RegExp(/^(?=.*[0-9]).{1,3}$/); //new RegExp(/^[A-Za-z#+.\b]+$/);
            if (!pattern.test(input["second"])) {
                isValid = false;
                errors["second"] = "Only 3 digit number is accepted!";
            }
        }

        if (sNum > input["first"]) {
            isValid = false;
            errors["second"] = "Enter valid number for second interview";
        }
        // ----------------------------------------------------------------------------------------------------------------------
        if (!clsNum) {
            isValid = false;
            errors["closure"] = "This field is required";
        }

        else if (clsNum < 0) {
            isValid = false;
            errors["closure"] = "Enter positive number";
        }
        else if ((clsNum !== "undefined")) {

            var pattern = new RegExp(/^(?=.*[0-9]).{1,3}$/); //new RegExp(/^[A-Za-z#+.\b]+$/);
            if (!pattern.test(input["closure"])) {
                isValid = false;
                errors["closure"] = "Only 3 digit number is accepted!";
            }
        }
        if (clsNum > sNum) {
            isValid = false;
            errors["closure"] = "Enter valid number for closure";
        }
        // ---------------------------------------------------------------------------------------------------------------------

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
                            <div className="col-6" style={{ padding: '0px', marginLeft: '30px' }}>
                             <br />
                               
                                <form onSubmit={this.handleSubmit}>

                                    <div class="form-group">
                                        <label for="req"><b>Requirements worked on:</b></label>
                                        <input

                                            ref={(input) => { this.refInput = input; }}
                                            type="number"
                                            name="req"
                                            value={this.state.input.req}
                                            onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandlerReq}

                                            class="form-control"
                                            placeholder="Requirements"
                                            id="req" />

                                        <div className="text-danger">{this.state.errors.req}</div>
                                    </div>

                                    <div class="form-group">
                                        <label for="sub"><b>Submissions:</b></label>
                                        <input
                                            minLength={1}
                                            maxLength={3}
                                            type="number"
                                            name="sub"
                                            value={this.state.input.sub}

                                            onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandlerSub}
                                            placeholder="Submissions"

                                            class="form-control" />

                                        <div className="text-danger">{this.state.errors.sub}</div>
                                    </div>

                                    <div class="form-group">
                                        <label for="first"><b>First Interview:</b></label>
                                        <input
                                            minLength={1}
                                            maxLength={3}
                                            type="number"
                                            name="first"
                                            value={this.state.input.first}
                                            onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandlerFirst}
                                            placeholder="First Interview"

                                            class="form-control" />

                                        <div className="text-danger">{this.state.errors.first}</div>
                                    </div>
                                    <div class="form-group">
                                        <label for="second"><b>Second Interview:</b></label>
                                        <input
                                            minLength={1}
                                            maxLength={3}
                                            type="number"
                                            name="second"
                                            value={this.state.input.second}
                                            onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandlerSecond}
                                            placeholder="Second Interview"

                                            class="form-control" />

                                        <div className="text-danger">{this.state.errors.second}</div>
                                    </div>
                                    <div class="form-group">
                                        <label for="closure"><b>Closure:</b></label>
                                        <input
                                            minLength={1}
                                            maxLength={3}
                                            type="number"
                                            name="closure"
                                            value={this.state.input.closure}
                                            onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandlerClosure}
                                            placeholder="Closure"

                                            class="form-control" />

                                        <div className="text-danger">{this.state.errors.closure}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className='row'>
                                            <div className='col-2'></div>
                                            <div className='col-4'>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-100 theme-btn mx-auto"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                            <div className='col-4'>
                                                <button
                                                    type="reset"
                                                    className="btn btn-warning w-100 theme-btn mx-auto"
                                                    onClick={this.resetForm}
                                                >
                                                    Reset
                                                </button>

                                            </div>
                                            <div className='col-2'></div>
                                        </div>

                                    </div>
                                </form>

                            </div>
                            <div className="col-3"></div>
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

export default AddClosure1;