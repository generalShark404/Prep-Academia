import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../axios";
import "./discussions.css";
import { displayDate } from "../utilities";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Discussion = ({ courseId, userStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [discussionText, setDiscussionText] = useState({});
  const [replyData, setReplyData] = useState({ reply: false });
  const [discussionStatus, setDiscussionStatus] = useState({
    discussion: true,
    reply: false,
  });
  const [replies, setReplies] = useState({});

  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments and replies
    axiosInstance
      .get(`/course-discussions2/2`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, [courseId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          user: "You",
          text: newMessage,
          side: "right",
        },
      ]);
      setNewMessage("");
    }
  };
  const replyDiscussion = (a, e) => {
    try {
      a.preventDefault();
      console.log(e);

      const discussionId = e.id;

      const discussionCreatedBy = e.created_by_student
        ? e.created_by_student.first_name + e.created_by_student.last_name
        : e.created_by_instructor.first_name +
          e.created_by_instructor.last_name;

      const created_by_student = e.created_by_student ? true : false;
      const created_by_instructor = e.created_by_instructor ? true : false;

      setReplyData({
        reply: true,
        discussion_id: discussionId,
        reply_by: discussionCreatedBy,
        created_by_student: created_by_student,
        created_by_instructor: created_by_instructor,
      });

      setDiscussionStatus({
        discussion: false,
        reply: true,
      });

      setDiscussionText({
        discussionText: "",
      });
    } catch (error) {}
  };

  const cancelReply = () => {
    setReplyData({
      reply: false,
    });
  };

  const submitDiscussion = (e) => {
    e.preventDefault();

    if (!discussionText.discussionText.trim()) {
      Swal.fire({
        icon: "warning",
        html: `<h3>Can't Empty !</h3>`,
      });
    } else {
      if (discussionStatus.discussion) {
        const __discussionData = new FormData();
        __discussionData.append(
          "content",
          discussionText.discussionText.trim()
        );
        __discussionData.append(
          `${userStatus ? "user" : "instructor"}`,
          `True`
        );
        if (!discussionText) {
          Swal.fire({
            icon: "warning",
            html: `<h2>Field can't be empty</h2>`,
          });
        } else {
          axiosInstance
            .post(`course-discussions/${courseId}`, __discussionData)
            .then((res) => {
              console.log(res);
              setDiscussionText({
                discussionText: "",
              });
            });
        }
      }

      if (discussionStatus.reply) {
        const __replyData = new FormData();
        __replyData.append(
          "reply_content",
          discussionText.discussionText.trim()
        );
        __replyData.append(`${userStatus ? "user" : "instructor"}`, `True`);
        __replyData.append("discussion_id", replyData.discussion_id);
        __replyData.append(
          "created_by_instructor",
          replyData.created_by_instructor
        );
        __replyData.append("created_by_student", replyData.created_by_student);
        __replyData.append("reply", true);

        axiosInstance
          .post(`course-discussions/${courseId}`, __replyData)
          .then((res) => {
            console.log(res);
            setDiscussionText({
              discussionText: "",
            });
          });
      }
    }
  };

  const discussionTextOnchange = (e) => {
    setDiscussionText({
      [e.target.name]: e.target.value,
    });
  };

  const renderReplies = (replies) => {
    return replies.map((reply) => (
      <div key={reply.id} className="reply">
        <p className="right p-3 rounded text-break">
          <p className="fs-4 m-0 mt-2 text-dark">
            {reply.created_by_student
              ? reply.created_by_student.first_name + ' ' + reply.created_by_student.last_name
              : reply.created_by_instructor.first_name + ' ' + reply.created_by_instructor.last_name}
          </p>
          <p className="m-0 mt-2">
            {reply.content}
          </p>
          <p className="fs-5 m-0 mt-2">     {displayDate(reply.created_on)}
          </p>

          <p className=" m-0">
            <Link className="" onClick={(e) => replyDiscussion(e, reply)}>
              reply
            </Link>
          </p>
        </p>
      </div>
    ));
  };

  return (
    <div className="discussion">
      <div className="chat-bochat-message">
        {/* Display messages */}
        {comments ? (
          <>
            {comments &&
              comments.map((comment) => (
                <>
                  <div className="text-break">
                    <p>
                      <div key={comment.id} className="comment text-break">
                        <p className="left p-3 rounded">
                          <p className="fs-4 text-dark m-0 mt-2">
                            {comment.created_by_student
                              ? comment.created_by_student.first_name +
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
                          {renderReplies(comment.replies)}
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
  );
};

export default Discussion;
