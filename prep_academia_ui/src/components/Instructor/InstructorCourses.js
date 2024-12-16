import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import { useState, useEffect } from "react";
import SecondNavBar from "../secondNavBar";
import axios from "axios";
import Swal from "sweetalert2";
import checkAuthentication from "../utilities";
import { getLocalStorage,useRedirect } from "../utilities";
import axiosInstance from "../../axios";

function InstructorCourses() {
  //  sortDownUp(courseData)
  return (
    <div>
      <SecondNavBar />
      <div className="container-xxl mt-100 ">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <section className="mt-5 col-md-10 justify-content-center">
            <IntructorCoursesTable />
          </section>
        </div>
      </div>
    </div>
  );
};

export function IntructorCoursesTable() {
  const [myCourseData, setCourseData] = useState([]);
  const instructor_id = getLocalStorage("instructor");
  const [dataIsAvailable, setDataAvailable] = useState(false);
  const [nextCourse, setNextCourse] = useState();
  const [previousCourse, setPreviousCourse] = useState();

  const redirect = useRedirect();

  const paginationHandler = (url) => {
    try {
      axiosInstance.get(url)
      .then((res) => {
        setNextCourse(res.data.next);
        setPreviousCourse(res.data.previous);
        setCourseData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  }; 

  useEffect(() => {
    try {
          axiosInstance
            .get(`/instructor/instructor-courses/`)
            .then((res) => {
              setNextCourse(res.data.next);
              setPreviousCourse(res.data.previous);
              setCourseData(res.data.results);
              setDataAvailable(true);
            })
            .then((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const comingSoon = () => {
    Swal.fire({
      icon:'info',
      html:`
      <h3 style="font-style:italic;">
       This Feature is Coming Soon!
      </h3>`
    });
  };

  const deleteCourse = (course) => {
    Swal.fire({
      icon:'warning',
      html:`
      <h3 style="font-style:italic;">
       Are you sure you want to delete the course
        <span style="font-weight:bold;">${course.title} !</span>
      </h3>`
    }).then((res) => {
      if(res.isConfirmed){
        axiosInstance.delete(`/delete/course/${course.id}`)
        .then((res) => {
          if(res.status == 200){
            Swal.fire({
              icon:'success',
              html:`
              <h3 style="font-style:italic;">
               Course 
               <span style="font-weight:bold;">
               ${course.title} !
               </span> Deleted successfully
              </h3>`
            }).then((res)=>{
              window.location.reload();
            })
          }
        })
      }
    });
  };

  const containerStyle = {
    "box-shadow": "1px 1px 5px 1px grey",
    "border-radius": "2px",
  };

  const height = {
    height: "210px",
    width: "100%",
    "object-fit": "cover",
    // "border-radius": "2px",
  };

  const  removeDefault = () => {
    const course_item = document.getElementById('courseItem');
    course_item.classList.remove('border');
  };

  return (
    <div className="">
      {/* <span className="mt">Courses</span> */}
    <div className="container-xxl">
      <div className="row mt-lg-0 mt-sm-4 mt-xs-4">
        <div className="col-12 ">
          <div className="col-lg-2 col-xs-0">
            <Sidebar />
          </div>
          {/* --------------------------- */}

      {/* ------------------------- */}
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <p className="display-5 bordr border-3 mb-5 fw-bold mt-5 d-none d-lg-block text-center p-4 badge tet-bg-dark fs-1 text-daek fw-bold" style={{background:'rgb(9, 20, 20)'}}>
            <span className="bi bi-book  me-3 "></span>
            My Courses
          </p>
           
          {dataIsAvailable ? (
            myCourseData.length == 0 ? (
              <div className="text-center fw-bold display-6 mt-5 p-5">
                <span className="bi bi-book me-3"></span>
                 You haven't create any course yet !
              </div>
            ):(
              <div className="">
              {/* <p className="display-5 mb-5 fw-bold mt-5 text-dark d-none d-lg-block text-center">
                {/* <span className="bi bi-book  me-3"></span>
                My Courses */}
              {/* </p> */}
              {myCourseData.map((course) => (
                <div
                  className="d-flex col-lg-3 col-md-4 col-sm-4 col-xs-12 h-50 mb-5"
                  data-toggle="tooltip"
                  data-placement="top"
                  title={course.title}
                  onClick={removeDefault}
                >
                  <Link
                    className="w-100 rounded position-relative outlie-primary border boder-primary border-3"
                    style={containerStyle}
                    id="courseItem"
                  >
                    <Link to={`/about/${course.title}/${course.id}`}>
                      <img
                        className="rounded"
                        src={`${course.featured_thumbnail}`}
                        style={height}
                      />
                    </Link>
                    <ul className="list-group list-group-flush col-12 ">
                      <li className="list-group-item text-center fs-4 text-wrap ">
                        <span className="bi bi-book me-3 "></span>
                        {course.title.length > 15
                          ? `${course.title.slice(0, 8)}..`
                          : course.title}
                      </li>
                      <li className=" m-0 nav-link pt-4 pb-0 text-center position-relative">
                        <p
                          className="text-white bgark rounded m-0 dropdown-toggle p-2 mx-5 fw-bold "
                          role="button"
                          data-bs-toggle="dropdown"
                          style={{background:'rgb(255, 119, 0)'}}
                        >
                          <span className="bi bi-cursor-fill me-2"></span>
                          <span className="bi bi-grid-fill me-4"></span>
                          Options
                        </p>
                        {/* ------ */}
                        <div
                          className="dropdown-menu dropdown-menu-top psotion-absolute p-3"
                          aria-labelledby="dropDownMenu"
                        >
                          <Link
                            to={`/edit-course/${course.id}`}
                            className="btn-primary rounded btn-sm btn w-100"
                          >
                            Edit
                          </Link>
                          <hr className="dropdown-divider" />

                          <Link
                            to={`/add-topic/${encodeURIComponent(course.title)}/${course.id}`}
                            className="btn-success rounded btn-sm btn w-100"
                          >
                            Add Topic
                          </Link>
                          <hr className="dropdown-divider" />
                          
                          <Link
                            to={`/all-topics/${encodeURIComponent(course.title)}/${course.id}`}
                            className="btn-dark rounded btn-sm btn w-100"
                          >
                            All Topics
                          </Link>
                          <hr className="dropdown-divider" />

                          <Link
                            to={`/add-quiz/${course.id}`}
                            // onClick={comingSoon}
                            className="btn-secondary rounded btn-sm btn w-100"
                          >
                            Add Quiz
                          </Link>
                          <hr className="dropdown-divider" />

                          <Link
                            to={``}
                            onClick={comingSoon}
                            className="btn-info rounded btn-sm btn w-100"
                          >
                            Add Study Material
                          </Link>
                         
                          <Link
                            to={``}
                            onClick={() => deleteCourse(course)}
                            className="btn-danger rounded btn-sm btn w-100"
                          >
                            Delete Course
                          </Link>
                          
                        </div>
                        {/* ------ */}
                      </li>
                    </ul>
                  </Link>
                </div>
              ))}
            </div>
            )
          ):(
            <>
            <div className="d-flex justify-content-center mt-5">
              <button  className="btn btn-dark" type="button" disabled>
                <span className="spinner-border me-3" role="status" aria-hidden="true"></span>
                Loading....
              </button>
            </div>
          </>
          )
        }

          </div>
          {/* ------------------------- */}
        </div>
      </div>
    </div>
    {/* pagination start */}
      <nav aria-label="Page navigation"  className="d-flex justify-content-center">
        <ul className="pagination m-5 justiy-content-center fw-bold display-6">
          {previousCourse &&
          <li className="page-item">
            <Link className=" page-link h4" onClick={()=>paginationHandler(previousCourse)}>
              <i className="bi bi-arrow-left me-3"></i>Previous
            </Link>
          </li>
          }
          
          {nextCourse &&  
          <li className="page-it em">
            <Link className="page-link h4" onClick={()=>paginationHandler(nextCourse)}>
              Next <i className="bi bi-arrow-right ms-3"></i>
            </Link>
          </li>
            }
        </ul>
      </nav>
      {/* pagination end */}
    </div>
  );
};

export default InstructorCourses;