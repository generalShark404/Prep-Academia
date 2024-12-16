import {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const baseUrl="http://127.0.0.1:8000/api";
function CheckQuizinCourse(props){
    const [quizData, setQuizData]=useState([]);
    const teacherId = localStorage.getItem('teacherId');

    useEffect(()=>{
        try {
          axios.get(baseUrl + `/fetch-quiz-assign-status/${props.quiz}/${props.course}`)
          .then((res)=>{
            setQuizData(res.data)
          }).then((err)=>console.log(err))
        } catch (error) {
          console.log(error)
        }
       }, []);
    
    
    const assignQuiz = (quiz_id)=>{
        const _formData = new FormData()
         _formData.append('instructor', teacherId);
         _formData.append('course', props.course);
         _formData.append('quiz', props.quiz);
         try {
             axios.post(`${baseUrl}/quiz-assign-course/`, _formData, {
                headers:{
                    'content-type':'multipart/form-data'
                }
             }).then((res)=>{
                if(res.status===200 || res. status===201){
                    window.location.reload();
                }
             });
         }catch (error) {
            console.log(error)
         }
       }
    return(
        <td>
        {quizData.bool == false &&
        <button className="btn-success btn-sm" onClick={()=>assignQuiz(props.quiz)
        }>Assign Quiz</button>
        }
        {quizData.bool == true &&
          <>          
           <span className="text-success">
             Quiz Assigned
           </span>
              &nbsp;
           <Link  to={`/attempted-students/${props.quiz}`} className='ms-5 btn-sm btn-info'>Attempted Students</Link>
          </>
        }
      </td>
    )
}

export default CheckQuizinCourse