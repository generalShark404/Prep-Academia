import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SecondNavBar from "../secondNavBar";
import decodedToken from "../student/decodetoken";
import checkAuthentication from "../utilities";
import { getLocalStorage, useRedirect } from "../utilities";
import axiosInstance from "../../axios";

function AddCourses() {
  const instructor_id = getLocalStorage('instructor');
  const redirect  = useRedirect();

  const [cats, setCats] = useState([]);
  const [courseData, setCourseData] = useState({
    instructor: instructor_id,
    category: "",
    title: "",
    description: "",
    f_img: "",
    tags: "",
    difficulty:"Select Difficulty",
    category:'Select Category'
  });

  const difficulty = [
    {'level':'Beginner','id':'B'}, 
    {'level':'Intermediate', 'id':'I'}, 
    {'level':'Advanced', 'id':'A'}
  ];
  
  useEffect(() => {
    try {
          axiosInstance
            .get(`/get-category`)
            .then((res) => {
              // if(res)
              console.log(res.data);
              setCats(res.data);
            }).catch((error) => {
              console.log(error)
            });
    } catch (error) {
      console.log(error);
    }
    document.title = "Add Course";
  }, []);

  const handleChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const handleFileChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.files[0],
    });
  };

const formSubmit = (e) => {
    e.preventDefault();

    const {category, title, description, tags, difficulty} = courseData;

    const _formData = new FormData();
    _formData.append("category", courseData.category);
    _formData.append("title", courseData.title);
    _formData.append("description", courseData.description);
    
    if(courseData.f_img !== "" && courseData.f_img !== undefined){
      _formData.append(
        "featured_thumbnail",
        courseData.f_img,
        courseData.f_img.name
      );
    }
    _formData.append("tags", courseData.tags);
    _formData.append("difficulty", courseData.difficulty);
    if(!category || !title, !description || !tags || !difficulty){
      Swal.fire({
        icon:'warning',
        html:`<p class="fs-2">All fields are required !</p>`
      });
    }else{
      try {
        axiosInstance
          .post(`/instructor/add-course/`, _formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            Swal.fire({
              icon: "success",
              html:`<p class="fs-2">Course Added Successfully</p>`
            });
            window.location.href = "/instructor-courses"
          }).catch((error) => {
            try {
              if(error.response.data.difficulty[0]){
                Swal.fire({
                  icon:'error',
                  html:`<p class="fs-2">Please select difficulty.</p>`
                })
              };              
            } catch (error) {
              
            };

            try {
              if(error.response.data.category[0]){
               Swal.fire({
                 icon:'error',
                 html:`<p class="fs-2">Please select category.</p>`
               })
             };
            } catch (error) {
              
            };

          });
  
      } catch (err) {
        console.log(err);
      };
    }
  };

  const style = {
    "margin-top": "150px",
    "margin-bottom": "50px",
  };

  return (
    <div className="">
      <SecondNavBar colorStyle='bg-info'/>
      <div className="" style={style}>      
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>

          <section className="col-md-9 ">
            <div className="card">
              <h2 className="card-header text-center text-light fw-bold" style={{background:'rgb(9, 20, 20)'}}>Add Course</h2>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type={'text'}
                      id="title"
                      className="form-control"
                      onChange={handleChange}
                      name="title"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label)">
                      Description
                    </label>
                    <textarea
                      type={"text"}
                      id="description"
                      name="description"
                      className="form-control"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Category
                    </label>
                    <select
                      name="category"
                      className="form-control"
                      onChange={handleChange}
                      value={courseData.category}
                    >
                      <option value="Select Category" disabled>
                        Select Category
                      </option>
                      {cats.map((category, index) => {
                        console.log(category.id)
                        console.log(index)
                        return (
                          <option key={index} value={category.id} >
                            {category.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3 overflow-scroll">
                    <label htmlFor="difficulty" className="form-label">
                      Difficulty
                    </label>
                    <select
                      name="difficulty"
                      className="form-control"
                      onChange={handleChange}
                      value={courseData.difficulty}
                    >
                      <option value={'Select Difficulty'} disabled>
                        Select Difficulty
                      </option>
                      {difficulty.map((difficulty, index) => {
                        return (
                          <option key={index} value={difficulty.id}>
                            <span className="difficulty">
                                {difficulty.level}
                            </span>
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor  ="f_img" className="form-label">
                      Course Thumbnail
                    </label>
                    <input 
                      type={"file"}
                      id="f_img"
                      className="form-control"
                      name="f_img"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="techs" className="form-label">
                      Tags
                    </label>
                    <textarea
                      onChange={handleChange}
                      name="tags"
                      type={"text"}
                      id="techs"
                      className="form-control"
                    ></textarea>
                  </div>
                  <button className="btn btn-primary" onClick={formSubmit}>
                    Add Course
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
      </div>
    </div>
  );
}

export default AddCourses;
// maryamhussein694gmailcom
// u21uis1106