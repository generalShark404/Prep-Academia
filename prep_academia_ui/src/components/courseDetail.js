import { useParams, useRoutes } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Login from "./login";
import Swal from "sweetalert2";
import FormatNumber from "./FormatNumber";
import decodedToken from "./student/decodetoken";
import { getLocalStorage, DifficultyChoices, ratingStars } from "./utilities";
import axiosInstance from "../axios";
import dayjs from "dayjs";
import Discussion from "./discussions/discussionSample";

/* - user can be linked and profile can be viewed
     user email shoud not be visible.
   - course review number shoud be shown on the course page.
   - 
*/

function CourseDetail() {
  const [courseData, setCourseData] = useState([]);
  const [courseChapter, setChapterData] = useState([]);
  const [instructorId, setInstructorId] = useState([]);
  const [instructorData, setInstructorData] = useState({});
  const [relatedCourseData, setRelatedCourseData] = useState([]);
  const [techListData, setTechListeData] = useState([]);
  const [enrollStatus, setEnrollStatus] = useState([]);
  const [ratingStatus, setRatingStatus] = useState();
  const [avgRating, setAvgRatingStatus] = useState(0);
  const [courseViews, setCourseViews] = useState(0);
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const {course_id}  = useParams();
  const course_id_2  = useParams().course_id;
  const [favoriteStatus, setFavoriteStatus] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const userStatus = getLocalStorage('student');
  const instructorStatus = getLocalStorage('instructor');
  const course_title = document.getElementById('course_title');
  const [dataIsAvailable, setDataAvailable] = useState(false);
  const [relatedCourseDataLoading, setrelatedCourseDataLoading] = useState(true);
  const [reviewData, setReviewData] = useState([]);
  const [reviewDataLoading, setReviewDataLoading] = useState(false);
  const [rated, setRated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [discussionText, setDiscussionText] = useState({});
  const [replyData, setReplyData] = useState({reply:false});
  const [discussionStatus, setDiscussionStatus] = useState({
    discussion:true,
    reply:false
  });
  const [replies, setReplies] = useState({});
  const [comments, setComments] = useState([]);
  const [trigger, setTrigger]  = useState(1);

  function displayDate(date){
    const dateObj = dayjs(date);
    const formattedDate = dateObj.format('D MMMM YYYY, h:mm:ss A');
    return formattedDate;
  };


  function RatingStar({rating}){
    let star = [];
    for(let i =0; i < rating; i++){
       star.push(<span key={i} className="bi bi-star-fill text-warning"></span>);
    };
    return <div>{star}</div>;
  }

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  
  useEffect(() => {
    // Get Course
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/course/${course_id}`).then((res) => {
          console.log(JSON.parse(res.data.related_courses));
          setCourseData(res.data);
          setChapterData(res.data.course_chapters);
          setInstructorId(res.data.instructor);
          setRelatedCourseData(JSON.parse(res.data.related_courses));
          setTechListeData(res.data.tech_list);
          setDataAvailable(true);
          if (res.data.course_rating != "" && res.data.course_rating != null) {
            setAvgRatingStatus(res.data.course_rating);          
          };
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log('Course: ',error);
    };

    if(relatedCourseData){
      setrelatedCourseDataLoading(true);
    };
    //Course Ends

    // Get Instructor
    try {      
      axios.get(`${process.env.REACT_APP_API_URL}/instructor/get-instructor/${instructorId}`)
      .then((res) => {
        setInstructorData(res.data);
        console.log(res)
      }).catch((error) => {
        console.log('get-instructor Error:', error)
      });
    } catch (error) {
      console.log(error)
    };
    //------------------------------
    // End Instructor

    // Get Enroll Status

    if(userStatus){  
          try {
            axiosInstance
            .get(`fetch-enroll-status/${course_id_2}`)
              .then((res) => {
                if (res.data.bool === true) {
                  setEnrollStatus("success");
                };
                console.log(res);
              }).catch((error) => {
                console.log('fetch-enroll-status Error', error);
              });
          } catch (error) {
            console.log(error);
          };
          // End Enroll Status

          // Get Rating Status
          try {
            axiosInstance
            .get(`fetch-rating-status/${course_id}`)
              .then((res) => {
                console.log(res.data);
                if (res.data.bool == true) {
                  setRatingStatus("success");
                };
              }).catch((error) => {
                console.log('fetch-rating-status Error', error)
              });
          } catch (error) {
            console.log(error);
          };
          // End Rating Status

          // Get Favorite status
          try {
            axiosInstance
            .get(`/fetch-favorite-status/${course_id}`)
              .then((res) => {
                console.log(res.data)
                if (res.data.bool == true) {   
                  setFavoriteStatus("success");
                } else {
                  setFavoriteStatus("");
                  setFavoriteStatus("!success");
                };
              }).catch((error) => {
                console.log('fetch-favorite-status Error', error)
              });
          } catch (error) {
            console.log(error);
          };
          // End Favorite Status

          // Get Update
          try {
            axiosInstance
            .get(`/update-view/${course_id}`).then((res) => {
              setCourseViews(res.data.views);
              console.log(res.data);
            });
          } catch (error) {
            console.log(error);
          };

  }
    // End update View

    // Get Review Data
    try {
      axios
      .get(`${process.env.REACT_APP_API_URL}/get-course-review/${course_id}`)
      .then((res) => {
        setReviewData(res.data.course_review);
        setReviewDataLoading(true);
      }).catch((error) =>{
        console.log(error)
      });
    } catch (error) {
      console.log(error);
    };
    // End update View

    if (userStatus || instructorStatus) {
      setUserLoginStatus("success");
    };

    // fetchDiscussions();

    document.title = `${courseData.title} `
  }, [course_id, courseData.title, rated, trigger]); 

  const fetchDiscussions = async () => {
    try {
      const response = await axiosInstance.get(`course-discussions2/${course_id}`);
      console.log(response.data)
      setComments(response.data);

    }catch (error) {
      console.log("Error in fetch Discussions");
    };
  };

  const discussionComingSoon = () => {
    Swal.fire({
      icon:'info',
      html:`
      <p class="fs-1">
         Coming soon !
      </p>`
    });
  };

  const enrollCourse = () => {
    const _formData = new FormData();
    try {
      axiosInstance
      .post(`student/student-enroll-course/${course_id}`, _formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: res.data.message,
              icon: res.data.message == "user enrolled successfully" ? "success": "info",
              timerProgressBar: true,
              timer: 5000,
              showConfirmButton: false,
            });
            setEnrollStatus("success");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const [ratingData, setRatingData] = useState({
    rating: "",
    reviews: "",
  });

  const handleChange = (event) => {
    setRatingData({
      ...ratingData,
      [event.target.name]: event.target.value,
    });
  };
  
  
  const formSubmit = () => {
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("rating", ratingData.rating);
    _formData.append("reviews", ratingData.reviews);
    
    
    try {
      axiosInstance
      .post(`course-rating`, _formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Swal.fire({
              title: res.data.message,
              icon: res.data.message == "User already rated"?"warning":"success",
            }).then((res) =>{              
              const closeBtn = document.getElementById('closeBtn')
              closeBtn.click()
            })
            setRatingStatus("success");
            setRated(true);
          };
        })
        .then((err) => {
          console.log(err)
        });
    } catch (err) {
      console.log(err);
    };
  };

  //Mark Favorite
  const markAsFavorite = () => {
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("status", true);
    try {
      axiosInstance
        .post(`student/student-add-favorite-course/${course_id}`, _formData, {
          headers: {
            "content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "This course has been added to your favorites",
              icon: "success",
              timer: 10000,
              timerProgressBar: true,
              showConfirmButton: true,
            });
            setFavoriteStatus("success");
          };
        });
    } catch (error) {
      console.log(error);
    };
  };
  //Remove favorite

  //Mark Favorite
  const removeFavorite = (pk) => {
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("student", userStatus);
    _formData.append("status", false);
    try {
      axiosInstance
        .get(
          `user-remove-favorite-course/${course_id}`,
          {
            headers: {
              "content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "course removed from favorites",
              icon: "success",
              timer: 5000,
              timerProgressBar: true,
              showConfirmButton: true,
            });
            setFavoriteStatus("");
          };
        });
    }catch(error){
      console.log(error);
    };
  };

  const toggleModal = () => setShowModal(!showModal);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, user: 'You', text: newMessage, side: 'right' }]);
      setNewMessage("");
    };
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    "object-fit": "cover",
  };

  const height = {
    height: "300px",
    width: "100%",
    "object-fit": "cover",
  };

  const imageContainer = {
    // 'height':'50%',
    width: "70%",
    overflow: "hidden",
  };

  const containerStyle = {
    "box-shadow": "1px 1px 5px 1px grey",
    "border-radius": "10px",
    // "background":"rgb(235, 235, 235)"
  };

  const containerStyle2 = {
    "box-shadow": "1px 1px 5px 1px grey",
    "border-radius": "2px",
    height: "",
  };
  const description = {
    width: "200px",
  };

  const related_course_height = {
    height: "200px",
    width: "100%",
    "object-fit": "cover",
    "border-radius": "8px",
  };

  const course_thumbnail_height = {
    height: "400px",
    width: "100%",
    "object-fit": "cover",
    // "border-radius": "2px",
  };

  const replyDiscussion = (a,e) => {
   try {
     a.preventDefault();
    console.log(e)
     
     const discussionId = e.id;
 
     const discussionCreatedBy =e.created_by_student ? e.created_by_student.first_name + e.created_by_student.last_name : e.created_by_instructor.first_name + e.created_by_instructor.last_name;


     const created_by_student =  e.created_by_student ? true :false;
     const created_by_instructor =  e.created_by_instructor ? true :false;
 
     setReplyData({
       reply:true,
       'discussion_id':discussionId,
       'reply_by':discussionCreatedBy,
       'created_by_student':created_by_student,
       'created_by_instructor':created_by_instructor,
     });
     
     setDiscussionStatus({
      discussion:false,
      reply:true
     });

     setDiscussionText({
      discussionText:''
     });       
   } catch (error) {
      console.log(error);
    };
  };

  const cancelReply = () => {
    setReplyData({
      reply:false
    });
  };

  const submitDiscussion = (e) => {
    e.preventDefault();     

    if(!discussionText.discussionText.trim()){
      Swal.fire({
        'icon':'warning',
        html:`<h3>Can't Empty !</h3>`
      })
    }else{
      if(discussionStatus.discussion){
          const __discussionData = new FormData();
          __discussionData.append('content', discussionText.discussionText.trim())
          __discussionData.append(`${userStatus ? 'user':'instructor'}`, `True`)
          if(!discussionText){
            Swal.fire({
              icon:'warning',
              html:`<h2>Field can't be empty</h2>`
            });
          }else{
            axiosInstance.post(`course-discussions/${course_id}`, __discussionData)
            .then((res) => {
              console.log(res);
              // setComments([...comments, res.data]);
              setComments([...comments, { ...res.data, replies: [] }]);
              //  setComments(addNestedReply(comments, replyData.discussion_id, res.data));
              setDiscussionText({
                discussionText:''
              });
            });
          };
      };
  
      if(discussionStatus.reply){
         const __replyData = new FormData();
         __replyData.append('reply_content', discussionText.discussionText.trim())
         __replyData.append(`${userStatus ? 'user':'instructor'}`, `True`);
         __replyData.append('discussion_id', replyData.discussion_id);
         __replyData.append('created_by_instructor', replyData.created_by_instructor);
         __replyData.append('created_by_student', replyData.created_by_student);
         __replyData.append('reply', true);

            axiosInstance.post(`course-discussions/${course_id}`, __replyData)
            .then((res) => {
              console.log(res)
              // setComments([...comments, res.data]);
            //   setComments(comments.map(comment => 
            //     comment.id === replyData.discussion_id 
            //         ? { ...comment, replies: [...comment.replies, res.data] }
            //         : comment
            // ));
            setComments(addNestedReply(comments, replyData.discussion_id, res.data));
              cancelReply();
              setDiscussionText({
                discussionText:''
            });
        });
      };
    };
  };

  const addFlatReply = (commentsArray, parentId, newReply) => {
    return commentsArray.map(comment => {
        if (comment.id === parentId) {
            // Add the new reply directly to the replies array of the main comment
            return { ...comment, replies: [...comment.replies, { ...newReply, replies: [] }] };
        } else {
            // If the current comment is not the parent, we return it as is
            return { ...comment, replies: addFlatReply(comment.replies, parentId, newReply) };
        }
    });
};

  const addNestedReply = (commentsArray, parentId, newReply) => {
    return commentsArray.map(comment => {
        if (comment.id === parentId) {
            // Add reply to this top-level comment
            return { ...comment, replies: [...comment.replies, { ...newReply, replies: [] }] };
        } else if (comment.replies.length > 0) {
            // Recursively search for the correct reply to attach this new reply to
            return { ...comment, replies: addNestedReply(comment.replies, parentId, newReply) };
        }
        return comment;
    });
};

  const discussionTextOnchange = (e) => {
     setDiscussionText({
       [e.target.name]:e.target.value
     });
  };

  const renderReplies = (replies) => {
    return replies.map((reply) => (
        <div key={reply.id} className="r=eply">
            <p className="right p-3 rounded text-break">
                <p className="fs-4 m-0 mt-2 text-dark">
                    <Link className="">
                        {reply.created_by_student
                            ? `${reply.created_by_student.first_name} ${reply.created_by_student.last_name}`
                            : `${reply.created_by_instructor.first_name} ${reply.created_by_instructor.last_name}`}
                    </Link>
                    <span className="bi-caret-right-fill"></span>
                    <Link className="fs-4 text-dark">
                        {reply.reply_to.created_by_student
                            ? `@${reply.reply_to.created_by_student.first_name} ${reply.reply_to.created_by_student.last_name}`
                            : `@${reply.reply_to.created_by_instructor.first_name} ${reply.reply_to.created_by_instructor.last_name}`}
                    </Link>
                </p>
                <p className="m-0 mt-2">{reply.content}</p>
                <p className="fs-5 m-0 mt-2">{displayDate(reply.created_on)}</p>
                <p className="m-0">
                    <Link className="" onClick={(e) => replyDiscussion(e, reply)}>reply</Link>
                </p>
            </p>

            {/* Render nested replies with increased indentation */}
            {reply.replies && reply.replies.length > 0 && (
                <div className="replies">
                    {renderReplies(reply.replies)}
                </div>
            )}
        </div>
    ));
};
  return (
    <div className="row">
      <div>
        <div className="container mt-50">
          {/* Start */}
          <h2 className="bi bi-book col-lg-12 col-sm-12 col-md-12 fw-bold text-center my- mx-0 fs-"></h2>
          <h2 
          className="col-lg-12 col-sm-12 col-md-12 fw-bold text-center my-4 mx-0 fs-1" 
          id="course_title"
          >
             <div className="header-container">
  <h2 className="header-title">
    {courseData.title}
  </h2>
</div>

          </h2>

          {dataIsAvailable ? (
              <>
        {/* Start */}

          {/* Image Start*/}
          <div className="d-flex justify-content-center col-lg-6 col-md-4 col-sm-4 col-xs-12 h-50 mb-5 "
                >
                  <Link to={''}
                    className="w-100"
                    style={containerStyle}
                  >
                    <img
                      src={`${courseData.featured_thumbnail}`}
                      style={course_thumbnail_height}
                    />
                  </Link>
            </div>
          {/* Image End*/}

          <>
            {/* Other Data Start */}
            <div className="col-lg-6">
            <p className="detail-item fs-3">
    <i className="bi bi-people detail-icon text-primary"></i>
    Total enrolled: {courseData.total_enrolled_students} students
  </p>

  <p className="detail-item fs-3">
    <i className="bi bi-person detail-icon text-danger"></i>
    Instructor: 
    <Link to={`/instructor/profile/${instructorData.id}`}>
      {instructorData.instructor_info ? ` ${instructorData.instructor_info.username}` : ''}
    </Link>
  </p>
  <p className="detail-item fs-3">
    <i className="bi bi-bar-chart detail-icon text-success"></i>
    Difficulty: 
    <span className="text-primary">
      <DifficultyChoices choices={courseData.difficulty}/>
    </span>
  </p>
  
  <p className="detail-item fs-3 ,mb- ">
      {/* Link to open the modal */}
      {/* <Link onClick={toggleModal}> */}
      <Link onClick={discussionComingSoon}>
      <i className="bi bi-chat detail-icon text-warning"></i>
      Discussions
      {/* <sup> 22</sup> */}
    </Link>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Course Discussion
                </h5>
                <button type="button" className="btn-close" onClick={toggleModal}>
                </button>
              </div>
              <div className="modal-body">
              <div className="chat-bochat-message">
        {/* Display messages */}
        {comments ? (
          <>
            {comments &&
              comments.map((comment) => (
                <>
                  <div className="text-break">
                    <p>
                      {/* </p>{/* <div key={comment.id} className="comment text-break"> */}
                        <p className="left p-3 rounded">
                          <p className="fs-4 text-dark m-0 mt-2">
                            {comment.created_by_student
                              ? comment.created_by_student.username +
                                " " +
                                comment.created_by_student.last_name
                              : comment.created_by_instructor.first_name +
                                comment.created_by_instructor.last_name}
                          </p>
                          <p className=" m-0 mt-2">{comment.content}</p>
                          <span className=" m-0 mt-2 fs-5">
                            {displayDate(comment.created_on)}
                          </span>

                          <p className="mt-3 mb-0">
                            <Link
                              className=""
                              onClick={(e) => replyDiscussion(e, comment)}
                            >
                              reply
                            </Link>
                          </p>
                        </p>

                        {/* Render all replies in a flattened list */}
                        <div className="replies">
                          {" "}
                          {/* {renderReplies(comment.replies)} */}
                        </div>
                      {/* </div> */}
                      <div key={comment.id} className="text-break">
            <div className="comment text-break">
                <p className="left p-3 rounded">
                    <p className="fs-4 text-dark m-0 mt-2">
                        {comment.created_by_student
                            ? `${comment.created_by_student.first_name} ${comment.created_by_student.last_name}`
                            : `${comment.created_by_instructor.first_name} ${comment.created_by_instructor.last_name}`}
                    </p>
                    <p className="m-0 mt-2">{comment.content}</p>
                    <span className="m-0 mt-2 fs-5">{displayDate(comment.created_on)}</span>
                    <p className="mt-3 mb-0">
                        <Link className="" onClick={(e) => replyDiscussion(e, comment)}>reply</Link>
                    </p>
                </p>

                {/* Render replies nested under each comment */}
                <div className="replies">
                {/* {comment.replies && comment.replies.length > 0 && ( */}
                <div className="replies">
                    {renderReplies(comment.replies)}
                </div>
            {/* )} */}
                    {/* {renderReplies(comment.replies)} */}
                    {/* {renderComments()} */}
                </div>
            </div>
        </div>
                    </p>
                  </div>
                </>
              ))}
          </>
        ) : (
          <>
            <p className="text-center">
              No discussions yet ! <br />
              Start discussion now.
            </p>
          </>
        )}
      </div>
      <div>
      </div>
                
              </div>
        <div className="modal-footer">
          {/* Reply Form */}
          <form onSubmit={handleSendMessage} className="w-100">
            <div className="input-group">
              {replyData.reply && (
                <p className="fs-4 text-start m-0">
                  <span
                    className="bi-x-square-fill cursor-pointer"
                    onClick={cancelReply}
                  ></span>
                  <span className="bi-caret-right-fill"> </span>
                  <span className="">Replying to </span>
                  <span className="text-warning fw-bold">
                    @{replyData.reply_by}
                  </span>
                </p>
              )}

              <textarea
                value={discussionText ? discussionText.discussionText : ""}
                className="form-control discussionInput"
                name="discussionText"
                id="discussionInput"
                onChange={discussionTextOnchange}
                placeholder="Type your reply..."
                required
              />
              <button
                type="submit"
                className="btn btn-primary mt-3"
                onClick={(e) => submitDiscussion(e)}
              >
                Send
              </button>
            </div>
          </form>
        </div>
            </div>
          </div>
        </div>
      )}
  
  </p>

  <p className="fw-bold h4 text-dark ">
  <p className="detail-item fs-3">
<i className="bi bi-star-fill detail-icon text-warning"></i>
Ratings: {avgRating.toPrecision(2)} / 5 
</p>

    {}
    {userStatus && (
      <>
        {ratingStatus !== "success" && (
          <button
            className="defaultBtn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#ratingModal"
          >
            Rate & Comment
          </button>
        )}
        {ratingStatus === "success" && (
          <span className="fw-bold mx- my-4 text-warning border border-3 border-warning p-2 br-3">
          <span className="bi-star-fill mx-2"></span>
          Rated
        </span>
          // </small>
        )}
        {/* if enroll Status  */}
        {/* ------------------------- */}
        <div
          className="modal"
          id="ratingModal"
          tabindex="1"
          aria-labelledby="modalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h3
                  className="text-center modal-title"
                  id="modalLabel"
                >
                  Rate for {courseData.title}
                </h3>
                <button
                  type="button"
                  className="btn-close"
                  id="closeBtn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="input" className="form-label">
                    Rating
                  </label>
                  <select
                    onChange={handleChange}
                    className="form-control"
                    name="rating"
                  >
                    <option value={"1"} className="text-danger">
                      1 - Very Bad
                    </option>
                    <option value={"2"} className="text-danger">
                      2 - Bad
                    </option>
                    <option value={"3"} className="text-secondary">
                      3 - Good
                    </option>
                    <option value={"4"} className="text-primary">
                      4 - Very Good
                    </option>
                    <option value={"5"} className="text-success">
                      5 - Excellent
                    </option>
                  </select>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="inputPassword"
                    className="form-label"
                  >
                    Review
                  </label>
                  <textarea
                    onChange={handleChange}
                    className="form-control"
                    name="reviews"
                    rows={"10"}
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={formSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ------------------------- */}
      </>
    )}
    
    {/* Start */}
    {/* if user is logged in */}
    {userStatus  && enrollStatus !== "success" && (
      <button className="defaultBtn fw-bold btn-success mx-3">
        <Link onClick={enrollCourse} className="btn-success ">
          Enroll
        </Link>
      </button>
    )}
    {enrollStatus === "success" && userLoginStatus === "success" && (
      <span className="fw-bold mx-3 my-3 text-success border border-3 p-2 br-3">
        <span className="bi bi-check-circle mx-2"></span>
        Enrolled
      </span>
    )}
    {/* if user is not  logged in */}
    {!userLoginStatus && (
      <p className="fw-bold my-5">
        <Link to={"/login"} className="text-success">
          Login to Enroll to save and see assignments and updates
        </Link>
      </p>
    )}
    {/* Mark favorite */}
    {userStatus &&
      favoriteStatus !== "success" && (
        <button
        onClick={markAsFavorite}
          className="me-3 defaultBtn btn-lg px-3 border border-danger bg-white border-2"
          title="Add in favorite"
        >
          <i className="bi text-danger bi-heart-fill"></i>
        </button>
      )}
    {/* Remove favorite */}
    {userStatus &&
      favoriteStatus === "success" && (
        <button
          onClick={removeFavorite}
          className="me-3 defaultBtn btn-danger btn-lg px-3 py-2"
          title="Remove from favorite courses"
        >
          <i className="bi bi-heart-fill"></i>
        </button>
      )}
  <Link 
    to={`/${courseData.title}/topics/${course_id}`}
    className="defaultBtn btn-success"
    >
    Start
  </Link>
  </p>
 
            </div>
          </>
          {/* Other Data End */}
        {/* End */}
              </>
          ):(
                <>
                    <div className="d-flex justify-content-center col-12 mt-5">
                      <button  className="btn btn-warning" type="button" disabled>
                        <span className="spinner-border me-3" role="status" aria-hidden="true"></span>
                        Loading....
                      </button>
                    </div>
                 </>
          )}
        </div>
     {/* // Other Data End */}
     
          {/* Description Start */}
          <div className="d-flex justify-content-center">
            <div className="mt-0 col-lg-10 col-md-7 col-sm-12 col-xs-11 px-3 mx-3">
                <p className="description overflow-hiddn postion-relative h4 text-dark mt-4 mx-3" style={{lineHeight:"1.5"}}>
                  <span className="small">
                    Description: 
                  </span>
                  <span className="">
                    {/* {courseData.description.length > 500 ? courseData.description.slice(0, 500) : courseData.description} */}
                    {showFullDescription ? (courseData.description) :
                    <span>
                      {courseData.description && courseData.description.length > 500 ? courseData.description.slice(0, 500) + '...' : courseData.description
                      }
                      <span className="read_more fw-bold text-primary" style={{cursor:'pointer'}} onClick={toggleDescription}>
                          {showFullDescription ? 'Read Less' : courseData.description && courseData.description.length > 500?  'Read More' : ''}
                      </span>
                    </span>}
                  </span><br/>
                  
                </p>
              </div>
          </div>
        {/* Description End */}

      {/* Related Courses Start */}
       <div className="col-lg-12 col-sm-12 col-md-12">
        <h1 className="text-center fw-bold mt-5">Related Courses</h1>
        {relatedCourseDataLoading ? 
        <>
          {relatedCourseData ? (    
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
              {relatedCourseData &&
                relatedCourseData.map((related_course, index) => (
                  <>
                    <div
                      className="d-flex col-lg-3 col-md-4 col-sm-4 col-xs-12 h-50 mb-5"
                      data-toggle="tooltip"
                      data-placement="top"
                      title={related_course.fields.title}
                    >
                      <Link
                        to={`/about/${related_course.fields.title}/${related_course.pk}`}
                        className="w-100"
                        style={containerStyle}
                      >
                        <img
                          src={`${process.env.REACT_APP_URL}/media/${related_course.fields.featured_thumbnail}`}
                          style={related_course_height}
                        />
                        <ul className="list-group list-group-flush  ">
                          <li className="list-group-item text-center fs-3 text-wrap ">
                            <span className="bi bi-book me-3"></span>
                            {related_course.fields.title.length > 10
                              ? `${related_course.fields.title.slice(0, 8)}..`
                              : related_course.fields.title}
                          </li>
                          <li className=" m-0 nav-link pt-4 pb-0 text-center">
                            <span className="text-dark">Difficulty : </span>
                            <span className="text-white difficulty rounded p-2">
                                <DifficultyChoices choices={related_course.fields.difficulty}/>
                            </span>
                          </li>
                        </ul>
                      </Link>
                    </div>
                  </>
                ))}
            </div>            
            )
          :(
            <>
              <div className="text-center fw-bold display-6 mt-5 p-5">
                  No related courses yet !
              </div>
            </>
          )}
        </>
        : 
        <>
         <div className="d-flex justify-content-center col-12 mt-5">
            <button  className="btn btn-warning" type="button" disabled>
              <span className="spinner-border me-3" role="status" aria-hidden="true"></span>
              Loading....
            </button>
          </div>
        </>
        }

       </div>
      
      {/* Related Courses End */}
      <div>
       <h1 className="text-center btn d-flex justify-content-center fs-1">Comments</h1> 
       <p className="mx-5 fs-3">
          <span className="bi bi-chat mx-2 text-warning"></span> 
          {reviewData.length > 1 ? reviewData.length + ' comments' : reviewData.length + ' comment' } 
       </p>
       <div className="container mt-5">

            <div className="row  d-flex justify-content-center">
            {reviewDataLoading ? (
              reviewData.length == 0 ? (
                <>
                  <div className="text-center fw-bold display-6 mt-0 p-5">
                {/* <span className="bi bi-book me-3"></span> */}
                 No reviews on this coure yet!
              </div>
                </>
              ):(
                <>
                  {reviewData && reviewData.map((review)=> (
                    <>
                    <div className="comment-card" >
                    <div className="comment-header">
                    <img src={review.student.profile_img ? `${process.env.REACT_APP_URL}/${review.student.profile_img}` :"../../assets/images/no-profile2.jpeg"} width="30" height="30" className="user-img rounded-circle mr-2" />
                    <Link className="font-weight-bold mx-2" to={``}>
                        {review.student_username} 
                    </Link>
                    </div>
                    <div className="comment-body">
                      <p>{review.reviews}</p>
                      <div className="text-warning">
                        {ratingStars(review.rating)}
                      </div>
                      <div className="text-warning">
                        {displayDate(review.review_time)}
                      </div>
                    </div>
                  </div>
            
                    </>
           ))}
                </>
              )
            ):(
              <>
                  <div className="d-flex justify-content-center col-12 mt-5">
            <button  className="btn btn-warning" type="button" disabled>
              <span className="spinner-border me-3" role="status" aria-hidden="true"></span>
              Loading....
            </button>
          </div> 
              </>
            )
          }
            </div>
            
        </div>
      </div>
      </div>
    </div>
  );
}
export default CourseDetail;


