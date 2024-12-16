import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// axiosInstance;

import axiosInstance from "../axios";

const QuizResult = () => {
  const [results, setResults] = useState();
  const [scoreData, setScoreData] = useState();
  const [passMark, setPassMark] = useState();
  const [nextResult, setNextResult] = useState();
  const [previousResult, setPrevioudResult] = useState();
  const [dataIsAvailable, setDataIsAvailable] = useState(false);

  const {quiz_title, quiz_id} = useParams();


 useEffect(() => {
  axiosInstance.get(`/quiz/results/${quiz_id}`).then((res) => {
    if(res.status == 200 || res.status == 201){
      setNextResult(res.data.next);
      setPrevioudResult(res.data.previous);
      setResults(res.data.results[0]);
      setScoreData(res.data.results[1].score);
      setPassMark(res.data.results[1].pass_mark);
      setDataIsAvailable(true);
    };
  });

  }, []);

  const resultPaginationHandler = (url) => {
    try {
      axiosInstance.get(url)
      .then((res) => {
        console.log(res.data)
        setNextResult(res.data.next);
        setPrevioudResult(res.data.previous);
        setResults(res.data.results[0]);
      });
    } catch (error) {
      
    };
  };

  let resultsData = null;
  if(dataIsAvailable){
    resultsData = (
       <>
          <>
                <span className="ms-5 col-4 fs-3 text-dark fw-bold">
                  Pass mark: 
                  <span className="text-success">
                  {` ${passMark}%`}
                  </span>
                </span>
               
                <span className="ms-5 col-4 fs-3 text-dark fw-bold">
                  Score: 
                  <span className={`${scoreData >= passMark ? 'text-success':'text-danger'}`}>
                  {` ${scoreData}%`}
                  </span>
                </span>
               
                {scoreData >= passMark ? 
                <div>
                  <p className="ms-4 mt-3 text-success border col-lg-4 p-3 border-success text-center br-3">
                    Good performance ! Try again!
                  </p>
                </div>
                :
                <div className="">
                  <p className="ms-4 mt-3 text-danger border col-lg-4 p-3 border-danger text-center br-3">
                    Poor performance ! Try again!
                  </p> 
                </div>
                }

           <p className="mx-3 d-flex justify-content-end">
                  <Link className="btn btn-primary" to={`/quiz/${quiz_title}/${quiz_id}`}>
                    Retake Quiz
                  </Link>
            </p>
              </>
                

        <div className="container-xxl mt-5 z-Index-2  mb-50">
          {/* get_email_field_name --------------------------------- */}
          
            {results && results.map((result, number) => (     
                      <div> 

                        <div className="mb-5">
                          <div className="row container-xxl">
                            <div>
                              <div className="p fs-2">
                                <p className="text-dark mb-0 fw-bold"> 
                                  {result.id + " - "}
                                  {result.question + " "}  
                                </p>
                                <p className="text-dark text-underline bi bi-dot mb-0 ">
                                  <span className="text-hide" id="quiz_score">       
                                  {result.score}
                                  </span>

                                  You chose: 
                                  <span className={`
                                  ${result.correct ? 'text-success' : 'text-danger'
                                  }`}>                          
                                  {" " + result.user_answer}
                                  </span>
                                </p>
                                <p className="mb-0">
                                  {result.correct_answer && result.correct_answer.map((answer)=>
                                    <p className="bi bi-dot mb-0 text-dark">
                                      Correct answer: 
                                      <span className="text-success">
                                        {" "+answer.text}
                                      </span><br />

                                {/* ---Explanation btn--- */}
                                <Link 
                                  className="text-primary  mb-5 text-uderline"
                                  data-bs-toggle={"collapse"}
                                  data-bs-target={`#explanationAccordion${result.id}`}
                                >
                                    Explanation
                                    <span 
                                      className="bi bi-caret-down mt-">
                                    </span>
                                </Link>
                                {/* ---Explanation btn--- */}

                                {/* --Explanation start-- */}
                                <div className="accordion accordion-flush mt-0" id="accordionFlushExample">
                                  <div className="accordion-item">
                                    <div    id={`explanationAccordion${result.id}`} className="accordion-collapse collapse"  data-bs-parent="accordionFlushExample">
                                      <div className="accordion-body">
                                        <p className="fs-3 bi ">
                                          {" - " + answer.explanation}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* --Explanation End-- */}
                                    </p>
                                    
                                  )}
                                </p>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div> 
                      ))
          }

          <nav aria-label="Page navigation"  className="d-flex justify-content-center">
          <ul className="pagination m-5 justiy-content-center fw-bold display-6">

            {/* {submitted &&  */}
                <>
                  {previousResult &&
                  <li className="page-item">
                    <Link className=" page-link h4 fw-bold" onClick={()=>resultPaginationHandler(previousResult)}>
                      <i className="bi bi-arrow-left me-3"></i>Previous
                    </Link>
                  </li>
                  } 
                  
                  {nextResult &&  
                  <li className="page-item">
                    <Link className="page-link h4 fw-bold" onClick={()=>resultPaginationHandler(nextResult)}>
                      Next <i className="bi bi-arrow-right ms-3"></i>
                    </Link>
                  </li>
                  }               
                  </> 
            {/* } */}
          </ul>
        </nav>
        </div>
       </>
    )
  }else{
    resultsData = (
      <>
        <div className="d-flex justify-content-center mt-5">
            <button  className="btn btn-warning" type="button" disabled>
              <span className="spinner-border me-3" role="status" aria-hidden="true"></span>
              Loading....
            </button>
        </div>
      </>
    )
  }

 return(
    <div className="mt-50">
      <h1 className="text-center fs-2 fw-bold">
       Quiz result for - {quiz_title}
      </h1>
            {resultsData}
    </div>
 );
};

export default QuizResult