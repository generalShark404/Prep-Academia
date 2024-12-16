import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import SecondNavBar from "../secondNavBar";
import axiosInstance from "../../axios";
import { getLocalStorage } from "../utilities"; 
import JoditEditor from "jodit-react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function AddNoteSample() {
  const { topic_id } = useParams();
  const instructor_id = getLocalStorage("instructor");
  const token = JSON.parse(localStorage.getItem("access"));
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // For editor content
  const editor = useRef(null);

  // Jodit editor configuration
  const config = {
    readonly: false,
    uploader: {
      insertImageAsBase64URI: true, // Directly uploads image as base64
    },
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);  // Update content state
  };

  // Form submission for the note
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload
    if (!title || !content) {
      Swal.fire({
        icon: "error",
        html: "<h3>Title or Content can't be empty!</h3>",
      });
      return;
    }

    const formData = new FormData();
    formData.append("topic", topic_id);
    formData.append("title", title);
    formData.append("content", content);  // Include editor content

    try {
      const response = await axiosInstance.post(`/note/${topic_id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Note Added Successfully!",
          timer: 2000,
        });
        setTitle(""); // Clear title
        setContent(""); // Clear editor content
      }
    } catch (err) {
      console.error("Error submitting note:", err);
    }
  };

  // Set the document title
  useEffect(() => {
    document.title = "Add Notes and Summary";
  }, []);

  return (
    <div>
      <SecondNavBar colorStyle={"bg-mixed"} />
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-3 pt-5">
            <Sidebar />
          </div>
          <section className="col-md-9 col-lg-9 col-sm-12 col-xs-12 py-5 mt-5 ddChaptCont">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group mt-50">
                <label>Content:</label>
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  onBlur={handleContentChange} // Updates state when focus is lost
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Upload Note
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AddNoteSample;