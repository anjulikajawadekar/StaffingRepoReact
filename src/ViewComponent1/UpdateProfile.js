import React from 'react';
import axios from 'axios';
import base_url from '../api/bootapi';
import { toast } from "react-toastify";
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import history from './ResponseVal';

class UpdateProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: {},
            errors: {},
            hover: false,
            showNewPass: false,
            showConfPass: false,
            currentPassword: undefined,
            newPassword: undefined,
            confirmPassword: undefined,
            passMatch: null,
            passNotMatch: null,

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFetchedData = this.handleFetchedData(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
    }

    handleFetchedData() {

        let empID = localStorage.getItem('empID');

        axios.get(`${base_url}/get_EmpById?empid=${empID}`).then((json) => {
            console.log(json.data[0].username)
            this.setState({
                input: json.data[0],
            });
            console.log("input: " + JSON.stringify(json.data[0]));

        })
    }

    // --------------------------------------------------Password match--------------------------------------------------
    keyUpHandler(e) {
        this.state.confirmPassword = this.state.input['confirmPass'];

        if (((this.state.newPassword) == (this.state.confirmPassword)) && (this.state.newPassword !== undefined)) {

            this.setState({ passNotMatch: '' });
            // console.log("passMatch val = " + (this.state.passMatch));
            this.setState({ passMatch: 'Password matched' });
        }
        else {
            this.setState({ passMatch: '' });
            this.setState({ passNotMatch: 'Pass not matched' });
        }
    }

    handleChange(e) {

        console.log(this.state.hover);
        let emp_reg = this.state.input;

        emp_reg[e.target.name] = e.target.value;
        // console.log("current added val is " + emp_reg[e.target.name] + ":" + e.target.value);

        this.setState({
            input: emp_reg,
        });
        // console.log("input Updated data = " + JSON.stringify(this.state.input));

        this.state.currentPassword = this.state.input["currentPass"];
        this.state.newPassword = this.state.input['newPass'];
        this.state.confirmPassword = this.state.input['confirmPass'];
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.validate()) {

            if (this.state.passNotMatch != '') {
                alert("Your new password does't match!");
            }
            else {
                let emp_reg = this.state.input;
                emp_reg[e.target.name] = e.target.value;

                this.state.input["emp_name"] = this.state.input["emp_name"].trim(" ");

                // console.log("Current pass: " + this.state.currentPassword + " newPass : " + this.state.newPassword + "  confirmPass: " + this.state.confirmPassword);
                // console.log("Submiting data are : " + JSON.stringify(this.state.input));

                this.postdata(emp_reg);

            }
        }
        // 👇️ clear all input values in the form
        e.target.reset();
        this.setState({ passNotMatch: '' });
        this.setState({ passMatch: '' });
    }

    postdata = (data) => {

        let empid = data["empid"];
        let emp_name = data["emp_name"].trim(" ");
        let username = data["username"];
        let currentPass = data["currentPass"];
        let newPass = data["newPass"];
        let confirmPass = data["confirmPass"];

        axios.post(`${base_url}/updateProfile/?empID=${empid}&currentPass=${currentPass}&empName=${emp_name}&email=${username}&newPass=${confirmPass}`).then(
            // updateProfile?empID=37&currentPass=North@1234&empName=East&email=east@gmail.com&newPass=East@1234
            (response) => {
                toast.success("Profile updated successfully!",
                    { position: "top-right" }
                );

                console.log(JSON.stringify(response.data));
                console.log(response.data.role);
                if ((response.data.role) == "TM") {
                    history.push("/add_closure1");
                    window.location.reload();
                }else{
                    history.push("/admin_dashboard1");
                    window.location.reload();
                }
                // history.push("/add_closure1");
                // window.location.reload();
                localStorage.setItem('empName', emp_name);
                localStorage.setItem('empMail', username);
                localStorage.setItem('empID', empid);
                // let empName = localStorage.getItem('empName');
            },
            (error) => {
                alert("Please enter correct current password!");
                window.location.reload();
            }
        )
    }
    // ------------------------------------- VALIADATION CODE---------------------------------------------------------------
    validate() {
        console.log("Current pass: " + this.state.currentPassword + " newPass : " + this.state.newPassword + "  confirmPass: " + this.state.confirmPassword);

        let input = this.state.input;
        let errors = {};
        let isValid = true;

        console.log("Email : " + input["username"]);
        console.log("Current Pass : " + this.state.currentPassword);
        // --------------------------------------- emp_name validation-------------------------------------------------------
        if ((!input["emp_name"])) {
            isValid = false;
            errors["emp_name"] = "Please enter name.";
        }

        if (typeof input["emp_name"] !== undefined) {

            var pattern = new RegExp(/^[^\s][a-zA-Z\s]+[^\s]$/);
            if (!pattern.test(input["name"])) {
                isValid = false;
                errors["emp_name"] = "Please enter only characters.";
            }
        }
        // -----------------------------------------Username/ email validation------------------------------------------------------------------
        if (!input["username"]) {
            isValid = false;
            errors["username"] = "Please enter email address.";
        }

        if (typeof input["username"] !== undefined) {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["username"])) {
                isValid = false;
                errors["username"] = "Please enter valid email address (e.g.: abc@gmail.com).";
            }
        }

        // -----------------------------------------handle currentPass error---------------------------------------------
        if (this.state.currentPassword == undefined) {
            isValid = false;
            errors["currentPass"] = "Please enter current password.";
            console.log("Please enter password.");
        }

        // if ((this.state.currentPassword) !== undefined) {

        //     var pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&*,!? \b]).{6,15}$/);

        //     if (!pattern.test(this.state.currentPassword)) {
        //         isValid = false;
        //         errors["currentPass"] = "Password must contain at least one number, one special character (?!,@#$), one upper and lower case letter, and at least 6 characters.";

        //     }
        // }

        // -----------------------------------------end pass error-----------------------------------------------
        // -----------------------------------------handle newPass error---------------------------------------------
        if (this.state.newPassword == undefined) {
            isValid = false;
            errors["newPass"] = "Please enter new password.";
            console.log("Please enter password.");
        }

        if ((this.state.newPassword) !== undefined) {

            var pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&*,!? \b]).{6,15}$/);

            if (!pattern.test(this.state.newPassword)) {
                isValid = false;
                errors["newPass"] = "Password must contain at least one number, one special character (?!,@#$), one upper and lower case letter, and at least 6 characters.";

            }
        }
        // -----------------------------------------end newPass error-----------------------------------------------

        // -----------------------------------------handle confirmPass error---------------------------------------------
        if (this.state.confirmPassword == undefined) {
            isValid = false;
            errors["confirmPass"] = "Please enter confirm password.";
            console.log("Please enter password.");
        }

        if ((this.state.confirmPassword) !== undefined) {

            var pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&*,!? \b]).{6,15}$/);

            if (!pattern.test(this.state.confirmPassword)) {
                isValid = false;
                errors["confirmPass"] = "Password must contain at least one number, one special character (?!,@#$), one upper and lower case letter, and at least 6 characters.";
            }
        }
        // -----------------------------------------end confirmPass error-----------------------------------------------
        this.setState({
            errors: errors
        });
        return isValid;
    }
    // ------------------------------------- END VALIADATION CODE---------------------------------------------------------------

    togglePassword1 = (e) => {

        if (this.state.hover) {

            this.setState({ hover: false });
        } else {

            this.setState({ hover: true });
        }
    }

    togglePassword2 = (e) => {
        // ----------------------------------------------------------------------------------------------------
        if (this.state.showNewPass) {

            this.setState({ showNewPass: false });
        } else {

            this.setState({ showNewPass: true });
        }
    }

    togglePassword3 = (e) => {
        if (this.state.showConfPass) {
            this.setState({ showConfPass: false });
        } else {
            this.setState({ showConfPass: true });
        }
    };

    resetForm = () => {

        let inputs = {};
        this.setState({ input: inputs });

        let errors1 = {};
        this.setState({ errors: errors1 });

        this.setState({ passNotMatch: '' });
        this.setState({ passMatch: '' });
    }

    render() {

        return (
            <div className="row g-0 auth-wrapper">
                <div className="col-12 col-md-5 col-lg-6 h-100 master_backgroung_side">
                    <img src="usa.png" width="670" height="657" alt="US staffing app"></img>
                </div>

                <div className="col-12 col-md-7 col-lg-6 auth-main-col ">
                    {/* text-center */}
                    <div className="d-flex flex-column align-content-end">
                        <div className="auth-body mx-auto">

                            <div className="auth-form-container text-center">
                                <h5><b>Update an account</b></h5>
                            </div>
                            <br></br>

                            <form onSubmit={this.handleSubmit}>

                                {/* -----------------------------------------------End editable code------------------------------------------------------------- */}
                                <div class="form-group">
                                    <label for="name"><b>Enter Name:</b></label>
                                    <input
                                        type="text"
                                        name="emp_name"
                                        // value={Object.values(empData)[3]}
                                        value={this.state.input.emp_name}
                                        onChange={this.handleChange}
                                        style={{ width: '360px', height: '37px' }}
                                        placeholder="Name"
                                        minLength={3}
                                        maxLength={50}
                                        id="emp_name" />

                                    <div className="text-danger">{this.state.errors.emp_name}</div>
                                </div>

                                <div class="form-group">
                                    <label for="email"><b>Enter Email:</b></label>
                                    <input
                                        // name="email"
                                        name='username'
                                        value={this.state.input.username}
                                        onChange={this.handleChange}
                                        placeholder="Email"
                                        minLength={11}
                                        maxLength={50}
                                        style={{ width: '360px', height: '37px' }}
                                    />

                                    <div className="text-danger">{this.state.errors.username}</div>
                                </div>

                                <hr></hr>

                                {/* ---------------------------------------------------------------------- */}
                                <div className="password mb-3 ">
                                    <div className="form-group">
                                        <label for="password"><b>Enter Current Password:</b></label>
                                        <input
                                            type={(this.state.hover) ? "text" : "password"}
                                            name="currentPass"
                                            id="currentPass"
                                            // value={this.state.input.password}
                                            value={this.currentPassword}
                                            onChange={this.handleChange}
                                            placeholder="Password"
                                            minLength={6}
                                            maxLength={15}
                                            style={{ width: '305px', height: '37px' }}
                                        />

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary theme-btn mx-auto"
                                            onClick={this.togglePassword1}
                                        >
                                            <i
                                                className={
                                                    (this.state.hover) ? "far fa-eye" : "far fa-eye-slash"
                                                }
                                            ></i>{" "}
                                        </button>
                                        <div className="text-danger">{this.state.errors['currentPass']}</div>

                                    </div>
                                </div>

                                {/* ---------------------------------------------------------------------- */}
                                <div className="password mb-3 " >
                                    <div className="form-group">
                                        <label for="password"><b>Enter New Password:</b></label>
                                        <input
                                            type={(this.state.showNewPass) ? "text" : "password"}
                                            name="newPass"
                                            id="newPass"
                                            // value={this.state.input.password}
                                            onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandler}
                                            placeholder="Password"
                                            minLength={6}
                                            maxLength={15}
                                            style={{ width: '305px', height: '37px' }}
                                        />

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary theme-btn mx-auto"
                                            onClick={this.togglePassword2}
                                        >
                                            <i
                                                className={
                                                    (this.state.showNewPass) ? "far fa-eye" : "far fa-eye-slash"
                                                }
                                            ></i>{" "}
                                        </button>
                                        <div className="text-danger">{this.state.errors['newPass']}</div>

                                    </div>
                                </div>

                                {/* ---------------------------------------------------------------------- */}

                                <div className="password mb-3 ">
                                    <div className="form-group">
                                        <label for="password"><b>Enter Confirm Password:</b></label>
                                        <input
                                            type={(this.state.showConfPass) ? "text" : "password"}
                                            name="confirmPass"
                                            id="confirmPass"
                                            onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandler} //ref="PwdInput"/////////////////////////
                                            placeholder="Password"
                                            minLength={6}
                                            maxLength={15}
                                            style={{ width: '305px', height: '37px' }}
                                        />

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary theme-btn mx-auto"
                                            onClick={this.togglePassword3}
                                        >
                                            <i
                                                className={
                                                    (this.state.showConfPass) ? "far fa-eye" : "far fa-eye-slash"
                                                }
                                            ></i>{" "}
                                        </button>
                                        <div className="text-danger">{this.state.errors['confirmPass']}</div>
                                        <div className="text-danger">{this.state.passNotMatch}</div>
                                        <div className="text-success">{this.state.passMatch}</div>
                                        {/* this.state.errors["confirmPass"] */}

                                    </div>
                                </div>
                                {/* </div> */}


                                <div className="text-center">

                                    <div className='row'>
                                        <div className='col-6'>
                                            <button
                                                type="submit"
                                                className="btn btn-primary w-100 theme-btn mx-auto"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                        <div className='col-6'>
                                            <button
                                                type="reset"
                                                className="btn btn-warning w-100 theme-btn mx-auto"
                                                onClick={this.resetForm}
                                            >
                                                Reset
                                            </button>

                                        </div>
                                        {/* <div className='col-2'></div> */}
                                    </div>

                                </div>

                            </form>
                            <hr />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateProfile;