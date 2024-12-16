import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

import axiosInstance from "../axios";
import { DifficultyChoices } from "./utilities";
import Loader from "./loader";
import axios from "axios";


function Quiz() {
  const [quiz, setQuizData] = useState([]);
  const [loading, setLoadingData] = useState(true);
  const {quiz_title, quiz_id } = useParams();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState([]);
  const [passMark, setPassMark] = useState();
  const [nextQuestion, setNextQuestion] = useState();
  const [previousQuestion, setPreviousQuestion] = useState();

  useEffect(() => {
      axiosInstance.get(`/quiz/data/${quiz_id}`).then((res) => {
        setNextQuestion(res.data.next);
        setPreviousQuestion(res.data.previous);
        setQuizData(res.data.results.quiz);
        setPassMark(res.data.results.pass_mark);
        setLoadingData(false); 

        const initialOptions = {};        
        res.data.results.quiz.forEach((question) => {
          initialOptions[question.id] = {
            question: question.text,
            answer: ""
          };
        });

        setSelectedOptions((prev) => ({ ...prev, ...initialOptions }));
        // setLoadingData(false);
      });
       
      // if (results.length > 0){
      //   setSubmitted(true);
      // };

  }, [quiz_id]);

  const paginationHandler = (url) => {
      axiosInstance.get(url)
      .then((res) => {
        setNextQuestion(res.data.next);
        setPreviousQuestion(res.data.previous);
        setQuizData(res.data.results.quiz);
        const updatedOptions = {...selectedOptions};
        res.data.results.quiz.forEach((question) => {
           if(!updatedOptions[question.id]){
            updatedOptions[question.id] = { question:question.text, answer:""
           };
          };
        });
        
        setSelectedOptions(updatedOptions);
      });
    };

  const handleChange = (event) => {
    const {name, value } = event.target;
    const questionId = event.target.dataset.questionId;

    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: {
        question:name,
        answer:value
      },
    }));

    // setSelectedOptions({
    //   ...selectedOptions,
    //   [page]: {
    //     ...selectedOptions[page],
    //     [event.target.name]:event.target.value
    //   }
    // });
  };
 
  const submitQuiz = async () => {
    const _formData = new FormData();
    Object.entries(selectedOptions).forEach(([_, options]) => {
      _formData.append(options.question, options.answer);
    }); 

    try {
      const res = await axiosInstance.post(`/quiz/results/${quiz_id}`, _formData);
      if(res.status == 200 || res.status == 201){
        Swal.fire({
          icon:"success",
          html:`
          <p class="fs-2">
              Your quiz has been successfully submitted.
          </p>`,
        });
        setSubmitted(true);
      };
    } catch (error) {
      Swal.fire({
        icon:"error",
        html:`<p>An error occured while submitting your quiz.</p>`,
      });
    };
  };

  // const submitQuiz = async () => {
  //   const _formData = new FormData();
  //   Object.entries(selectedOptions).forEach(([page, options]) => {
  //       Object.entries(options)
  //       .forEach(([key, value])=>{
  //         _formData.append(key, value);
  //       });

  //     setSelectedOptions({});
  //   });

  //   try {
  //    async function getResults(){
  //      const res = await axiosInstance.post(`/quiz/results/${quiz_id}`, _formData);
       
  //      if(res.status == 200 || res.status == 201){
  //        setSubmitted(true);
  //      };

  //     //  setResults(data.results.quiz);
  //     //  setNextResult(res.data.next);
  //     //  setPrevioudResult(res.data.previous);
  //     //  setScoreData(data.results.score);
  //     };

  //     await getResults();     
  //   } catch (error) {
  //     console.log(`Quiz Submit Error: ${error}`)
  //   };
  // };

  const height = {
    height: "230px",
    width: "100%",
    "object-fit": "cover",
  };

  if(loading){
    return <Loader />
  };

  const StartModal = () => {
    return(
      <div
      className="modal"
      id={`submitModal`}
      tabindex="1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-body fw-bold">
            
           {/* --------------------- */}
            <div className="mb-3 text-center fs-2 fw-bold">
              <label htmlFor="input" className="form-label">
              <p className="bi bi-exclamation-triangle text-danger me-2 h3"></p>
                Are you sure you want to submit ? 
              </label>
            </div>
            {/* --------------------- */}
          
            {/* --------------------- */}
            
            <div className="modal-footer d-flex justify-content-center">
  
               <button
                 type="button"
                 className="btn btn-danger"
                 data-bs-dismiss="modal"
                 aria-label="Close"
               >
                 No
               </button>
               <Link 
                 to={``}
                 className="btn btn-sm  btn-success ms-5"
                 data-bs-dismiss="modal"
                 aria-label="Close"
                onClick={submitQuiz}
               >
                 Yes
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
      );
  };

  return ( 
    <div className="">
      <div className="container-xxl mt-50 z-Index-2  mb-50 ">
        {/* --------------------------------- */}
        <div className="container-xxl  py-5">
          
          <div>
          <p className="fs-1 fw-bold text-dark text-center mt-0 text-wrap col12">
            <span className="bi bi-star-fill me-2 text-warning"></span>
            {quiz_title} Quiz<br />
            
            <hr />
          </p>
          {
                quiz.length > 0 &&
                <div className="d-flex justify-content-end">
                  <p 
                    className="btn btn-success mt-0 " 
                    data-bs-toggle="modal"
                    data-bs-target={`#submitModal`}
                  >
                    Submit
                  </p>
                </div>
              }
          <h4 className="mt-0 fw-bold text-seondary">
            {quiz.length > 0 &&            
              <span>
              Score to pass: 
              <span className="text-success">
                {` ${passMark}%`}
              </span>
              </span>
            }
          </h4> 

          {quiz.length == 0  &&
            <p className="fs-2 text-center text-dark fw-bold h2 mt-5">
              <span className="bi bi-info-circle me-3"></span>
              No Questions Yet !
            </p>
          }

          </div>
          {/* ---------------------------- */}

            <div className="container">
              <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h1 className="mb-5"></h1>
              </div>
              
              {submitted ? 
              <>
                <div className="d-flex justify-content-center">
                    <Link to={`/result/${quiz_title}/${quiz_id}`} className="btn btn-primary">
                      Click to see quiz result
                    </Link>
                </div>
              </>
              : 
              <>
                {/* start */}
              {quiz.length > 0 && quiz.map((question, number) => 
                <div className="row g-4" key={question.id}>
                  <p className="m-0">
                    <span className="me-2">
                      {question.id}.
                    </span>
                    {/* ----- Question  ------- */}
                    <span className="m-0 fs-2">
                      {question.text} ___________.
                    </span>
                  </p>    

                    {/* ----- Answer ------- */}
                    <p className="mt-0 ms-4 mb-0">
                      {question.get_answers.map((answer) => 
                         <div className="mb-2" key={answer.text}>
                            <input 
                              type="radio" 
                              className="me-3" 
                              id={`${question.text}-${answer.text}`}
                              data-question-id={question.id}
                              name={question.text}
                              value={answer.text}
                              checked={
                                selectedOptions[question.id]?.answer === answer.text
                              }
                              onChange={handleChange}
                            />
                            <label  
                               htmlFor={`${question.text}-${answer.text}`}
                            >
                                {answer.text}
                           </label>  
                         </div>
                      )}
                    <hr />
                    </p>

                </div>
              )}
              </> 
            }    

              <div>
                <StartModal />
              </div>
              </div>
             {/* ------------------------------ */}
        </div>
        {/* --------------------------------- */}
      
        <nav aria-label="Page navigation"  className="d-flex justify-content-center">
        <ul className="pagination m-5 justiy-content-center fw-bold display-6">
          
          {submitted == false && 
              <>
                {previousQuestion &&
                <li className="page-item">
                  <Link className=" page-link h4 fw-bold" onClick={()=>paginationHandler(previousQuestion)}>
                    <i className="bi bi-arrow-left me-3"></i>Previous
                  </Link>
                </li>
                }
                
                {nextQuestion &&  
                <li className="page-item">
                  <Link className="page-link h4 fw-bold" onClick={()=>paginationHandler(nextQuestion)}>
                    Next <i className="bi bi-arrow-right ms-3"></i>
                  </Link>
                </li>
                }
              </> 
          }
        </ul>
      </nav>
      </div>
    </div>
  );
};

export default Quiz;