// import './otp.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';


function OtpVerification(){

    const [otpDigits, setOtpDigits] = useState({otp_digits:''});

    useEffect(() => {
      document.title = 'OTP verification';
    });

    const handleChange = (e) => {  
        setOtpDigits({
          [e.target.name]:e.target.value
        });
    };

    console.log(otpDigits);
    
    const submitOtp = () => {
        const _otpFormData = new FormData();
        _otpFormData.append('otp', otpDigits.otp_digits)
        axios.post(`${process.env.REACT_APP_API_URL}/auth/v1/verify/otp`, _otpFormData).then((res) => {

            if(res.status == 200 || res.status == 201){
                Swal.fire({
                    icon:'success',
                    html:`
                      <p class="fs-3">
                         Account verified sucessfully you can now login
                      </p>
                    `
                });
            }
        });
    };


    return (
<div className="container height-100 d-flex justify-content-center align-items-center text-dark">
    <div className="position-relative">
        <div className="card p-2 text-center">
            <h6>Please enter the one time password <br /> to verify your account</h6>
            <div> <span>A code has been sent to</span> <small id="maskedNumber">****email</small> </div>
            <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2 text-dark">
                <input name='otp_digits' className="m-2 text-center form-control rounded text-dark" type="number" onChange={handleChange} />
            </div>
            <div className="mt-4"> 
                <button id="validateBtn" className="btn btn-danger px-4 validate" onClick={submitOtp}>Validate</button> 
            </div>
        </div>
    </div>
</div>
    )
};


export default OtpVerification;