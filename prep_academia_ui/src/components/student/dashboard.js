import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import SecondNavBar from "../secondNavBar";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import Cookies from "js-cookie";
import checkAuthentication from "../utilities";
import { useRedirect, getLocalStorage } from "../utilities";
import StudentResult from "./StudentResult";
import ProgressChart from "./student-progress";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function UserDashboard() {
  const [dashboard, setDashBoard] = useState([]);
  const redirect = useRedirect();

  useEffect(() => {
    try {
          axiosInstance.get(`student/student-profile/`)
          .then((res)=>{
            console.log(res.data)
            setDashBoard(res.data)
          });
      // });
    } catch (error) {
      console.log(error);
    };

    try {
      axiosInstance.get(`student/student-course-progress`)
      .then((res) => {
        console.log(res)
      });
    } catch (error) {
      console.log(error);
    };
     
    // axiosInstance.get(`${process.env.REACT_APP_API_URL}/auth/v1/student/test/`)
    document.title = "Dashboard";
  }, []);

  return (
    <div>
      <>
        <SecondNavBar colorStyle={"bg-student-dashboard"} />
        <Sidebar />
      </>
      
      <main className=" p-3  zIndex-2 mt-150 mb-50">
        <div className="container-fluid">
          <div className=""></div>
          <div className="row">
            
            {/*  */}
            <Link className="col-md-3 mb-3 col-xs-" to={"/my-courses"}>
              <div className="card text-white bg-info h-100 shadow-lg">
                <div className="text-center card-header fs-3">
                  <span className="bi bi-book px-3"></span>
                  Enrolled Courses
                </div>
                <div className="card-body bg-light rounded text-dark m-3 ">
                  <h1 className="card-title text-center px-3 fs-3">
                    <span className="bi bi-book px-3 "></span>
                    <span>{dashboard.student ? dashboard.student.enrolled_courses :''}</span>
                  </h1>
                  <p className="card-text text-center px-3 fs-4">
                    checkout the courses you are enrolled in.
                  </p>
                </div>
                <p className="card-footer mb-0 bg-light rounded text-dark fw-bold">
                  View Details{" "}
                  <i className="bi bi-chevron-right justify-content-end position-absolute end-0 px-2"></i>
                </p>
              </div>
            </Link>
            {/*  */}

            {/*  */}
            <Link className="col-md-3 mb-3" to={"/favourite-courses"}>
              <div className="card text-white bg-danger h-100">
                <div className="text-center card-header align-items-center justify-content-center ">
                  <span className="bi bi-heart px-3 "></span>
                  Favorite Courses
                </div>
                <div className="card-body m-3 bg-light rounded text-dark">
                  <h1 className="card-title text-center fs-3">
                    <span className="bi bi-heart px-3"></span>
                    <span>{dashboard.student ? dashboard.student.favorite_courses:''}</span>
                  </h1>
                  <p className="card-text text-center fs-4">
                    My favourite courses
                  </p>
                </div>
                <p className="card-footer mb-0 bg-light rounded text-dark fw-bold">
                  View Details{" "}
                  <i className="bi bi-chevron-right position-absolute end-0 px-2"></i>
                </p>
              </div>
            </Link>
            {/*  */}
            {/*  */}
            <Link className="col-md-3 mb-3" to={"/my-instructors"}>
              <div className="card text-white bg-dark h-100">
                <div className="text-center card-header align-items-center justify-content-center">
                  <span className="bi bi-person px-3 "></span>
                  Instructors
                </div>
                <div className="card-body m-3 bg-light rounded text-dark">
                  <h1 className="card-title text-center fs-3">
                    <span className="bi bi-person px-3"></span>
                    <span>{dashboard.student ? dashboard.student.all_instructors ? dashboard.student.all_instructors.length:'0' :''}</span>
                  </h1>
                  <p className="card-text text-center fs-4">
                    My Instructors
                  </p>
                </div>
                <p className="card-footer mb-0 bg-light rounded text-dark fw-bold">
                  View Details{" "}
                  <i className="bi bi-chevron-right position-absolute end-0 px-2"></i>
                </p>
              </div>
            </Link>
            {/*  */}
            {/* Those that make excuses dont make history, conquest for conquest sake means nothing,your world was built on our bones */}
            {/*  */}

            
            <Link className="col-md-3 mb-3" to={"/profile-setting"}>
              <div className="card text-white bg-success h-100 ">
                <div className="text-center card-header ">
                  <span className="bi bi-person-gear px-2"></span>
                  Profile settings
                </div>
                <div className="card-body  align-middle m-3 bg-light rounded text-dark">
                  <h1 className="card-title bi bi-person-gear text-center fs-3"></h1>
                  <p className="card-text text-center fs-4">My Profile settings</p>
                </div>
                <p className="card-footer mb-0 bg-light rounded text-dark fw-bold">
                  View Details{" "}
                  <i className="bi bi-chevron-right position-absolute end-0 px-2"></i>
                </p>
              </div>
            </Link>
            {/*  */}
          </div>
          <div className="">
            <ProgressChart courseId={'1'}/>
            <StudentResult />
          </div>
          {/* <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Topics</th>
                  <th>Instructor</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </div>
      </main>
    </div>
  );
}
// sidebar for dahboard on smaller screens
export default UserDashboard;
