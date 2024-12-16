import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TeacherSidebar from "./sidebar";
import {useParams} from 'react-router-dom'
import Swal from 'sweetalert2';

const baseUrl = "http://127.0.0.1:8000/api";

function ShowAssignment() {
    const [assignmentData, setAssignmentData]=useState([]);
    const [totalResult, setTotalResult]=useState(0);

    const {student_id} = useParams();
    const {teacher_id} = useParams();
    useEffect(()=>{
     try {
       axios.get(baseUrl + `/student-assignment/${student_id}/${teacher_id}`)
       .then((res)=>{
        console.log(res)
        setAssignmentData(res.data)
        setTotalResult(res.data.length)
       })
     } catch (error) {
       console.log(error)
     }
    }, []);

  return (
    <div className="container mt-5 card">
        <div className="row">
            <aside className="col-md-3">
                <TeacherSidebar />
            </aside>
            <section className="col-md-9">
                <div className="card-header">
                    <h3>All Assignment ({totalResult})   <Link className="btn btn-success btn-sm float-end" to='/add-assignment/'>Add Assignment</Link>
                    </h3>
                    <div>
                    <table className="table table-bordered">
              <thead>
                  <tr>
                      <th>Title</th>
                  </tr>
              </thead>
              <tbody>
                {assignmentData.map((row, index)=>
                <tr>
                  <td>
                    <Link  to={`#`} className=''>{row.title}</Link>
                  </td>
                  <td>
                  {row.student_status == false &&
                        <span className="badge bg-warning p-3">Pending</span>
                    }
                    {row.student_status == true &&
                        <span className=" badge bg-success p-3">Completed</span>
                    }
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
  );
}
export default ShowAssignment;
