import { Link, json, redirect, useNavigate } from "react-router-dom";
import { showPassword } from "./utilities";

function RegistrationForm({ registrationData, handleChange, submitForm }){
    return(
    <div className="mt-5 mb-5">
    <div className="row mb-4 justify-content-center">
      <div className="col-md-5 col-sm-7 col-xs-11 mt-30">
    
        <div className="card">
            
          <div className="card-body" >
            
            <h3 className="text-center txt-arning p-3 fw-bold" style={{textShadow:'1px 1px 2px white', color:'orange'}}>
              <span className="bi bi-diamond-half me-2"></span>
              PREP ACADEMIA
            </h3>
            
            
            <div className="mb-5">
              <label htmlFor="username" className="form-label">
                User Name
              </label>
              <input
                type="text"
                name="username"
                className="form-control col"
                placeholder="User name"
                id="username"
                value={registrationData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                name="email"
                className="form-control col"
                placeholder="@ Email"
                id="email"
                type="email"
                value={registrationData.email}
                onChange={handleChange}
                required
              />
            </div>
        
            <div className="mb-5">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control col"
                placeholder="Password"
                id="password"
                minLength={6}
                value={registrationData.password}
                onChange={handleChange}
                required
              />
              <div className="input-group-append"
                  style={{position:'absolute', right:'10px',top:'65%',transform:'translateY(-160%)', cursor:'pointer', zIndex:'4'}}
                  >
                    <button className="btn" type="button" id="showPassword" onClick={e=>showPassword("password")}>
                      <i className="bi bi-eye-fill" id={`visibleIcon-${'password'}`} style={{cursor:"pointer"}}></i>
                    </button>
              </div> 
            </div>
            
            <div className="mb-3">
              <label htmlFor="confirm_password" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                className="form-control col"
                placeholder="Confirm Password"
                id="confirm_password"
                minLength={6}
                value={registrationData.confirm_password}
                onChange={handleChange}
                required
              />
                <div className="input-group-append"
                  style={{position:'absolute', right:'10px',top:'65%',transform:'translateY(100%)', cursor:'pointer', zIndex:'4'}}
                  >
                    <button className="btn" type="button" id="showPassword" onClick={e=>showPassword("confirm_password")}>
                      <i className="bi bi-eye-fill" id={`visibleIcon-${'confirm_password'}`}  style={{cursor:"pointer"}}></i>
                    </button>
                </div>
              <p className="mt-2 text-danger passwordError fst-italic hide-text fw-bold error"></p>
            </div>
            <h4 className="mx-3 mt-4 mb-2 fw-bolder text-danger hide-text error fw-bold" id="emptyFieldError">All Fileds must be filled !</h4>
            <button
              className="btn btn-primary mt-3"
              type="submit"
              onClick={e => submitForm(e)}
            >
              Register
            </button>
            <p className="mt-3">
              Already have an account ?
              <Link to="/login"> Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
};

export default RegistrationForm;