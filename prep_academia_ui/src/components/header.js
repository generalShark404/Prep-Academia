import { Link } from "react-router-dom";
import "../header.css";
import "../fontawesome/css/all.css";
import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import axios from "axios";
import { getLocalStorage, options_func, removeLocalStorage} from "./utilities";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const [searchString, setSearchString] = useState({
    search: "",
  });
  
  const studentLoginStatus = localStorage.getItem('student') ? localStorage.getItem('student') : false;
  const [studentData, setStudentData] = useState({});
  const [studentDataAvailable, setStudentDataAvailable] = useState(false);
  
  const instructorLoginStatus = localStorage.getItem('instructor') ? localStorage.getItem('instructor') : false;
  const [instructorData, setInstructorData] = useState([]);
  const [instructorDataAvailable, setInstructorDataAvailable] = useState(false);
  
  const [loading, setLoading] = useState(true);

  const refresh = JSON.parse(localStorage.getItem('refresh'));
  console.log(refresh);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user_id = getLocalStorage("user");
        const instructor_id = getLocalStorage("instructor");
  
        const res = await axiosInstance.get(`/is-authenticated`);
  
        if (res.status == "200" || res.status == "201") {
          console.log(res.data);
          switch (res.data.user) {
            case "student":
              await axiosInstance
                .get(`student/student-profile/`)
                .then((res) => {
                  setStudentDataAvailable(true);
                  setStudentData(res.data.student);
                })
                .catch((error) => {
                  console.log(error);
                });
              break;
            case "instructor":
              await axiosInstance
                .get(`/instructor/instructor-profile/`)
                .then((res) => {
                  setInstructorData(res.data.instructor);
                  setInstructorDataAvailable(true);
                })
                .catch((error) => {
                  console.log(error);
                });
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      };

    };
  
    fetchUserData();
  }, []);

  const logoutUser = async ()=>{
    const res = await axiosInstance.post('auth/v1/user/logout/', {'refresh_token':refresh});

    if(res.status == 200){
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('student');
      localStorage.removeItem('instructor');
      
      //Would come back later torectify chnaging color when instructor logs out and color doesn't change till after page refresh
      // navigate('/login');
      window.location.href = '/login';
    };
  };
  
  const navStyle = {
    "margin-bottom": "0px",
    padding: "6px",
    color: "white",
    position: "fixed",
    "z-index": "3",
  };
  
  const navChild = {
    "text-color": "white",
    float: "right",
  };

  return (
    <>
      <nav className={`navbar bg-body-tertiary fixed-top navbar-expand-md ${options_func(instructorLoginStatus, '', 'bg-dark')} border-0 border-bottom border-start border-warning  border-2"`} style={{ background: options_func(instructorLoginStatus, 'rgb(9, 20, 20)', '')}}>
        <div className="container-fluid position-relative">
          <Link classNameName="navbar-brand " to={"/"}>
            <span classNameName="navbar-logo fw-bold text-light logo" style={{ fontSize: "20px" }}>
              <span className="bi bi-diamond-half me-2"></span>
              <span className="">PREP ACADEMIA</span>
            </span>
          </Link>
          {studentLoginStatus && (
            <div className=" bg-warning end-0">
              <img
                className="dropdown-oggle nabar-icon position-absolute end-0 mx-5 bottom-10 rounded-circle translate-middle border border-3 border-secondary"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                width="50px"
                height="50px"
                style={{ objectFit: "cover" }} 
                src={
                  studentDataAvailable ?
                  studentData.profile_img == '' || studentData.profile_img == null  ? "../../assets/images/no-profile2.jpeg" : 
                  `${process.env.REACT_APP_URL}${studentData.profile_img}`
                  :"../../assets/images/loader1.gif"
                }
              />
              <ul className="dropdown-menu dropdown-menu-end p-3 bg-dark">
                <li>
                  <Link className="dropdown-item text-center text-secondary fw-bold bg-dark" href="#">
                    <p className="m-0 text-warning">
                      <span className="bi bi-person me-2"></span>
                      Student
                    </p>
                    <span className="">{studentData ?studentData.username : ''}</span>
                  </Link>
                </li>
                <hr className="dropdown-divider " />
                <li>
                  <Link to="/dashboard" className="dropdown-item text text-white fw-bold bg-dark" href="#">
                    <span className="bi bi-speedometer me-2 text-warning"></span>
                    <span>Dashboard</span>
                  </Link>
                </li>
                <hr className="dropdown-divider " />
                <li>
                  <Link to="/favourite-courses" className="dropdown-item text-white fw-bold bg-dark text-dark" href="#">
                    <span className="bi bi-heart-fill  text-danger me-2 fw-bold"></span>
                    Favorite Courses
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider " />
                </li>
                <li>
                  <Link to="/my-courses" className="dropdown-item text-white fw-bold bg-dark" href="#">
                    <span className="bi bi-book text-primary me-2"></span>
                    My Courses
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="/my-quiz" className="dropdown-item text-white fw-bold bg-dark" href="#">
                    <span className="bi bi-question text-warning me-2"></span>
                    My Quiz
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="/profile-setting" className="dropdown-item text-white fw-bold bg-dark" href="#">
                    <span className="bi bi-person-gear text me-2 text-success"></span>
                    Profile Settings
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider " />
                </li>
                <li>
                  <Link onClick={logoutUser} className="dropdown-item bg-danger rounded text-white p-3" href="#">
                    <span className="bi bi-box-arrow-right me-2 "></span>
                    <span className="fw-bold">LOGOUT</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
  
          {instructorLoginStatus && (
            <div className=" bg-warning end-0">
              <img
                className="dropdown-oggle nabar-icon position-absolute end-0 mx-5 bottom-10 rounded-circle translate-middle "
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                width="50px"
                height="50px"
                style={{ objectFit: "cover" }}
                src={instructorDataAvailable
                   ? 
                   `${instructorData.profile_img == null ? "../../assets/images/no-profile.jpeg" : `${process.env.REACT_APP_URL}` + instructorData.profile_img}`:
                   "../../assets/images/loader1.gif"}
              />
              <ul className="dropdown-menu dropdown-menu-end p-3 bg-dak" style={{ background: 'rgb(9, 20, 20)' }}>
              <li>
                  <Link className="dropdown-item text-center text-secondary fw-bold bg-dark" href="#">
                    <p className="m-0 text-warning">
                      <span className="bi bi-person me-2"></span>
                      Instructor
                    </p>
                    <span className="">{
                     instructorData ? 
                     instructorData.instructor_info ?instructorData.instructor_info.username : "" :""}</span>
                  </Link>
                </li>
                <hr className="dropdown-divider " />
                <li>
                  <Link to="/instructor/dashboard" className="dropdown-item  text-secondary fw-bold">
                    <span className="bi bi-speedometer me-3 text-warning"></span>
                    <span>Dashboard</span>
                  </Link>
                </li>
                <hr className="dropdown-divider " />
                <li>
                  <Link to="/instructor/courses" className="dropdown-item text-secondary fw-bold">
                    <span className="bi bi-book text-danger me-3"> </span>
                    My Courses
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider " />
                </li>
                <li>
                  <Link to="/add-course" className="dropdown-item text-secondary fw-bold">
                    <span className="bi bi-plus-lg text-warning me-3"></span>
                    Add Courses
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="/instructor/profile-settings" className="dropdown-item text-secondary fw-bold">
                    <span className="bi bi-person-gear text-primary me-3"></span>
                    Profile Settings
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link onClick={logoutUser} className="dropdown-item bg-danger rounded text-white p-3" href="#">
                    <span className="bi bi-box-arrow-right me-3"></span>
                    <span className="fw-bold">LOGOUT</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
  
          <button className="navbar-toggler bi bi-list navbar-icon text-light position-relative bg-warnig p-0 d-non" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation"></button>
          <div className="offcanvas offcanvas-end  bg-dark" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header bg-dark">
              <Link classNameName="navbar-brand " to={"/"}>
                <span classNameName="navbar-logo fw-bold">
                  <span className="bi bi-diamond-half me-2"></span>
                  PREP ACADEMIA
                </span>
              </Link>
              <button type="button" className="btn-close bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center flex-grow-1 pe-3 mx-3">
                <li className="nav-item">
                  <Link className="nav-link active text-warning" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-warning" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-warning" to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
              {!loading && !studentLoginStatus && !instructorLoginStatus && 
      <div className="">
        <div className="d-flex">
          <Link to="/login" className="nav-link text-success text-white  mt-2">
            <li className="nav-item mt-3 btn btn-success border border-bg-white ">
              Login
            </li>
          </Link>
          <Link to="/register" className="nav-link text-success text-white  mt-2">
              <li className="nav-item mt-3 btn btn-warning border border-bg-white ">
                    Register
              </li>
            </Link>
        </div>
      </div>
      }
            </div>
          </div>
        </div>
      </nav>

    </>
  
  );
}

export default Header;