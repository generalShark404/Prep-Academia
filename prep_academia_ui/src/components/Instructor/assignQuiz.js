import { Link, useParams } from "react-router-dom";
import Sidebar from "./sidebar";
import {useState, useEffect} from 'react';
import axios from "axios";
import CheckQuizinCourse from "./CheckQuizinCourse"
import Swal from "sweetalert2";

const baseUrl = 'http://127.0.0.1:8000/api'
function AssignQuiz(){
   const [quizData, setQuizData]=useState([]);
   const [courseData, setCourseData]=useState([]);
   const teacherId = localStorage.getItem('teacherId');
   const {course_id }= useParams();
   
   useEffect(()=>{
    try {
      axios.get(baseUrl + `/teacher-quiz/${teacherId}`)
      .then((res)=>{
        setQuizData(res.data)
      }).then((err)=>console.log(err))
    } catch (error) {
      console.log(error)
    }

     try {
        axios.get(`${baseUrl}/course/${course_id}`)
        .then((res)=>{
            setCourseData(res.data);
        })
     } catch (error) {
        console.log(error)
     }

    document.title="Assign Quiz";
   }, []);



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
                  <h1 className="fw-bold ">Assign Quiz</h1>
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
          <h3 className="card-header">Assign Quiz <span className="text-warning  ">({courseData.title})</span></h3>
        <div className="card-body">
          <table className="table table-bordered">
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                {quizData.map((quiz, index)=>
                <tr>   
                  <td>
                    <Link to={`/all-questions/${quiz.id}`}>
                        {quiz.title}
                    </Link>
                  </td>
                  <td>
                    <CheckQuizinCourse quiz={quiz.id} course={course_id}/>
                    {/* {quiz.assign_status == 0 &&
                    <button className="btn-success btn-sm" onClick={()=>assignQuiz(quiz.id)
                    }>Assign Quiz</button>
                    }
                    {quiz.assign_status > 0 &&
                      <span className="text-success">Quiz Assigned</span>
                    } */}
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
export default AssignQuiz
