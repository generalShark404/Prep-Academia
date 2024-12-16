import { Link, useParams } from "react-router-dom";
import Sidebar from "./sidebar";
import {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import axiosInstance from "../../axios";
import { getLocalStorage } from "../utilities";

const baseUrl = 'http://127.0.0.1:8000/api';

function EditCourse(){
    const [cats, setCats] = useState([]);
    const [courseData, setCourseData] = useState({
      category:'',
      title:'',
      description:'',
      prev_img:'',
      featured_thumbnail:'',
      tags:'',
      difficulty:''
    });
    const {course_id} = useParams();
    const instructor_id = getLocalStorage('instructor');
  
    useEffect(()=>{
        //Fetch categories
      try {
       axiosInstance.get('/get-category')
       .then((res)=>{
          setCats(res.data)
       }).then((err)=>{
        //  console.log(err)
       })
      }catch (error) {
        console.log(error)  
      };
      //Fetch current course
      try {
        axiosInstance.get(`/update-course/${course_id}/`)
        .then((res)=>{
          console.log(res)
          setCourseData({
            title:res.data.title,
            description:res.data.description,
            category:res.data.category,
            prev_img:res.data.featured_thumbnail,
            featured_thumbnail:'',
            tags:res.data.tags,
            difficulty:res.data.difficulty
          })
        })
      } catch (error) {
        
      }

      document.title = "Edit Course";
    }, []);

    const difficulty = [
      {'level':'Beginner','id':'B'}, 
      {'level':'Intermediate', 'id':'I'}, 
      {'level':'Advanced', 'id':'A'}
    ];
    
    const handleChange = (event)=>{
      setCourseData({
        ...courseData,
        [event.target.name]:event.target.value
      });
    }

    const handleFileChange = (event)=>{
      setCourseData({
        ...courseData,
        [event.target.name]:event.target.files[0]
      });
    }

    const formSubmit = (e)=>{
      e.preventDefault()
      const _formData = new FormData();
      _formData.append('category', courseData.category)
      _formData.append('title', courseData.title);
      _formData.append('description', courseData.description);
      if(courseData.featured_thumbnail  !== ''){
          _formData.append('featured_thumbnail', courseData.featured_thumbnail, courseData.featured_thumbnail.name);
      }
      _formData.append('tags', courseData.tags);
      _formData.append('difficulty', courseData.difficulty);
      try{
        axiosInstance.put(`/update-course/${course_id }/`,_formData, {
          headers:{
            'content-type':'multipart/form-data'
          }
        }).then((res)=>{
           if(res.data.message == 'Updated Successfully'){
             Swal.fire({
                 title:'Data has been updated',
                 icon:'success',
                 timerProgressBar:true,
                 showConfirmButton:false
           });
           }
        }).then((err)=>{
            console.log(err)
        })
      }catch(err){
        console.log(err)
      }
    }

    return(
        <div>
      <header
        id="fh5co-header"
        className="float-none fh5co-cover mt-0 banner-h-50 fh5co-cover-sm b-5 col-lg-none"
        role="banner"
        style={{ backgroundImage: "url(../../assets/images/flag2.jpg)" }}
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
                  <h1 className="fw-bolder">Edit Courses</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container mt-100 mb-50">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />         
          </div>
      <section className="col-md-9">
      <div className="card">
          <h2 className="card-header text-center text-light" style={{background:'rgb(9, 20, 20)'}}>Edit courses</h2>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                 Title
              </label>
              <input type={'text'} id="title" className="form-control" value={courseData.title} onChange={handleChange} name='title'/>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                 Description
              </label>
              <textarea type={'text'} id="description" name='description' className="form-control" value={courseData.description} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                 Category
              </label>
              <select name="category" className="form-control" value={courseData.category}  onChange={handleChange}>
                {cats.map((category, index)=>{
                // console.log(category.id)
                  return <option key={index} value={category.id}>{category.title}</option>
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
              <label htmlFor="f_img" className="form-label">
                 Featured Image
              </label>
              <input type={'file'} id="f_img" className="form-control" name='featured_thumbnail' onChange={handleFileChange}/>
              {courseData.prev_img &&
               <p className="text-center p-3 ">
                <img src={`${process.env.REACT_APP_URL}${courseData.prev_img}`} 
                style={{width:'100%', height:'300px', objectFit:'contain'}}
                className="rounded-ircle shadow-sm"/>
               </p> 
              }
            </div>
            <div className="mb-3">
              <label htmlFor="techs" className="form-label">
                 Tags
              </label>
              <textarea onChange={handleChange}  name='tags' value={courseData.tags}  type={'text'} id="tags" className="form-control"></textarea>
            </div>
            <button className="btn btn-primary" onClick={formSubmit} >Save</button>
          </form>
        </div>
        </div>
      </section>
        </div>
      </div>
    </div> 
    )
}
export default EditCourse
// maryamhussein694gmailcom
// u21uis1106  


// finish tcp - 20%  *
// finish teacher profile settings - 30% *
// finish function algoritms - 30% * 
// read gens 101 and 103 - 20% *
// sleep - 3hr
// Until these are finished no resting
//suit that if u jump from high place u still land on your feet