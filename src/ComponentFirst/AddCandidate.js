import React from 'react';
import axios from 'axios';
import base_url from '../api/bootapi';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import history from './ResponseVal';
import Header from '../ViewComponent1/Header';
import EmpSidebar from '../ViewComponent1/EmpSidebar';
import { useRef } from 'react';
import { getValue } from '@testing-library/user-event/dist/utils';
import NavBarHeader from './NavbarHeader';

class AddCandidate extends React.Component {

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
        inputs["cad_name"] = undefined;
        inputs["visa_type"] = undefined;
        inputs["rate_term"] = undefined;
        inputs["submitted_rate"] = undefined;
        inputs["phone"] = undefined;
        inputs["email"] = undefined;
        inputs["remark"] = undefined;
        inputs["reason"] = undefined;

        this.setState({ input: inputs });

        let errors1 = {};
        errors1["cad_name"] = "";
        errors1["visa_type"] = "";
        errors1["rate_term"] = "";
        errors1["submitted_rate"] = "";
        errors1["phone"] = "";
        errors1["email"] = "";
        errors1["location"] = "";
        errors1["remark"] = "";
        errors1["reason"] = "";
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

        console.log("type of input " + typeof (input["cad_name"]));

        console.log("cad_name " + input["cad_name"]);
        console.log("visa_type " + input["visa_type"]);
        console.log("rate_term " + input["rate_term"]);
        console.log("submitted_rate " + input["submitted_rate"]);
        console.log("phone " + input["phone"]);
        console.log("email " + input["email"]);
        console.log("remark " + input["remark"]);
        console.log("reason " + input["reason"]);

        console.log("type of reqNum " + typeof (reqNum));

        if ((!input["cad_name"])) {
            isValid = false;
            errors["cad_name"] = "This cad_name field is required";
        }
        if ((input["cad_name"]) != undefined) {

            var pattern = new RegExp(/^[^\s][a-zA-Z\s]{3,50}$/);
            // RegExp(/^[a-zA-Z]{2,10}$/);
            // (/^[^\s][a-zA-Z\s]+[^\s].{2,5}$/);
            if (!pattern.test(input["cad_name"])) {
                isValid = false;
                errors["cad_name"] = "Please enter only characters.";
            }

        }
        // -------------visa_type---------------------------------------------------------------------------------------------
        if ((!input["visa_type"])) {
            isValid = false;
            errors["visa_type"] = "Please select visa type";
        }

        // -------------rate_term-----------------------------------------------------------------------------------------
        if ((!input["rate_term"])) {
            isValid = false;
            errors["rate_term"] = "Please select rate term type";
        }
        // if ((input["rate_term"]) != undefined) {

        //     var pattern = new RegExp(/^[^\s][a-zA-Z\s]+[^\s]+[@#$%^&*,!? \b]$/);
        //     if (!pattern.test(input["rate_term"])) {
        //         isValid = false;
        //         errors["rate_term"] = "Please enter only characters.";
        //     }
        // }
        // -------------submitted_rate-----------------------------------------------------------------------------------------
        if ((!input["submitted_rate"])) {
            isValid = false;
            errors["submitted_rate"] = "This field is required";
        }
        if ((input["submitted_rate"]) != undefined) {

            var pattern = new RegExp(/^[^\s][0-9 $\s]{2,4}$/);
            // new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&*,!? \b]).{6,15}$/); 

            if (!pattern.test(input["submitted_rate"])) {
                isValid = false;
                errors["submitted_rate"] = "Please enter only characters.";
            }
        }
        // -------------phone-----------------------------------------------------------------------------------------
        if ((!input["phone"])) {
            isValid = false;
            errors["phone"] = "This duration field is required";
        }
      
        // -------------email-----------------------------------------------------------------------------------------
        if ((!input["email"])) {
            isValid = false;
            errors["email"] = "This email field is required";
        }
        if (typeof input["email"] !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
              isValid = false;
              errors["email"] = "Please enter valid email address (e.g.: abc@gmail.com).";
            }
          }
        // -------------remark-----------------------------------------------------------------------------------------
        if ((!input["remark"])) {
            isValid = false;
            errors["remark"] = "This remark field is required";
        }
        if ((input["remark"]) != undefined) {

            var pattern = new RegExp(/^[^\s][a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]{1,50}$/);
            // RegExp(/^[^\s][a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+[^\s]{1,50}$/);

            if (!pattern.test(input["remark"])) {
                isValid = false;
                errors["remark"] = "Please enter valid remark name.";
            }
        }
        // -------------reason-----------------------------------------------------------------------------------------
        if ((!input["reason"])) {
            isValid = false;
            errors["reason"] = "This reason field is required";
        }
        if ((input["reason"]) != undefined) {

            var pattern = new RegExp(/^[^\s][a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]{1,50}$/);
            // new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&*,!? \b]).{6,15}$/); 

            if (!pattern.test(input["reason"])) {
                isValid = false;
                errors["reason"] = "Please enter valid reason.";
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
                        {/* <NavBarHeader /> */}
                    </div>
                    <div className="col-2 master_backgroung_side side">
                        <EmpSidebar />
                    </div>

                    <div className="col-10 master_backgroung_work scroll-bar">

                        <div className="row">
                            <form onSubmit={this.handleSubmit}>

                                <div className="col-12">
                                    <div className="row" style={{ paddingTop: '20px'}}>

                                        <div className="col-6" style={{ paddingLeft: '35px', paddingRight: '20px' }}>

                                            <div class="form-group">
                                                <label for="cad_name"><b>Candidate Name:</b></label>
                                                <input
                                                    ref={(input) => { this.refInput = input; }}
                                                    minLength={1}
                                                    maxLength={50}
                                                    type="text"
                                                    name="cad_name"
                                                    value={this.state.input.cad_name}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerSub}
                                                    placeholder="Candidate Name"
                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.cad_name}</div>
                                            </div>

                                            <div class="form-group">
                                                <label for="visa_type"><b>Visa Type:</b></label>
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '475px' }}
                                                    name="visa_type" id="visa_type"
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerReq}
                                                    value={this.state.input.visa_type}>

                                                    <option value='' default selected> Select Visa Type </option>
                                                    <option value="volvo">Visa1</option>
                                                    <option value="saab">visa2</option>
                                                    <option value="mercedes">visa3</option>
                                                    <option value="v4">visa4</option>
                                                </select>

                                                <div className="text-danger">{this.state.errors.visa_type}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="rate_term"><b>Rate Term:</b></label>
                                                <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '475px' }}
                                                    name="rate_term" id="rate_term"
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerReq}
                                                    value={this.state.input.rate_term}>

                                                    <option value='' default selected> Select Visa Type </option>
                                                    <option value="volvo">R1</option>
                                                    <option value="saab">RT2</option>
                                                    <option value="mercedes">RT3</option>
                                                    <option value="v4">RT4</option>
                                                </select>

                                                <div className="text-danger">{this.state.errors.rate_term}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="submitted_rate"><b>Submitted Rate:</b></label>
                                                <input
                                                    minLength={2}
                                                    maxLength={4}
                                                    type="text"
                                                    name="phone"
                                                    value={this.state.input.submitted_rate}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerClosure}
                                                    placeholder="Pnone"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.submitted_rate}</div>
                                            </div>

                                        </div>
                                        <div className="col-6" style={{ paddingLeft: '35px', paddingRight: '30px' }}>
                                            <div class="form-group">
                                                <label for="phone"><b>Phone :</b></label>
                                                <input
                                                    minLength={10}
                                                    maxLength={10}
                                                    type="number"
                                                    name="phone"
                                                    value={this.state.input.phone}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerClosure}
                                                    placeholder="Pnone"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.phone}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="email"><b>Email:</b></label>
                                                <input
                                                    minLength={2}
                                                    maxLength={50}
                                                    type="text"
                                                    name="email"
                                                    value={this.state.input.email}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerClosure}
                                                    placeholder="Email"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.email}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="remark"><b>Remark:</b></label>
                                                <input
                                                    minLength={1}
                                                    maxLength={200}
                                                    type="text"
                                                    name="remark"
                                                    value={this.state.input.remark}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerClosure}
                                                    placeholder="Remark"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.remark}</div>
                                            </div>
                                            <div class="form-group">
                                                <label for="reason"><b>Reason:</b></label>
                                                <input
                                                    minLength={1}
                                                    maxLength={200}
                                                    type="text"
                                                    name="reason"
                                                    value={this.state.input.reason}
                                                    onChange={this.handleChange}
                                                    onKeyUp={this.keyUpHandlerClosure}
                                                    placeholder="Reason"

                                                    class="form-control" />

                                                <div className="text-danger">{this.state.errors.reason}</div>
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

export default AddCandidate;