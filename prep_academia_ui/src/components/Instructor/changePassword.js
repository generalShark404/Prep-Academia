import Sidebar from "./sidebar";
import {useEffect, useState} from 'react'
import Swal from "sweetalert2";
import {useParams, useNavigate} from 'react-router-dom';
import SecondNavBar from "../secondNavBar";
import axios from "axios";
import checkAuthentication from "../utilities";
import { showPassword,getLocalStorage, useRedirect, timeOutErrorFunc, displayError, hideError } from "../utilities";
import axiosInstance from "../../axios";
import ChangePassword from "../ChangePassword/ChangePassword";
import TeacherSidebar from "./sidebar";
// #Changes to make in for and id 

function InstructorChangePassword() {
  const [passwordData, setPasswordData]=useState({
    old_password:'',
    new_password:'',
    confirm_password:''
  });

  const [error, setError] = useState("");
  
  const handleChange=(event)=>{
    setPasswordData({
      ...passwordData,
      [event.target.name]:event.target.value
    });
  };

  const submitForm = ()=>{
     const passwordFormData = new FormData();
     passwordFormData.append('old_password', passwordData.old_password);
     passwordFormData.append('new_password', passwordData.new_password);
     passwordFormData.append('confirm_password', passwordData.confirm_password);

     const {old_password, new_password, confirm_password} = passwordData;

     if(!new_password || !old_password || !confirm_password){
        Swal.fire({
          icon:'warning',
          html:`<p class="fs-2">All fileds are required.</p>`
        });
     }else{
       try {
        axiosInstance.patch(`/auth/v1/user/change-password/`, passwordFormData)
        .then((res)=>{ 
            if(res.status == 200){
                Swal.fire({
                  title: "Success",
                  icon: "success",
                  html: `
                  <p class="fs-2">
                       ${res.data.message}
                  </p>`,
                });
                setPasswordData({
                  old_password:'',
                  new_password:'',
                  confirm_password:''
                })
              }
          
        }).catch((error) => {
          Swal.fire({
            title: "Error",
            icon: "error",
            html: `
            <p class="fs-2">
                 ${error.response.data.message}
            </p>`,
          });          
        });
       } catch (error) {
        setPasswordData({'status':'error'}); 
        console.log(error);
        try {
          if(error.response){
            
            Swal.fire({
            title: "Error",
            icon: "warning",
            html: `${error.response.data.message}`,
          });
          }
        } catch (error) {
          
        }
       }
     }
  }
  useEffect(()=>{
    document.title = 'Change password';
  });

  return(
    <ChangePassword Sidebar={TeacherSidebar} handleChange={handleChange} submitForm={submitForm} passwordData={passwordData} />
  );
};
export default InstructorChangePassword;