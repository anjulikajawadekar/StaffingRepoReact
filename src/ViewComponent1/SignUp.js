import React from 'react';
import axios from 'axios';
import base_url from '../api/bootapi';
import { toast } from "react-toastify";
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import history from './ResponseVal';
// import { number } from 'joi';
// import { Card, CardBody } from "reactstrap";

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {},
      hover: false,
    };

    // this.showPassword = this.showPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.togglePassword = this.togglePassword(this);
  }

  handleChange(e) {
    console.log(this.state.hover);
    let emp_reg = this.state.input;
    emp_reg[e.target.name] = e.target.value;
    console.log("current added val is " + emp_reg[e.target.name] + ":" + e.target.value);

    this.setState({
      emp_reg
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.validate()) {

      let emp_reg = this.state.input;
      emp_reg[e.target.name] = e.target.value;
      // console.log("current added val is " + emp_reg[e.target.name] + ":" + e.target.value);

      this.state.input["name"] = this.state.input["name"].trim(" ");
      console.log("result : " + this.state.input["name"]);

      let d1 = this.state.input["name"];
      let d2 = this.state.input["email"];
      let d3 = this.state.input["password"];

      this.postdata(emp_reg);

    }
    // 👇️ clear all input values in the form
    e.target.reset();
  }

  postdata = (data) => {

    let d1 = data["name"].trim(" ");
    let d2 = data["email"];
    let d3 = data["password"];

    axios.post(`${base_url}/addEmp/?empName=${d1}&Username=${d2}&Password=${d3}`).then(
      // addEmp?empName=Admin&Username=admin@gmail.com&Password=Admin@1234
      (response) => {
        toast.success("Employee registered successfully!",
          { position: "top-right" }
        );

        history.push("/");
        window.location.reload();
      },
      (error) => {
        alert("This account is already exist.")
      }
    )

    let inputs = {};
    inputs["name"] = undefined;
    inputs["email"] = undefined;
    inputs["password"] = undefined;

    this.setState({ input: inputs });

  }

  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if ((!input["name"])) {
      isValid = false;
      errors["name"] = "Please enter name.";
    }

    if (typeof input["name"] !== "undefined") {

      // var pattern = new RegExp(/^(?=.*[a-zA-Z]).{3,20}$/); //new RegExp(/^[A-Za-z#+.\b]+$/);
      // var pattern = new RegExp(/^[A-Za-z\b]+$/);
      var pattern = new RegExp(/^[^\s][a-zA-Z\s]+[^\s]$/);
      if (!pattern.test(input["name"])) {
        isValid = false;
        errors["name"] = "Please enter only characters.";
      }
    }

    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Please enter email address.";
    }

    if (typeof input["email"] !== "undefined") {

      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address (e.g.: abc@gmail.com).";
      }
    }

    if (!input["password"]) {
      isValid = false;
      errors["password"] = "Please enter password.";
    }

    if (typeof input["password"] !== "undefined") {

      var pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&*,!? \b]).{6,15}$/);

      if (!pattern.test(input["password"])) {
        isValid = false;
        errors["password"] = "Password must contain at least one number, one special character (?!,@#$), one upper and lower case letter, and at least 6 characters.";
      }
    }

    this.setState({
      errors: errors
    });

    return isValid;
  }

  togglePassword = (e) => {

    if (this.state.hover) {

      this.setState({ hover: false });
      console.log("false : ");
    } else {

      this.setState({ hover: true });
      console.log("true");
    }

    console.log(this.state.hover);
  };

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
                <h5><b>Create an account</b></h5>
              </div>
              <br></br>

              <form onSubmit={this.handleSubmit}>

                <div class="form-group">
                  <label for="name"><b>Enter Name:</b></label>
                  <input
                    type="text"
                    name="name"
                    value={this.state.input.name}
                    onChange={this.handleChange}
                    // className="form-control"
                    style={{ width: '360px', height: '37px' }}
                    placeholder="Name"
                    minLength={3}
                    maxLength={50}
                    id="name" />

                  <div className="text-danger">{this.state.errors.name}</div>
                </div>

                <div class="form-group">
                  <label for="email"><b>Enter Email:</b></label>
                  <input
                    name="email"
                    value={this.state.input.email}

                    onChange={this.handleChange}
                    placeholder="Email"
                    minLength={11}
                    maxLength={50}
                    // className="form-control"
                    style={{ width: '360px', height: '37px' }}
                  />

                  <div className="text-danger">{this.state.errors.email}</div>
                </div>

                {/* ---------------------------------------------------------------------- */}
                <div className="password mb-3">
                  <div className="form-group">
                    <label for="password"><b>Enter Password:</b></label>
                    <input
                      type={(this.state.hover) ? "text" : "password"}
                      name="password"
                      id="password"
                      value={this.state.input.password}
                      onChange={this.handleChange}
                      placeholder="Password"
                      minLength={6}
                      maxLength={15}
                      style={{ width: '305px', height: '37px' }}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-primary theme-btn mx-auto"
                      onClick={this.togglePassword}
                    >
                      <i
                        className={
                          (this.state.hover) ? "far fa-eye" : "far fa-eye-slash"
                        }
                      ></i>{" "}
                    </button>
                    <div className="text-danger">{this.state.errors.password}</div>

                  </div>
                </div>

                <div className="text-center">
                  {/* <div className='row'>
                    <div className='col-6'>
                      <button
                        type="submit"
                        className="btn btn-primary w-100 theme-btn mx-auto"
                      >
                        Sign Up
                      </button>
                    </div>
                    <div className='col-6'>
                      <button
                        type="reset"
                        className="btn btn-warning w-100 theme-btn mx-auto"
                      >
                        Reset
                      </button>
                    </div>
                  </div> */}

                  <button
                    type="submit"
                    className="btn btn-primary w-100 theme-btn mx-auto"
                  >
                    Sign Up
                  </button>

                </div>

                {/* <input type="submit" value="Submit" class="btn btn-success" /> */}

              </form>
              <hr />
              <div className="auth-option text-center pt-2">
                Already have an account?{" "}
                <Link className="text-link" to="/login">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;