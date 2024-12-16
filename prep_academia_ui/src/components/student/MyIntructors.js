import { useState, useEffect, Props } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import SecondNavBar from "../secondNavBar";
import Swal from "sweetalert2";
import axiosInstance from "../../axios";
import checkAuthentication from "../utilities";
import { getLocalStorage, useRedirect } from "../utilities";

function MyInstructors() {
  const [instructorData, setInstructorData] = useState([]);
  const [dataIsAvailable, setDataAvailable] = useState(false);
  const redirect = useRedirect();

  const containerStyle2 = {
    "box-shadow": "1px 1px 5px 1px grey",
    height: "",
  };
  const imgStyle = {
    width: "100%",
    height: "100%",
    "object-fit": "cover",
  };
  const imageContainer = {
    // 'height':'50%',
    width: "100%",
    overflow: "hidden",
  };
  const height = {
    height: "230px",
    width: "100%",
    "object-fit": "cover",
  };

  let NotSet = () => {
    Swal.fire({
      icon: "error",
      html: `<h3 style="font-style:italic;">
              Not Linked Yet !<br>
            </h3>`,
    });
  };

  const user_id = getLocalStorage("user");

  useEffect(() => {
    try {
          const fetchData = async () => {
            const response = await axiosInstance.get(`student/fetch-instructor/`);
            const newData = response.data.map((item) =>
              JSON.parse(item.get_instructor)
            );
            setInstructorData(newData);
            setDataAvailable(true);
          };

          fetchData();
    } catch (err) {
      console.log(err);
    };

    document.title = "My Instructors";
  }, []);

  return (
    <div className="">
      <SecondNavBar colorStyle={"user-course-second-nav"} />
      <header
        id="fh5co-header"
        className="float-none fh5co-cover mt-0 banner-h-50 fh5co-cover-sm b-5 col-lg-none"
        role="banner"
        style={{
          backgroundImage: "url(../../assets/images/courses.jpeg)",
          objectFit: "cover",
          padding: "0px",
          margin: "0px",
        }}
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
                  <h1 className="fw-bold text-center ">
                    <span className="bi bi-person-workspace"></span>
                    My Instructors
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
            <div className="border col-lg-10 col-md-12 col-sm-12 col-xs-12">
              <div className="">
                <p className="display-6 mb-5 fw-bold mt-5 txt-dark d-none d-lg-block text-center bordr p-4 border-warning border-2 badge fs-1 text-bg-primar">
                  <span className="bi bi-person-workspace"></span> My
                  Instructors
                </p>

                {dataIsAvailable ? (
                  instructorData.length == 0 ? (
                    <>
                      <p className="text-center fw-bold display-6 mt-5 p-5">
                         <span className="bi bi-person-workspace mx-3"></span>
                         NO INSTRUCTORS YET, ENROLL IN A COURSE.
                      </p>
                    </>
                  ) : (
                    <>
                                      {/* -------- Instructor Start ----------- */}
                {instructorData.length > 0 &&
                  instructorData.map(
                    (instructors, index) => (
                      <div
                        key={index}
                        className="col-lg-3 col-md-4 col-sm-5 p-3 wow fadeInUp"
                        data-wow-delay="0.1s"
                      >
                        {instructors &&
                          instructors.map((instructor, i) => (
                            <div
                              key={i}
                              className="team-item bg-light mt-4 "
                              style={containerStyle2}
                            >
                              <div className="overflow-hidden ">
                                <Link
                                  to={`/instructor/profile/${instructor.pk}`}
                                  className="w-10"
                                >
                                  {instructor.fields.profile_img != "" &&
                                    instructor.fields.profile_img != null && (
                                      <img
                                        className="img-fluid teacherProfileImg"
                                        src={`${process.env.REACT_APP_URL}/media/${instructor.fields.profile_img}`}
                                        style={height}
                                      />
                                    )}
                                  {`${instructor.fields.profile_img}` == "" && (
                                    <img
                                      className="img-fluid teacherProfileImg"
                                      src={`../../assets/images/no-profile2.jpeg`}
                                      style={height}
                                    />
                                  )}
                                </Link>
                              </div>
                              <div
                                className="position-relative d-flex justify-content-center"
                                style={{ marginTop: "-23px" }}
                              >
                                <div
                                  className="bg-light d-flex justify-content-center pt-2 px-1"
                                  style={containerStyle2}
                                >
                                  {instructor.fields.facebook_url && (
                                    <Link
                                      className="btn btn-sm-square bg-primary mx-1"
                                      to={`${instructor.fields.facebook_url}`}
                                    >
                                      <i className="fab fa-facebook-f" />
                                    </Link>
                                  )}

                                  {instructor.fields.twitter_url && (
                                    <Link
                                      className="btn btn-sm-square bg-dark text-white mx-1"
                                      to={`${instructor.fields.twitter_url}`}
                                    >
                                      <i className="fab fa-x" />
                                    </Link>
                                  )}
                                  {instructor.fields.instagram_url && (
                                    <Link
                                      className="btn btn-sm-square btn-danger mx-1"
                                      to={`${instructor.fields.instagram_url}`}
                                    >
                                      <i className="fab fa-instagram" />
                                    </Link>
                                  )}
                                  {instructor.fields.website_url && (
                                    <Link
                                      className="btn btn-sm-square bg-primary mx-1"
                                      to={`${instructor.fields.website_url}`}
                                    >
                                      <i className="bi bi-globe" />
                                    </Link>
                                  )}

                                  {/* -----  IF NULL ------- */}
                                  {instructor.fields.facebook_url == null || instructor.fields.facebook_url == "" && (
                                    <Link
                                      className="btn btn-sm-square bg-primary mx-1"
                                      onClick={NotSet}
                                    >
                                      <i className="fab fa-facebook-f" />
                                    </Link>
                                  )}

                                  {instructor.fields.twitter_url == null || instructor.fields.twitter_url == "" && (
                                    <Link
                                      className="btn btn-sm-square bg-dark text-white mx-1"
                                      onClick={NotSet}
                                    >
                                      <i className="fab fa-x" />
                                    </Link>
                                  )}

                                  {instructor.fields.instagram_url == null || instructor.fields.instagram_url == "" && (
                                    <Link
                                      className="btn btn-sm-square btn-danger mx-1"
                                      onClick={NotSet}
                                    >
                                      <i className="fab fa-instagram" />
                                    </Link>
                                  )}

                                  {instructor.fields.website_url == null || instructor.fields.website_url == "" && (
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
                              <div className="text-center p-4">
                                <h4 className="mb-0">
                                  {instructor.fields.first_name}{" "}
                                  {instructor.fields.last_name}
                                </h4>
                              </div>
                            </div>
                          ))}
                      </div>
                    )
                    )}
                    {/* ------ Instructor End ------------ */}
                    </>
                  )
                ) : (
                  <>
                    <div className="d-flex justify-content-center mt-5">
                      <button  className="btn btn-warning" type="button" disabled>
                        <span className="spinner-border me-3" role="status" aria-hidden="true"></span>
                        Loading....
                      </button>
                    </div>
                  </>
                )}


              </div>
            </div>
            {/* ------------------------- */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyInstructors;
