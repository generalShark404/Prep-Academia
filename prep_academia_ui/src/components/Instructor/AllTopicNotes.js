import axiosInstance from "../../axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link} from "react-router-dom";
import TeacherSidebar from "./sidebar";
import SecondNavBar from "../secondNavBar";
import Swal from "sweetalert2";

function AllTopicNotes(){
    const navigate = useNavigate();
    const {topic_title,  topic_id}  = useParams();
    const [AllNotes, setAllNotes] = useState([]); 

    useEffect(() =>{
        axiosInstance.get(`instructor/all/notes/topic/${topic_id}`)
        .then((res) => {
            console.log(res.data);
            setAllNotes(res.data.notes);
        });

        document.title = `All Notes - ${topic_title}`;
    },
    []);

    const handleNoteDelete = (note)=>{
        Swal.fire({
          icon:'warning',
          html:`
          <p style="font-style:italic;" class="fs-2">
           Are you sure you want to delete the topic
            <span style="font-weight:bold;">${note.title} !</span>
          </p>`
        }).then((res) => {
          if(res.isConfirmed){
            axiosInstance.delete(`instructor/delete/note/${note.id}`)
            .then((res) => {
              if(res.status == 200){
                Swal.fire({
                  icon:'success',
                  html:`
                  <p style="font-style:italic;" class="fs-2">
                   Topic
                    <span style="font-weight:bold;">${note.title}</span>
                    deleted successfully !
                  </p>`
                }).then((res) => {
                  window.location.reload();
                });
              };
            });
          };
        });
    };
    
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
              <h3 className="ard-header text-center fw-bold">All Notes Under Topic - {topic_title}</h3>

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
                      {AllNotes && AllNotes.length > 0 &&
                        AllNotes.map((note, number) => (    
                          <tr    
                          >
                             <th className="col">{++number}</th> 
                            
                            <td>
                               {note.title}
                            </td>
                            <td
                              className="col text-dark bg-warning text-center"
                              role="button"
                              data-bs-toggle="dropdown"
                            >
                              <span className="bi bi-cursor-fill me">
                              </span>
                              <span className="bi bi-grid-fill me-3">
                              </span>
                               Options
                            </td>

                            {/* ------ */}
                            <div
                              className="dropdown-menu dropdown-menu-top psotion-absolute p-3 bg-"
                              aria-labelledby="dropDownMenu"
                            >
                              <Link
                                to={`/edit/note/${note.title}/${note.id}`}
                                className="bg-success text-light rounded btn-sm btn w-100"
                              >
                                <span className="bi-pen me-2"></span>
                                Edit
                              </Link>
                              <hr className="dropdown-divider" />
                              
                              <Link
                                onClick={() => handleNoteDelete(note)}
                                className="bg-danger text-light rounded btn-sm btn w-100"
                              >
                                <span className="bi-trash me-2"></span>
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

export default AllTopicNotes;