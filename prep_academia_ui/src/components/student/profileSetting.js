import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SecondNavBar from "../secondNavBar";
import Swal from "sweetalert2";
import axiosInstance from "../../axios";
import checkAuthentication from "../utilities";
import { getLocalStorage, useRedirect, noIdLogoutUser } from "../utilities";

function ProfileSetting() {
  const [student, setStudentData] = useState({
    profile_img: "",
    p_img: "",
    about: "",
    mobile_number: "",
    first_name: "",
    last_name: "",
    facebook_url: "",
    x_url: "",
    instagram_url: "",
  });

  const user_id = getLocalStorage("user");
  const redirect = useRedirect();
  const [dataAvailable, setDataAvailable ] = useState(false);

  const handleChange = (event) => {
    setStudentData({
      ...student,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setStudentData({
      ...student,
      [event.target.name]: event.target.files[0],
    });
  };

  useEffect(() => {
      try {
          axiosInstance
            .get(`student/student`)
            .then((res) => {
              let p_img = [
                {p_img:''}
              ];

              setStudentData(...res.data, ...p_img);
              setDataAvailable(true);
            })
            .catch((err) => console.log(err));
      }
      catch (error) {
        console.log(error);
      };
    
    document.title = "Profile Setting";
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    const studentFormData = new FormData();
    studentFormData.append("about", student.about);
    studentFormData.append("first_name", student.first_name);
    studentFormData.append("last_name", student.last_name);
    studentFormData.append("mobile_number", student.mobile_number);
    studentFormData.append("instagram_url", student.instagram_url || "");
    studentFormData.append("x_url", student.x_url || "");
    studentFormData.append("facebook_url", student.facebook_url || "");

    if (student.p_img !== "" && student.p_img !== undefined) {
      studentFormData.append("profile_img", student.p_img, student.p_img.name);
    }else{}
    try {
      axiosInstance
        .put(`student/student-update-profile/`, studentFormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200 || res.status == 201) {
            Swal.fire({
              icon: "success",
              // toast: true,
              title: "Profile updated",
              timerProgressBar: true,
              timer: 5000,
              showConfirmButton: false,
            });
          }
        })
        .catch((err) => {
          let error = document.getElementsByClassName("error");
          let emailError = document.getElementById("emailError");
          let username_error = document.getElementById("username_error");
          console.log(err);
          if (
            err.response.data.email ==
            "user profile with this email already exists."
          ) {
            emailError.classList.remove("hide-text");
          }
          if (
            err.response.data.username ==
            "user profile with this username already exists."
          ) {
            username_error.classList.remove("hide-text");
          }
          if (
            err.response.data.profile_img ==
            "The submitted data was not a file. Check the encoding type on the form."
          ) {
          }
          console.log(err.response.length);
          console.log(error.length);
          setTimeout(() => {
            for (let i = 0; i < error.length; i++) {
              error[i].classList.add("hide-text");
              console.log(i);
              console.log(error[i]);
            }
          }, 3000);
        });
    } catch (error) {
      console.log(error);
      setStudentData({ status: "error" });
    }
  };

  return (
    <div className="">
      <SecondNavBar colorStyle={"bg-student-dashboard"} />
     
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
                     student.profile_img  == null || student.profile_img  == "" ? '../../assets/images/no-profile2.jpeg' : student.profile_img:'../../assets/images/loader1.gif' }
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
                  value={student.first_name}
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
                  value={student.last_name}
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
                  value={student.about}
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
                  value={student.mobile_number}
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
                  value={student.instagram_url}
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
                  value={student.facebook_url}
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
                  value={student.x_url}
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
}
export default ProfileSetting;
