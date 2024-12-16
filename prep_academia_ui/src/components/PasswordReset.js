import { Link, useParams, useNavigate } from "react-router-dom";
import {useEffect, useState} from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import axiosInstance from "../axios";
import { showPassword } from "./utilities";

function PasswordReset(){
    const navigate = useNavigate();
    const [passwordResetData, setPasswordResetData] = useState({
      new_password:'',
      confirm_password:'',
    });

    const {id, token} = useParams();

    const handleChange = (event) => {
        setPasswordResetData({
         ...passwordResetData,
         [event.target.name]:event.target.value
       });
    };

    const submitForm = () => {
      const config = {
        headers:{
          'Content-Type':'multipart/form-data'
        }
      };

      const _paswordResetData = new FormData();
      _paswordResetData.append('password', passwordResetData.new_password);
      _paswordResetData.append('uidb64', id);
      _paswordResetData.append('token', token);
      _paswordResetData.append('confirm_password', passwordResetData.confirm_password);

      const { new_password, confirm_password } = passwordResetData;

      if(!new_password || !confirm_password){
        Swal.fire({
          icon:'warning',
          html:`
          <h3>
             <i>Fields can't be empty!</i>
          </h3>`
        });
      }else{
        try {
          axios.patch(`${process.env.REACT_APP_API_URL}/auth/v1/set-new-password/${id}/${token}`, _paswordResetData)
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

              navigate('/login');
            };                   
          }).catch((err) => {
            let error = err.response.data.detail; 
            let passwordLength = err.response.data.password ? err.response.data.password[0]:'' ;
            if(error){
                Swal.fire({
                    icon:'error',
                    html:`
                    <h3>
                       <p class='fs-3'>
                         ${error}.
                       </p>
                    </h3>`
                  });
            };
             if(passwordLength){
                Swal.fire({
                    icon:'error',
                    html:`
                    <h3>
                       <p class='fs-3'>
                         ${passwordLength}.
                       </p>
                    </h3>`
                  });
            };

          });
        }catch (error) {
        //   console.log(error)
        };
      };      
    };
    
    useEffect(()=>{
      document.title = 'Reset Password';
    },[]);

    return(
        <div className="mt-50">
        <div className="row mb-4 justify-content-center ">
          <div className="col-md-5 col-sm-7 col-xs-10">
          <div className="card">
           <p className="text-center fs-2 fw-bold text-dark mt-3">Reset password</p>
          <div className="row justify-content-center">
            <img src='../../logo512.png' width={100}  className='col-5'/>
          </div>
            {/* <div className="card-body">

               <div className="mb-5">
                   <label htmlFor='new_password' className="form-label text-dark">
                     New password
                   </label>
                   <input 
                    name='new_password' 
                    className="form-control col" placeholder="new password" 
                    id="new_password" 
                    autoComplete="true"
                    type={"password"}
                    required
                    value={passwordResetData.new_password} 
                    onChange={handleChange}

                   />
                    <div className="input-group-append"
                    
                    >
                      <button 
                          className="btn" 
                          type="button" 
                          id="showPassword" 
                          
                      >
                        <i 
                           className="bi bi-eye-fill " 
                           id="visibleIcon" 
                           onClick={e=>showPassword("password")}
                          style={{position:'absolute', right:'20px',bottom:'50%', cursor:'pointer', zIndex:'4'}}
                           >  
                        </i>
                      </button>
                    </div>   
                </div>
                
               <div className="mb-5">
                   <label htmlFor='confirm_password' className="form-label text-dark">
                    Confirm password
                   </label>
                   <input 
                    name='confirm_password' 
                    className="form-control col" placeholder="confirm password" 
                    id="confirm_password" 
                    autoComplete="true"
                    type={"password"}
                    required
                    value={passwordResetData.confirm_password} 
                    onChange={handleChange} 
                   />

        <div className="input-group-append"                
                    >
                      <button 
                          className="btn" 
                          type="button" 
                          id="showPassword" 
                          
                      >
                        <i 
                           className="bi bi-eye-fill " 
                           id="visibleIcon" 
                           onClick={e=>showPassword("password")}
                          style={{position:'absolute', right:'20px',bottom:'22%', cursor:'pointer', zIndex:'4'}}
                           >  
                        </i>
                      </button>
                    </div>   
                </div>
      
                <button  
                  className="btn btn-primary" 
                  onClick={submitForm}
                >
                  Submit
                </button> 
            </div>                 */}
            <div className="card-body">

<div className="mb-5" style={{ position: 'relative' }}>
  <label htmlFor='new_password' className="form-label text-dark">
    New password
  </label>
  <input 
    name='new_password' 
    className="form-control col" 
    placeholder="new password" 
    id="new_password" 
    autoComplete="true"
    type="password"
    required
    value={passwordResetData.new_password} 
    onChange={handleChange}
    style={{ paddingRight: '40px' }}  // Add space for the icon
  />
  <i 
    className="bi bi-eye-fill" 
    id={`visibleIcon-${'new_password'}`}
    onClick={() => showPassword("new_password")}
    style={{
      position: 'absolute',
      right: '10px',
      top: '70%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      zIndex: '10'
    }}
  ></i>
</div>

<div className="mb-5" style={{ position: 'relative' }}>
  <label htmlFor='confirm_password' className="form-label text-dark">
    Confirm password
  </label>
  <input 
    name='confirm_password' 
    className="form-control col" 
    placeholder="confirm password" 
    id="confirm_password" 
    autoComplete="true"
    type="password"
    required
    value={passwordResetData.confirm_password} 
    onChange={handleChange}
    style={{ paddingRight: '40px' }}  // Add space for the icon
  />
  <i 
    className="bi bi-eye-fill" 
    id={`visibleIcon-${'confirm_password'}`} 
    onClick={() => showPassword("confirm_password")}
    style={{
      position: 'absolute',
      right: '10px',
      top: '70%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      zIndex: '10'
    }}
  ></i>
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

export default PasswordReset;