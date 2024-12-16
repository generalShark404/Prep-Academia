import {useState, useEffect} from "react";
import axios from "axios";

const baseUrl='http://127.0.0.1:8000/api';

function MessageList(props){
    const [msgData, setMsgData]=useState([]);

    useEffect(()=>{
        try {
            axios.get(`${baseUrl}/get-messages/${props.teacher_id}/${props.student_id}`)
            .then((res)=>{
              console.log(props.teacher_id)
              console.log(props.student_id)
                setMsgData(res.data)
            });
        } catch (error) {
            console.log(error);
        }
    },[]);

    const fetchMsgs = ()=>{
        try {
            axios.get(`${baseUrl}/get-messages/${props.teacher_id}/${props.student_id}`)
            .then((res)=>{
                setMsgData(res.data);
                const objDiv = document.getElementById('msgList');
                objDiv.scrollTop = objDiv.scrollHeight   
            });
        } catch (error) {
            console.log(error);
        }
    }
    console.log(msgData)

    return(
    <>
    {msgData.map((row,index)=>
         <div className="col-12">
           {/* User 1 */}
           
           {row.msg_from !== 'student' &&
           <div className="col-6 ">
             <div>
               <p className="alert alert-primary my-1">
                 {row.msg_txt}
               </p>

            <p>
             <small className="text-muted">{row.msg_time}</small>
            </p>
             </div>
           </div>
           }
           
           {row.msg_from == 'student' &&
           <div className="col-6 offset-6">
             <div>
               <p className="alert alert-success my-1">
                 {row.msg_txt}
               </p>

            <p>
             <small className="text-muted">{row.msg_time}</small>
            </p>
             </div>
           </div>
           }
        </div>
          )}
     </>
    )
}
export default MessageList;