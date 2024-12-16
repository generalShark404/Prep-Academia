import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import SecondNavBar from "../secondNavBar";
import axios from "axios";
import axiosInstance from "../../axios";
import checkAuthentication from "../utilities";
import { getLocalStorage, useRedirect, DifficultyChoices } from "../utilities";

function FavoriteCourses() {
  const [favoriteCourse, setFavouriteData] = useState([]);
  const [dataIsAvailable, setDataAvailable] = useState(false);
  const user_id = getLocalStorage('user');
  const redirect = useRedirect();
  
  useEffect(() => {
    try {
          axiosInstance.get(`student/fetch-favorite-courses/`)
          .then((res) => {
            console.log(res)
            setFavouriteData(res.data);
            setDataAvailable(true);
          });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const containerStyle = {
    "border-radius": "2px",
    // "background":"rgb(235, 235, 235)"
    "box-shadow": "1px 1px 5px 1px grey",
  };

  const height = {
    height: "200px",
    width: "100%",
    "object-fit": "cover",
    // "border-radius": "2px",
  };

  console.log();
  return (
    <div className="">
      <SecondNavBar colorStyle={"user-course-second-nav"} />

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
              <div className="mt-4">
                <p className="display-5 mb-5 fw-bold mt-5 d-lg-block text-center border border-2 p-4 border-danger badge fs-1 text-bg-danger">
                  <span className="bi bi-heart-fill text-r me-3"></span>
                  My Favorite Courses
                </p>
                {dataIsAvailable ? (
                  favoriteCourse.length == 0 ? (
                    <>
                      <p className="text-center fw-bold display-6 mt-5 p-5">
                        <span className="bi bi-heart mx-3"></span>
                        NO FAVORITE COURSE YET.
                      </p>
                    </>
                  ): (
                    <>
                      {favoriteCourse &&
                    favoriteCourse.map((course) => (
                      <div
                        className="d-flex col-lg-3 col-md-4 col-sm-4 col-xs-12 mb-5"
                        data-toggle="tooltip"
                        data-placement="top"
                        title={course.course.title}
                      >
                        <Link
                          to={`/about/${course.course.title}/${course.course.id}`}
                          className="w-100"
                          style={containerStyle}
                        >
                          <img
                            src={`${course.course.featured_thumbnail}`}
                            style={height}
                          />
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item text-center fs-3 text-wrap ">
                              <span className="bi bi-heart-fill text-danger me-3"></span>
                              {course.course.title.length > 10
                                ? `${course.course.title.slice(0, 16)}...`
                                : course.course.title}
                            </li>
                            <li className=" m-0 nav-link pt-4 pb-0 text-center">
                              <span className="text-dark">Level : </span>
                              <span className=" p-2">
                              <DifficultyChoices choices={course.course.difficulty}/>
                              </span>
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
export default FavoriteCourses;
