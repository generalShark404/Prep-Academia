import { Link } from "react-router-dom";
import {useEffect, useState} from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import axiosInstance from "../axios";

function ForgotPassword(){
    const [emailData, setEmailData] = useState({
      email:'',
    });

    const [errorMsg, setErrorMsg] = useState('');
    const [sucessMsg, setSuccessMsg] = useState('');

    const handleChange = (event) => {
      setEmailData({
        ...emailData,
        [event.target.name]:event.target.value
      });
    };

    const submitForm = () => {

      const config = {
        headers:{
          'Content-Type':'multipart/form-data'
        }
      };

      const _emailFormData = new FormData();
      _emailFormData.append('email', emailData.email);

      console.log(_emailFormData)

      const { email } = emailData;

      if(!email){
        Swal.fire({
          icon:'warning',
          html:`
          <h3>
             <i>Email can't be empty!</i>
          </h3>`
        });
      }else{
        try {
          axios.post(`${process.env.REACT_APP_API_URL}/auth/v1/password-reset/`, _emailFormData)
          .then((res)=>{
            if(res.status == 200){
              Swal.fire({
                icon:'success',
                html:`
                <h3>
                   <p class='fs-3'>
                     ${res.data.message}
                   </p>
                </h3>`
              });
              setEmailData({
                email:''
              });
            };           
            console.log(res)         
          }).catch((err) => console.log(err));
        }catch (error) {
          console.log(error)
        };
      };      
    };
    
    useEffect(()=>{
      document.title = 'Forgot Password'
    },[])

    return(
        <div className="mt-50">
        <div className="row mb-4 justify-content-center ">
          <div className="col-md-5 col-sm-7 col-xs-10">
            {sucessMsg && <h3 className="text-center text-success fw-bold box">{sucessMsg}</h3>}

            {errorMsg && <h3 className="text-center text-danger fw-bold box">{errorMsg}</h3>}
          
          <div className="card">
           <p className="text-center fs-2 fw-bold text-dark mt-3">Forgot password</p>
          <div className="row justify-content-center">
            <img src='../../logo512.png' width={100}  className='col-5'/>
          </div>
            <div className="card-body">

               <div className="mb-5">
                   <label htmlFor='email' className="form-label text-dark">Enter Your Email</label>
                   <input 
                    name='email' 
                    className="form-control col" placeholder="Email" 
                    id="email" 
                    autoComplete="true"
                    type={"email"}
                    required
                    value={emailData.email} 
                    onChange={handleChange} 
                   />
                </div>
      
                <button  
                  className="btn btn-primary" 
                  onClick={submitForm}
                >
                  Submit
                </button> 
            </div>                
            </div>                
          </div>         
        </div>        
    </div>
    );
};

export default ForgotPassword;