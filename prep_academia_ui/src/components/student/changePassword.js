import Sidebar from "./sidebar";
// #Changes to make in for and id 
import {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import checkAuthentication from "../utilities";
import { showPassword, getLocalStorage, useRedirect } from "../utilities";
import Swal from 'sweetalert2';
import SecondNavBar from "../secondNavBar";
import axiosInstance from "../../axios";

function ChangePassword() {
  const [studentData, setStudentData]=useState({
    old_password:'',
    new_password:'',
    confirm_password:''
  });

  const [error, setError] = useState("");
  
  const handleChange=(event)=>{
    setStudentData({
      ...studentData,
      [event.target.name]:event.target.value
    });
  };

  const submitForm = ()=>{
     const studentFormData = new FormData();
     studentFormData.append('old_password', studentData.old_password);
     studentFormData.append('new_password', studentData.new_password);
     studentFormData.append('confirm_password', studentData.confirm_password);

     const {old_password, new_password, confirm_password} = studentData;

     if(!new_password || !old_password || !confirm_password){
        Swal.fire({
          icon:'warning',
          html:`<p class="fs-2">All fileds are required.</p>`
        });
     }else{
       try {
        axiosInstance.patch(`/auth/v1/user/change-password/`, studentFormData)
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
                setStudentData({
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
        setStudentData({'status':'error'}); 
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

  return ( 
    <div>
      <SecondNavBar colorStyle={"bg-student-dashboard"} />
      <div className="container mt-5 mb-5">
        <div className="row mt-5 mb-5">
          <div className="col-md-3">
            <Sidebar />         
          </div>
      <section className="col-md-9 mt-5">
        <div className="card">
            <h5 className="card-headr g-dark adge fs-1 p-4 fw-bold">Change Password</h5>
            <div className="card-body">
              <p className="text-center text-danger fw-bold error fs-3" id="error">
                 {error? error : ""}
              </p>
              <div className="row mb-5 d-flex align-items-center">

                <div className="mb-5">
                <label htmlFor="old_password" className="col-sm-10 col-form-label text-dark mb-3">
                    Current password
                </label>
                <div className="col-sm-10 " >
                    <input 
                    type={'password'} 
                    className='form-control' id='old_password' 
                    name={'old_password'} 
                    onChange={handleChange} 
                    value={studentData.old_password}
                    
                    />
                    <div className="input-group-append"
                    style={{position:'absolute', right:'10px',top:'50%',transform:'translateY(-50%)', cursor:'pointer', zIndex:'4'}}
                    >
                      <button className="btn" type="button" id="showPassword" onClick={e=>showPassword("old_password")}>
                        <i className="bi bi-eye-fill" id={`visibleIcon-${'old_password'}`} style={{cursor:"pointer"}}></i>
                      </button>
                    </div>
                </div>
                </div>

                <div>
                <label htmlFor="new_password" className="col-sm-10 col-form-label mb-3 text-dark">
                    New password
                </label>
                <div className="col-sm-10">
                    <input 
                    type={'password'} 
                    className='form-control'
                    id='new_password' 
                    name={'new_password'} 
                    onChange={handleChange} 
                    value={studentData.new_password}
                    />                
                    <div className="input-group-append"
                    style={{position:'absolute', right:'10px',top:'50%',transform:'translateY(-50%)', cursor:'pointer', zIndex:'4'}}
                    >
                      <button className="btn" type="button" id="showPassword" onClick={e=>showPassword("new_password")}>
                        <i className="bi bi-eye-fill" id={`visibleIcon-${'new_password'}`} style={{cursor:"pointer"}}></i>
                      </button>
                    </div>                
                </div>
                </div>

                <div>
                <label htmlFor="confirm_password" className="col-sm-10 col-form-label mb-3 text-dark">
                    Confirm password
                </label>
                <div className="col-sm-10">
                    <input 
                    type={'password'} 
                    className='form-control'
                    id='confirm_password' 
                    name={'confirm_password'} 
                    onChange={handleChange} 
                    value={studentData.confirm_password}
                    />                
                    <div className="input-group-append"
                    style={{position:'absolute', right:'10px',top:'50%',transform:'translateY(-50%)', cursor:'pointer', zIndex:'4'}}
                    >
                      <button className="btn" type="button" id="showPassword" onClick={e=>showPassword("confirm_password")}>
                        <i className="bi bi-eye-fill" id={`visibleIcon-${'confirm_password'}`} style={{cursor:"pointer"}}></i>
                      </button>
                    </div>                
                </div>
                </div>
                <div >
                  <div className="col-10 mx-4 mt-3">
                     Use 8 or more characters with a mix of letters, numbers and symbols, Must not contain your name or username.
                  </div>
                </div>

              </div>
              <button className="btn  btn-outline-success fs-2 p-2 fw-light" onClick={submitForm}>Update Password</button>
            </div>
        </div>
      </section>
        </div>
      </div>
    </div>
  )
}
export default ChangePassword;