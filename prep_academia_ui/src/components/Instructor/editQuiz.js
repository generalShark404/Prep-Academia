import { Link, useParams } from "react-router-dom";
import Sidebar from "./sidebar";
import {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import axiosInstance from "../../axios";
import SecondNavBar from "../secondNavBar";

function EditQuiz(){
  const [quizData, setQuizData] = useState({
    difficulty: "Select Difficulty",
    pass_mark: "",
    name:"",
    duration_time:"",
  });

  const { quiz_id } = useParams();
  console.log(quiz_id)

  const handleChange = (event) => {
    setQuizData({
      ...quizData,
      [event.target.name]: event.target.value,
    });
  };

  const difficulty = [
    {'level':'Beginner','id':'B'}, 
    {'level':'Intermediate', 'id':'I'}, 
    {'level':'Advanced', 'id':'A'}
  ];

  useEffect(() => {
    const fetchQuiz = async ()=> {
      const res = await axiosInstance.get(`/quiz/get-quiz/${quiz_id}`)
      const quiz = res.data.quiz;
      setQuizData({
        name:quiz.name,
        pass_mark:quiz.required_score_to_pass,
        duration_time:quiz.duration_time,
        difficulty:quiz.difficulty
      });

    };

    fetchQuiz();
    document.title = "Edit Quiz";
  }, []);

  const formSubmit = () => {
    const _formData = new FormData();
  
    // _formData.append("course", course_id);
    _formData.append("name", quizData.name);
    _formData.append("difficulty", quizData.difficulty);
    _formData.append("pass_mark", quizData.pass_mark);
    _formData.append("duration_time", quizData.pass_mark);
  
    try {
      axiosInstance
        .put(`/quiz/edit-quiz/${quiz_id}`, _formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if(res.status == 200 || res.status == 201){
            Swal.fire({
              title: "Quiz Edited Successfully...",
              timerProgressBar: true,
              icon: "success",
            });
            setQuizData({
              difficulty: "Select Difficulty",
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  
    return (
      <div>
        <SecondNavBar />
        <div className="container">
          <div className="row mb-5 mt-5">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <section className="col-md-9 my-3 mt-5 mb-5">
              <div className="card">
                <h3 className="card-header text-center fw-bold" style={{background:'rgb(9, 20, 20)'}}>
                  Edit Quiz
                </h3>
                <div className="card-body">
                  <>
                    <div className="mb-5">
                      <label htmlFor="title" className="text-muted orm-label fw-bold fs-2 text-dark mt-3">
                        Name
                      </label>
                      <input
                        type={"text"}
                        name="name"
                        id="name"
                        className="form-control"
                        value={Object.keys(quizData).length > 0 ? quizData.name : ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      
                      {/* Option 1 */}
                      <label htmlFor="title" className="text-muted  orm-label fw-bold fs-2 text-dark mt-3 form-text">
                        Pass Mark (Percentage %)
                      </label>
                      <input
                        // type={"text"}
                        name="pass_mark"
                        id="pass_mark"
                        className="form-control"
                        value={Object.keys(quizData).length > 0? quizData.pass_mark :''}
                        onChange={handleChange}
                      />
                      
                      {/* Option 1 */}
                      <label htmlFor="title" className="text-muted  orm-label fw-bold fs-2 text-dark mt-3 form-text">
                        Duration Time
                      </label>
                      <input
                        type={"number"}
                        name="duration_time"
                        id="duration_time"
                        className="form-control"
                        value={Object.keys(quizData).length > 0 ? quizData.duration_time :''}
                        onChange={handleChange}
                        min={1}
                        max={3}
                        maxLength={3}
                      />
                      
                      <label htmlFor="title" className="text-muted  orm-label fw-bold fs-2 text-dark mt-5">
                        Difficulty
                      </label>
                      <select
                        name="difficulty"
                        className="form-control"
                        onChange={handleChange}
                        value={quizData.difficulty}
                      >
                        <option value={'Select Difficulty'} disabled>
                          Select Difficulty
                        </option>
                        {difficulty.map((difficulty, index) => {
                          return (
                            <option key={index} value={difficulty.id}>
                              <span className="difficulty">
                                  {difficulty.level}
                              </span>
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <button className="btn btn-primary" onClick={formSubmit}>
                      Add Quiz
                    </button>
                  </>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
}
export default EditQuiz
// maryamhussein694gmailcom
// u21uis1106  


// finish tcp - 20%  *
// finish teacher profile settings - 30% *
// finish function algoritms - 30% * 
// read gens 101 and 103 - 20% *
// sleep - 3hr
// Until these are finished no resting
//suit that if u jump from high place u still land on your feet