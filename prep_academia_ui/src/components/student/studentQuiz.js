import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import SecondNavBar from "../secondNavBar";
import decodedToken  from "./decodetoken";
import axiosInstance from "../../axios";
import checkAuthentication from "../utilities";
import { useRedirect, getLocalStorage } from "../utilities";
import Loader from "../loader";
import StudentResult from "./StudentResult";

function StudentQuiz() {
  const [quizData, setQuizData] = useState([]);
  const [resultsData, setResultsData] = useState();
  const [loading, setLoading] = useState(false);
  const [resultsLoader, setResultsLoader] = useState(true);

  const navigate = useNavigate();
  
  const user_id = getLocalStorage('user');
    useEffect(() => {
    try {
        axiosInstance.get(`/quiz/get/student/quiz/`)
        .then((res) => {
            if(res.status == 200 || res.status == 201){
                setQuizData(res.data.quiz);
                setLoading(true);
            };
        });
    } catch (err) {
      console.log(err);
    }

    //Get Results
    try {
      
      axiosInstance.get(`quiz/get/quiz-results/${user_id}`)
      .then((res) => {
          if(res.status == 200 || res.status == 201){
              setResultsData(res.data.results);
              setResultsLoader(false);
          };
      });
    } catch (err) {
      console.log(err);
    }


    document.title = "My Quiz";
  }, []);

  console.log(resultsData)

  const containerStyle = {
    "box-shadow": "1px 1px 5px 1px grey",
    "border-radius": "2px"
    // "background":"rgb(235, 235, 235)"
  };

  const height = {
    height: "200px",
    width: "100%",
    "object-fit": "cover",
    // "border-radius": "2px",
  };

  
  return (
    <div className="">
      <SecondNavBar colorStyle={"user-course-second-nav"} />
   
      <div className="container-xxl mt-100 z-Index-2 mtlg-5 mb-50 mt-10">
        {/* <div className="myCoursesDashboardHeader">
          <h4 className="fw-bold ">My Courses</h4>
        </div> */}
        <div className="row mt-lg-5">
          <div className="col-12 mt-5">
          <div className="col-lg-2 col-xs-0">
            <Sidebar />
          </div>
         {/* --------------------------- */}

         {/* ------------------------- */}
          <div className="borde col-lg-10 col-md-12 col-sm-12 col-xs-12">            
            <div className="">
              <p className="display-5 bordr border-3 mb-5 fw-bold mt-5  d-lg-block text-center p-4 badge text-bg-dark fs-1 text-daek fw-bold text-warning ">
                <span className="bi bi-question-circle  me-3 "></span>
                My Quiz
              </p>
              
            </div>

            {/* ------------------------- */}

{loading ? 
 <>
   {quizData ? 
               <>
               {quizData.length > 0 &&
            <div className="table-responsive">

            <table className="table table-striped table-bordered table-hover caption-top">
                  <thead className="table-dark">
                    <tr className="text-warning">
                      <th className="col">No</th>
                      <th className="col">Name</th>
                      <th className="col">Course</th>
                      <th className="col">Questions</th>
                      <th className="col">Difficulty</th>
                      <th className="col">Duration</th>
                      <th className="col">Pass Mark</th>
                      <th className="col">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizData.length > 0 &&
                      quizData.map((quiz, number) => (
                        <tr 
                            data-bs-toggle="modal"
                            data-bs-target={`#quizModal${quiz.id}`}>
                          <th>{++number}</th>
                          <td>
                            {quiz.name}
                          </td>
                          <td>
                            {quiz.course.title}
                          </td>
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

                          <td className="text-center" 
                          >
                            <Link
                              className="btn-success p-2"
                            >
                              Start
                            </Link>

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
            }
            {/* ------------------------- */}
            {/* ------------------------- */}
              
            {/* ------------------------- */}

               </>
            : 
            <>
            {quizData.length <= 0 &&
                  <div className="text-center fs-2">
                      No Quizes yet !
                  </div>
            }
            
            </>
            }
     </>
 :
      <>
      <div className="d-flex justify-content-center mt-5">
          <button  className="btn btn-warning" type="button" disabled>
            <span className="spinner-border me-3" role="status" aria-hidden="true"></span>
            Loading....
          </button>
      </div>
      </>
}
            


            <div>
                <StudentResult />
              </div>
          </div>
          {/* ------------------------- */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentQuiz;