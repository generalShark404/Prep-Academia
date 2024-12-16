import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { Link, redirect, useNavigate } from "react-router-dom";
import SecondNavBar from "../secondNavBar";
import { IntructorCoursesTable } from "./InstructorCourses";
import axios from "axios";
import checkAuthentication from "../utilities";
import { useRedirect, getLocalStorage } from "../utilities";
import axiosInstance from "../../axios";

function TeacherDashboard() {
  const [dashboard, setDashBoard] = useState({});
  const instructor_id = getLocalStorage("instructor");
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const redirect = useRedirect();

  useEffect(() => {
          axiosInstance
            .get(
              `/instructor/instructor-profile/`
            ).then((res) => {
              console.log(res.data);
              setDashBoard(res.data);
            }).catch((error) => {

            })
      .catch((error) => {
        console.log(error);
      });
      
    document.title = "Instructor Dashboard";
  }, []);

  console.log(dashboard)
  useEffect(() => {
   
  }, []);
  return (
    <div className="mt-md-5">
      <SecondNavBar />
      <Sidebar />
      <div className="container-fluid p-5 card">
        <main className="mt-0">
          <div className="">
            <div className="row mt-00">
              {/*  */}
              <Link className="py-4 col-md-3 col-sm-12 mb-0" to={"/instructor/courses"}>
                <div className="card text-white bg-primary h-100 shadow-lg col-sm-12">
                  <div className="text-center card-header fs-3">
                    <span className="bi bi-book me-3"></span>
                    Courses Created
                  </div>
                  <div className="card-body bg-light rounded">
                    <h1 className="card-title text-center fs-3">
                      <span className="bi bi-book px-3"></span>
                      <span>
                        {dashboard.instructor ? 
                        dashboard.instructor.total_teacher_courses
                        : ''}
                      </span>
                    </h1>
                    <p className="text-dark card-text text-center fs-3">
                      total courses
                    </p>
                  </div>
                  <p className="card-footer mb-0">
                    View Details {""}
                    <i className="bi bi-chevron-right justify-content-end position-absolute end-0 px-2"></i>
                  </p>
                </div>
              </Link>
              {/*  */}
              {/*  */}
              <Link className="py-3 col-md-3 mb-0" to={"/students"}>
                <div className="card text-white bg-warning h-100 col-sm-12">
                  <div className="text-center card-header align-items-center justify-content-center">
                    <span className="bi bi-person px-3 "></span>
                    Students
                  </div>
                  <div className="card-body m-3 bg-light rounded">
                    <h1 className="card-title text-center fs-3">
                     <span className="bi bi-person px-3 ">
                    </span>
                    <span>
                      {dashboard.instructor ? dashboard.instructor.total_teacher_students : ''}
                      </span>
                    </h1>
                    <p className="card-text text-center text-dark fs-3">total students</p>
                  </div>
                  <p className="card-footer mb-0">
                    View Details{" "}
                    <i className="bi bi-chevron-right position-absolute end-0 px-2"></i>
                  </p>
                </div>
              </Link>
              {/*  */}
              {/*  */}
              <Link className="py-3 col-md-3 mb-0" to={""}>
                <div className="card text-white bg-danger h-100 col-sm-12">
                  <div className="text-center card-header align-items-center justify-content-center">
                    <span className="bi bi-heart px-3 "></span>
                    Favorite Courses
                  </div>
                  <div className="card-body m-3 bg-light rounded">
                    <h1 className="card-title text-center fs-3">
                      <span>{dashboard.favorite_courses}</span>
                      <span className="bi bi-heart px-3"></span>
                    </h1>
                    <p className="card-text text-center text-dark fs-3">Total Quiz Created</p>
                  </div>
                  <p className="card-footer mb-0">
                    View Details{" "}
                    <i className="bi bi-chevron-right position-absolute end-0 px-2"></i>
                  </p>
                </div>
              </Link>
              {/*  */}
              {/* Those that make excuses dont make history, conquest for conquest sake means nothing,your world was built on our bones */}
              {/*  */}
              <Link className="py-3 col-md-3 mb-0" to={"/instructor/profile-settings"}>
                <div className="card text-white bg-success h-100 col-sm-12">
                  <div className="text-center card-header ">
                    <span className="bi bi-person-gear px-2"></span>
                    Profile settings
                  </div>
                  <div className="card-body bg-light rounded align-middle m-3">
                    <h1 className="card-title bi bi-person-gear text-center fs-3"></h1>
                    <p className="text-dark card-text text-center fs-4">
                      My Profile settings
                    </p>
                  </div>
                  <p className="card-footer mb-0 ">
                    View Details{" "}
                    <i className="bi bi-chevron-right position-absolute end-0 px-2"></i>
                  </p>
                </div>
              </Link>
              {/*  */}
            </div>
          </div>
          <div className="card col">
            <IntructorCoursesTable />
          </div>
        </main>
      </div>
    </div>
  );
}
export default TeacherDashboard;
