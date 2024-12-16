import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const baseUrl="http://127.0.0.1:8000/api";
function CheckQuizStatus(props){
    const [quizData, setQuizData]=useState([]);
    const studentId = localStorage.getItem('studentId');

    useEffect(()=>{
        try {
          axios.get(baseUrl + `/fetch-quiz-attempt-status/${props.quiz}/${props.student}`)
          .then((res)=>{
            setQuizData(res.data)
          }).then((err)=>console.log(err))
        } catch (error) {
          console.log(error)
        }
       }, []);
    
    return(
        <td>
        {quizData.bool == true &&
        <span className="text-success">Attempted</span>
        }

        {quizData.bool == false &&
          <Link to={`/take-quiz/${props.quiz}`} className="btn-success btn-sm">Take Quiz</Link>
        }
      </td>
    )
}

export default CheckQuizStatus