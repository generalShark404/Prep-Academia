import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/api";

function VerifyStudent() {
  const navigate = useNavigate();
  const [verificationData, setVerificationData] = useState({
    otp_digit: "",
  });
  const { student_id } = useParams();

  const handleChange = (event) => {
    setVerificationData({
      ...verificationData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = () => {
    const _formData = new FormData();
    _formData.append("otp_digit", verificationData.otp_digit);
    try {
      axios
        .post(`${baseUrl}/verify-student/${student_id}`, _formData)
        .then((res) => {
          if (res.data.bool) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Verified Successfully !!",
            });
            localStorage.setItem("studentLoginStatus", true);
            localStorage.setItem("studentId", res.data.student_id);
            navigate("/student-dashboard");
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Wrong Otp Digit !!",
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  console.log(studentLoginStatus);
  if (studentLoginStatus === "true") {
    // navigate('/student-dashboard')
  }

  useEffect(() => {
    document.title = "Verify Student";
  });
  return (
    <div className="d-flex justify-content-center mt-100">
      <div className="col-md-6 animate-box my-5 ">
        {/* <h3>Get In Touch</h3> */}
        <div className="card ">
          <div className="card-header fw-bold">Enter 6 digit Otp</div>
          {/* First Name */}
          <div className="col-md-6 my-3">
            <input
              type="text"
              name="otp_digit"
              id="fname"
              className="form-control"
              placeholder="Your firstname"
              onChange={handleChange}
            />
          </div>
          <div>
            <button className="btn-sm  btn-primary m-4" onClick={submitForm}>
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyStudent;
