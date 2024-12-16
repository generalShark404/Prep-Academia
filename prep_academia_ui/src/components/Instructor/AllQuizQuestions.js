import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../axios";
import TeacherSidebar from "./sidebar";
import SecondNavBar from "../secondNavBar";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function AllQuizQuestions() {
  const [quizData, setQuizData] = useState([]);
  const { quiz_id, quiz_title } = useParams();
  const [updateState, setUpdateState] = useState(0);
  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();
  useEffect(() => {
    const getQuizData = async () => {
      try {
        const res = await axiosInstance.get(`/quiz/data/${quiz_id}`);

        const quiz = res.data.results.quiz.map((item) => ({
          id: item.id,
          question: item.text,
          options: item.get_answers.map((option) => ({
            id: option.id,
            text: option.text,
            correct: option.correct,
            explanation: option.explanation || "",
          })),
        }));
        
        setNext(res.data.next);
        setPrevious(res.data.previous);
        setQuizData(quiz);
        
        if(res.data.error == 'All fields required !'){
          console.log("All field's required !")
        };

      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    getQuizData();
    document.title = "Edit Quiz Question";
  }, [quiz_id, updateState]);

  const paginationHandler = (url) => {
    axiosInstance.get(url)
    .then((res) => {
      const quiz = res.data.results.quiz.map((item) => ({
        id: item.id,
        question: item.text,
        options: item.get_answers.map((option) => ({
          id: option.id,
          text: option.text,
          correct: option.correct,
          explanation: option.explanation || "",
        })),
      }));

      setNext(res.data.next);
      setPrevious(res.data.previous);
      setQuizData(quiz); 
    });
  };

  const handleChange = (index, optionIndex, event) => {
    const { name, value } = event.target;
    setQuizData((prevState) => {
      const newQuizData = [...prevState];
      if (name === "question") {
        newQuizData[index].question = value;
      } else {
        newQuizData[index].options[optionIndex][name] = value;
      }
      return newQuizData;
    });
  };

  const deleteQuestion = (question, data) => {
    Swal.fire({
      html:`
      <span class="fs-3">
        Are you sure you want to delete 
        <span class="fw-bold">
          Question ${question}
        <span>
      <span>`,
      icon:'info',
      showConfirmButton:true
    }).then((res) => {
      if(res.isConfirmed){
        const question_id = data.id;
        axiosInstance.delete(`/quiz/data/${question_id}`)
        .then((res) => {
          if(res.status == 200){
            Swal.fire({
              html:`
              <span class="fs-3">
                <span class="fw-bold">
                  Question ${question}
                </span> 
                deleted successfully !
              </span>`,
              icon:'success'
            });
            let num = 0;
            let numUpdated = ++num; 

            setUpdateState(numUpdated);
          };
        });
      };
    });
  };

  const formSubmit = async (event) => {
    event.preventDefault();

    try {
      const quizPayload = quizData.map((quiz) => ({
        id: quiz.id,
        question: quiz.question,
        answers: quiz.options.map((option) => ({
          id: option.id,
          text: option.text,
          correct: option.correct,
          explanation: option.explanation,
        })),
      }));

      const _formData = new FormData();
      _formData.append(`quiz_data`, JSON.stringify(quizPayload));

      const res = await axiosInstance.put(`quiz/data/${quiz_id}`, _formData);
      const question = document.querySelectorAll('.question');
      
      if (res.status === 200) {
        Swal.fire({
          title: "Question and answers has been edited successfully !",
          icon: "success",
          showConfirmButton: true,
        }).then((res) => {
          if (res.isConfirmed) {
            console.log("Quiz has been updated successfully!");
          }
        });
      }
    } catch (error) {
      if(error.response.data.error == 'All fields required !'){
        Swal.fire({
          title: "No empty questions allowed, All fields required !",
          icon: "error",
          showConfirmButton: true,
        });
        console.log('No empty fields !')
      };

    }
  };

  return (
    <div>
      <SecondNavBar colorStyle="bg-info" />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <TeacherSidebar />
          </div>
          <section className="col-md-9 mb-5 mt-5">
            <div className="card">
              <h2
                className="card-header text-center text-light fw-bold "
                style={{ background: "rgb(9, 20, 20)" }}
              >
                Edit Quiz Questions
              </h2>
              <div className="card-body">
               <Link className="btn btn-success rounded p-3 mt-4" to={`/${quiz_title}/add/quiz/questions/${quiz_id}`}>
                   Add Questions
                </Link>
                <form onSubmit={formSubmit}>
                  {quizData.map((quiz, quizIndex) => (
                    <div key={quizIndex} className="mb-5 mt-3 pt-5">
                      <label
                        htmlFor={`question${quizIndex}`}
                        className="form-label fw-bold text-dark fs-2 mt-5"
                      >
                        Question {quizIndex + 1}
                      
                      <span 
                      className="bi bi-trash text-light  mx-5 cursor-pointer p-2 bg-danger rounded"
                      onClick={() => deleteQuestion(quizIndex + 1, quiz)}
                      >
                      </span>

                      </label>
                      <input
                        type="text"
                        id={`question${quizIndex}`}
                        className="form-control question"
                        name="question"
                        value={quiz.question}
                        onChange={(e) => handleChange(quizIndex, null, e)}
                      />

                      {quiz.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="mt-3 mx-5">
                          <label
                            htmlFor={`option${quizIndex}_${optionIndex}`}
                            className="form-label text-dark"
                          >
                            Option {optionIndex + 1}{" "}
                            <span className="text-success fw-bold">
                              {option.correct ? "(Correct)" : ""}
                            </span>
                          </label>
                          <input
                            type="text"
                            id={`option${quizIndex}_${optionIndex}`}
                            className="form-control"
                            name="text"
                            value={option.text}
                            onChange={(e) =>
                              handleChange(quizIndex, optionIndex, e)
                            }
                          />
                          {option.explanation !== "NULL" &&
                            option.explanation != null &&
                            option.explanation.trim() !== "" && (
                              <>
                                <label
                                  htmlFor={`explanation${quizIndex}_${optionIndex}`}
                                  className="form-label mt-2"
                                >
                                  Explanation
                                </label>
                                <textarea
                                  id={`explanation${quizIndex}_${optionIndex}`}
                                  className="form-control"
                                  name="explanation"
                                  value={option.explanation}
                                  onChange={(e) =>
                                    handleChange(quizIndex, optionIndex, e)
                                  }
                                ></textarea>
                              </>
                            )}
                        </div>
                      ))}
                    </div>
                  ))}
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                <>
                {previous &&
                <li className="page-item">
                  <Link className=" page-link h4 fw-bold" onClick={()=>paginationHandler(previous)}>
                    <i className="bi bi-arrow-left me-3"></i>Previous
                  </Link>
                </li>
                }
                
                {next &&  
                <li className="page-item">
                  <Link className="page-link h4 fw-bold" onClick={()=>paginationHandler(next)}>
                    Next <i className="bi bi-arrow-right ms-3"></i>
                  </Link>
                </li>
                }
              </>
                </form>

              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AllQuizQuestions;