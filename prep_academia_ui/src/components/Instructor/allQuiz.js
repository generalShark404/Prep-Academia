import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import {useState, useEffect} from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import axiosInstance from "../../axios";

const baseUrl = 'http://127.0.0.1:8000/api'
function AllQuiz(){
   const [quizData, setQuizData]=useState([]);
   const teacherId = localStorage.getItem('teacherId');

   useEffect(()=>{
    try {
      axiosInstance.get(`/instructor-quiz/`)
      .then((res)=>{
        setQuizData(res.data)
      }).then((err)=>console.log(err))
    } catch (error) {
      console.log(error)
    }

    document.title="All Quiz";
   }, []);

   const handleDeleteClick = (quiz_id)=>{
    Swal.fire({
        title:'Are you sure you want to delete ?',
        icon:'info',
        confirmButtonText:'Continue',
        showCancelButton:true
    }).then((result)=>{
        if(result.isConfirmed){
            try {
                axios.delete(`${baseUrl}/teacher-quiz-detail/${quiz_id}`)
                .then((res)=>{
                    window.location.reload();
                })
            } catch (error) {
                console.log(error)
            }
        }
    })
   }

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
                  <h1 className="fw-bold">All Quiz</h1>
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
          <h3 className="card-header">All Quiz</h3>
        <div className="card-body">
          <table className="table table-bordered">
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Questions</th>
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
                     123
                  </td>
                  <td>
                    <Link to={`/edit-quiz/${quiz.id}`} className='btn btn-secondary  btn-sm'>Edit</Link>
                    <Link to={`/add-quiz-questions/${quiz.id}`} className='btn btn-success  btn-sm'>Add Questions</Link>
                    <button className="btn btn-danger btn-sm" onClick={()=>handleDeleteClick(quiz.id)
                    }>Delete</button>
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
export default AllQuiz
