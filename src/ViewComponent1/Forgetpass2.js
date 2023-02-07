
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

import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Forgetpass2 = () => {
  const [name, setName] = useState("");
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [uname, setUname] = useState(localStorage.getItem("email"));
  localStorage.setItem("email",uname);
  console.log("email: "+ uname);

  let navigate = useNavigate();

  const validateRegister = () => {
    // localStorage.setItem("email",username)
    
    let isValid = true;

    let validator = Form.validator({

      username: {
        value: uname,
        isRequired: true,
        isEmail: true,
      },

    });

    if (validator !== null) {
      setValidate({
        validate: validator.errors,
      });

      isValid = false;
    }
    return isValid;
  };

  const handletoast = (e) => {

    toast.loading("Please Wait",
      {
        position: "top-right",
        style: { position: "absolute", top: "5px", width: "300px" }
      });
  }

  const register = (e) => {
    e.preventDefault();

    const validate = validateRegister();

    if (validate) {
      setValidate({});
      const d2 = uname;
      setEmail("");
      postDataToServer(d2);

    }
  };



  const postDataToServer = (d2) => {
 
    // alert( d2);

    axios.post(`${base_url}/forgot_password?email=${d2}`).then(

      (response) => {

        toast.dismiss();
        toast.success("OTP Sent",
          {
            position: "top-right",
            style: { position: "absolute", top: "5px", width: "300px" }
          });

        navigate("/otp")


      },

      (error) => {
        console.log(error);
        console.log("Error");
        alert("Username not found")

      }
    )
  }

  //  const handleChange=(e)=>
  //  {

  //   let a= e.target.value;
  //   console.log(a)
  //  }

  return (

    <div className="row g-0 auth-wrapper">
      <div className="col-12 col-md-5 col-lg-6 h-100 master_backgroung_side">
        <img src="usa.png" width="670" height="657"></img>
        <div className="auth-background-mask"></div>
      </div>

      <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
        <div className="d-flex flex-column align-content-end">
          <div className="auth-body mx-auto">
            <h4>Enter registered Email</h4>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                method="POST"
                onSubmit={register}
                autoComplete={"off"}
              >


                <div className="email mb-3">
                  <input
                    type="email"
                    className={`form-control ${validate.validate && validate.validate.username
                      ? "is-invalid "
                      : ""
                      }`}
                    id="email"
                    name="username"

                    value={uname}
                    placeholder="Email"

                    onChange={(e) => setUname(e.target.value)}

                  />

                  <div
                    className={`invalid-feedback text-start ${validate.validate && validate.validate.username
                      ? "d-block"
                      : "d-none"
                      }`}
                  >
                    {validate.validate && validate.validate.username
                      ? validate.validate.username[0]
                      : ""}
                  </div>
                </div>


                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 theme-btn mx-auto"
                    onClick={handletoast}
                  >
                    Send OTP
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

export default Forgetpass2;
