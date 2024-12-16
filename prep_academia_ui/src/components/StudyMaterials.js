import { Link, useParams } from "react-router-dom";
import Sidebar from "./Instructor/sidebar";
import axios from "axios";
import {useEffect, useState } from 'react';
import Swal from "sweetalert2";

const baseUrl = 'http://127.0.0.1:8000/api'
function StudyMaterials(){
    const [studyData, setStudyData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);
    const {course_id} =  useParams();

    useEffect(()=>{
      try {
       axios.get(baseUrl + `/study-materials/${course_id}`)
       .then((res)=>{
          setTotalResult(res.data.length);
          setStudyData(res.data);
       });
      }catch (error) {
        console.log(error)  
      }
    }, []);


    const handleDeleteClick = (study_id)=>{
        Swal.fire({
            title:'Confirm',
            text:'Are you sure you want to delete this material ?',
            timer:5000,
            timeProgressBar:true,
            icon:'warning',
            confirmButtonText:'Continue',
            showCancelButton:true
        }).then((res)=>{
            if(res.isConfirmed){
                try {
                 axios.delete(`${baseUrl}/study-material/${study_id}`)
                  .then((res)=>{
                     Swal.fire({'success':'Data has been deleted.'});
                     try {
                        axios.get(baseUrl + `/study-materials/${course_id}`)
                        .then((res)=>{
                           setTotalResult(res.data.length);
                           setStudyData(res.data);
                        });
                       }catch (error) {
                         console.log(error)  
                       }})                    
                }catch (error) {
                    Swal.fire({'error':'Data has not been deleted.'});
                }
            }
            else{
                Swal.fire({'error':'Data has not been deleted.'});
            }
        });
    }

  

    return (
        <div className="container mt-5 card mt-100">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card-header">
                        <h3>All Study Materials ({totalResult})
                        <Link to={`/add-study-material/${course_id}`} className="btn btn-success ms-5">Add Material</Link>
                        </h3>
                        <div>
                        <table className="table table-bordered">
                  <thead>
                      <tr>
                          <th>Title</th>
                          <th>Upload</th>
                          <th>Remarks</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                    {studyData.map((material, index)=>
                    <tr>
                    {/* Title */}
                      <td>
                        <Link  to={`#`}>
                            {material.title}
                        </Link>
                      </td>

                      {/* Upload */}
                      <td>
                        <Link to={material.upload} className="justify-content-center">
                             File
                        </Link>
                      </td>

                      {/* Upload */}
                      <td>
                        <Link to="" className="justify-content-center">
                          {material.remarks}
                        </Link>
                      </td>

                      <td>
                        {/* edit */}
                       <Link to={`/edit-study/${material.id}`} className='btn btn-info  btn-sm'>
                        <span className="bi bi-pencil-square mx-1"></span>
                        </Link>

                        {/* delete */}
                        <button onClick={()=>handleDeleteClick(material.id)} className="btn btn-danger btn-sm">
                         <span className="bi bi-trash mx-1"></span>
                        </button>
                      </td>
                    </tr>
                    )}
                  </tbody>
              </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
      );
    }
export default StudyMaterials;
 