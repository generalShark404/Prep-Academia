import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SecondNavBar from "../secondNavBar";
import Swal from "sweetalert2";
import axiosInstance from "../../axios";
import checkAuthentication from "../utilities";
import { getLocalStorage, useRedirect, noIdLogoutUser } from "../utilities";

function ProfileSetting({Sidebar, profileData, dataAvailable, handleChange, submitForm, handleFileChange}) {
 
  return (
    <div className="">
      <SecondNavBar colorStyle={"bg-profileData-dashboard"} />
     
      <div className="container  mt-150 mb-50 px-5 py-3 ">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <section className="col-md-9 my-3 p-2 ">
            {/* <h2 className="col-">Profile Setting</h2> */}
            <div className="border border-2 row g-3 p-3 ">
            <p className="fw-bold text-dark fs-2">
              <span className="bi bi-person-gear me-3"></span>
              Profile Settings
            </p>
            
              <div className="d-flex justify-content-center">
               <div className="">
                <img
                  className="rounded-circle border border-4"
                  src={
                    dataAvailable ?
                     profileData.profile_img  == null || profileData.profile_img  == "" ? '../../assets/images/no-profile2.jpeg' : profileData.profile_img:'../../assets/images/loader1.gif' }
                  // alt={instructorData.full_name}
                  width="160"
                  height={"160"}
                  style={{ objectFit: "cover" }}
                />
               </div>
            </div>
            
            <p className="border"></p>
            <p className="fw-bold">
              <span>
                Upload Profile image
              </span>
              <input 
                type="file" 
                name="p_img" 
                className="form-control" id="inputEmail4"  
                onChange={handleFileChange}
              />
            </p>
              <div className="col-md-12 border">
              </div>
              <div className="col-md-6">
                <label for="inputEmail4" className="form-label">
                  First Name
                </label>
                <input 
                  type="text" 
                  name="first_name" className="form-control" id="inputEmail4" 
                  value={profileData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label for="inputPassword4" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  name="last_name"
                  value={profileData.last_name}
                  onChange={handleChange}
                />
              </div>
             
              <div className="col-12">
                <label for="inputAddress" className="form-label">
                  About
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  name="about"
                  placeholder="1234 Main St"
                  value={profileData.about}
                  onChange={handleChange}
                >
                </textarea>
              </div>
              <div className="col-md-6">
                <label for="inputAddress2" className="form-label">
                  <span className="bi bi-phone me-2"></span>
                  mobile Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  name="mobile_number"
                  placeholder=""
                  onChange={handleChange}
                  value={profileData.mobile_number}
                />
              </div>
              <div className="col-md-6">
                <label for="inputEmail4" className="form-label">
                  <span className="bi bi-instagram text-danger me-3"></span>
                  Instagram url
                </label>
                <input 
                  type="text" 
                  name="instagram_url" className="form-control" id="inputEmail4" 
                  onChange={handleChange}
                  value={profileData.instagram_url}
                />
              </div>
              <div className="col-md-6">
                <label for="inputPassword4" className="form-label">
                <span className="bi bi-facebook text-primary me-3"></span>
                  facebook url
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  name="facebook_url"
                  value={profileData.facebook_url}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label for="inputPassword4" className="form-label">
                <span className="bi bi-twitter text-dark me-3"></span>
                  X
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  name="twitter_url"
                  value={profileData.x_url}
                  onChange={handleChange}
                />
              </div>
              
              <div className="col-12 m-3">
                <button className="btn btn-warning btn-outline" onClick={submitForm}>
                  Update
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;