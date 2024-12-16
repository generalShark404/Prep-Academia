import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import StudentResult from "./student/StudentResult";
import { DifficultyChoices } from "./utilities";
import Loader from "./loader";

function Quizes() {
  const [quiz, setQuizData] = useState([]);
  const [loading, setLoadingData] = useState(false);
  const { course_title, course_id } = useParams();
  const navigate = useNavigate();

  const handleTestStart = (url) => {
    navigate(url, { replace: true });
  };

  useEffect(() => {
    try {
      axiosInstance.get(`quiz/quizes/${course_id}`).then((res) => {
        setQuizData(res.data.quiz);
        setLoadingData(true);
      });
    } catch (error) {}
  }, []);

  const height = {
    height: "230px",
    width: "100%",
    objectFit: "cover",
  };


  return (
    <div className="bg-light">
      <div className="container-xxl mt-50 z-Index-2 mb-50 ">
        {/* --------------------------------- */}

        <div className="container-xxl  py-5">
          <div>
            <p className="fs-1 fw-bold text-dark">
              <span className="bi bi-star-fill me-2 text-warning"></span>
              {course_title} | Quiz
            </p>
           
           {loading ?
              <>
               {quiz.length > 0 ? (
                <div className="container">
                  <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h1 className="mb-5"></h1>
                  </div>
                  <div className="row g-4">
                    {/* start */}
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered table-hover caption-top">
                        <thead className="table-dark">
                          <tr>
                            <th className="col">No</th>
                            <th className="col">Name</th>
                            <th className="col">Questions</th>
                            <th className="col">Difficulty</th>
                            <th className="col">Duration</th>
                            <th className="col">Pass Mark</th>
                            <th className="col">#</th>
                          </tr>
                        </thead>
                        <tbody>
                          {quiz &&
                            quiz.map((quiz, number) => (
                              <tr
                                data-bs-toggle="modal"
                                data-bs-target={`#quizModal${quiz.id}`}
                              >
                                <th>{++number}</th>
                                <td>{quiz.name}</td>
                                <td>{quiz.get_questions_no} </td>
                                <td>
                                  {quiz.difficulty == "I" ? (
                                    <span className="text-secondary">Medium</span>
                                  ) : (
                                    ""
                                  )}
                                  {quiz.difficulty == "B" ? (
                                    <span className="text-primary">Easy</span>
                                  ) : (
                                    ""
                                  )}
                                  {quiz.difficulty == "A" ? (
                                    <span className="text-danger">Hard</span>
                                  ) : (
                                    ""
                                  )}
                                </td>
                                <td>{quiz.duration_time} min</td>
                                <td>{quiz.required_score_to_pass} %</td>
  
                                <td className="text-center">
                                  <Link className="btn-success p-2">Start</Link>
  
                                  {/* ------ Modal Start --------- */}
                                  <div
                                    className="modal textstart"
                                    id={`quizModal${quiz.id}`}
                                    tabindex="1"
                                    aria-labelledby="modalLabel"
                                    aria-hidden="true"
                                  >
                                    <div className="modal-dialog modal-sm">
                                      <div className="modal-content">
                                        <div className="modal-body text-wrap">
                                          <span className="mb-3 text-muted">
                                            You are starting
                                            <span className="fw-bold text-dark">
                                              {` ${quiz.name} `}
                                            </span>
                                            quiz , Do you want to proceed?
                                          </span>
  
                                          <div className="modal-footer d-flex justify-content-center mt-4">
                                            <button
                                              type="button"
                                              className="btn btn-danger "
                                              data-bs-dismiss="modal"
                                              aria-label="Close"
                                            >
                                              Close
                                            </button>
                                            <p
                                              type="button"
                                              className="btn btn-sm  btn-success ms-5"
                                              data-bs-dismiss="modal"
                                              aria-label="Close"
                                              onClick={() =>
                                                navigate(
                                                  `/quiz/${quiz.course.title}/${quiz.id}`,
                                                  { replace: true }
                                                )
                                              }
                                            >
                                              Start
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* ------------------------- */}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
  
                    {/* end */}
                  </div>

                  <p className="fs-2 mb-0 mt-5 text-center fw-bold text-dark">
                    Previous Result
                  </p>
                  <StudentResult />
                </div>
              ) : (
                <p className="text-center text-dark fw-bold h2 mt-5">
                  <span className="bi bi-info-circle me-3"></span>
                  No Questions Yet !
                </p>
              )}
              </>
           : 
          
                  <>
                      <p className="text-center fs-2 d-block text-dark">
                        If not logged in, please log in to view and start quiz !
                      </p>
                    <div className="d-flex justify-content-center mt-5">
                      <button  className="btn btn-warning" type="button" disabled>
                        <span className="spinner-border me-3" role="status" aria-hidden="true"></span>
                        Loading....
                      </button>
                    </div>
                  </>
              }
           


          </div>
          {/* ---------------------------- */}

          {/* ------------------------------ */}
        </div>
        {/* --------------------------------- */}
      </div>
    </div>
  );
};

export default Quizes;