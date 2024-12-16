import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import SecondNavBar from "../secondNavBar";
import decodedToken  from "./decodetoken";
import axiosInstance from "../../axios";
import checkAuthentication from "../utilities";
import { useRedirect, getLocalStorage, DifficultyChoices  } from "../utilities";

function UserCourses() {
  const [enrolledStudentCourses, setenrolledStudentCourses] = useState([]);
  const [dataIsAvailable, setDataAvailable] = useState(false);
  
  const user_id = getLocalStorage('user');
  const redirect = useRedirect();

  console.log(enrolledStudentCourses)
    useEffect(() => {
    try { 
          axiosInstance.get(`${process.env.REACT_APP_API_URL}/student/fetch-enrolled-courses/`)
            .then((res) => {
              console.log(res)
              setenrolledStudentCourses(res.data);
              setDataAvailable(true)
            });
        
    } catch (err) {
      console.log(err);
    }
    document.title = "My Courses";
  }, []);

  const containerStyle = {
    "box-shadow": "1px 1px 5px 1px grey",
    "border-radius": "2px"
    // "background":"rgb(235, 235, 235)"
  };

  const height = {
    height: "200px",
    width: "100%",
    "object-fit": "cover",
    // "border-radius": "2px",
  };
  
  return (
    <div className="">
      <SecondNavBar colorStyle={"user-course-second-nav"} />
       <header
        id="fh5co-header"
        className="float-none fh5co-cover mt-0 banner-h-50 fh5co-cover-sm b-5 col-lg-none"
        role="banner"
        style={{ backgroundImage: "url(../../assets/images/courses.jpeg)", objectFit:'cover', padding:'0px', margin:'0px'}}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay" />
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
              <div className="display-t">
                <div
                  className="display-tc animate-box"
                  data-animate-effect="fadeIn"
                >
                  <h1 className="fw-bold text-center">
                    <span className="bi bi-book"></span> Enrolled Courses
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header> 
   
      <div className="container-xxl mt-100 z-Index-2 mt-lg-5 mb-50">
        {/* <div className="myCoursesDashboardHeader">
          <h4 className="fw-bold ">My Courses</h4>
        </div> */}
        <div className="row mt-lg-5">
          <div className="col-12">
          <div className="col-lg-2 col-xs-0">
            <Sidebar />
          </div>
         {/* --------------------------- */}

         {/* ------------------------- */}
          <div className="borde col-lg-10 col-md-12 col-sm-12 col-xs-12">            
            <div className="">
              <p className="display-5 bordr border-3 mb-5 fw-bold mt-5 d-none d-lg-block text-center p-4 badge text-bg-warning fs-1 text-daek fw-bold">
                <span className="bi bi-book  me-3 "></span>
                My Enrolled Courses
              </p>
              
              
            {dataIsAvailable ? (
              enrolledStudentCourses.length == 0 ? (
                <p className="text-center fw-bold display-6 mt-5 p-5">
                  <span className="bi bi-book mx-3"></span>
                  YOU HAVEN'T ENROLLED IN ANY COURSE YET.
                </p>
              ):(
                <>
                  {enrolledStudentCourses  && enrolledStudentCourses.map((enrolled) => (
                <div
                  className="d-flex col-lg-3 col-md-4 col-sm-4 col-xs-12 h-50 mb-5" data-toggle="tooltip" data-placement="top" title={enrolled.course.title}
                >
            
                  <Link to={`/about/${enrolled.course.title}/${enrolled.course.id}`} className="w-100" style={containerStyle}>
                    <img 
                      src={`${process.env.REACT_APP_URL}${enrolled.course.featured_thumbnail}`}
                      style={height}
                    />
                    <ul className="list-group list-group-flush  ">
                      <li className="list-group-item text-center fs-3 text-wrap ">
                        <span className="bi bi-book me-3"></span>
                        {
                          enrolled.course.title && enrolled.course.title.length > 10 ?
                          `${enrolled.course.title.slice(0, 8
                            )}..`
                          : enrolled.course.title
                        }
                      </li>
                      <li className=" m-0 nav-link pt-4 pb-0 text-center">
                        <span className="text-dark">Level : </span> 
                        <span className=" rounded p-2"><DifficultyChoices choices={enrolled.course.difficulty}/></span> 
                      </li>
                    </ul>
                  </Link>
                </div>
              ))}

                </>
              )
            ):(
              <>
                <div className="d-flex justify-content-center mt-5">
                  <button  className="btn btn-warning" type="button" disabled>
                    <span className="spinner-border me-3" role="status" aria-hidden="true"></span>
                    Loading....
                  </button>
                </div>
              </>
            )
              }
            </div>
          </div>
          {/* ------------------------- */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserCourses;