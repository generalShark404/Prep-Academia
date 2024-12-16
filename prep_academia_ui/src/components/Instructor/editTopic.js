import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import 
import Swal from "sweetalert2";
import SecondNavBar from "../secondNavBar";
import axiosInstance from "../../axios";
import { getLocalStorage } from "../utilities";

const baseUrl = "http://127.0.0.1:8000/api";
const uploadUrl = "http://127.0.0.1:8000/";
function EditTopic() {
  const { course_id } = useParams();
  const instructor_id = getLocalStorage('instructor');
  const [topicData, setTopicData] = useState({});
  const navigate = useNavigate();

  const { topic_id } = useParams();
  console.log(useParams())

  useEffect(() => {

    const getTopic = async () =>{
      const res =  await axiosInstance.get(`get/topic/${topic_id}`)
      const topic = res.data.topic;
      console.log(topic)

      setTopicData({
        title: topic.title,
        description: topic.description,
        video: topic.video
      });

    };

    getTopic();

    document.title = "Edit Topic";
  }, []);

  const handleChange = (event) => {
    setTopicData({
      ...topicData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const _formData = new FormData();
    _formData.append("title", topicData.title);
    _formData.append("description", topicData.description);
    _formData.append("video", topicData.video);
    // _formData.append('remarks', topicData.remarks);
    try {
      axiosInstance
        .put(`/update/topic/${topic_id}/`, _formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if(res.status == 200){
            Swal.fire({
                icon: "success",
                title: "Topic Edited Successfully !",
                timer: "2000",
            })
          };
        })
        .then((err) => {});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <SecondNavBar colorStyle={'bg-mixed'}/>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-3  pt-5">
            <Sidebar />
          </div>
          <section className="col-md-9 col-lg-9 col-sm-12 col-xs-12 py-5 mt-5 ddChaptCont">
            <div className="card">
              <h3 className="card-header text-center fw-bold text-light" style={{background:'rgb(9, 20, 20)'}}>
                Edit Topic
              </h3>
              <div className="card-body">
                <form>
                  
                  <div className="mb-3 p-4">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type={"text"}
                      name="title"
                      id="title"
                      value={Object.keys(topicData).length > 0 ? topicData.title :''}
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="mb-3 p-4">
                    <label htmlFor="video" className="form-label">
                      Link to video
                    </label>
                    <input
                      type={"text"}
                      onChange={handleChange}
                      name="video"
                      id="video"
                      className="form-control"
                      value={Object.keys(topicData).length > 0 ? topicData.video :''}
                    />
                  </div>

                  <div className="mb-3 p-4">
                    <label htmlFor="video" className="form-label">
                      Description
                    </label>
                    <textarea
                      type={"text"}
                      onChange={handleChange}
                      name="description"
                      id="description"
                      value={Object.keys(topicData).length > 0 ? topicData.description :''}
                      className="form-control"
                    />
                  </div>

                  <button className="btn btn-primary" onClick={formSubmit}>
                    Add Topic
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default EditTopic;






