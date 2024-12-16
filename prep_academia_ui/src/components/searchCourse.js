import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { DifficultyChoices } from "./utilities";

const baseUrl = "http://127.0.0.1:8000/api/search-course/";

function SearchCourse() {
  let { course }  = useParams();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState();
  const [courseData, setCourseData] = useState([]);
  const [apiUrl, setApiUrl] = useState(baseUrl);
  const [nextCourse, setNextCourse] = useState();
  const [previousCourse, setPreviousCourse] = useState();
  const [dataIsAvailable, setDataAvailable] = useState(false);
  //Fetch Course when load
  useEffect(() => {
    try {
      axios.get(apiUrl).then((res) => {
        setNextCourse(res.data.next);
        setPreviousCourse(res.data.previous);
      
        setDataAvailable(true);
        console.log(res.data)
      });
    } catch (error) {
      console.log(error);
    };

    try { 
      const _searchData = new FormData();
      _searchData.append('course', course);

      axios.post(baseUrl, _searchData)
      .then((res) => {
        console.log(res);
        setCourseData(res.data.results);
      }).catch((err) => {
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }

    document.title = "Search Courses";
  }, []);

  const onChange = (e) => {
    setSearchData({
      [e.target.name]:e.target.value
    });
  };

  const submitCourseSearch = () => {
    const searchedCourse = searchData.search;
    const _searchFormData = new FormData();
    _searchFormData.append('course', searchedCourse);
    axios.post(baseUrl, _searchFormData)
    .then((res) => {
      if(res.status ==200){
        setCourseData(res.data.results);
        navigate(`/search-course/${searchedCourse}`);
        setSearchData({
          search:""
        });
      };
    }).catch((err) => {
      console.log(err);
    });
  };

  const paginationHandler=(url)=>{
    try {
      axios.get(url)
      .then((res)=>{
        setNextCourse(res.data.next);
        setPreviousCourse(res.data.previous);
        setCourseData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const imgStyle = {
    'height':'250px',
    'width':'100%',
    'object-fit':'cover',
    'box-shadow':'2px 2px 6px  grey',
  };

  const contStyle = {
    'box-shadow':'2px 2px 6px  grey',
    'border-bottom-radius':'5px',
    'height':'auto' 
  };

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

  return (
    <div>
      
      {/* Courses Start */}
      <div className="container-xxl py-5 mt-5">
        <div className="container mt-5">
        <div className="col-lg-12 mt-5 position-relative">                
            <input
                className="col-12 col-md-4 form-control bg-light mb-0 p-3"
                placeholder="Search courses"
                name="search"
                onChange={onChange}
            />
            {searchData  &&
            <>
              {searchData.search !== "" && 
                  <div className="mt-0 fs-2 p-1 position-relative h-10" style={{cursor:'pointer', height:'10px'}}
                    onClick={submitCourseSearch}
                  >
                    <div className="d-flex 5 text-light p-3 rounded-4 border border-dark border-3 bg-dark position-relative "  style={{background:'orange'}}>
                      <span>
                        {searchData.search} 
                      </span>
                      <span className="bi bi-search text-warning justify-content-end text-center" style={{position:"absolute", left:'86%'}}></span>
                    </div>
                  </div>
              }
            </>
              }
          </div>
          <div className="text-center wow fadeInUp mt-50" data-wow-delay="0.1s" >
            <h2 className="mt-5 section-title bg-light rounde-4 text-center text-primary px-3 ">
              {course}
            </h2>
            
        </div>
          {dataIsAvailable ? (
              courseData.length == 0 ? 
              (
                <div className="text-center fw-bold display-6 mt-5 p-5">
                   Oops course does not end or check your spellings.
                </div>
              ) 
              :
              (
                <>
                {courseData && courseData.map((course, index) => (
                    <div className="g-">
                          <div
                            className="d-flex justify-content-center col-lg-3 col-md-4 col-sm-4 col-xs-12 h-50 mb-5"
                            data-toggle="tooltip"
                            data-placement="top"
                            title={course.title}
                          >
                            <Link
                              to={`/about/${course.title}/${course.id}`}
                              className="w-100 "
                              style={containerStyle}
                            >
                              <img
                                src={`${process.env.REACT_APP_URL}/${course.featured_thumbnail}`}
                                style={height}
                              />
                              <ul className="list-group list-group-flush  ">
                                <li className="list-group-item text-center fs-3 text-wrap ">
                                  <span className="bi bi-book me-3"></span>
                                  {course.title.length > 10
                                    ? `${course.title.slice(0, 8)}..`
                                    : course.title}
                                </li>
                                <li className=" m-0 nav-link pt-4 pb-0 text-center">
                                      <span className="text-dark">Difficulty : </span>
                                      <span className="text-white rounded p-2 difficulty">
                                        <DifficultyChoices
                                          choices={course.difficulty}
                                        />
                                      </span>
                                    </li>
                              </ul>
                            </Link>
                          </div>
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
      {/* Courses End */}
    </div>
  );
}
export default SearchCourse;

//if u have dream make it happen no matter the rules you break.