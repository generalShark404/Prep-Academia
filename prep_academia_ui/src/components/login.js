import { Link, redirect, useNavigate } from "react-router-dom";
import {useState, useEffect, useContext} from 'react';import axios from "axios";
import Cookies from "js-cookie";
// import axiosInstance from "../axios";
import checkAuthentication from "./utilities";
import { showPassword, setLocalStorage, useRedirect } from "./utilities";
import Swal from "sweetalert2";


function Login(){

   const [loginData, setLoginData] = useState({
    email:"",
    password:""
   });

   const [error, setError] = useState("");

   const handleChange = (event)=>{
    setLoginData({
      ...loginData,
      [event.target.name]:event.target.value
    });
   };

   const submitForm = (event) => {
    event.preventDefault();
    const studentFormData = new FormData();
    studentFormData.append('email', loginData.email);
    studentFormData.append('password', loginData.password);
    
    const {email, password} = loginData;

      if(!email || !password){
        Swal.fire({
          icon:'info',
          html:`
          <h3>
             <p class='fs-3'>
             All fields are required.
             </p>
          </h3>`
        });
      }else{
        axios.post(`${process.env.REACT_APP_API_URL}/auth/v1/user/login/`, studentFormData)
          .then((res)=>{
            console.log(res)
            try {

              if(res.status == 200 || res.status == 201){
                  setLocalStorage('access', JSON.stringify(res.data.access_token));
                  setLocalStorage('refresh', JSON.stringify(res.data.refresh_token));

                  if(res.data.user_status.is_student){
                      setLocalStorage('student', true);
                      window.location.href = '/dashboard'; 
                  };

                  if(res.data.user_status.is_instructor){
                      setLocalStorage('instructor', true);
                      window.location.href = '/instructor/dashboard';
                  };
              };
            
            } catch (error) {
              console.log(error)  
            };
        }).catch((error) =>{
          console.log(error)
          try {
            if(error.response.data.detail == "Invalid credentials try again"){
              Swal.fire({
                icon:'error',
                html:`
                <h3>
                   <p class='fs-3'>
                   Email or password incorrect !.
                   </p>
                </h3>`
              });
            };
            
          } catch (error) {
            
          };

          try {
            if(error.response.data.email[0] == "Enter a valid email address."){
              Swal.fire({
                icon:'error',
                html:`
                <h3>
                   <p class='fs-3'>
                   Email not a valid email address !
                   </p>
                </h3>`
              });
            } 
            
          } catch (error) {
            
          };
            try {
              if(error.response.data.detail == "Email is not verified"){
                Swal.fire({
                  icon:'error',
                  html:`
                  <h3>
                     <p class='fs-3'>
                       Account not verified ! <br />
                       check email or click verify account.
                     </p>
                  </h3>`
                });
              };
              
            } catch (error) {
              
            };
            
        });
      };
  };

  useEffect(()=>{
    document.title = ' Login';
  },[]);

    return(
        <div>
        <div className="row mb-4 justify-content-center mt-150">
          <div className="col-md-5 col-sm-10 col-xs-11">
          <div className="card rounded-50">
          <div className="row justify-content-center">
              <div className="text-center mt-5">
                <h1 className="bi bi-diamond-half" style={{color:'orange'}}></h1>
              </div>
          </div>
            <div className="card-body">
              
               <div className="mb-5">
                   <label htmlFor='username' className="form-label">Email</label>
                   <input 
                     name='email' 
                     required
                     type={"email"}
                     className="form-control col" 
                     onChange={handleChange} 
                     placeholder="email" 
                     value={loginData.email} 
                     id="email"
                    />
                </div>         
               <div className="mb-3">
                   <label htmlFor='password' className="form-label">password</label>
                   <input 
                      name='password' 
                      required
                      onChange={handleChange}
                      className="form-control col" 
                      type={'password'} 
                      placeholder="password" 
                      value={loginData.password} 
                      id="password"
                    />
                   <div className="input-group-append"
                    style={{
                      position:'absolute', 
                      right:'10px',
                      top:'63%',
                      transform:'translateY(-50%)', cursor:'pointer', 
                      zIndex:'4'
                    }}
                    >
                      <button 
                          className="btn" 
                          type="button" 
                          id="showPassword" 
                          onClick={e=>showPassword("password")}
                      >
                        <i 
                           className="bi bi-eye-fill" 
                           id={`visibleIcon-${'password'}`} 
                           style={{cursor:"pointer"}}
                           >  
                        </i>
                      </button>
                    </div>   
                </div>
                <button className="btn btn-primary" onClick={submitForm} type="submit">Login</button>
                <p className="mt-3 mb-0">
                  Don't have an account? 
                  <Link to="/register"> Create an account</Link>
                </p>

                <Link className="mt-0" to={'/forgot-password'}>Forgotten password?</Link>
            </div>                
            </div>                
          </div>         
        </div>        
    </div>
    )
}
export default Login;