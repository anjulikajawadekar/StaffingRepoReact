
/*
 Copyright (c) 2021 Christer Johansson of Sweden Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../utilities/Form";
import axios from "axios";
import base_url from "../api/bootapi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { regexLiteral } from "@babel/types";


const Forgetpassword = () => {

  const [password, setPassword] = useState(null);
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [password1, setPassword1] = useState(null);
  const [validate1, setValidate1] = useState({});
  const [showPassword1, setShowPassword1] = useState(false);
  const [passMatch, setPassMatch] = useState(null);
  const [passNotMatch, setPassNotMatch] = useState(null);

  const [passError, setPassError] = useState(null);
  const [pass1Error, setPass1Error] = useState(null);

  let navigate = useNavigate();
  let email = localStorage.getItem("email");
  console.log("email : "+ email);

  //    const useEffect=() => {
  //         axios.get(`${base_url}/reset_password`).then(
  //             (response) => {
  //                alert("ok")
  //             },
  //             (error) =>
  //             {
  //                 alert("err")
  //             })
  //     };

  // ------------------------------------- VALIADATION CODE---------------------------------------------------------------
  const validation1 = (e) => {

    setPassError(null);
    setPass1Error(null);
    // let input = this.state.input;
    let newPass = password;
    let confPass = password1;

    let errors = {};
    let isValid = true;

    console.log("new pass : " + password);
    console.log("confirm Pass : " + password1);
    // --------------------------------------- new password validation-------------------------------------------------------
    if (password == null) {
      isValid = false;
      setPassError("Field is required");
    
    }

     if (password !== null) {

      var pattern = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
      if (!pattern.test(password)) {
        isValid = false;
        setPassError("Password must contain at least one number, one special character (?!,@#$), one upper and lower case letter, and at least 6 characters.")
     
      }
    }
    // --------------------------------------- confirm password validation-------------------------------------------------------
    if (password1 == null) {
      isValid = false;
      setPass1Error("Field is required");

    }

     if (password1 !== null) {

      var pattern = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
      if (!pattern.test(password1)) {
        isValid = false;
        setPass1Error("Password must contain at least one number, one special character (?!,@#$), one upper and lower case letter, and at least 6 characters.")
       
      }
    }
    return isValid;
  }
  // ------------------------------------- END VALIADATION CODE---------------------------------------------------------------

  const register = (e) => {
    e.preventDefault();
 
    // const validate = validateRegister();
    const validate = validation1();   

    if (validate) {
      setValidate({});
      const d1 = password;
      const d2 = password1;

      if (d1 == d2) {
       // alert("same")
         postDataToServer(email, d1);
        //  alert("You are registered successfully!");
      }
      else {
        alert("Password doesn't match");
      }
    //   postDataToServer(email, d1);
  
      setPassword(null);
      setPassword1(null);
    }

    e.target.reset();

  };

  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const togglePassword1 = (e) => {
    if (showPassword1) {
      setShowPassword1(false);
    } else {
      setShowPassword1(true);
    }
  };

  const postDataToServer = (d1, d2) => {

    console.log("email: "+ d1 + " new pass : "+d2);

    axios.post(`${base_url}/forgetpass?username=${d1}&password=${d2}`).then(
      (response) => {
        // console.log(response);
        navigate("/");
        toast.success("Password changed successfully", {
          position: "bottom-right"
        });
        console.log("Success");
        console.log("email: "+ d1 +" new password : "+ d2)
      },
      (error) => {
        console.log(error);
        alert("Error");
      }
    )
  }

  // --------------------------------------------------Password match--------------------------------------------------
  const keyUpHandler = (e) => {
    if ((password == password1) && (password !== undefined)) {

      setPassNotMatch(null);
      setPassMatch("Password matched");
    }
    else {
      setPassNotMatch("Password not matched");
      setPassMatch(null);
    }
  }

  return (

    <div className="row g-0 auth-wrapper">
       <div className="col-12 col-md-5 col-lg-6 h-100 master_backgroung_side">
          <img src="usa.png" width="670" height="657" alt="US staffing app"></img>
        </div>

      <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
        <div className="d-flex flex-column align-content-end">
          <div className="auth-body mx-auto">
            <h4>Create New Password</h4>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                method="POST"
                onSubmit={register}
                autoComplete={"off"}
              >
                <br></br>
                <div className="name mb-3">
                  <b>Enter Email: </b><br></br>
                  <input type={"email"} disabled value={email} className={`form-control`} />
                </div>
                <div className="password mb-3">
                  <b>Enter New Password:</b>
                  <div className="input-group">

                    <br></br>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${validate.validate && validate.validate.password
                        ? "is-invalid "
                        : ""
                        }`}
                      name="password"
                      id="password"
                      value={password}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyUp={keyUpHandler}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={(e) => togglePassword(e)}
                    >
                      <i
                        className={
                          showPassword ? "far fa-eye" : "far fa-eye-slash"
                        }
                      ></i>{" "}
                    </button>

                    {/* <div
                      className={`invalid-feedback text-start ${validate.validate && validate.validate.password
                        ? "d-block"
                        : "d-none"
                        }`}
                    >
                      {validate.validate && validate.validate.password
                        ? validate.validate.password[0]
                        : ""}
                    </div> */}

                  </div>
                  <div className="text-danger">{passError}</div>
                </div>

                <div className="password mb-3">
                  <b>Enter Confirm Password:</b>
                  <div className="input-group">

                    <input
                      type={showPassword1 ? "text" : "password"}
                      className={`form-control ${validate.validate && validate.validate.password
                        ? "is-invalid "
                        : ""
                        }`}
                      name="password1"
                      id="password1"
                      value={password1}
                      placeholder="Confirm Password"
                      onChange={(e) => setPassword1(e.target.value)}
                      onKeyUp={keyUpHandler}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={(e) => togglePassword1(e)}
                    >
                      <i
                        className={
                          showPassword1 ? "far fa-eye" : "far fa-eye-slash"
                        }
                      ></i>{" "}
                    </button>

                    {/* <div
                      className={`invalid-feedback text-start ${validate.validate && validate.validate.password
                        ? "d-block"
                        : "d-none"
                        }`}
                    >
                      {validate.validate && validate.validate.password
                        ? validate.validate.password[0]
                        : ""}
                    </div> */}

                  </div>
                  <div className="text-danger">{pass1Error}</div>
                  <div className="text-danger">{passNotMatch}</div>
                  <div className="text-success">{passMatch}</div>

                </div>



                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 theme-btn mx-auto"
                  >
                    Save
                  </button>
                </div>
              </form>

              <hr />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgetpassword;
