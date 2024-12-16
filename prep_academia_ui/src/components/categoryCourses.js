import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { DifficultyChoices, ratingStars } from "./utilities";

const baseUrl = "http://127.0.0.1:8000/api";

function CategoryCourses() {
  const [categoryData, setCategoryData] = useState();
  let { category_id, category_slug } = useParams();
  const [categoryInfo, setCategoryInfo] = useState([]);
  const [previousCourse, setPreviousCourse] = useState();
  const [nextCourse, setNextCourse] = useState();

  useEffect(() => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/category/${category_id}`).then((res) => {
        setCategoryInfo(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(`${baseUrl}/course/?category=${category_id}`).then((res) => {
        setNextCourse(res.data.next);
        setPreviousCourse(res.data.previous);
        setCategoryData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }

    document.title = `Category - ${category_slug}`;
  }, [category_id, category_slug]);

  const paginationHandler = (url) => {
    try {
      axios.get(url).then((res) => {
        setNextCourse(res.data.next);
        setPreviousCourse(res.data.previous);
        setCategoryData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cardStyle = {
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    backgroundColor: "#fff",
    overflow: "hidden",
    transition: "transform 0.3s ease",
  };

  const imgStyle = {
    height: "200px",
    width: "100%",
    objectFit: "cover",
    borderRadius: "10px 10px 0 0",
  };

  const containerStyle = {
    padding: "2rem",
    backgroundColor: "#f8f9fa",
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    margin: "0.5rem",
  };

  return (
    <div style={containerStyle} className="mt-50">
      {/* Category Info */}
      <h1 className="fs-1 text-center fw-bold mb-5">{category_slug}</h1>
      {categoryInfo && categoryInfo.map((category) => (
        <div className="row mb-5 align-items-cente" key={category.id}>
          <div className="col-lg-4 col-md-6">
            <img
              src={`${category.category_thumbnail}`}
              alt="Category Thumbnail"
              style={imgStyle}
              className="rounded shadow-sm"
            />
          </div>
          <div className="col-lg-8 col-md-6">
            <h2 className="text-dark fw-bold">{category.name}</h2>
            <p className="text-muted fs-2">{category.description}</p>
          </div>
        </div>
      ))}

      {/* Courses */}
      <div className="row">
        {categoryData && categoryData.map((course) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={course.id}>
            <Link to={`/about/${course.title}/${course.id}`} style={{ textDecoration: "none" }}>
              <div className="card" style={cardStyle}>
                <img
                  src={`${course.featured_thumbnail}`}
                  alt={course.title}
                  style={imgStyle}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title text-center text-dark">
                    {course.title.length > 25 ? `${course.title.slice(0, 25)}...` : course.title}
                  </h5>
                  <p className="h-0 border border-2 "></p>
                            <li className=" m-0 nav-link pb-0 text-center">
                                <span className="text-dark">
                                    <span className="bi bi-chat mx-2"></span>
                                      Comments:
                                </span>
                                <span className="text-primary p-2 bi bi-comment">
                                  {course.get_reviews ? course.get_reviews.reviews : '0'}
                                </span>
                              </li>
                            <p className="h-0 border border-2 "></p>
                            <li className=" m-0 nav-link  pb-0 text-center">
                                <span className="text-dark">
                                  Ratings:
                                </span>
                                <span className="text-warning p-2">
                                  {course.get_reviews ? 
                                <>
                                  {ratingStars(course.get_reviews.rating)}
                                </>
                                  : 
                                  'Not rated'
                                }  
                                </span>
                            
                            </li>
                            
                            <li className=" m-0 nav-link pt-4 pb-0 text-center">
                                  <span className="text-dark">
                                    Difficulty : </span>
                                  <span className="text-white rounded p-2 difficulty">
                                    <DifficultyChoices
                                      choices={course.difficulty}
                                    />
                                  </span>
                            </li>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        {previousCourse && (
          <button style={buttonStyle} onClick={() => paginationHandler(previousCourse)}>
            Previous
          </button>
        )}
        {nextCourse && (
          <button style={buttonStyle} onClick={() => paginationHandler(nextCourse)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default CategoryCourses;