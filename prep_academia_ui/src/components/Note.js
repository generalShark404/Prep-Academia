import { useState, useEffect, useRef } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import axios from "axios";
import SecondNavBar from "./secondNavBar";
import axiosInstance from "../axios";
import Swal from "sweetalert2";
import { getLocalStorage } from "./utilities";

const baseUrl = "http://127.0.0.1:8000/api";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [course, setCourse] = useState([]);
  const [sideContents, setSideContents] = useState([]);
  const { course_id, topic_title, topic_id, note_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [noteDone, setNoteDone] = useState();
  const [completed, setCompleted] = useState(false);

  const student_id = getLocalStorage("user");
  const instructor = getLocalStorage('instructor');

  function arrayData(data){
    return data.split(' ');
  }
  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/note/${topic_id}/${note_id ? note_id :''}`)
        .then((res) => {
          setNotes(res.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(`${baseUrl}/side-chapters/${course_id}`).then((res) => {
        setSideContents(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    if (note_id) {
      try {
        axiosInstance
          .get(`student-note-progress-status/${note_id}`)
          .then((res) => {
            setNoteDone(...res.data);
          });
      } catch (error) {
        console.log(error);
      };
    }; 

    document.title = `Note`;
  }, [topic_id, note_id]);

  const handleNoteCompletion = () => {
    axiosInstance
      .post(`student-note-progress/${note_id}`,{
        student: student_id,
        note: note_id,
        completed: true,
      })
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          if(res.data.completed){
            setCompleted(res.data.completed);
          }else{
            setCompleted(false);
          };
          
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Congratulations, you have successfully finished the note !",
          });
          console.log(res);
        }
      });
  };

  const handleTopicCompletion = (id) => {
    axiosInstance.post(`student-topic-progress/${id}`, {
      student: student_id,
      topic:id
    })
    .then((res) =>{
      if(res.status == 200 || res.status == 201){
        Swal.fire({
          title: "Success",
          icon: "success",
          html: "<h3> Congratulations, you have successfully finished the topic !</h3>",
        });
       console.log(res.data)
      };
    }).catch((error) =>{
      if(error.response.data.non_field_errors[0] == "The fields student, topic must make a unique set."){
        console.log(error.response)
        Swal.fire({
          position:'top-end',
          title: "Success",
          html: "<h3>Completed !</h3>",
          icon: "success",
        });
      };
    });
  };

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const utterance = new SpeechSynthesisUtterance(text);

    const preferredVoice = voices.find(voice => voice.lang === 'en-US');
    utterance.voice = preferredVoice;

    synth.speak(utterance);
  };

  // speakText('Welcome to note section prep academia.')

  return (
    <>
      <SecondNavBar colorStyle="" className="" />
      <div className="container-xxl note z-3 font">
        <span className="m-5 p-5"></span>
        {/* Contents and Note Start End*/}
        <div className="row ">
          <div className="col-2">
            <div
              className=" p- mb-5 sideChapter position-fixed "
              // ref={side_chapter}
            >
              {/* Chapter Start */}
              <div
                className={`offcanvas sideChapterCont offcanvas-start sidebar-nav text-white p-3 pt-5 mt-0 s ${instructor ? '' :'bg-dark'}`}
                tabindex="-1"
                id="sideBarCanvas"
                aria-labelledby="offcanvasExampleLabel"
                style={{background:"rgb(9, 20, 20)"}}
              >
                <div className="text-muted small fw-bold text-uppercase px3 t-4 mb-0">
                  <div className="offcanvas-header">
                    <span className="contentsText ">Contents</span>
                  </div>
                </div>
                <div className="offcanvas-body">
                  {sideContents.map((content, number) => (
                    <>
                      {content.get_notes.length > 0 ? (
                        <div>
                          <Link
                            className="fs-3 pt-0 sideChapterItems nav-link px-1 sidebar-link mt-2"
                            data-toggle="collapse"
                            aria-expanded="false"
                            aria-controls="noteContExample"
                            data-target={`#noteContExample${content.id}`}
                          >
                            {`${number + 1}. `}
                            {content.title.length > 12
                              ? `${content.title.slice(0, 12)}...`
                              : content.title}
                            <span className="bi bi-caret-down me-2 position-absolute end-0"></span>
                          </Link>
                          <div
                            id={`noteContExample${content.id}`}
                            className="collapse p-0"
                          >
                            <>
                              {content.get_notes.map((note) => (
                                <Link
                                  className="mt-0 p-0 bg-ligt text-start mx-5 d-block fs-4 bg-ligh col-12"
                                  to={`/notes/${encodeURIComponent( content.title)}/${course_id}/${content.id}/${note.id}`}
                                >
                                  <span className="bi bi-dot"></span>
                                  {note.title.length > 17
                                    ? `${note.title.slice(0, 17)}..`
                                    : note.title}
                                </Link>
                              ))}
                            </>
                          </div>
                        </div>
                      ) : (
                        <Link
                          className="fs-3 pt-0 sideChapterItems nav-link px-1 sidebar-link  mt-2"
                          data-toggle="collapse"
                          aria-expanded="false"
                          aria-controls="noteContExample"
                          to={`/notes/${content.title}/${course_id}/${content.id}`}
                          onClick={() =>handleTopicCompletion(content.id)}
                        >
                          {`${number + 1}. `}
                          {content.title.length > 6
                            ? `${content.title.slice(0, 10)}...`
                            : content.title}
                        </Link>
                      )}
                    </>
                  ))}
                  <p className="mb-5"></p>
                </div>
              </div>
            </div>
          </div>

          {/* ------------- */}
          {notes.length > 0 ? (
            <>
              {notes &&
                notes.map((note) => (
                  <div className="col-lg-10 col-md-8 col-sm-12 col-xs-12 mt-0 notesContaier overflow- font ">
                    <div className="text-cener mx-3">
                      <span className="border-botto fw-bold border-warnin h2 ">
                        {note.title}
                      </span>
                    </div>
                    <span className="mt-5"></span>
                    <div className="container  mt-lg-0 mt-md-0 mt-xs-5 mt-sm-5">
                      {/* -------- */}
                      <div className="borde col-lg-11  p-2">
                        {/* By */}
                        <div className="text-secondary small">
                          <span className="bi bi-align-end me-2 "></span>
                          <span className="">Course: </span>
                          <Link
                            to={`/about/${
                              note.topic
                                ? note.topic.course.title +
                                  "/" +
                                  note.topic.course.id
                                : ""
                            }`}
                          >
                            {note.topic ? note.topic.course.title : ""}
                          </Link>
                        </div>

                        <div className="text-secondary small">
                          <span className="bi bi-align-end me-2 "></span>
                          <span className="">Tags: </span>
                          {arrayData(note.topic.course.tags).map(data => (
                          <Link to={`/tags/${data}`} className="me-2">
                            {note.topic ? data : ""}
                          </Link>
                          ))}
                        </div>

                        {/* -- By Instructor -- */}
                        <div className="text-secondary  small mt-5"></div>
                        <div className="text-secondary  small">
                          <span className="bi bi-align-end me-2 "></span>
                          Instructor:
                          <Link
                            className="ms-2 "
                            to={`/instructor/profile/${
                              note.topic ? note.topic.course.instructor.id : ""
                            }`}
                          >
                            {note.topic
                              ? note.instructor_username              
                              : 
                              "instructor username not avalaible"
                            }
                          </Link>
                        </div>
                        {/* -- End by Instructor -- */}

                        {/* -- By Category -- */}
                        <div className="text-secondary small">
                          <span className="bi bi-align-end me-2 "></span>
                          Category:
                          <Link
                            className="ms-2"
                            to={`/category/
                           ${
                             note.topic
                               ? note.topic.course.category.title +
                                 "/" +
                                 note.topic.course.category.id
                               : ""
                           }`}
                          >
                            {note.topic ? note.topic.course.category.title : ""}
                          </Link>
                        </div>
                        {/* -- End by Category -- */}

                        {/*End By */}
                      </div>
                      {/* -------- */}
                      <div className="mt-2 mb-0"></div>

                      {/*End By */}
                      
                    </div>
                    <div className="text-break  mt-0 justify-content-center p4 overflow-scroll text-break">
                      <h2 className="text-muted  text-start fs-3 mb-4 mt-3"></h2>
                   
                      <div
                        className={`notesBody fs-2 col-lg-9 col-md-12  col-sm-12 col-xs-12  overflow-visible bg-dar position-relative`}
                        dangerouslySetInnerHTML={{ __html: note.content }}
                        style={{ fontSize: "21px", maxWidth:'100%' }}
                      ></div>{" "}
                      <br />
                      {/* <div className="noteBody fs-1 bg-success">NExt</div> */}
                    </div>
                    {/* By */}

                    {/*End By */}
                  </div>
                ))}
            </>
          ) : (
            <div className="mt-5 col-lg-10 col-md-8 col-sm-12 col-xs-12 ext-center mx notesContaier overflow-scroll font p-5 mb-5 text-center overflow-">
              <div className="border p-5 text-break">
                {loading ? (
                   <div className="d-flex justify-content-center">
                   <button  className="btn btn-warning" type="button" disabled>
                     <span className="spinner-border me-3" role="status" aria-hidden="true"></span>
                     Loading....
                   </button>
               </div>
                ) : (
                  <>
                    <span className="bi bi-book-half me-3"></span>
                    <span className="fs-1">
                      Click on the topic on side bar to see notes
                    </span>
                    <p className="small">
                      If not clickable no notes under topic: <br />
                      <span className="fw-bold">{" " + topic_title}</span>
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
          {/* ------------- */}
        </div>
        {note_id != undefined &&
          <>
          
          {noteDone && noteDone.completed ? (
            <div className="col-lg-10 col-md-8 col-sm-12 col-xs-12 mt-0 notesContaier overflow-scroll font d-flex justify-content-end text-break">
              <p
                className="fs-1 btn-outline-success px-3 btn-sm fw-bold text-success cursor-pointer mb-5"
              >
                Completed
                <span className="ms-3 bi bi-star"></span>
              </p>
            </div>
          ) : (
            <>
            {completed ? 
             <div className="col-lg-10 col-md-8 col-sm-12 col-xs-12 mt-0 notesContaier overflow-scroll font d-flex justify-content-end text-break">
             <p
               className="fs-1 btn-outline-success px-3 btn-sm fw-bold text-success cursor-pointer mb-5"
             >
               Completed
               <span className="ms-3 bi bi-star"></span>
             </p>
           </div>
            :
            <div className="col-lg-10 col-md-8 col-sm-12 col-xs-12 mt-0 notesContaier overflow-scroll font d-flex justify-content-end text-break">
              {student_id && 
              <Link
                className="fs-1 bg-success px-3 btn-sm fw-bold text-light cursor-pointer mb-5"
                onClick={handleNoteCompletion}
              >
                Done
                <span className="bi bi-check2"></span>
              </Link>
              }
            </div>
            }
            </>
          )}
          </>
        }

      </div>
    </>
  );
}
// it's easier to risk your life than live a life without risk
