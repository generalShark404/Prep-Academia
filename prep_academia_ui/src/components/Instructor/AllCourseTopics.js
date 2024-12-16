import axiosInstance from "../../axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link} from "react-router-dom";
import TeacherSidebar from "./sidebar";
import SecondNavBar from "../secondNavBar";
import Swal from "sweetalert2";

function AllCourseTopics(){
    const navigate = useNavigate();
    const {course_title,  course_id}  = useParams();
    const [AllTopics, setAllTopics] = useState([]); 

    useEffect(() =>{
        axiosInstance.get(`/all-topics/${course_id}`)
        .then((res) => {
            console.log(res.data);
            setAllTopics(res.data);
        });


        document.title = `All Topics`;
    }, 

    []);

    const handleTopicDelete = (topic)=>{
        Swal.fire({
          icon:'warning',
          html:`
          <h3 style="font-style:italic;">
           Are you sure you want to delete the topic
            <span style="font-weight:bold;">${topic.title} !</span>
          </h3>`
        }).then((res) => {
          if(res.isConfirmed){
            axiosInstance.delete(`delete/topic/${topic.id}`)
            .then((res) => {
              if(res.status == 200){
                Swal.fire({
                  icon:'success',
                  html:`
                  <h3 style="font-style:italic;">
                   Topic
                    <span style="font-weight:bold;">${topic.title}</span>
                    deleted successfully !
                    </h3>`
                }).then((res) => {
                  window.location.reload();
                })
              };
            });
          }
        });
    };
    
    console.log(AllTopics)
    
    return(
        <div>
      <SecondNavBar />
      <div className="container">
        <div className="row mb-5 mt-5">
          <div className="col-md-2">
            <TeacherSidebar />
          </div>
          <section className="col-md-9 my-3 mt-5 mb-5">
            <div className="ard">
              <h3 className="ard-header text-center fw-bold">All Topics - {course_title}</h3>

              <div className="ard-body">
                {/* <> */}

                <div className="table-responsive">
                  <table className="table table-striped table-bordered table-hover">
                    <thead
                      className="text-warning"
                      style={{ background: "rgb(9, 20, 20)" }}
                    >
                      <tr>
                        <th className="col">No</th>
                        <th className="col">Name</th>
                        <th className="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {AllTopics && AllTopics.length > 0 &&
                        AllTopics.map((topic, number) => (    
                          <tr    
                          >
                             <th className="col">{++number}</th> 
                            
                            <td
                             
                            >
                               {topic.title}
                            </td>
                            <td
                              className="col text-dark bg-warning"
                              role="button"
                              data-bs-toggle="dropdown"
                            >
                               More
                            </td>

                            {/* ------ */}
                            <div
                              className="dropdown-menu dropdown-menu-top psotion-absolute p-3 bg-"
                              aria-labelledby="dropDownMenu"
                            >
                              <Link
                                to={`/edit/topic/${encodeURIComponent(topic.title)}/${topic.id}`}
                                className="bg-success text-light rounded btn-sm btn w-100"
                              >
                                Edit
                              </Link>
                              <hr className="dropdown-divider" />
                              
                              <Link
                                to={`/add/note/topic/${encodeURIComponent(topic.title)}/${topic.id}`}
                                className="bg-primary text-light rounded btn-sm btn w-100"
                              >
                                Add Note
                              </Link>
                              <hr className="dropdown-divider" />

                              <Link
                                to={`/all/topic/notes/${encodeURIComponent(topic.title)}/${topic.id}`}
                                className="bg-secondary text-light rounded btn-sm btn w-100"
                              >
                                All Notes
                              </Link>
                              <hr className="dropdown-divider" />

                              <Link
                                onClick={() => handleTopicDelete(topic)}
                                className="bg-danger text-light rounded btn-sm btn w-100"
                              >
                                Delete
                              </Link>
                             
                            </div>
                            {/* ------ */}
                            {/* ------ */}
                         
                            {/* ------ */}
                          </tr>

                          
                         ))}
                    </tbody>
                  </table>
                </div>
                {/* </> */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    );
};

export default AllCourseTopics;