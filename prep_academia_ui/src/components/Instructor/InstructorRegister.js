import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { showPassword } from '../utilities';
import RegistrationForm from '../registrationForm';

/*
- Check for errors 
- pay close attention to the code
*/  
function InstructorRegister(){
  const navigate = useNavigate();
  const  [instructorData, setInstructorData] = useState({
    // 'full_name':'',
    'username':'',
    'email':'',
    'password':'',
    'confirm_password':''
  });

  //Change element value
  const handleChange=(event)=>{
    setInstructorData({
      ...instructorData,
      [event.target.name]:event.target.value
    })
  };
  //End

  //submit form
  const submitForm = async (e) => {
    e.preventDefault();
    
    let {username, email, password, confirm_password} = instructorData;
    const __instructorFormData = new FormData();
    __instructorFormData.append("username", instructorData.username);
    __instructorFormData.append("password", instructorData.password);
    __instructorFormData.append("confirm_password", instructorData.confirm_password);    
    __instructorFormData.append("email", instructorData.email);
    try {
        
        if(username == '' || email == '' || password == '' || confirm_password == ''){
            Swal.fire({
              icon:"info",
              html:`
              <p class='fs-1'>
                 All fields are required.
              </p>
            `
            })
        }else if(password.length < 7 || confirm_password < 7){
          Swal.fire({
            icon:'info',
            html:`
             <p class="fs-3">
               Password length can't be less than 7.
             <p/>
            `
          })
        }else{
          await axios.post(`${process.env.REACT_APP_API_URL}/auth/v1/instructor/register/`, __instructorFormData)
          .then((res)=>{

                  if(res.status == 200 || res.status == 201){
                    Swal.fire({
                      'icon':'success',
                      'title':"<h4>Account Created Successfully</h4>"
                    });
                  };

                  navigate('/login');
                
              }).catch((error)=>{
                let errorData = error.response.data;
                Swal.fire({
                  icon:'warning',
                  html:`
                    <p class="fs-3">
                      ${errorData.error}
                    </p>
                  `
                });
              });
            }
          } catch (error) {
            try {
              let errorData = error.response.data;
              console.log(errorData.error)
             
             
              // setStudentData({'status': "error"});    
            } catch (error) {
              
            }
          };
          
          
        };
  //End


  useEffect(()=>{
    document.title = 'Instructor Register'
  });  

  return (
    <RegistrationForm registrationData={instructorData} handleChange={handleChange} submitForm={submitForm} />
  );
}

export default InstructorRegister
//7014832705