import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TeacherSidebar from "./sidebar";
import {useParams} from 'react-router-dom'
import Swal from 'sweetalert2';

const baseUrl = "http://127.0.0.1:8000/api";

function QuizQuestions() {
    const [questionData, setQuestionData]=useState([]);
    const [totalResult, setTotalResult]=useState(0);
    const {quiz_id} = useParams();
    useEffect(()=>{
     try {
       axios.get(baseUrl + `/quiz-questions/${quiz_id}`)
       .then((res)=>{
        console.log(res)
        setQuestionData(res.data)
        setTotalResult(res.data.length)
       });
     } catch (error) {
       console.log(error)
     }
    }, []);
    const handleDeleteClick = (quiz_id)=>{
       Swal.fire({
        title:'Confirm',
        text:'Are you sure you want to delete this data?',
        icon:'info',
        confirmButtonText:'Continue',
        showCancelButton:true
       }).then((result)=>{
        if(result.isConfirmed){
          try {
            axios.delete(baseUrl + `/quiz-questions/${quiz_id}`).then((res)=>{
              Swal.fire('success', 'question has been deleted !')
              console.log(res)
              setQuestionData(res.data)
              window.location.reload()
            })
          } catch (error) {
            Swal.fire('error', 'Chapter not deleted')
          }
        }
       })
    }
  return (
    <div className="container mt-5 card">
        <div className="row">
            <aside className="col-md-3">
                <TeacherSidebar />
            </aside>
            <section className="col-md-9">
            {questionData.map((row, index)=>
                <div className="card my-3">
                    <h3 className="card-header p-3 ">All Questions ({totalResult})
                      <Link className="btn-sm btn-success float-end p-3" to={`/add-quiz-question/${row.id}`}>Add Question</Link>
                    </h3>
                    <div>
                    <table className="table table-bordered">
              <thead>
                  <tr>
                      <th>Questions</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                
                <tr>
                  <td>
                    <Link  to={`#`}>
                        {row.questions}
                    </Link>
                  </td>
                  <td>
                   <Link to={`/edit-question/${row.id}`} className='btn-info btn-sm p-3 mx-2'>
                      <span className="bi bi-pencil-square mx-1">
                      </span>
                   </Link>
                    <button onClick={()=>handleDeleteClick(row.id)} to={`/delete-question/${row.id}`} className=" btn-danger btn-sm p-3">
                      <span className="bi bi-trash mx-1">
                     </span>
                    </button>
                  </td>
                </tr>
                
              </tbody>
          </table>
                    </div>
                </div>
                )}
            </section>
        </div>
    </div>
  );
}
export default QuizQuestions;
