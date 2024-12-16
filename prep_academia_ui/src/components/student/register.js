import { useEffect, useState } from "react";
import { Link, json, redirect, useNavigate } from "react-router-dom";

import  axios  from "axios";
import Swal from "sweetalert2";

import RegistrationForm from "../registrationForm";

function UserRegister() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMessage] = useState({});
  const [errorStatus, setErrorStatus] = useState({});
  const [isAuthenticated, setAuthenticated] = useState({});
  const [accountCreated, setAccountCreated] = useState({});
 
  const [studentData, setStudentData] = useState({
    'username': '',
    'email': '',
    'password': '',
    'confirm_password': '',
  });
// Thermite
  const handleChange = (event) => {
    const { name, value } = event.target;

    setStudentData((prevData) => ({
      ...prevData, 
      [name]: value
    }));
  };

  useEffect(() => {
    document.title = "Student Register";
  }, []);
//The gold is not on the mountain but under it.

  const submitForm = async (e) => {
    e.preventDefault();
    const { username, email, password, confirm_password} = studentData;
    const __studentFormData = new FormData();
    __studentFormData.append("username", studentData.username);
    __studentFormData.append("email", studentData.email);
    __studentFormData.append("password", studentData.password);
    __studentFormData.append("confirm_password", studentData.confirm_password);    

    try {      
        if(username == '' || email == '' || password == '', confirm_password == ''){         
            Swal.fire({
              icon:'warning',
              html:`
              <p class='fs-3'>
                All fields must be filled !
              </p>`
            });       
        }else if(password.length < 7 ||  confirm_password.length < 7){
          Swal.fire({
            icon:'warning',
            html:`
            <p class='fs-3'>
              Length should not be less than 7 !
            </p>`
          });   
        }else{
          await axios.post(`${process.env.REACT_APP_API_URL}/auth/v1/student/register/`, __studentFormData)
          .then((res)=>{
                  if(res.status == 200 || res.status == 201){
                    Swal.fire({
                      'icon':'success',
                      'title':`
                         <h4>
                           ${res.data.message}
                         </h4>
                      `
                    });
                    navigate('/otp/verification')
                    // setTimeout(() => {          
                    //   window.location.href ='/login';
                    // }, 1000);
                  }
              }).catch((error) => {
                let errorData =  error.response.data; 
                // let email = errorData.email
                // console.log(errorData)

                if(errorData){
                  Swal.fire({
                    icon:'warning',
                    html:`
                    <p class='fs-3'>
                       ${errorData.error}
                    </p>`
                  });
                };
              });
            }
          } catch (error) {
            setStudentData({'status': "error"});
            console.log(error)
          };
          
        };
  
  return (
    <RegistrationForm registrationData={studentData} handleChange={handleChange} submitForm={submitForm} />
  );
};

export default UserRegister;