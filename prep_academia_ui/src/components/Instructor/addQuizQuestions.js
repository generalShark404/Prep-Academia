import Sidebar from "./sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import SecondNavBar from "../secondNavBar";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";

// What is your name ?
// Because it is my first name
function AddQuiz() {
  const [quizData, setQuizData] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correct: "",
    explanation: ""
  });

  useEffect(() => {
    document.title = "Add Quiz Questions";
  }, []);

  const { quiz_id } = useParams();
  console.log("Quiz ID",quiz_id)

  const handleChange = (event) => {
    setQuizData({
      ...quizData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event) => {
    setQuizData({
      ...quizData,
      correct: event.target.value,
    });
  };

  
  const formSubmit = (e) => {
  
    document.getElementById('sendBtn').setAttribute("disabled", "true")
    e.preventDefault();

    const _formData = new FormData();
  
    _formData.append("quiz", quiz_id);
    _formData.append("question", quizData.question);
    _formData.append("optionA", quizData.optionA);
    _formData.append("optionB", quizData.optionB);
    _formData.append("optionC", quizData.optionC);
    _formData.append("optionD", quizData.optionD);
    _formData.append("correct", quizData.correct);
    _formData.append("explanation", quizData.explanation);
  
    try {
      axiosInstance
        .post(`/quiz/add/quiz-question-answer/`+ Number(quiz_id), _formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if(res.status == 200 || res.status == 201){
            Swal.fire({
              title: "Quiz added...",
              timer: 5000,
              timerProgressBar: true,
              icon: "success",
              position: "top-right",
            })
              
            setQuizData({
              question: "",
              optionA: "",
              optionB: "",
              optionC: "",
              optionD: "",
              correct: "",
              explanation: ""
            });

            document.querySelector('.sendBtn').removeAttribute('disabled');
          };
        });
    } catch (err) {
      console.log(err);
    }
  };


  console.log(quizData);

  return (
    <div>
      <SecondNavBar />
      
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <section className="col-md-9 my-3 mt-5">
            <div className="card">
              <h3 className="card-header text-center fw-bold">
                Add Quiz
              </h3>
              <form className="card-body"onSubmit={formSubmit} method="post">
                <>
                  <div className="mb-5 mt-5">
                    <label htmlFor="title" className="form-label fw-bold fs-2 text-dark">
                      Question
                    </label>
                    <textarea
                      // type={"text"}
                      name="question"
                      id="question"
                      className="form-control"
                      value={quizData.question}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label fs-2 fw-bold text-dark">
                      Options
                    </label><br />

                    {/* Option 1 */}
                    <span>Option A</span>
                    <input
                      type={"text"}
                      onChange={handleChange}
                      name="optionA"
                      id="optionA"
                      className="form-control mb-3"
                      value={quizData.optionA}
                      required
                    />

                    {/* Option 2 */}
                    <span>Option B</span>
                    <input
                      type={"text"}
                      onChange={handleChange}
                      name="optionB"
                      id="optionB"
                      className="form-control mb-3"
                      value={quizData.optionB}
                      required
                    />

                    {/* Option 3 */}
                    <span>Option C</span>
                    <input
                      type={"text"}
                      onChange={handleChange}
                      name="optionC"
                      id="optionC"
                      className="form-control mb-3"
                      value={quizData.optionC}
                      required
                    />

                    {/* Option 4 */}
                    <span>Option D</span>
                    <input
                      type={"text"}
                      onChange={handleChange}
                      name="optionD"
                      id="optionD"
                      className="form-control mb-5"
                      value={quizData.optionD}
                      required
                    />
                    
                    {/* Correct */}
                    <label>Correct</label>
                    <select 
                       className="form-control mb-5"
                       name="correct"
                       id="correct"
                       value={quizData.correct}
                       onChange={handleSelectChange}
                       required
                    >
                      <option disabled value={''}>Select Correct Answer</option>
                      <option value={quizData.optionA}>
                        {quizData.optionA}
                      </option>
                      <option value={quizData.optionB}>
                        {quizData.optionB}
                      </option>
                      <option value={quizData.optionC}>
                        {quizData.optionC}
                      </option>
                      <option value={quizData.optionD}>
                        {quizData.optionD}
                      </option>
                    </select>
                    
                    {/* Option 4 */}
                    <span>Expalantion for correct answer</span>
                    <textarea
                      // type={"text"}
                      name="explanation"
                      id="explanation"
                      className="form-control"
                      value={quizData.explanation}
                      onChange={handleChange}
                      required
                    ></textarea>

                  </div>
                  <button className="btn btn-primary sendBtn"
                  type="submit" id="sendBtn">
                    Add Quiz
                  </button>
                </>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddQuiz;