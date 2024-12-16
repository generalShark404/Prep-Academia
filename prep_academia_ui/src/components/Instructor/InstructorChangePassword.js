import {Link,useParams} from "react-router-dom";
import {useEffect, useState} from 'react';
import SecondNavBar from "../secondNavBar";
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api';

function TeacherChangeForgotPassword(){
    const [teacherData, setTeacherData] = useState({
      password:''
    });
    const instructor_id = useParams();
    const [errorMsg, setErrorMsg] = useState('');
    const [sucessMsg, setSuccessMsg] = useState('');

    const handleChange = (event)=>{
        setTeacherData({
        ...teacherData,
        [event.target.name]:event.target.value
      });
    }
    
    const submitForm = (event)=>{
      event.preventDefault()
      const teacherFormData = new FormData()
      teacherFormData.append('password', teacherData.password)
      try {
        axios.post(baseUrl + `/instructor/change-password/${instructor_id}`, teacherFormData)
        .then((res)=>{
          if(res.data.bool === true){
             setSuccessMsg(res.data.msg);
             setErrorMsg('');
          }else{
              setErrorMsg(res.data.msg);
              setSuccessMsg('');
          }
          console.log(res)         
        }).then((error)=>console.log(error));  
      } catch (error) {
        console.log(error)
      }
      const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
      console.log(teacherLoginStatus)
      if(teacherLoginStatus === 'true'){
        window.location.href = '/teacher-dashboard';
      }
    }   
    
    useEffect(()=>{
      document.title = 'Change Password'
    });

    return(
        <div>
          <SecondNavBar />
        <div className="row mb-4 justify-content-center ">
          <div className="col-md-5 col-sm-7 col-xs-10">
            {sucessMsg && <h3 className="text-center text-success fw-bold box">{sucessMsg}</h3>}

            {errorMsg && <h3 className="text-center text-danger fw-bold box">{errorMsg}</h3>}
          <div className="card">
          <div className="row justify-content-center">
            <img src='../../logo512.png' width={100}  className='col-5'/>
          </div>
          {/* 09066970703 */}
            <div className="card-body">
               <div className="mb-5">
                   <label htmlFor='email' className="form-label">Password</label>
                   <input name='password' value={teacherData.password} onChange={handleChange} className="form-control col" placeholder="password" id="email" autoComplete="false"/>
                </div>
                <button  type="submit" className="btn btn-primary" onClick={submitForm}>Change</button> 
            </div>                
            </div>                
          </div>         
        </div>        
    </div>
    )
}
export default TeacherChangeForgotPassword;