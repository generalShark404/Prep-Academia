import { useEffect, useState } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";

function CourseTags(){
    const { course_tag } = useParams();
    const [courseData, setCourseData] = useState([]);
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/course-tags/${course_tag}`)
        .then((res) => {
            setCourseData(res.data.data)
            console.log(res.data);
        })
    }, []);

    return (
    <div className="container mt-50 mb-5">

        <h1 className="text-center fs-1 bg-dark rounded p-4 text-light fw-bold">Tag: <span className="text-warning">{course_tag}</span></h1>
      <div className="row">
      <div className="container">
      <div className="row">
        {courseData.map((course) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={course.id}>
                <Link to={`/about/${course.title}/${course.id}`}>   
                    <div className="card tag-card h-100">
                    <div className="card-img-overlay d-flex flex-column justify-content-end text-white">
                        <h3 className="card-title fw-bold text-light bg- rounded rounded- p-2">{course.title}</h3>
                        <h5 className="card-title text-shadow text-warning fw-bold">
                            <span className="badge bg-dark">Tags: </span>
                            {course.tags}
                        </h5>
                    </div>
                    <img
                        src={`${process.env.REACT_APP_URL}${course.featured_thumbnail}`}
                        className="card-img"
                        alt={course.title}
                    />
                    </div>
                </Link>
                </div>
        ))}
      </div>
    </div>
      </div>
    </div>
    )
}

export default CourseTags;