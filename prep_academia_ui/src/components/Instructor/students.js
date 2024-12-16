import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MessageList from "./messageList";
import Sidebar from "./sidebar";
import axiosInstance from "../../axios";

const baseUrl = "http://127.0.0.1:8000/api";

function Students() {
  const [studentData, setStudentData] = useState([]);
  const teacher_id = localStorage.getItem("teacherId");

  useEffect(() => {
    try {
      axiosInstance
        .get(`${baseUrl}/fetch-enrolled-students/`)
        .then((res) => {
          setStudentData(res.data);
          console.log(res.data)
        });
    } catch (error) {
      console.log(error);
    };
    
    document.title ='Students';
  }, []);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [msgData, setMsgData] = useState({
    msg_txt: "",
  });
  const [groupMsgData, setGroupData] = useState({
    msg_txt: "",
  });

  console.log(studentData)

  return (
    <div>
      <div className="container mt-50">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <section className="col-md-9 mt-5 mb-5">
            <div className="card">
              <h3 className="card-header fw-bold p-4 text-dark text-center">
                All Students
                
              </h3>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Course</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {studentData && studentData.map((student, index) => (
                    <tbody>
                      <tr>
                        <td>
                          <Link to={`/view-student/${student.id}`} className="text-secondary fw-bold">
                            <span className="fw-bold text-dark"> {'>'} </span>
                            {student.student.first_name} {student.student.last_name}
                          </Link>
                        </td>
                        <td>
                          <Link to="" className="fw-bold" style={{color:'rgb(9, 20, 20)'}}>
                            {student.student.student.email}
                          </Link>
                        </td>
                        <td className="">
                           {student.course.title}
                        </td>
                        <td>
                        <p
                          className="text-white bgark rounded m-0 dropdown-toggle p-3 mx-5 fw-bold "
                          role="button"
                          data-bs-toggle="dropdown"
                          style={{background:'rgb(255, 119, 0)'}}
                        >
                          <span className="bi bi-cursor-fill me-2"></span>
                          <span className="bi bi-grid-fill me4"></span>
                        </p>
                      {/* ------ */}
                         <div
                          className="dropdown-menu dropdown-menu-top psotion-absolute p-3"
                          aria-labelledby="dropDownMenu"
                        >
                          <Link
                            to={``}
                            className="btn-primary rounded btn-sm btn w-100"
                          >
                             <span className="bi bi-envelope-fill mx-3"></span>
                             Email
                          </Link>
                          <hr className="dropdown-divider" />
                          <Link
                            to={``}
                            className="btn-success rounded btn-sm btn w-100"
                          >
                             <span className="bi bi-chat-dots-fill mx-3"></span>
                             Message
                          </Link>
                          <hr className="dropdown-divider" />
                          <Link
                            to={``}
                            className="btn-danger rounded btn-sm btn w-100"
                          >
                             <span className="bi bi-exclamation-diamond-fill mx-3"></span>
                             Suspend
                          </Link>
                          <hr className="dropdown-divider" />
                          
                        </div>
                        {/* ------ */}
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default Students;
