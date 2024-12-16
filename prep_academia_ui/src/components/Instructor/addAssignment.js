import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import axios from "axios";
import {useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import Swal from "sweetalert2";

const baseUrl = 'http://127.0.0.1:8000/api'
function AddAssignment(){
    const [assignmentData, setAssignmentData] = useState({
      title:'',
      detail:'',
    });

    const handleChange = (event)=>{
      setAssignmentData({
        ...assignmentData,
        [event.target.name]:event.target.value
      });
    }
 
    const {student_id} =  useParams()
    const {teacher_id} =  useParams()

    const formSubmit = (e)=>{
      e.preventDefault()
      const _formData = new FormData();
      _formData.append('teacher', teacher_id);
      _formData.append('title', assignmentData.title);
      _formData.append('detail', assignmentData.detail);
      _formData.append('student', student_id);
      try{
        axios.post(baseUrl + `/student-assignment/${teacher_id}/${student_id}`,_formData, {
          headers:{
            'content-type':'multipart/form-data'
          }
        }).then((res)=>{
          console.log(res.data)
          Swal.fire({
            title:'Assignment added',
            toast:true,
            timerProgressBar:true,
            timer:5000,
            position:'top-right',
            showConfirmButton:false
          });

          const notifData = new FormData()
          notifData.append('teacher', teacher_id);
          notifData.append('notif_subject', 'assignment');
          notifData.append('notif_for', 'student');
          notifData.append('student', student_id);
          axios.post(`${baseUrl}/save-notification`, notifData, {
            headers:{
              'content-type':'multipart/form-data'
            }
          }).then((res)=>{
            alert("Notification added")
          });

          window.location.reload();

          setAssignmentData({
            title:"",
            detail:""
          })
        }).then((err)=>{
          console.log(err)
        })
      }catch(err){
        console.log(err); 
      }
    }
    return(
        <div>
      <header
        id="fh5co-header"
        className="fh5co-cover fh5co-cover-sm mb-5"
        role="banner"
        style={{ backgroundImage: "url(../../assets/images/flag2.jpg)" }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay" />
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
              <div className="display-t">
                <div
                  className="display-tc animate-box"
                  data-animate-effect="fadeIn"
                >
                  <h1 className="fw-bolder">Add Assignment</h1>
                </div>z
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />         
          </div>
      <section className="col-md-9">
      <div className="card">
          <h3 className="card-header">Add Assignment</h3>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                 Title
              </label>
              <input type={'text'} onChange={handleChange} value={assignmentData.title} name='title' id="title" className="form-control"/>
            </div>
            <div className="mb-3">
              <label htmlFor="detail" className="form-label">
                 Detail
              </label>
              <input type={'text'} value={assignmentData.detail} onChange={handleChange} name='detail' id="detail" className="form-control"/>
            </div>
            <button className="btn btn-primary" onClick={formSubmit}>Add Assignment</button>
          </form>
        </div>
        </div>
      </section>
        </div>
      </div>
    </div> 
    )
}
export default AddAssignment
