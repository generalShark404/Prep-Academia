import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import { useRedirect, getLocalStorage } from "../utilities";

function StudentResult() {
  const [resultsData, setResultsData] = useState([]);
  const [resultsLoader, setResultsLoader] = useState(true);

  const navigate = useNavigate();

  const user_id = getLocalStorage("user");
  useEffect(() => {
    //Get Results
    try {
      axiosInstance.get(`quiz/get/quiz-results/`).then((res) => {
        if (res.status == 200 || res.status == 201) {
          setResultsData(res.data.results);
          setResultsLoader(false);
        }
      });
    } catch (err) {
      console.log(err);
    }

    document.title = "My Quiz";
  }, []);


  return (
    
    <div className="">
      
      {/* ------------------------- */}
      <div className="borde col-lg-12 col-md-12 col-sm-12 col-xs-12">
        {/* ------------------------- */}
        <p className="display-5 bordr border-3 mb-5 fw-bold mt-5 d-lg-block text-center p-4 badge text-bg-warning fs-1 text-daek fw-bold text-dark">
          <span className="bi bi-question-circle  me-3 "></span>
          My Results
        </p>
        {resultsData ? 
        <>
          {resultsLoader
            ? 
            <>
              <div className="d-flex justify-content-center mt-5">
                  <button  className="btn btn-warning" type="button" disabled>
                    <span className="spinner-border me-3" role="status" aria-hidden="true"></span>
                    Loading....
                  </button>
              </div>
            </>
            : 
            resultsData.length > 0 && (
                <div className="table-responsive">
                  <table className="table table- table-bordered table-hover caption-top">
                    <thead className="table-warning">
                      <tr className="text-warnig">
                        <th className="col">No</th>
                        <th className="col">Name</th>
                        <th className="col">Course</th>
                        <th className="col">Score</th>
                        <th className="col">Option</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultsData &&
                        resultsData.length > 0 &&
                        resultsData.map((result, number) => (
                          <tr
                            data-bs-toggle="modal"
                            data-bs-target={`#quizRetakeModal${result.quiz.id}`}
                          >
                            <th>{++number}</th>
                            <td>{result.quiz.name}</td>
                            <td>{result.quiz.course.title}</td>
                            <td>{result.score} %</td>

                            {/* ---- Modal ---- */}
                            <td className="text-center">
                              <span className="bg-danger p-2 text-light">
                                Retake
                              </span>
                              {/* ------ Modal Start --------- */}
                              <div
                                className="modal textstart"
                                id={`quizRetakeModal${result.quiz.id}`}
                                tabindex="1"
                                aria-labelledby="modalLabel"
                                aria-hidden="true"
                              >
                                <div className="modal-dialog modal-sm">
                                  <div className="modal-content">
                                    <div className="modal-body text-wrap">
                                      <span className="mb-3 text-muted">
                                        You are retaking
                                        <span className="fw-bold text-dark">
                                          {` ${result.quiz.name} `}
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
                                              `/quiz/${result.quiz.course.title}/${result.quiz.id}`,
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
                            {/* ---------- */}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
          {/* ------------------------- */}
    
        </> : 
        <>
          {resultsData.length <= 0 && (
            <div className="text-center fs-2">No Results yet !</div>
          )}
        </>
        }
      </div>
      {/* ------------------------- */}
    </div>
  );
}
export default StudentResult;
