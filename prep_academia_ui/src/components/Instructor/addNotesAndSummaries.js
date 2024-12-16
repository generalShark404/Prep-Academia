import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
// import
import Swal from "sweetalert2";
import SecondNavBar from "../secondNavBar";
import axiosInstance from "../../axios";
import { getLocalStorage } from "../utilities";
import { fecthCsrfToken } from "../../axios";
import JoditEditor from "jodit-react";

const baseUrl = "http://127.0.0.1:8000/api";
// const uploadUrl = "http://127.0.0.1:8000/";
  
function AddNoteAndSummary() {
  const { topic_id } = useParams();
  
  const instructor_id = getLocalStorage("instructor");
  const auhtorizationHeader = axiosInstance.defaults.headers.Authorization;
  const token = JSON.parse(localStorage.getItem('access'));

  const [noteTitle, setNoteTitle] = useState("");
  const [content, setContent] = useState("");
  

  const [summaryData, setSummaryData] = useState({
    title: "",
    topic: "",
    content: "",
  });
  
  const handelNoteTitleChange = (event) => {
    event.preventDefault();
    setNoteTitle(
      event.target.value
    );
  };
  console.log(noteTitle)

  const handleContentChange = (newContent) => {
    // Regex for YouTube links inside <a> tags
    const youtubeAnchorRegex = /<a\s+href="https:\/\/(www\.youtube\.com|youtu\.be)\/(watch\?v=|embed\/)?(\w+)"[^>]*>[^<]*<\/a>/g;

    // Regex for standalone YouTube links (not inside <a>)
    const youtubeUrlRegex = /https:\/\/(www\.youtube\.com|youtu\.be)\/(watch\?v=|embed\/)?(\w+)/g;

    // First, replace YouTube links inside <a> tags with iframe
    let updatedContent = newContent.replace(youtubeAnchorRegex, (match, p1, p2, videoId) => {
        return `
          ${videoId}
        `;
        // return `
        // <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        // `;
    });

    // Then, replace standalone YouTube links with iframe
    // updatedContent = updatedContent.replace(youtubeUrlRegex, (match, p1, p2, videoId) => {
    //     return `
    //     <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0"  allow="fullscreen">
    //     </iframe>
    //     `;
    // });

    // Apply the img-fluid class to all <img> tags
    updatedContent = updatedContent.replace(/<img(?!.*class=.*img-fluid)/g, '<img class="img-fluid"');

    setContent(updatedContent);
  };
  
  const handleSummaryChange = (event) => {
    setSummaryData({
      ...summaryData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSummaryContentChange = (newContent) => {
    setSummaryData({
      title: summaryData.title,
      content: newContent
    });
  };

  const submitNote = (e) => {
    e.preventDefault();
    
    const _noteData = new FormData();
    _noteData.append("topic", topic_id);
    _noteData.append("title", noteTitle);
    _noteData.append("content", content);
    // _formData.append('remarks', chapterData.remarks);
    if(!noteTitle || !content){
      Swal.fire({
        icon:'error',
        html:`
        <h3>
          Title or Content Can't be Empty!
          </h3>`
        });
    }else{
      try {
        axiosInstance
        .post(`/note/${topic_id}`, _noteData, {
          headers: {
            "content-type": "multipart/form-data",
            },
          })
          .then((res) => {
              if(res.status == 200 || res.status == 201){
                  Swal.fire({
                    title: "Success",
                    icon: "success",
                    html:`<p class="fs-2">Note Added Successfully!</p>`,
                    timer: "2000",
                  });
                  setNoteTitle("");
                  setContent("");
              };
          }).then((err) => {});
      } catch (err) {
        console.log(err);
      }
    };

  };
  
  const submitSummary = (e) => {
    e.preventDefault();
    const _summaryData = new FormData();
    _summaryData.append("topic", topic_id);
    _summaryData.append("title", summaryData.title);
    _summaryData.append("content", summaryData.content);
    // _formData.append('remarks', chapterData.remarks);
    try {
      axiosInstance
      .post(`/summary/${topic_id}`, _summaryData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
        if(res.status == 200 || res.status == 201){
            Swal.fire({
              title: "Success",
              icon: "success",
              text: "Summary Added Successfully!",
              timer: "2000",
            });
            noteTitle = " ";
            content = " ";
        };
        })
        .then((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    };
  };

  const jodit_config = {
    readonly: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
    // iframe: true, // Enable iframe embedding
    // allowTags: ['iframe', 'img', 'p', 'a', 'span', 'div'], // Allow iframe tags
    // iframeBaseUrl: 'https://www.youtube.com/embed/', // Ensure proper base URL for iframe
    // removeButtons: ['video'], // Optional: remove video buttons if causing conflicts
    // iframeDefaultSrc: '', // Optional: default source for iframe if needed
    sanitize: false, // Disabling sanitization (use this with caution)
  };

  useEffect(() => {
    document.title = "Add Notes and Summary";
  }, []);

  return (
    <div>
      <SecondNavBar colorStyle={"bg-mixed"} />
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-3  pt-5">
            <Sidebar />
          </div>
          <section className="col-md-9 col-lg-9 col-sm-12 col-xs-12 py-5 mt-5 ddChaptCont ">

            
            <div className="card">
              <h3
                className="card-header text-center fw-bold text-light p-4 "
                style={{ background: "rgb(9, 20, 20)" }}
              >
                Add Notes and Summary
              </h3>
              <div className="card-body ">
                <div id="accordion">
                {/* Add Note Start */}
                  <div class="card">
                    <div class="card-header" id="headingOne">
                      <h5 class="mb-0">
                        <Link
                          class="btn bg-dark text-light"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Add Note
                          <span className="bi bi-caret-down ms-3"></span>
                        </Link>
                      </h5>
                    </div>
                    <div
                      id="collapseOne"
                      class="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      {" "}
                      <div class="card-body">
                      <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      value={noteTitle}
                      type={"text"}
                      onChange={handelNoteTitleChange}
                      name="title"
                      id="title"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 ">
                    <label htmlFor="remarks" className="form-label">
                      Note
                    </label>
                    <JoditEditor 
                      //  ref={editor}
                      value={content}
                       config={jodit_config}
                       onBlur={handleContentChange}
                       className="joditElement"
                    />
                  </div>
                  <button className="btn btn-primary" onClick={submitNote}>
                    Add Note
                  </button>
                </form>
                      </div>
                    </div>
                  </div>
                  {/* Add Note End */}

                  {/* Add Summary Start */}
                  <div class="card mt-5">
                    <div class="card-header" id="headingTwo">
                      {" "}
                      <h5 class="mb-0">
                        {" "}
                        <Link
                          class="btn bg-dark text-light collapsed"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          {" "}
                          Add Summary
                          <span className="bi bi-caret-down ms-2"></span>
                        </Link>
                      </h5>{" "}
                    </div>{" "}
                    <div
                      id="collapseTwo"
                      class="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordion"
                    >
                      {" "}
                      <div class="card-body">
                      <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type={"text"}
                      onChange={handleSummaryChange}
                      name="title"
                      id="title"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="remarks" className="form-label">
                      Summary
                    </label>
                    
                  </div>
                  <button className="btn btn-primary" onClick={submitSummary}>
                    Add Summary
                  </button>
                </form>
                      </div>
                    </div>
                  </div>
                  {/* Add Summary End */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddNoteAndSummary;