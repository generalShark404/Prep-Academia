import { Link, useParams} from "react-router-dom";
import Sidebar from "./sidebar";
import {useState, useEffect} from 'react';
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api'
function EnrolledStudents(){
   const [studentData, setStudentData]=useState([]);
   const {course_id}=useParams()
   useEffect(()=>{
    try {
      axios.get(baseUrl + `/fetch-enrolled-students/${course_id}`)
      .then((res)=>{
        setStudentData(res.data)
      }).then((err)=>console.log(err))
    } catch (error) {
    //   console.log(error)
    }
   }, []);
//    console.log(studentData)
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
                  <h1>Enrolled Students</h1>
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
          <h3 className="card-header">Enrolled Students</h3>
        <div className="card-body">
          <table className="table table-bordered">
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Username</th>
                      <th>interested Catego..</th>
                  </tr>
              </thead>
              <tbody>
                {studentData.map((row, index)=>
                <tr>
                  <td>
                    <Link to={"/view-student"+row.student.id} className="justify-content-center">{row.student.full_name}</Link>
                  </td>
                  <td>
                    <img src={row.student} width='80' className="rounded" alt={'profile'}/>
                  </td>
                  <td>
                    <p>{row.student.user_name}</p>
                  </td>
                  <td>
                    <p>{row.student.interested_categories}</p>
                  </td>
                </tr>
                )}
              </tbody>
          </table>
        </div>
        </div>
                
      </section>
        </div>
      </div>
    </div> 
    )
}
export default EnrolledStudents