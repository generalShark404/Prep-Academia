import { Link, useParams } from "react-router-dom";
import Sidebar from "./sidebar";
import axios from "axios";
import {useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { Button } from "bootstrap";

const baseUrl = 'http://127.0.0.1:8000/api'
function StudentStudyMaterials(){
    const [studyData, setStudyData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);
    const {course_id} =  useParams();

    useEffect(()=>{
      try {
       axios.get(baseUrl + `/user/study-material/${course_id}`)
       .then((res)=>{
        console.log(res)
          setTotalResult(res.data.length);
          setStudyData(res.data);
       });
      }catch (error) {
        console.log(error)  
      }
    }, []);

    const downloadFile = (file_url)=>{
      window.location.href = file_url
    }

    return (
        <div className=" mt-5 card">
           <header id="fh5co-header" className="fh5co-cover fh5co-cover-sm" role="banner" style={{backgroundImage: 'url(../../assets/images/img_bg_2.jpg)'}} data-stellar-background-ratio="0.5">
    <div className="overlay" /> 
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2 text-center">
          <div className="display-t">
            <div className="display-tc animate-box" data-animate-effect="fadeIn">
              <h1></h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
            <div className="row">
              
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card-header">
                        <h3>All Study Materials ({totalResult})
                        </h3>
                        <div>
                        <table className="table table-bordered">
                  <thead>
                      <tr>
                          <th>Title</th>
                          <th>Detail</th>
                          <th>Upload</th>
                          <th>Remarks</th>
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
                      
                      {/* Detail */}
                      <td>
                        <Link  to={`#`}>
                            {material.description}
                        </Link>
                      </td>

                      {/* Upload */}
                      <td>
                        <button  className=" justify-content-center btn-sm btn-success" onClick={()=>downloadFile(material.upload)}>
                            Download File
                        </button>
                      </td>

                      {/* Upload */}
                      <td>
                        <Link to="" className="justify-content-center">
                          {material.remarks}
                        </Link>
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
export default StudentStudyMaterials;
 