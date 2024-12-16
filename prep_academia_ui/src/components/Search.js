import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function Search() {
  const [courseData, setCourseData] = useState([]);
  const {searchString}=useParams();
  //Fetch Course when load
  useEffect(() => {
    try {
      axios.get(baseUrl + `/search-courses/${searchString}`).then((res) => {
        setCourseData(res.data);
      });
    } catch (error) {}
  }, []);
  console.log(courseData);
  return (
    <div>
      <header
        id="fh5co-header"
        className="fh5co-cover fh5co-cover-sm"
        role="banner"
        style={{ backgroundImage: "url(../../assets/images/banner3.jpg)" }}
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
                  <h1 className="fw-bold">All Courses</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Courses Start */}
      <div className="container-xxl py-5 ">
        <div className="container ">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h2 className="m-5 section-title bg-white text-center text-primary px-3">
              All Courses
            </h2>
          </div>
          {courseData &&
            courseData.map((course, index) => (
              <div className="g-4 justify-content-center">
                <div
                  className="col-lg-3 col-xs-12 col-sm-4 col-md-6 wow fadeInUp mt-5"
                  data-wow-delay="0.1s"
                >
                  <div className="course-item bg-light">
                    <div className="col-md-12 ">
                      <Link className="row d-flex flex-column align-items-center" to={`/detail/${course.id}`}>
                        <img
                          className="img-fluid"
                          src={course.featured_thumbnail}
                          alt={course.title}
                        />
                      </Link>
                    </div>
                    <div className="text-center p-4 pb-0">
                      <Link to={`/detail/${course.id}`}>
                        <h4 className="mb-4">{course.title}</h4>
                      </Link>
                    </div>
                    <div className="d-flex border-top">
                      <small className="flex-fill text-center border-end py-2">
                        <i className="fa fa-user-tie text-primary me-2" />
                        John Doe
                      </small>
                      <small className="flex-fill text-center border-end py-2">
                        <i className="fa fa-clock text-primary me-2" />
                        1.49 Hrs
                      </small>
                      <small className="flex-fill text-center py-2">
                        <i className="fa fa-user text-primary me-2" />
                        30 Students
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* pagination start */}
      <nav aria-label="Page navigation example" className="row">
        <ul className="pagination m-5   justiy-content-center">
          <li className="page-item">
            <Link className="page-link" to={""}>
              Previous
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to={""}>
              1
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to={""}>
              2
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to={""}>
              3
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to={""}>
              Next
            </Link>
          </li>
        </ul>
      </nav>
      {/* pagination end */}
      {/* Courses End */}
    </div>
  );
}
export default Search;
