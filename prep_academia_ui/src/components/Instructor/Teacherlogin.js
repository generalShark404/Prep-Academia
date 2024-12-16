import { Link } from "react-router-dom"
import {useEffect, useState} from 'react'
import axios from "axios"
import axiosInstance from "../../axios"

const baseUrl = 'http://127.0.0.1:8000/api'
function TeacherLogin(){
    const [teacherLoginData, setTeacherLoginData] = useState({
      username:'',
      password:''
    });
   const [instructorLoginStatus, setInstructorLoginStatus]  = useState('');
   const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (event)=>{
      setTeacherLoginData({
        ...teacherLoginData,
        [event.target.name]:event.target.value
      });
    };

    const submitForm = (event)=>{
      event.preventDefault()
      const teacherFormData = new FormData()
      teacherFormData.append('username', teacherLoginData.username)
      teacherFormData.append('password', teacherLoginData.password)
      try {
        axiosInstance.post('instructor/token', teacherFormData)
        .then((res)=>{
          if(res.data.status = 200 || 201){
            setInstructorLoginStatus('true');
          }else{
            setTimeout(() => {
              setErrorMsg(res.data.msg)
            }, 4);
          }
          console.log(res)         
        }).then((error)=>console.log(error));  
      } catch (error) {
        console.log(error)
      }
    
      if(instructorLoginStatus === 'true'){
        window.location.href = '/instructor-dashboard';
      }
    }
    
    useEffect(()=>{
      document.title = 'Login'
    })

    return(
        <div className="mt-50">
        {/* <header id="fh5co-header" className="fh5co-cover fh5co-cover-sm mb-5" role="banner" style={{backgroundImage: 'url(../../assets/images/flag1.jpg)'}} data-stellar-background-ratio="0.5">
          <div className="overlay" />
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center">
                <div className="display-t">
                  <div className="display-tc animate-box" data-animate-effect="fadeIn">
                    <h1 className="fw-bolder">Teacher Log In</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header> */}
        <div className="row mb-4 justify-content-center ">
          <div className="col-md-5 col-sm-7 col-xs-10">
            {errorMsg && <h3 className="text-center text-danger fw-bold box">{errorMsg}</h3>}
          <div className="card">
          <div className="row justify-content-center">
            <img src='../../logo512.png' width={100}  className='col-5'/>
          </div>
          {/* 09066970703 */}
            <div className="card-body">
               <div className="mb-5">
                   <label htmlFor='email' className="form-label">Username</label>
                   <input name='username' value={teacherLoginData.username} onChange={handleChange} className="form-control col" placeholder="email" id="email" autoComplete="false"/>
                </div>         
               <div className="mb-3">
                   <label htmlFor='password' className="form-label">password</label>
                   <input name='password' value={teacherLoginData.password} onChange={handleChange} className="form-control col" type={'password'} placeholder="password" id="password" autoComplete="false"/>
                </div>
                {/* <div className="mb-3">
                    <input type={'checkbox'} className='form-check-input mr-5' id="check" />
                    <label className="mx-3 form-check-label" htmlFor='check'>Remember Me</label>
                </div>    */}
                <button  type="submit" className="btn btn-primary" onClick={submitForm}>Login</button>
                <p className="mt-3">Don't have an account ? <Link to="/teacher-register">Create an account</Link>
                </p>
                <p className="mt-3 "><Link to="/teacher-forgot-password" className="text-danger">Forgot Password ?</Link>
                </p> 
            </div>                
            </div>                
          </div>         
        </div>        
    </div>
    )
}
export default TeacherLogin