import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import axios from "axios";
import SecondNavBar from "../secondNavBar";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function StudentAssignment() {
  const [assignmentData, setAssignmentData] = useState([]);
  const [assignmentStatus, setAssignmentStatus] = useState("");
  const student_id = localStorage.getItem("studentId");

  useEffect(() => {
    try {
      axios.get(`${baseUrl}/my-assignments/${student_id}`).then((res) => {
        setAssignmentData(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const markAsDone = (assignment_id, title, detail, student, teacher) => {
    const _formData = new FormData();
    _formData.append("student_status", true);
    _formData.append("title", title);
    _formData.append("detail", detail);
    _formData.append("teacher", teacher);
    try {
      axios
        .put(`${baseUrl}/update-assignments/${assignment_id}`, _formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            window.location.reload();
          }
          setAssignmentStatus("success");
        });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(assignmentData);
  return (
    <div>
      <SecondNavBar colorStyle={'bg-student-dashboard'}/>
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
                  <h1 className="fw-bold">My Assignments</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container mt-100 mb-50">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <section className="col-md-9 mt-3 mb-3">
            <div className="card">
              <h3 className="card-header">My courses</h3>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Teacher</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {assignmentData.map((row, index) => (
                    <tbody>
                      <tr>
                        <Link to={`/detail/}`}>
                          <td>{row.title}</td>
                        </Link>
                        <td>
                          <Link to={`/teacher-detail/`}>
                            {row.teacher.full_name}
                          </Link>
                        </td>
                        <td>
                          {assignmentStatus !== "success" && (
                            <button
                              className="btn-sm btn-success"
                              onClick={() =>
                                markAsDone(
                                  row.id,
                                  row.title,
                                  row.detail,
                                  row.student.id,
                                  row.teacher.id
                                )
                              }
                            >
                              Done
                            </button>
                          )}
                          {assignmentStatus === "success" && (
                            <p className="success">Completed</p>
                          )}
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
export default StudentAssignment;
