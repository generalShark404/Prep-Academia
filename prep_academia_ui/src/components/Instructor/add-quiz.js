import Sidebar from "./sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import SecondNavBar from "../secondNavBar";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import { getLocalStorage } from "../utilities";

const baseUrl = "http://127.0.0.1:8000/api";

function AddQuiz() {
  const [quizData, setQuizData] = useState({
    difficulty: "Select Difficulty",
    pass_mark: "",
    name:"",
    duration_time:"",
  });

  const { course_id } = useParams();
  const instructor_id = getLocalStorage('instructor');

  const handleChange = (event) => {
    setQuizData({
      ...quizData,
      [event.target.name]: event.target.value,
    });
  };

  console.log(quizData)
  const difficulty = [
    {'level':'Beginner','id':'B'}, 
    {'level':'Intermediate', 'id':'I'}, 
    {'level':'Advanced', 'id':'A'}
  ];

  useEffect(() => {
    document.title = "Add Quiz";
  }, []);

  // const formSubmit = () => {
  //   const _formData = new FormData();
  //   const {name, pass_mark, duration_time, difficulty} = quizData;


  //   if(isNaN(Number(pass_mark)) || isNaN(Number(duration_time))){
  //     Swal.fire({
  //       icon:'error',
  //       html: `<p class="fs-2">Pass Mark and Duration Time must be valid numbers.</p>`,
  //     });
  //     return;
  //   };

  //   if(difficulty === "Select Difficulty"){
  //     Swal.fire({
  //       icon:'error',
  //       html: `<p class="fs-2">Please select difficulty.</p>`,
  //     });
  //     return;
  //   };

  //   if(!name.trim()){
  //     Swal.fire({
  //       icon:'error',
  //       html: `<p class="fs-2">Name is required.</p>`,
  //     });
  //     return;
  //   }

  //   _formData.append("course", course_id);
  //   _formData.append("name", name);
  //   _formData.append("difficulty", difficulty);
  //   _formData.append("pass_mark", pass_mark);
  //   _formData.append("duration_time", duration_time);
  
    
  //   if(!name){
  //     Swal.fire({
  //        icon:'error',
  //        html:`<p class="fs-2">All fields are required.</p>`
  //     });
  //   }else{
  //     try {
  //       axiosInstance
  //         .post(`/quiz/add-quiz/`, _formData, {
  //           headers: {
  //             "content-type": "multipart/form-data",
  //           },
  //         })
  //         .then((res) => {
  //           if(res.status == 200 || res.status == 201){
  //             Swal.fire({
  //               title: "Quiz added...",
  //               timerProgressBar: true,
  //               icon: "success",
  //             })
  //             setQuizData({
  //               difficulty: "Select Difficulty",
  //               pass_mark: "",
  //               name:"",
  //               duration_time:"",
  //             });
  //           }
  //         }).catch((error) => {
  //           console.log(error)
  //           if(error.response.data.message){
  //             Swal.fire({
  //               icon:'error',
  //               html:`<p class="fs-2">${error.response.data.message}</p>`
  //             })
  //           }
  //         });;
  //     } catch (err) {
  //       console.log(err);
  //     };
  //   };
  // };

  const formSubmit = () => {
    const { name, pass_mark, duration_time, difficulty } = quizData;
  
    // Check if pass_mark and duration_time are valid numbers
    if (isNaN(Number(pass_mark)) || isNaN(Number(duration_time))) {
      Swal.fire({
        icon: 'error',
        html: `<p class="fs-2">Pass Mark and Duration Time must be valid numbers.</p>`,
      });
      return;
    }
  
    // Check if difficulty is selected
    if (difficulty === "Select Difficulty") {
      Swal.fire({
        icon: 'error',
        html: `<p class="fs-2">Please select a difficulty level.</p>`,
      });
      return;
    }
  
    // Check if name is provided
    if (!name.trim()) {
      Swal.fire({
        icon: 'error',
        html: `<p class="fs-2">Name is required.</p>`,
      });
      return;
    }
  
    // Create formData and submit
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("name", name);
    _formData.append("difficulty", difficulty);
    _formData.append("pass_mark", pass_mark);
    _formData.append("duration_time", duration_time);
  
    axiosInstance
      .post(`/quiz/add-quiz/`, _formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Quiz added...",
            timerProgressBar: true,
            icon: "success",
          });
          setQuizData({
            difficulty: "Select Difficulty",
            pass_mark: "",
            name: "",
            duration_time: "",
          });
        }
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          Swal.fire({
            icon: 'error',
            html: `<p class="fs-2">${error.response.data.message}</p>`,
          });
        }
      });
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
                Add Quiz
              </h3>
              <div className="card-body">
                <>
                  <div className="mb-5">
                    <label htmlFor="title" className="text-muted orm-label fw-bold fs-2 text-dark mt-3">
                      Name
                    </label>
                    <input
                      type={"text"}
                      id="name"
                      className="form-control"
                      name="name"
                      value={quizData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    
                    {/* Option 1 */}
                    <label htmlFor="title" className="text-muted  orm-label fw-bold fs-2 text-dark mt-3 form-text">
                      Pass Mark (Percentage %)
                    </label>
                    <input
                      type={"number"}
                      name="pass_mark"
                      id="pass_mark"
                      className="form-control"
                      value={quizData.pass_mark}
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
                      value={quizData.duration_time}
                      onChange={handleChange}
                     
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
};

export default AddQuiz;