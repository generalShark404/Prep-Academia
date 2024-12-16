import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Sidebar from "./sidebar"
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api'

function TakeQuiz(){
   const [questionData, setQuestionData]=useState([]);
   const [quizData, setQuizData]=useState([]);
   const {course_id} = useParams();
   const {quiz_id} = useParams();

   const studentId=localStorage.getItem('studentId');
   useEffect(()=>{
    try {
        axios.get(baseUrl + `/quiz-questions/${quiz_id}/1`).then((res)=>{ 
          console.log(res)
          setQuestionData(res.data);        
        })
      } catch (error) {
        console.log(error)
      }

   },[]);

   const submitAnswer = (question_id, right_ans)=>{
     const _formData = new FormData();
     _formData.append('student', studentId);
     _formData.append('quiz', quiz_id);
     _formData.append('question', question_id);
     _formData.append('right_ans',right_ans);

     try {
        axios.post(`${baseUrl}/attempt-quiz/`, _formData, {
            headers: {
                'content-type':'multipart/form-data'
            }
         })
         .then((res)=>{
            if(res.status==200 || res.status==201){
                axios.get(`${baseUrl}/quiz-questions/${quiz_id}/next-question/${question_id}`)
                .then((res)=>{
                    setQuestionData(res.data)
                })
            }
         })  
     } catch (error) {
        console.log(error)
     }
   }

   console.log(questionData)
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
      {questionData.map((row, index)=>
      <div className="card mt-3 my-2">
          <>
          <h3 className="card-header">{row.questions}</h3>
        <div className="card-body">

          <table className="table table-bordered">
              <tbody>
                {/* option 1 */}
                <tr>
                   <td className="text-dark">
                     <button className="btn-lg btn-info" onClick={()=>submitAnswer(row.id, row.ans1)}>{row.ans1}</button>
                   </td>
                </tr> 
                {/* option 2 */}
                <tr>
                   <td className="text-dark">
                     <button className="btn-lg btn-info" onClick={()=>submitAnswer(row.id, row.ans2)}>{row.ans2}</button>
                   </td>
                </tr> 
                {/* option 3 */}
                <tr>
                   <td className="text-dark">
                     <button className="btn-lg btn-info" onClick={()=>submitAnswer(row.id, row.ans3)}>{row.ans3}</button>
                   </td>
                </tr> 
                {/* option 4 */}
                <tr>
                   <td className="text-dark">
                     <button className="btn-lg btn-info" onClick={()=>submitAnswer(row.id, row.ans4)}>{row.ans4}</button>
                   </td>
                </tr>
              </tbody>
          </table>
        </div>
            </> 
        </div>
          )}
      </section>
        </div>
      </div>
    </div> 
    )
}
export default TakeQuiz;
