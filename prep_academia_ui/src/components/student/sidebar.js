import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";
function Sidebar() {
  const student_id = localStorage.getItem("studentId");
  const [notifData, setNotifData] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/student/fetch-all-notification/${student_id}`)
        .then((res) => {
          console.log(res);
          setNotifData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  let comingSoon = ()=>{
    Swal.fire({
      icon:'info',
      title:"<h4>Coming Soon</h4>",
      html:'<h4>Assignments feature Coming Soon</h4>'
    })
  }
  const dash = {
    height: "100%",
  };
  return (
    <div className="position-fixed SideBarIndex">
      <div
        className="offcanvas offcanvas-start  sidebar-nav text-white p-3 bg-dark"
        tabindex="-1"
        id="sideBarCanvas"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel"></h5>
        </div>
        <div className="offcanvas-body">
          <nav className="navbar-dark py-4">
            <ul className="navbar-nav">
              {/*  */}
              <li>
                <Link to={"/dashboard"}>
                  <span className="me-3 mt-5">
                    <i className="bi bi-speedometer2 h3"></i>
                  </span>
                  <span className="fw-bold h3">Dashboard</span>
                </Link>
              </li>
              {/*  */}
              <li className="my-4">
                <hr />
              </li>
              {/*  */}
              <li>
                <div className="text-muted small fw-bold text-uppercase px-3 fs-4">
                  Interface
                </div>
              </li>

              {/*  */}
              <li>
                {/* <Link to={'#collapsed'} className="nav-link px-3 sidebar-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapsed">
            <span className="me-2 ">
              <i className="bi bi-layout-split"></i>
            </span>
            <span>
              Link with href
            </span>
            <span className="mx-2 fw-bold right-icon">
              <i className="bi bi-chevron-down"></i>
            </span>
          </Link> */}
                <div className="collapse mx-5" id="collapsed">
                  <ul className="navbar-nav">
                    <li>
                      <Link to={""} className="">
                        <span className="">
                          <i className=""></i>
                        </span>
                        <span>Nested Link</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              {/*  */}
              {/* Courses Start */}
              <li>
                <Link to={"/my-courses"} className="nav-link px-lg-0 px-3 sidebar-link mb-4 mb-lg-1 mb-sm-5 mb-xs-5">
                  <span className="me-3">
                    <i className="bi bi-book-fill text-warnin "></i>
                  </span>
                  <span className="">My Courses</span>
                </Link>
              </li>
              {/* Course end */}
              {/* Courses Start */}
              <li>
                <Link to={"/my-quiz"} className="nav-link px-lg-0 px-3 sidebar-link mb-4 mb-lg-1 mb-sm-5 mb-xs-5">
                  <span className="me-3">
                    <i className="bi bi-question-circle text-warnin "></i>
                  </span>
                  <span className="">My Quiz</span>
                </Link>
              </li>
              {/* Course end */}
              {/* Favorite Course */}
              <li>
                <Link
                  to={"/favourite-courses"}
                  className="nav-link px-lg-0 px-3 sidebar-link mb-4 mb-lg-1 mb-sm-5 mb-xs-5"
                >
                  <span className="me-3">
                    <i className="bi bi-heart-fill text-danger"></i>
                  </span>
                  <span className="">Favourite Courses</span>
                </Link>
              </li>
              {/* Favorite Course End */}
              {/* My Instructors */}
              <li>
                <Link
                  to={"/my-instructors"}
                  className="nav-link px-lg-0 px-3 sidebar-link mb-4 mb-lg-1"
                >
                  <span className="me-3">
                    <i className="bi bi-person-workspace"></i>
                  </span>
                  <span className="">My Instructors</span>
                </Link>
              </li>
              {/* My Instructors End */}
              {/* Assingments */}
              <li>
                <Link 
                  to={``}
                  className="nav-link px-lg-0 px-3 sidebar-link mb-4 mb-lg-1 mb-sm-5 mb-xs-5"
                  onClick={comingSoon}
                >
                  <span className="me-3">
                    <i className="bi bi-book-half"></i>
                  </span>
                  <span className="">My Assignments</span>
                </Link>
              </li>
              {/* assignments End */}

              {/* Change Password */}
              <li>
                <Link
                  to={"/change-password"}
                  className="nav-link px-lg-0 px-3 sidebar-link  mb-4 mb-lg-1 mb-sm-5 mb-xs-5"
                >
                  <span className="me-3">
                    <i className="bi bi-person-gear"></i>
                  </span>
                  <span className="">Change Password</span>
                </Link>
              </li>
              {/* Change Password End */}
              
              {/* Profile Settings */}
              <li>
                <Link
                  to={"/profile-setting"}
                  className="nav-link px-lg-0 px-3 sidebar-link mb-5 mb-lg-1 mb-md-1 mb-sm-5 mb-xs-5"
                >
                  <span className="me-3">
                    <i className="bi bi-person-gear"></i>
                  </span>
                  <span className="">Profile Settings</span>
                </Link>
              </li>
              {/* Profile Settings End */}
              {/*  */}
              <li>
                <Link
                  to={"/logout"}
                  className="nav-link px-lg-0 px-3 sidebar-link logoutBtn fw-bold bg-danger mb-4 mb-lg-1 mb-sm-5 mb-xs-5"
                >
                  <span className="ms-3 me-3"> 
                    <i className="bi bi-box-arrow-in-right text-white"></i>
                  </span>
                  <span className="text-white">Logout</span>
                </Link>
              </li>
              {/*  */}
            </ul>
          </nav>
        </div>
      </div>
      {/* End */}
    </div>
  );
}
export default Sidebar;
