import { useParams} from "react-router-dom";
import Sidebar from "./Instructor/sidebar";
import axios from "axios";
import { useState } from 'react';
import Swal from "sweetalert2";

const baseUrl = 'http://127.0.0.1:8000/api'
function AddStudyMaterial(){
    const {course_id} = useParams();
    const [studyData, setStudyData] = useState({
      title:'',
      description:'',
      upload:'',
      remarks:'',
    });

    const handleChange = (event)=>{
      setStudyData({
        ...studyData,
        [event.target.name]:event.target.value
      });
    }
    const handleFileChange = (event)=>{
     window.URL = window.URL ||  window.webkitURL
     let upload =  document.createElement('upload');
     upload.src = URL.createObjectURL(event.target.files[0]);

     setStudyData({
        ...studyData,
        [event.target.name]:event.target.files[0]
     });
    }

    const formSubmit = ()=>{
      const _formData = new FormData();
      _formData.append('course', course_id);
      _formData.append('title', studyData.title);
      _formData.append('description', studyData.description);
      _formData.append('upload', studyData.upload,studyData.upload.name);
      _formData.append('remarks', studyData.remarks);
      console.log(_formData.get('title'))
      try{
        axios.post(baseUrl + `/study-materials/${course_id}`,_formData, {
          headers:{
            'content-type':'multipart/form-data'
          }
        }).then((res)=>{
          if(res.status == 200 || res.status == 201){
            Swal.fire({
                title:'Data has been added',
                icon:'success',
                toast:true,
                timer:3000,
                position:'top-right',
                showConfirmButton:false
            });

          }
            window.location.reload()
        })
      }catch(err){
        console.log(err) 
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
                  <h1 className="fw-bolder">Add Study Material</h1>
                </div>
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
          <h3 className="card-header">Add Chapter</h3>
        <div className="card-body">
        <form>
            <div className="mb-3">
              <label for="title" className="form-label">
                 Title
              </label>
              <input type='text' name='title' id="title" onChange={handleChange} className="form-control"/>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                 Despcription
              </label>
              <textarea  id="description" name='description' className="form-control" onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="upload" className="form-label">
                 Upload
              </label>
              <input type={'file'} onChange={handleFileChange} name='upload' id="upload" className="form-control"/>
            </div>
            <div className="mb-3">
              <label htmlFor="remarks" className="form-label">
                Remarks   
              </label>
              <textarea type={'text'} onChange={handleChange} id="remarks" className="form-control" name="remarks">
              </textarea>
            </div>
            </form>
            <button type="button" className="btn btn-primary" onClick={formSubmit}>Add Course</button>
        </div>
        </div>
      </section>
        </div>
      </div>
    </div> 
    )
}
export default AddStudyMaterial;
