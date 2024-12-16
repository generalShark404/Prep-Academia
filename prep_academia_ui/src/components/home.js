import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { DifficultyChoices, ratingStars } from "./utilities";

import "../home.css";
const baseUrl = "http://127.0.0.1:8000/api";

function Home() {
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState();
  const [courseData, setCourseData] = useState([]);
  const [popularInstructorsData, setPopularInstructorsData] = useState([]);
  const [studentTestimonialData, setStudentTestimonialData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [latestCourseDataIsAvailable, setCourseDataAvailable] = useState(false);
  const [categoryeDataIsAvailable, setCategoryDataAvailable] = useState(false);
  const [popularCourseDataIsAvailable, setPopularCourseDataAvailable] = useState(false);
  const [popularInstructorDataIsAvailable, setPopularInstructorDataAvailable] = useState(false);

  const searchDataOnchange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]:e.target.value
    });
  };

  const submitCourseSearch = () => {
    const search = searchData.search;
    navigate(`/search-course/${search}`);
  };

  useEffect(() => {
    document.title = "Prep Academia | home";

    // Courses
    try {
      axios.get(baseUrl + "/course?result=4").then((res) => {
        setCourseData(res.data.results);
        setCourseDataAvailable(true);
      });
    } catch (err) {
      console.log(err);
    };

    // Populat teachers
    try {
      axios.get(`${baseUrl}/popular-instructors/?popular=1`).then((res) => {
        setPopularInstructorsData(res.data);
        setPopularInstructorDataAvailable(true);
      });
    } catch (error) {
      console.log(error);
    };

    // Student testimonial
    try {
      axios.get(`${baseUrl}/student-testimonial`).then((res) => {
        setStudentTestimonialData(res.data);
        // setDataAvailable(true);
      });
    } catch (error) {
      console.log(error);
    };

    // Category
    try {
      axios.get(`${baseUrl}/category?result=4`).then((res) => {
        setCategoryData(res.data.results);
        setCategoryDataAvailable(true);
      });
    } catch (error) {
      console.log(error);
    };

    // Popular courses
    try {
      axios.get(`${baseUrl}/popular_courses`).then((res) => {
        setPopularCourses(res.data);
        setPopularCourseDataAvailable(true);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const containerStyle = {
    "box-shadow": "1px 1px 3px 1px grey",
    "border-radius": "10px",
  };

  const containerStyle2 = {
    "box-shadow": "1px 2px  rgba(0,0,0,0.1)",
    "border-radius": "7px",
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

  const bannerFontStyle = {
    // 'font-size':'1.2em'
  };

  const height = {
    height: "230px",
    width: "100%",
    "object-fit": "cover",
    "border-radius":"10px"
  };

  let NotSet = () => {
    Swal.fire({
      icon: "error",
      html: `<h3 style="font-style:italic;">
              Not Linked Yet !<br>
            </h3>`,
    });
  };


  return (
    <div>
      <header
        id="fh5co-header"
        className="fh5co-cover"
        role="banner"
        style={{ backgroundImage: "url(../../assets/images/banner3.jpg)" }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay">
          <div className="container">
            <div className="row justify-content-center">
              <div className="row col-md-11 col-md-offset text-center">
                <div className="display-t">
                  <div
                    className="display-tc animate-box fw-light justify-content-center align-items-center"
                    data-a
                    nimate-effect="fadeIn"
                  >
                    <input
                      className="col-lg-3 col-md-4 form-control bg-light mb-0"
                      placeholder="Search courses"
                      name="search"
                      onChange={searchDataOnchange}
                    />
                    {searchData  &&
                    <>
                      {searchData.search !== "" &&
                      
                        <div className="mt-0 fs-2 p-1 position-relative" style={{cursor:'pointer'}}
                        onClick={submitCourseSearch}
                        >
                          <div className="d-flex mt5 text-light p-3 rounded-4 border border-dark border-3 bg-dark position-relative"  style={{background:'orange'}}>
                            <span>
                              {searchData.search} 
                            </span>
                            <span className="bi bi-search text-warning justify-content-end text-center " style={{position:"absolute", left:'86%'}}></span>
                          </div>
                        </div>
                      }
                    </>
                    }
                    <h1
                      className="text-center fw-bold fst-italic"
                      style={bannerFontStyle}
                    >
                      “Empowering Minds, Enriching Futures, One lesson at a
                      time.”
                      <br />
                      <span
                        style={{ color: "orange" }}
                        className="display-5 fw-bold"
                      >
                        Learn With Prep Academia.
                      </span>
                    </h1>
                    <div className="row">
                      <div>
                        <Link
                          className="btn btn-primary btn-lg btn-learn"
                          to="/all-courses"
                        >
                          <i className="bi bi-book mx-3"></i>
                          All Courses
                        </Link>
                        <Link
                          className="btn btn-primary btn-lg popup-vimeo btn-video"
                          n
                          to={`/category`}
                        >
                          Categories
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div>
        <div>
          {/* Service Start */}
          <div className="container-xxl py-5">
            <div className="container">
              <div className="row g-4 justify-content-center">
                <div
                  className="col-lg-3 col-sm-6 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div
                    className="service-item text-center pt-3"
                    style={containerStyle2}
                  >
                    <div className="p-4">
                      <i className="fa fa-3x fa-graduation-cap text-dark mb-4" />
                      <h5 className="mb-3">Skilled Instructors</h5>
                      <p>
                        We have skilled instructors who simplify explanations to
                        the minimum to help you understand.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="col-lg-3 col-sm-6 wow fadeInUp"
                  data-wow-delay="0.7s"
                >
                  <div
                    className="service-item text-center pt-3"
                    style={containerStyle2}
                  >
                    <div className="p-4">
                      <i className="fa fa-3x fa-book-open text-dark mb-4" />
                      <h5 className="mb-3">Book Library</h5>
                      <p>
                        Books library with different books on different topics
                        for you to chose.
                      </p>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Service End */}
          {/* About Start */}
          <div className="container-xxl py-5">
            <div className="container">
              <div className="row g-5">
                <div
                  className="col-lg-6 wow fadeInUp"
                  data-wow-delay="0.1s"
                  style={{ minHeight: 400 }}
                >
                  <div className="position-relative h-100">
                    <img
                      className="img-fluid position-absolute w-100 h-100"
                      src="../../assets/images/banner5.jpg"
                      alt
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                  <h1 className="mb-0">Welcome to Prep Academia</h1>
                  <i>Your Pathway to Excellence in Learning !</i>
                  <p className="mb-4"></p>
                  <p className="mb-4">
                    At Prep Academia, We believe that learning is an
                    exhilarating journey that empowers you to reach your fullest
                    potential.We're thrilled to welcome you to a vibrant virtual
                    learnig space where curiosity meets knowledge, and passion
                    fuels success.
                  </p>
                  <div className="row gy-2 gx-4 mb-4">
                    <div className="col-sm-6">
                      <p className="mb-0">
                        <i className="fa fa-arrow-right text-primary me-2" />
                        Skilled Instructors
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0">
                        <i className="fa fa-arrow-right text-primary me-2" />
                        Online Classes
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0">
                        <i className="fa fa-arrow-right text-primary me-2" />
                        Simplified Explanations
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0">
                        <i className="fa fa-arrow-right text-primary me-2" />
                        Skilled Instructors
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0">
                        <i className="fa fa-arrow-right text-primary me-2" />
                        Quiz and Tests
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0">
                        <i className="fa fa-arrow-right text-primary me-2" />
                        International Certificate
                      </p>
                    </div>
                  </div>
                  <Link to="/about" className="btn btn-primary py-3 px-5 mt-2">
                    About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* About End */}

          {/* Categories Start */}
          {categoryeDataIsAvailable ? (
            <>
              {categoryData.length == 0 ? (
                <div className="text-center fw-bold display-6 mt-5 p-5">
                  No Categories yet !
                </div>
              ) : (
                <>
                  <div className="container-xxl py-5 category ">
                    <div className="container">
                      <div
                        className="text-center wow fadeInUp"
                        data-wow-delay="0.1s"
                      >
                        <h4 className="section-title bg-white text-center text-primary px-3">
                          Categories
                        </h4>
                      </div>
                      <div className="row g-4 justify-content-center">
                        {/* Start */}
<div className="container">
        <div className="row g-4 justify-content-">
          {categoryData && categoryData.map((course, index) => (
            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12" key={index}>
              <div className="course-item">
                <Link to={`/category/${course.title}/${course.id}`} className="course-link">
                  <div className="course-image-wrapper">
                    <img
                      src={`${course.category_thumbnail}`}
                      alt={`${course.title}`}
                      className="img-fluid course-image"
                    />
                    <div className="course-overlay fs-1">
                      <h2 className="couse-title text-light mt-5">
                        {course.title.length > 15 ? `${course.title.slice(0, 15)}...` : course.title}
                      </h2>
                      <small className="flex-fill text-center py- fs-3">
                                    <i className="fa fa-book text-primary me-2 fs-3" />
                                    Courses: {course.total_courses}
                                  </small>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
                        {/* End */}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="d-flex justify-content-center">
              <button className="btn btn-warning" type="button" disabled>
                <span
                  className="spinner-border me-3"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading....
              </button>
            </div>
          )}
          {/* Categories End */}
          {/* ---------------------------------------------------- */}

          {/* Latest Courses Start */}
          {latestCourseDataIsAvailable ? (
            <>
              {courseData.length == 0 ? (
                <>
                  <div className="text-center fw-bold display-6 mt-5 p-5">
                    No courses yet !
                  </div>
                </>
              ) : (
                <>
                  <div className="container-xxl  py-5">
                    <div className="container">
                      <div
                        className="text-center wow fadeInUp"
                        data-wow-delay="0.1s"
                      >
                        <h6 className="section-title bg-white text-center text-primary px-3 display-5">
                          Latest Courses
                        </h6>
                        <h1 className="mb-5"></h1>
                      </div>
                      <div className="row g-4 justify-content-">
                        {/* start */}
                        {courseData &&
                          courseData.map((course, index) => (
                            <div
                              className="col-lg-3 col-md-3 col-sm-6 col-xs-11  wow justify-content-center my-3 fadeInUp p-1"
                              data-wow-delay="0.1s"
                            >
                            <Link
                                    to={`/about/${course.title
                                      .split(" ")
                                      .join("")}/${course.id}`}
                                  >
                              <div
                                className="course-item bg-light "
                                style={containerStyle2}
                              >
                                <div className="position-relative overflow-hidden p-0">
                                  
                                    <img
                                      className="img-fluid"
                                      src={course.featured_thumbnail}
                                      alt={course.title}
                                      style={height}
                                      y
                                    />
                                  
                                </div>

                                <ul className="list-group list-group-flush  p-3">
                                  <p className="mt-1 text-center fs-3 text-wrap ">
                                    <span className="bi bi-book me-3"></span>
                                    {course.title.length > 20
                                      ? `${course.title.slice(0, 20)}..`
                                      : course.title}
                                  </p>
                                  <p className="border border-1 h-0 text-dark "></p>
                                  <li className=" m-0 nav-link pt-3 pb-0 text-center fs-3">
                                   
                                    <span className="text-warning p-2">
                                      
                                        {course.get_reviews ? 
                                        <>
                                        {ratingStars(course.get_reviews.rating + ' ')} 
                                        </>
                                        : 'Not rated'}
                                          <span className="text-dark">
                                          {' | '} 
                                              <span className="bi bi-chat mx-2 "></span>
                                              <span className="text-primary p-2">
                                              {course.get_reviews ? course.get_reviews.reviews : '0'}
                                          </span>
                                         </span>
                                    </span>
                                  </li>
                                  
                                  <li className=" m-0 nav-link pt-4 pb-0 text-center fs-3">
                                    <span className="text-dark">
                                      Difficulty :{" "}
                                    </span>
                                    <span className="text-white rounded p-2 difficulty">
                                      <DifficultyChoices
                                        choices={course.difficulty}
                                      />
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </Link>
                            </div>
                          ))}
                        {/* end */}
                      </div>
                      <div></div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="d-flex justify-content-center mt-5">
              <button className="btn btn-warning" type="button" disabled>
                <span
                  className="spinner-border me-3"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading....
              </button>
            </div>
          )}
          {/* Latest Courses End */}
          {/* ------------------------------------------------- */}

          {/* Popular Courses Start */}
          {popularCourseDataIsAvailable ? (
            <>
              {popularCourses.length == 0 ? (
                <div className="text-center fw-bold display-6 mt-5 p-5">
                  No popular courses
                </div>
              ) : (
                <>
                 <div className="container-xxl py-5" style={imgStyle}>
  <div className="container">
    <div
      className="text-center wow fadeInUp"
      data-wow-delay="0.1s"
    >
      <h6 className="section-title bg-white text-center text-primary px-3 display-5">
        Popular Courses
      </h6>
    </div>
    <div className="row g-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="p-0 col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex flex-wrap">
        {/* Start */}
        {popularCourses && popularCourses.map((course) => (
          <div
            key={course.id}
            className="col-lg-3 col-md-4 col-sm-12 col-xs-12 mb-4"
            style={{
              padding: '0.5rem',
              display: 'inline-block',
            }}
          >
            <Link
              data-toggle="tooltip"
              data-placement="top"
              title={course.title}
              to={`/about/${course.title}/${course.id}`}
              className="h-100"
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'black',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                padding: '1rem',
                transition: 'transform 0.3s ease',
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src={`${course.featured_thumbnail}`}
                alt={course.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                }}
              />
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item text-center fs-3 text-wrap">
                  <span className="bi bi-book me-3"></span>
                  {course.title.length > 10 ? `${course.title.slice(0, 8)}..` : course.title}
                </li>
                <li className="list-group-item text-center">
                  
                  <span className="text-warning">
                    {course.get_reviews ? ratingStars(course.get_reviews.rating) : 'Not rated'}
                  </span>
                  <span className="text-dark">
                    {' | '} <span className="bi bi-chat mx-2"></span>
                    <span className="text-primary">{course.get_reviews ? course.get_reviews.reviews : '0'}</span>
                  </span>
                </li>
                <li className="list-group-item text-center">
                  <span className="text-dark">Difficulty: </span>
                  <span className="text-white" >
                    <DifficultyChoices choices={course.difficulty} />
                  </span>
                </li>
              </ul>
            </Link>
          </div>
        ))}
        {/* End */}
      </div>
    </div>
  </div>
</div>
                </>
              )}
            </>
          ) : (
            <div className="d-flex justify-content-center mt-5">
              <button className="btn btn-warning" type="button" disabled>
                <span
                  className="spinner-border me-3"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading....
              </button>
            </div>
          )}
          {/* Popular Courses End */}
          {/* ------------------------------------------------- */}

          {/* Popular Instructors Start */}
          {popularInstructorDataIsAvailable ? (
            <>
              {popularInstructorsData.length == 0 ? (
                <div className="text-center fw-bold display-6 mt-5 p-5">
                  No popular instructors
                </div>
              ) : (
                <>
                  <div className="container-xxl py-5">
                    <div className="container">
                      <div
                        className="text-center wow fadeInUp"
                        data-wow-delay="0.1s"
                      >
                        <h3 className="section-title bg-white text-center text-primary px-3">
                          Popular Instructors
                        </h3>
                      </div>

                      <div className="row g-4 justify-content-enter">
                        {/* Start */}
                        {popularInstructorsData &&
                          popularInstructorsData.map((instructor, index) => (
                            <div
                              className="col-lg-3 col-md-4 col-sm-5  wow fadeInUp"
                              data-wow-delay="0.1s"
                            >
                              <div
                                className="team-item bg-light"
                                style={containerStyle2}
                              >
                                <div className="overflow-hidden">
                                  <Link
                                    to={`instructor/profile/${instructor.id}`}
                                  >
                                    <img
                                      className="img-fluid"
                                      src={`${
                                        instructor.profile_img
                                          ? instructor.profile_img
                                          : "../../assets/images/no-profile2.jpeg"
                                      }`}
                                      alt
                                      style={height}
                                    />
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
                                    {instructor && instructor.facebook_url && (
                                      <Link
                                        className="btn btn-sm-square bg-primary mx-1"
                                        to={`${instructor.facebook_url}`}
                                        target="blank"
                                      >
                                        <i className="fab fa-facebook-f" />
                                      </Link>
                                    )}
                                    {instructor && instructor.twitter_url && (
                                      <Link
                                        className="btn btn-sm-square bg-dark text-white mx-1"
                                        to={`${instructor.twitter_url}`}
                                      >
                                        <i className="fab fa-x" />
                                      </Link>
                                    )}
                                    {instructor && instructor.instagram_url && (
                                      <Link
                                        className="btn btn-sm-square btn-danger mx-1"
                                        to={`${instructor.instagram_url}`}
                                      >
                                        <i className="fab fa-instagram" />
                                      </Link>
                                    )}
                                    {instructor && instructor.website_url && (
                                      <Link
                                        className="btn btn-sm-square bg-primary mx-1"
                                        to={`${instructor.website_url}`}
                                      >
                                        <i className="bi bi-globe" />
                                      </Link>
                                    )}
                                    {/* -----  IF NULL ------- */}
                                    {instructor.facebook_url == null || instructor.facebook_url == "" && (
                                      <Link
                                        className="btn btn-sm-square bg-primary mx-1"
                                        onClick={NotSet}
                                      >
                                        <i className="fab fa-facebook-f" />
                                      </Link>
                                    )}

                                    {instructor.twitter_url == null || instructor.twitter_url == "" && (
                                      <Link
                                        className="btn btn-sm-square bg-dark text-white mx-1"
                                        onClick={NotSet}
                                      >
                                        <i className="fab fa-x" />
                                      </Link>
                                    )}

                                    {instructor.instagram_url == null || instructor.instagram_url == "" && (
                                      <Link
                                        className="btn btn-sm-square btn-danger mx-1"
                                        onClick={NotSet}
                                      >
                                        <i className="fab fa-instagram" />
                                      </Link>
                                    )}

                                    {instructor.website_url == null || instructor.website_url == "" &&(
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
                                  <h5 className="mb-0">
                                    {instructor.first_name.length > 10
                                      ? `${instructor.first_name.slice(
                                          0,
                                          14
                                        )}..`
                                      : instructor.first_name}
                                  </h5>
                                  <small>
                                    Courses : {instructor.total_teacher_courses}
                                  </small>
                                </div>
                              </div>
                            </div>
                          ))}
                        {/* End */}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="d-flex justify-content-center mt-5">
              <button className="btn btn-warning" type="button" disabled>
                <span
                  className="spinner-border me-3"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading....
              </button>
            </div>
          )}

          {/* Testimonial Start */}
          <div
            className="container-xxl py-5 wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <div className="container">
              <div className="text-center">
                <h6 className="section-title bg-white text-center text-primary px-3">
                  Testimonial
                </h6>
                <h1 className="mb-5">Our Students Say!</h1>
              </div>
              {/* test start*/}
              <div className={"carousel-item text-center"}></div>
              {/* test end*/}
            </div>
          </div>
          {/* Testimonial End */}
        </div>
      </div>
    </div>
  );
}

export default Home;
