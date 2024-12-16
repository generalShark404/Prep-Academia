import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";
export default function WelcomeStudent() {
  const [studentData, setStudentData] = useState([]);
  const { student_id } = useParams();
  
  useEffect(()=>{
    try {
      axios.get(`${baseUrl}/student/${student_id}`)
      .then((res)=>{
        setStudentData(res.data);
      })
    } catch (error) {
      console.log(error)
    }
  },[])
  console.log(studentData)
  return (
    <div className="mt-150">
      <div className="row d-flex justify-content-center">
          <h1 className="bi-emoji-smile-fill text-center " style={{color:'orange'}}></h1>
          {studentData.map((student)=>(
          <h1 className="text-center fs-small">Welcome <span className="" style={{color:'orange'}}>
                
                 {student.full_name}
                
            <span className="bi bi-vector-pen ms-3" >
            </span>
            </span>
          </h1>
              ))}
        <div className="col-lg-4 col-xs-12">
          <Link className="">
            <img
              src="../../assets/images/welcome4.png"
              className=""
              width={"100%"}
            />
          </Link>
        </div>
        <div className="col-lg-7 col-xs-12 p-5">
          <p className="mt-3">
            Welcome to Prep Academia : Your Pathway to Excellence in Learning !
            At Prep Academia, We believe that learning is an exhilarating
            journey that empowers you to reach your fullest potential.We're
            thrilled to welcome you to a vibrant virtual learnig space where
            curiosity meets knowledge, and passion fuels success.
          </p>
          <p className="mt-3">
            Embark on a learning adventure with us. Whether you're a student aiming to conquer exams, an ethusiast pursuing new skills, or a curious mind seeking intellectual growth, prep academia has your back.Our mission is to provide you with a dynamic and engaging platform the brings learning to life.
          </p>
          <Link className="btn bg-danger text-white" to={'/student-dashboard'}>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
