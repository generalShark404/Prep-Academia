import Sidebar from "./sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import SecondNavBar from "../secondNavBar";
import { useEffect, useState } from "react";
import checkAuthentication from "../utilities";
import { getLocalStorage, useRedirect } from "../utilities";
import axiosInstance from "../../axios";
import ProfileSetting from "../ProfileSettings/ProfileSettings";

function InstructorProfileSettings() {
  const [instructorData, setInstructorData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    about: "",
    mobile_number: "",
    profile_img: "",
    p_img: "",
    facebook_url: "",
    instagram_url: "",
    twitter_url: "",
    website_url: "",
  });

  const redirect = useRedirect();
  const instructor_id = getLocalStorage("instructor");
  const [dataAvailable, setDataAvailable] = useState(false);

  const handleChange = (event) => {
    setInstructorData({
      ...instructorData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    console.log(event);
    setInstructorData({
      ...instructorData,
      [event.target.name]: event.target.files[0],
    });
  };

  useEffect(() => {
    try {
      axiosInstance.get(`instructor/instructor/`).then((res) => {
        console.log(res.data);
        setInstructorData({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          // email: res.data.email,
          about: res.data.about,
          mobile_number: res.data.mobile_number,
          address: res.data.address,
          profile_img: res.data.profile_img,
          p_img: "",
          website_url: res.data.website_url,
          instagram_url: res.data.instagram_url,
          twitter_url: res.data.twitter_url,
          facebook_url: res.data.facebook_url,
        });

        setDataAvailable(true);
      });
    } catch (error) {
      console.log(error);
    }
    document.title = "Instructor Profile Settings";
  }, []);

  const submitForm = () => {
    const teacherFormData = new FormData();
    teacherFormData.append("first_name", instructorData.first_name);
    teacherFormData.append("email", instructorData.email);
    teacherFormData.append("mobile_number", instructorData.mobile_number);
    teacherFormData.append("last_name", instructorData.last_name);
    teacherFormData.append("about", instructorData.about);
    teacherFormData.append("address", instructorData.address);
    teacherFormData.append("facebook_url", instructorData.facebook_url || "");
    teacherFormData.append("instagram_url", instructorData.instagram_url || "");
    teacherFormData.append("twitter_url", instructorData.twitter_url || "");
    // teacherFormData.append("website_url", instructorData.website_url);

    if (instructorData.p_img !== "") {
      teacherFormData.append(
        "profile_img",
        instructorData.p_img,
        instructorData.p_img.name
      );
    }

    try {
      axiosInstance
        .put(`/instructor/instructor/`, teacherFormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            Swal.fire({
              title: "Profile Setting has been updated",
              timer: 1000,
              icon: "success",
              timerProgressBar: true,
              showConfirmButton: true,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            html: `
              ${
                error.response.data.instagram_url
                  ? `
                <p class="fs-2">
                  ${
                    error.response
                      ? error.response.data.instagram_url[0] + " (instagram)"
                      : ""
                  } 
                </p>
                `
                  : ""
              }
              ${
                error.response.data.facebook_url
                  ? `
                <p class="fs-2">
                  ${
                    error.response
                      ? error.response.data.facebook_url[0] + " (facebook)."
                      : ""
                  } 
                </p>
                `
                  : ""
              }
              ${
                error.response.data.twitter_url
                  ? `
                <p class="fs-2">
                  ${
                    error.response
                      ? error.response.data.twitter_url[0] + " (X)"
                      : ""
                  } 
                </p>
                `
                  : ""
              }
            `,
          });
        });
    } catch (error) {
      console.log(error);
      setInstructorData({ status: "error" });
    }
  };

  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus != "true") {
    // window.location.href = "/teacher-login";
  }

  return (
    <>
      <ProfileSetting
        Sidebar={Sidebar}
        profileData={instructorData}
        dataAvailable={dataAvailable}
        handleChange={handleChange}
        submitForm={submitForm}
        handleFileChange={handleFileChange}
      />
    </>
    // <div className="">
    //   <SecondNavBar />
    //   <div className="container mt-0">
    //     <div className="row mt-0 mb-5">
    //       <div className="col-md-3">
    //         <Sidebar />
    //       </div>
    //       <section className="col-md-9 mt-5 ">
    //       <div className="border border-2 row g-3">
    //         <p className="fw-bold text-dark fs-2">
    //           <span className="bi bi-person-gear me-3"></span>
    //           Profile Settings
    //         </p>
    //         {instructorData.profile_img == '' || instructorData.profile_img == null && (

    //           <p className="d-flex justify-content-center">
    //           <img
    //             className="rounded-circle"
    //             src={"../../assets/images/no-profile.jpeg"}
    //             // alt={instructorData.full_name}
    //             width="150"
    //             height={"150"}
    //             style={{ objectFit: "cover" }}
    //           />
    //         </p>
    //         )}
    //         {instructorData.profile_img && (
    //           <p className="d-flex justify-content-center">
    //           <img
    //             className="rounded-circle"
    //             src={instructorData.profile_img}
    //             // alt={instructorData.full_name}
    //             width="150"
    //             height={"150"}
    //             style={{ objectFit: "cover" }}
    //           />
    //         </p>
    //         )}
    //         <p className="border"></p>
    //         <p className="fw-bold">
    //           <span>
    //             Upload Profile image
    //           </span>
    //           <input type="file" name="p_img" className="form-control" id="inputEmail4"
    //           onChange={handleFileChange}/>
    //         </p>
    //           <div className="col-md-12 border">
    //           </div>
    //           <div className="col-md-6">
    //             <label for="inputEmail4" className="form-label">
    //               First Name
    //             </label>
    //             <input
    //                type="text" name="first_name" className="form-control" id="inputEmail4"
    //                value={instructorData.first_name}
    //                onChange={handleChange}
    //             />
    //           </div>
    //           <div className="col-md-6">
    //             <label for="inputPassword4" className="form-label">
    //               Last Name
    //             </label>
    //             <input
    //               type="text"
    //               className="form-control"
    //               id="inputPassword4"
    //               name="last_name"
    //               value={instructorData.last_name}
    //               onChange={handleChange}
    //             />
    //           </div>

    //           <div className="col-12">
    //             <label for="inputAddress" className="form-label">
    //               About
    //             </label>
    //             <textarea
    //               type="text"
    //               className="form-control"
    //               id="inputAddress"
    //               name="about"
    //               value={instructorData.about}
    //               onChange={handleChange}
    //             >
    //             </textarea>
    //           </div>
    //           <div className="col-md-6">
    //             <label for="inputEmail4" className="form-label">
    //               <span className="bi bi-instagram text-danger me-3">
    //               </span>
    //               Instagram url
    //             </label>
    //             <input
    //               type="email" name="instagram_url" className="form-control" id="inputEmail4"
    //               value={instructorData.instagram_url}
    //               onChange={handleChange}
    //             />
    //           </div>
    //           <div className="col-md-6">
    //             <label for="inputPassword4" className="form-label">
    //             <span className="bi bi-facebook text-primary me-3">
    //             </span>
    //               facebook url
    //             </label>
    //             <input
    //               type="text"
    //               className="form-control"
    //               id="inputPassword4"
    //               name="facebook_url"
    //               value={instructorData.facebook_url}
    //               onChange={handleChange}
    //             />
    //           </div>
    //           <div className="col-md-6">
    //             <label for="inputPassword4" className="form-label">
    //             <span className="bi bi-twitter text-dark me-3"></span>
    //               X
    //             </label>
    //             <input
    //               type="text"
    //               className="form-control"
    //               id="inputPassword4"
    //               name="twitter_url"
    //               value={instructorData.twitter_url}
    //               onChange={handleChange}
    //             />
    //           </div>
    //           <div className="col-md-6">
    //             <label for="inputAddress2" className="form-label">
    //               <span className="bi bi-phone me-2"></span>
    //               mobile Number
    //             </label>
    //             <input
    //               type="text"
    //               className="form-control"
    //               id="inputAddress2"
    //               name="mobile_number"
    //               placeholder="Apartment, studio, or floor"
    //               value={instructorData.mobile_number}
    //               onChange={handleChange}
    //             />
    //           </div>
    //           <div className="col-12 m-3">
    //             <button className="btn btn-primary" onClick={submitForm}>
    //               Save
    //             </button>
    //           </div>
    //         </div>
    //       </section>
    //     </div>
    //   </div>
    // </div>
  );
}
export default InstructorProfileSettings;
