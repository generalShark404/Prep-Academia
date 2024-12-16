import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Sidebar from "./sidebar"
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api'

function RecommendedCourses(){
   const [courseData, setCourseData]=useState([]);
   const [teacherData, setteacherData]=useState([]);

   const studentId=localStorage.getItem('studentId');
   useEffect(()=>{
     try{
      axios.get(`${baseUrl}/fetch-recommended-courses/${studentId}`)
      .then((res)=>{
        setCourseData(res.data)
      })
     }catch(err){
      console.log(err)
     }
    

   },[]) 

   console.log(courseData)
    return(
        <div>
      <header
        id="fh5co-header"
        className="fh5co-cover fh5co-cover-sm mb-5"
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
                  <h1>Recommended Courses</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />         
          </div>
      <section className="col-md-9">
      <div className="card">
          <h3 className="card-header">My courses</h3>
        <div className="card-body">
          <table className="table table-bordered">
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Recommended</th>
                  </tr>
              </thead>
              {courseData.map((row,index)=>
              <tbody>
                <tr>
                  <Link to={`/detail/${row.course.id}`}>
                   <td>{row.course.title}</td>
                  </Link>
                  <td>
                    <Link to={`/teacher-detail/`}>
                    {row.course.techs}
                    </Link>
                  </td>
                
                </tr>
              </tbody>
                )}
          </table>
        </div>
        </div>
      </section>
        </div>
      </div>
    </div> 
    )
}
export default RecommendedCourses
