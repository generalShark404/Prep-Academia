import {Link, useParams} from "react-router-dom";
import Sidebar from "./sidebar";
import {useState, useEffect} from 'react';
import axios from "axios";
import QuizResult from "./QuizResult";
import Swal from "sweetalert2";

const baseUrl = 'http://127.0.0.1:8000/api'
function AttemptedStudents(){
   const [studentData, setStudentData]=useState([]);
   const {quiz_id}= useParams();
   
   useEffect(()=>{
    try {
      axios.get(baseUrl + `/attempted-quiz/${quiz_id}`)
      .then((res)=>{
        setStudentData(res.data)
      })
    }catch (error) {
      console.log(error)
    }

    document.title="Attempted Quiz";
   }, []);
   console.log(studentData)

    return(
        <div>
      <header
        id="fh5co-header"
        className="fh5co-cover fh5co-cover-sm mb-5"
        role="banner"
        style={{backgroundImage: "url(../../assets/images/flag2.jpg)"}}
        data-stellar-background-ratio="0.5">
        <div className="overlay" />
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
              <div className="display-t">
                <div
                  className="display-tc animate-box"
                  data-animate-effect="fadeIn">
                  <h1 className="fw-bold ">
                    Student List
                  </h1>
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
          <h3 className="card-header">Assign Quiz
            <span className="text-warning">
            </span>
          </h3>
        <div className="card-body">
          <table className="table table-bordered">
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Result</th>
                  </tr>
                  
              </thead>
              <tbody>
                {studentData.map((row, index)=>
                <tr>   
                  <td>
                    <Link to={`/all-questions/${row.id}`}>
                        {row.name}
                    </Link>
                  </td>
                  <td>
                    {row.student.email}
                  </td>
                  <td>
                    {row.student.username}
                  </td>

                  <button type="button" className="btn btn-primary" data-toggle="modal"  data-target="#exampleModal">
                     Launch demo modal
                  </button>
                  <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                     <QuizResult quiz={row.quiz.id} student={row.student.id}/>
                  </div>
                  
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
export default AttemptedStudents;
