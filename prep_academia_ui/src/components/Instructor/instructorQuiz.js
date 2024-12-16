import Sidebar from "./sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import SecondNavBar from "../secondNavBar";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import { getLocalStorage } from "../utilities";

function InstructorQuiz() {
  const { course_id } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [dataAvailbale, setDataAvailbale] = useState(false);

  useEffect(() => {
    document.title = "My Created Quiz";

    try {
      axiosInstance.get(`/quiz/instructor-quizes/`).then((res) => {
        setQuizData(res.data.instructor_quiz);
        setLoader(true);
        setDataAvailbale(true);
      }).catch((eror) => {

      });
    } catch (error) {}
  }, []);


  const handleQuizDelete = (quiz) => {
    Swal.fire({
      icon:'warning',
      html:`<h3>Are you sure you want to delete quiz 
      <span style="font-weight:bold">${quiz.name}</span></h3>`
    }).then((res) => {
      if(res.isConfirmed){
        axiosInstance.delete(`quiz/delete-quiz/${quiz.id}`)
        .then((res) => {
          if(res.status == 200){
            Swal.fire({
              icon:'success',
              html:`<h3>Quiz 
              <span style="font-weight:bold">${quiz.name}</span> deleted successfully !</h3>`
            }).then((res) =>{
              window.location.reload();
            });
          }
        });
      }
    });
  };

  console.log(quizData);
  return (
    <div>
      <SecondNavBar />
      <div className="container">
        <div className="row mb-5 mt-5">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <section className="col-md-9 my-3 mt-5 mb-5">
            <div className="ard">
              <h3 className="ard-header text-center fw-bold">My Quiz</h3>

              <div className="ard-body">
                {/* <> */}

                {dataAvailbale ? 
                <div className="table-responsive">
                  {quizData && quizData.length > 0 ? 
                  <table className="table table-striped table-bordered table-hover">
                      {/* {loader ?  */}
                       <>
                       <thead
                         className="text-warning"
                         style={{ background: "rgb(9, 20, 20)" }}
                       >
                         <tr>
                           <th className="col">No</th>
                           <th className="col">Name</th>
                           <th className="col">Course</th>
                           <th className="col">#</th>
                         </tr>
                       </thead>
                       <tbody>
                         
                         <>
                           { quizData.map((quiz, number) => (
                                <tr>
                                  <th className="col">{++number}</th>
                                  <td className="col">{quiz.name}</td>
                                  <td className="col">{quiz.course.title}</td>
                                  
                                  <td
                                    className="col table-active text-center table-warning"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                  >
                                    More
                                    <span className="bi bi-caret-down ms-3 "></span>
                                  </td>
      
                                  {/* ------ */}
                                  <div
                                    className="dropdown-menu dropdown-menu-top psotion-absolute p-3 bg-dark"
                                    aria-labelledby="dropDownMenu"
                                  >
                                    <Link
                                      to={`/${quiz.name}/edit/quiz/${quiz.id}`}
                                      className="bg-success text-light rounded btn-sm btn w-100"
                                    >
                                      Edit
                                    </Link>
                                    <hr className="dropdown-divider" />
                                    <Link
                                      to={`/${quiz.name}/all-questions/${quiz.id}`}
                                      className="bg-secondary text-light rounded btn-sm btn w-100"
                                    >
                                      All Questions
                                    </Link>
                                    <hr className="dropdown-divider" />
      
                                    <Link
                                      to={`/${quiz.name}/add/quiz/questions/${quiz.id}`}
                                      className="bg-light rounded btn-sm btn w-100"
                                    >
                                      Add Questions
                                    </Link>
                                    <hr className="dropdown-divider" />
      
                                    <Link
                                    onClick={()=>handleQuizDelete(quiz)}
                                      className="bg-danger text-light rounded btn-sm btn w-100"
                                    >
                                      Delete
                                    </Link>
                                   
                                  </div>
                                  {/* ------ */}
                                </tr>
                              )) 
                            }
                         </>
                       </tbody>
                           </>     
                       {/* } */}
                  </table>
                   :
                   <>
                     <div className="d-flex justify-content-center text-center mt-5">
                        
                        <p className="text-center fs-2 text-dark">
                          No Quiz created yet !
                          <Link className="mx-3 btn bg-warning text-light" to={'/instructor/courses'}>
                            Add Quiz
                          </Link>
                        </p>
                     </div>   
                    </>
                   }
                </div>
                :
                    <>
                      <div className="d-flex justify-content-center mt-5">
                        <button  className="btn btn-dark" type="button" disabled>
                          <span className="spinner-border me-3" role="status" aria-hidden="true"></span>
                          Loading....
                        </button>
                      </div>   
                    </>
                        }
                {/* </> */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InstructorQuiz;