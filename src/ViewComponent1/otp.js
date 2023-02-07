import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "../utilities/Form";
import axios from "axios";
import base_url from "../api/bootapi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";

import { MuiOtpInput } from 'mui-one-time-password-input'

const Otp = () => {
  let navigate = useNavigate();
  const [otp, setOtp] = useState("");


  // const inputRef = useRef();

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  const register = (e) => {
    e.preventDefault();
    let a = otp;

    postDataToServer(a);

  }

  const handleChange = (newValue) => {
    setOtp(newValue)
  }



  const postDataToServer = (d2) => {

    console.log(d2);

    axios.get(`${base_url}/reset_password?token=${d2}`).then(

      (response) => {

        // alert("success")
        navigate("/forgetpassword")


      },
      (error) => {
        alert("Invalid OTP")
        setOtp("")
      })
  }

  return (
    <div className="row g-0 auth-wrapper">
      <div className="col-12 col-md-5 col-lg-6 h-100 master_backgroung_side">
        <img src="usa.png" width="670" height="657" alt="US staffing app"></img>
      </div>

      <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
        <div className="d-flex flex-column align-content-end">
          <div className="auth-body mx-auto">
            <div className="text-center">
              <form onSubmit={register}>
                <h4><b>Enter OTP</b></h4><br></br>

                {/* <input type="text" id="aa" 
   value={otp}  onChange={(e) => setOtp(e.target.value)}></input> */}

                <MuiOtpInput length={5} value={otp} onChange={handleChange} />

                <br></br><br></br>
                <button
                  type="submit"
                  className="btn btn-primary w-50 theme-btn mx-auto"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}
export default Otp;