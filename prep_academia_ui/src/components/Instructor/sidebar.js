import { Link } from "react-router-dom";

function TeacherSidebar() {
  return (
    <div className="position-fixed SideBarIndex ">
      <div
        className="offcanvas offcanvas-start sideChapterCont text-dark sidebar-nav bg-"
        tabindex="-1"
        id="sideBarCanvas"
        aria-labelledby="offcanvasExampleLabel"
        style={{background:'rgb(9, 20, 20)'}}
        >
        {/* rgb(255, 119, 0) */}
        {/* radial-gradient(orangered,black) */}
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sideBarCanvas"></h5>
        </div>
        <div className="offcanvas-body border-0 border-bottom border-end border-dark">
          <nav className="navbar-dark text-black py-5">
            <ul className="navbar-nav mt-5 px-4 ">
              {/*  */}
              <li>
                <Link to={"/instructor/dashboard"} className="fw-bold ">
                  <span className="me-3">
                    <i className="h3 i bi-speedometer2 "></i>
                  </span>
                  <span className="h3" style={{textShadow:'1px 1px 2px black'}}>Dashboard</span>
                </Link>
              </li>
              {/*  */}
              <li className="my-">
                <hr />
              </li>
              {/*  */}
              <li>
                <div>
                  <h4 className="fw-bold small text-uppercase my-0 fs-4 text-white text-muted">Interface</h4>
                </div>
              </li>

              {/* Courses Start */}
              <li>
                <Link
                  to={"/instructor/courses"}
                  className="nav-link py-2 mt-5 fw-bold sidebar-link py-2 xt-warning"
                  style={{color:'rgb(255, 142, 43)'}}
                >
                  
                  <span className="me-3">
                    <i className="bi bi-book"></i>
                  </span>
                  <span>My Courses</span>
                </Link>
              </li>
              {/* Course end */}
              
              {/* Quiz Start */}
              <li>
                <Link
                  to={"/instructor/quiz"}
                  className="nav-link py-2 mt-5 fw-bold sidebar-link py-2 xt-warning"
                  style={{color:'rgb(255, 142, 43)'}}
                >
                  
                  <span className="me-3">
                    <i className="bi bi-question-circle"></i>
                  </span>
                  <span>My Quiz</span>
                </Link>
              </li>
              {/* Quiz end */}
              
              {/* My Instructors */}
              <li>
                <Link to={"/add-course"} className="nav-link fw-bold py-4 sidebar-link py-2 mt-4 " style={{color:'rgb(255, 142, 43)'}}>
                  <span className="me-2">
                    <i className="bi bi-plus-lg"></i>
                  </span>
                  <span>Add Course</span>
                </Link>
              </li>
              {/* My Instructors End */}

              {/* Assingments */}
              <li>
                <Link
                  to={`/teacher-change-password`}
                  className="nav-link py-2 fw-bold sidebar-link mt-4 "
                  style={{color:'rgb(255, 142, 43)'}}>
                  <span className="me-3">
                    <i className="bi bi-lock"></i>
                  </span>
                  <span>Change Password</span>
                </Link>
              </li>
              {/* assignments End */}

              {/* Profile Settings */}
              <li>
                <Link
                  to={"/instructor/profile-settings"}
                  className="nav-link  py-4 fw-bold sidebar-link mt-4"
                  style={{color:'rgb(255, 142, 43)'}}>
                  <span className="me-3">
                    <i className="bi bi-person-gear"></i>
                  </span>
                  <span>Profile Settings</span>
                </Link>
              </li>
              {/* Profile Settings End */}

              {/*  */}
              <li>
                <Link
                  to={"/logout"}
                  className="nav-link fw-bold py-4 sidebar-link logoutBtn Rounded mt-4 bg-danger text-white"
                >
                  <span className="ms-3 me-3">
                    <i className="bi bi-box-arrow-in-right text-white"></i>
                  </span>
                  <span  className="text-white">Logout</span>
                </Link>
              </li>
              {/*  */}

            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default TeacherSidebar;
