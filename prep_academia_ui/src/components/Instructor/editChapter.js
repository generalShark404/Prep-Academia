import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TeacherSidebar from "./sidebar";
import {useParams} from 'react-router-dom'
import Sidebar from "../student/sidebar";

const baseUrl = "http://127.0.0.1:8000/api";

function EditChapters(){
const {chapter_id} =  useParams()
const [chapterData, setChapterData] = useState({
  title:'',
  description:'',
  video:'',
  remarks:''
});
 
const handleChange = (event)=>{
  setChapterData({
    ...chapterData,
    [event.target.name]:event.target.value
  });
}
const handleFileChange = (event)=>{
  setChapterData({
    ...chapterData,
    [event.target.name]:event.target.files[0]
  });
}

const formSubmit = (e)=>{
  e.preventDefault()
  const _formData = new FormData();
  _formData.append('course', chapterData.course);
  _formData.append('title', chapterData.title);
  _formData.append('description', chapterData.description);
  _formData.append('video', chapterData.video);
  // _formData.append('remarks', chapterData.remarks);
  try{
    axios.put(baseUrl + `/chapter/${chapter_id}`,_formData, {
      headers:{
        'content-type':'multipart/form-data'
      }
    }).then((res)=>{ 
      console.log(res.data)
      // window.location.href = '/chapter';
    }).then((err)=>{

    })    
  }catch(err){
    console.log(err) 
  }
 }

 useEffect(()=>{
    try {
      axios.get(baseUrl + `/chapter/${chapter_id}`)
      .then((res)=>{
       console.log(res) 
        setChapterData(res.data);
      }).then((err)=>console.log(err))
    } catch (error) {
      console.log(error) 
    }
   }, []);


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
                    <h1 className="fw-bolder">Edit Chapter</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <TeacherSidebar />         
            </div>
        <section className="col-md-9">
        <div className="card">
            <h3 className="card-header">Add Chapter</h3>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                   Title
                </label>
                <input type={'text'} value={chapterData.title}  onChange={handleChange} name='title' id="title" className="form-control"/>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                   Despcription
                </label>
                <input type={'text'} value={chapterData.description} onChange={handleChange} name='description' id="description" className="form-control"/>
              </div>
              <div className="mb-3">
                <label htmlFor="video" className="form-label">
                   Link to video
                </label>
                <input type={'text'} value={chapterData.video}  onChange={handleChange} name='video' id="video" className="form-control"/>
              </div>
              <div className="mb-3">
                <label htmlFor="remarks" className="form-label">
                  Remarks   
                </label>
                <textarea type={'text'} onChange={handleChange} id="remarks" value={chapterData.remarks} className="form-control" placeholder="This video is focused on the basics of web development">
                </textarea>
              </div>
              <button className="btn btn-primary" onClick={formSubmit}>Add Course</button>
            </form>
          </div>
          </div>
        </section>
          </div>
        </div>
      </div> 
    )
}
export default EditChapters