import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, } from "react";
import axios from "axios";
import { DifficultyChoices, ratingStars } from "./utilities";

const baseUrl = "http://127.0.0.1:8000/api/course/";

function AllCourses() {
  const [courseData, setCourseData] = useState([]);
  const [apiUrl, setApiUrl] = useState(baseUrl);
  const [nextCourse, setNextCourse] = useState();
  const [previousCourse, setPreviousCourse] = useState();
  const [dataIsAvailable, setDataAvailable] = useState(false);
  const [searchData, setSearchData] = useState();

  const navigate = useNavigate();
  //Fetch Course when load

  useEffect(() => {
    try {
      axios.get(apiUrl).then((res) => {
        setNextCourse(res.data.next);
        setPreviousCourse(res.data.previous);
        setCourseData(res.data.results);
        setDataAvailable(true);
        console.log(res.data)
      });
    } catch (error) {
      console.log(error)
    }
    document.title = "All Courses";
  }, []);

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


  const paginationHandler = (url) => {
    try {
      axios.get(url)
      .then((res) => {
        setNextCourse(res.data.next);
        setPreviousCourse(res.data.previous);
        setCourseData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    };
  };

  const imgStyle = {
    'height':'250px',
    'width':'100%',
    'object-fit':'cover',
    'box-shadow':'2px 2px 6px  grey',
  }

  const contStyle = {
    'box-shadow':'2px 2px 6px  grey',
    'border-bottom-radius':'5px',
    'height':'auto' 
  }
  const containerStyle = {
    "box-shadow": "1px 1px 5px 1px grey",
    "border-radius": "2px",
    // "background":"rgb(235, 235, 235)"
  };

  const height = {
    height: "200px",
    width: "100%",
    "object-fit": "cover",
    // "border-radius": "2px",
  };

  const containerStyle2 = {
    "box-shadow": "1px 2px  rgba(0,0,0,0.1)",
    "border-radius": "7px",
    height: "",
  };
  // con

  return (
    <div>
      
      {/* Courses Start */}
      <div className="container-xxl py-5 mt-5">
        <div className="container mt-50">
          <div>
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
          </div>
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h2 className="m-5 section-title bg-light rounde-4 text-center text-primary px-3">
              All Courses
            </h2>
          </div>


          {dataIsAvailable ? (
              courseData.length == 0 ? 
              (
                <div className="text-center fw-bold display-6 mt-5 p-5">
                   No courses yet !
                </div>
              ) 
              :
              (
                <>
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
             
                  </>
              )
          ) 
          : (
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

      {/* pagination start */}
      <nav aria-label="Page navigation"  className="d-flex justify-content-center">
        <ul className="pagination m-5 justiy-content-center fw-bold display-6">
          {previousCourse &&
          <li className="page-item">
            <Link className=" page-link h4 fw-bold" onClick={()=>paginationHandler(previousCourse)}>
              <i className="bi bi-arrow-left me-3"></i>Previous
            </Link>
          </li>
          }
          
          {nextCourse &&  
          <li className="page-it em">
            <Link className="page-link h4 fw-bold" onClick={()=>paginationHandler(nextCourse)}>
              Next <i className="bi bi-arrow-right ms-3"></i>
            </Link>
          </li>
            }
        </ul>
      </nav>
      {/* pagination end */}
      {/* Courses End */}
    </div>
  );
}
export default AllCourses;

//if u have dream make it happen no matter the rules you break.