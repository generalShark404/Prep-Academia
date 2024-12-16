import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "./sidebar";
import axios from "axios";
import CheckQuizStatus from "./CheckQuizStatus";

const baseUrl = 'http://127.0.0.1:8000/api'

function CourseQuizList(){
   const [quizData, setQuizData]=useState([]);
   const studentId=localStorage.getItem('studentId');
   const {course_id} = useParams();

   useEffect(()=>{
     try{
      axios.get(`${baseUrl}/fetch-assigned-quiz/${course_id}`)
      .then((res)=>{
        setQuizData(res.data);
      })
     }catch(err){
      console.log(err);
     }
    document.title = "Quiz List";
   },[]) 

   console.log(quizData)
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
                  <h1 className="fw-bold">Quiz List</h1>
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
                      <th>Quiz</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                {/* Quiz 1 */}
                {quizData.map((row, index)=>                
                <tr>
                  <Link>
                   <td className="text-dark">{row.quiz.title}
                   </td>
                  </Link>
                  <CheckQuizStatus quiz={row.quiz.id} student={studentId}/>
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
export default CourseQuizList;
