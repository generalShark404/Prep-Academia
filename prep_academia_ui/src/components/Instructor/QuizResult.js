import {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const baseUrl="http://127.0.0.1:8000/api";
function QuizResult(props){
    const [resultData, setResultData]=useState([]);

    useEffect(()=>{
        try {
          axios.get(baseUrl + `/fetch-quiz-result/${props.quiz}/${props.student}`)
          .then((res)=>{
            setResultData(res.data)
          }).then((err)=>console.log(err))
        } catch (error) {
          console.log(error)
        }
       }, []);
    console.log(resultData)
    return(
   <td>      
     <div className="modal-dialog" role="document">
       <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
         ...
        </div>
        <div className="modal-footer">
         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
         <button type="button" className="btn btn-primary">Save changes</button>
        </div>
       </div>
      </div>
    </td>
    )
}

export default QuizResult;