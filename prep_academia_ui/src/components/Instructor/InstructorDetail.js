import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../axios";

const baseUrl = "http://127.0.0.1:8000/api";

function InstructorDetail() {
  const [InstructorData, setInstructorData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [dataAvailable, setDataAvailable]  = useState(false);

  let { instructor_id } = useParams();

  useEffect(() => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/instructor/instructor/${instructor_id}`).then((res) => {
        setInstructorData(res.data);
        setDataAvailable(true);
      });
    } catch (error) {
      console.log(error);
    }
    document.title = "Instructor";
  }, []);

  const img_style = {
    height: "230px",
    width: "230px",
    "object-fit": "cover",
    "box-shadow": "1px 2px 3px 1px grey",
  };
  let NotSet = () => {
    Swal.fire({
      icon: "error",
      html: `<h3 style="font-style:italic;">
              Not Linked Yet !<br>
            </h3>`,
    });
  };

  const containerStyle2 = {
    "box-shadow": "1px 1px 5px 1px grey",
    "border-radius": "2px",
    'object-fit': "cover",
  };
  console.log(InstructorData);
  return (
    <div>

<section className="bg-light py-3 py-md-5 py-xl-8 mt-5">
  <div className="d-flex justify-content-center">
    <p className="m-0 mt-5 col-10  text-center fs-1 fw-bold tex-dark badge text-bg-dark text-light p-4">
      Instructor Profile
    </p>
  </div>

  {dataAvailable ? 
    <div className="container mt-5">
      <div className="row gy-4 gy-lg-0">
        <div className="col-12 col-lg-4 col-xl-3">
          <div className="row gy-4">
            <div className="col-12">
              <div className="card widget-card border-light shadow-sm">
                <div className="card-header text-bg-dark p-3"></div>
                <div className="card-body">
                  <div className="text-center mb-3">
          
                    <img src={`${InstructorData.profile_img != null ? `${process.env.REACT_APP_URL}/${InstructorData.profile_img}` : '../../assets/images/no-profile2.jpeg'}`} className="rounded-circle" alt="profile Image" style={img_style}/>
                  </div>
                  <h5 className="text-center mb-1">
                    <span className="fs-2">
                      {InstructorData.instructor_info ? InstructorData.instructor_info.username : ''}</span>
                  </h5>
                  {/* <p className="text-center text-secondary mb-4">Project Manager</p> */}
                  <ul className="list-group list-group-flush mb-4">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <h6 className="m-0 fs-3">
                        <span className="bi bi-book me-2"></span>
                        Courses
                      </h6>
                      <span className="fs-3">   
                        {' '+ InstructorData.total_teacher_courses}
                    </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <h6 className="m-0 fs-3">
                      <span className="bi bi-person me-2"></span>
                        Students
                      </h6>
                      <span className="fs-3">         
                        {' '+ InstructorData.total_teacher_students}
                    </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div className="col-12 col-lg-8 col-xl-9 border-2 border rounded-4">
          <div className="card widget-card border-light shadow-sm">
          </div>
            <div className=" col-md-12 mt-2 p-3 text-dark bg-light mt-5">
              <div>
                 {InstructorData.first_name &&
                    <p>
                      <span className="fw-bold fs-2">
                        <span className="bi bi-file-person-fill me-2"></span>
                        Name: 
                      </span>
                      <span className="fs-2">
                        {InstructorData.first_name + " " + InstructorData.last_name}</span>
                    </p>
                 }
                  <p>
                  <span className="fw-bold fs-2">
                      <span className="bi bi-book me-2"></span>
                      Courses: 
                    </span>
                    <span className="fs-3"> 
                        {' '+ InstructorData.total_teacher_courses}
                    </span>
                  </p>
                  <p>
                  <span className="fw-bold fs-2">
                      <span className="bi bi-person me-2"></span>
                      Students: 
                    </span>
                    <span className="fs-3">                               
                        {' '+ InstructorData.total_teacher_students}
                    </span>
                  </p>
                  
                 {InstructorData.about && InstructorData.about !== 'null' && 
                  <p>
                  <span className="fw-bold fs-2">
                      <span className="bi bi-mortarboard me-2"></span>
                      About: 
                    </span>
                    <span className="fs-3">                     {InstructorData.about}
                    </span>
                  </p>
                 }

                  <div className="text- fs-2 fw-bold text-">
                    Social Accounts
                  </div>
              <div
                className="bg-light d-flex justify-content-start ext-center pt-2 mb-3"
                    >
                      {InstructorData && InstructorData.facebook_url && (
                        <Link
                          className="btn btn-sm-square bg-primary mx-1 "
                          to={`${InstructorData.facebook_url}`}
                          target="blank"
                        >
                          <i className="fab fa-facebook-f " />
                        </Link>
                      )}
                      {InstructorData && InstructorData.twitter_url && (
                        <Link
                          className="btn btn-sm-square bg-dark text-white mx-1"
                          to={`${InstructorData.twitter_url}`}
                        >
                          <i className="fab fa-x" />
                        </Link>
                      )}
                      {InstructorData && InstructorData.instagram_url && (
                        <Link
                          className="btn btn-sm-square btn-danger mx-1"
                          to={`${InstructorData.instagram_url}`}
                        >fv11`1`
                          <i className="fab fa-instagram" />
                        </Link>
                      )}
                      {InstructorData && InstructorData.website_url && (
                        <Link
                          className="btn btn-sm-square bg-primary mx-1"
                          to={`${InstructorData.website_url}`}
                        >
                          <i className="bi bi-globe" />
                        </Link>
                      )}
                      {/* -----  IF NULL ------- */}
                      {InstructorData.facebook_url == null || InstructorData.facebook_url == ""  && (
                        <Link
                          className="btn btn-sm-square bg-primary mx-1"
                          onClick={NotSet}
                        >
                          <i className="fab fa-facebook-f" />
                        </Link>
                      )}
{/* A Cyber security specialist and analyst that also specializes in development using python, django, and react. */}
                      {InstructorData.twitter_url == null || InstructorData.twitter_url == "" && (
                        <Link
                          className="btn btn-sm-square bg-dark text-white mx-1"
                          onClick={NotSet}
                        >
                          <i className="fab fa-x" />
                        </Link>
                      )}

                      {InstructorData.instagram_url == null || InstructorData.instagram_url == "" && (
                        <Link
                          className="btn btn-sm-square btn-danger mx-1"
                          onClick={NotSet}
                        >
                          <i className="fab fa-instagram" />
                        </Link>
                      )}

                      {InstructorData.website_url == null && (
                        <Link
                          className="btn btn-sm-square bg-primary mx-1"
                          onClick={NotSet}
                        >
                          <i className="bi bi-globe" />
                        </Link>
                      )}

                      {/* ----- END IF NULL ------- */}
                    </div>
              </div>
            </div>
        </div>
      </div>
    </div> 
  : 
    <div className="d-flex justify-content-center col-12 mt-5">
        <button  className="btn btn-secondary" type="button" disabled>
          <span className="spinner-border me-3" role="status" aria-hidden="true"></span>
          Loading....
        </button>
    </div> 
}

   </section>
    </div>
  );
}
export default InstructorDetail;
