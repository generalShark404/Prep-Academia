import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
const baseUrl = `http://127.0.0.1:8000/api`;

//ctrl shift r - Split terminal
export default function Topics() {
  const { course_id, course_title } = useParams();
  const searchInput = document.querySelector(".chapterSeacrhInp");
  let [searchNotes, setSearchNote] = useState("");
  const chapterItems = document.querySelectorAll(".chapterAccordion");
  const [courseChapter, setCourseChapter] = useState([]);
  const [notes, setNotes] = useState([]);
  const [dataIsAvailable, setDataAvailable] = useState(false);
  const location = useLocation();

  const searchNote = () => {
    setSearchNote(searchInput.value);

    chapterItems.forEach((value) => {
      let v = value.innerText;

      if (v.includes(searchNotes.trim())) {
        value.style.display = "block";
      } else {
        value.style.display = "none";
      };

    });
  };

  for (let i = 0; i < chapterItems.length; i++) {
    if (searchInput.value === "") {
      chapterItems[i].style.display = "block";
    };
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/course/${course_id}`);

        const topics = res.data.topics;
        setCourseChapter(topics);

        if (res.status == 200) {
          const allNotes = [];
          for (let i = 0; i < topics.length; i++) {
            const topic_id = topics[i].id;

            try {
              const noteRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/get/topic/notes/${topic_id}`
              );

              allNotes.push(...noteRes.data);
            } catch (error) {
              console.log(error);
            };
          };

          setNotes(allNotes);
          setDataAvailable(true);
        }
      } catch (error) {
        console.log(error);
      };
    };

    fetchCourseData();
  }, [course_id]);

  let chaptCont = {
    "margin-top": "180px",
    "margin-bottom": "130px",
    border: "2px 2px solid black",
  };

  let style = {
    "margin-bottom": "10px",
  };

  return (
    <div className="container-xxl bg-d mb-5 mt-50">
      <p className="text-center fs-1">
        <span className="bi bi-book me-3"></span>
        {course_title}
      </p>
      <div className="my-5 chapterSeacrhCont ">
        <div className="">
          <div className="d-flex align-items-center justify-content-cente col-12">
            <input
              placeholder="search"
              className="form-control shadow-sm chapterSeacrhInp "
              onChange={searchNote}
            />
            <i
              className="bi bi-search text-warning position-absolute"
              style={{ right: "5%" }}
            ></i>
          </div>
        </div>
      </div>
      <div className="mb-5">
        {courseChapter && courseChapter.length > 0 ? (
          <Link
            to={`/quizes/${course_title}/${course_id}`}
            className="fs-1 bg-success btn-sm fw-bold text-light"
          >
            Quiz
          </Link>
        ) : (
          <div className="text-center fs-1 text-dark fw-bold">
            <span className="bi bi-info-circle me-3"></span>
            No topics in this course yet !
          </div>
        )}
      </div>
      {courseChapter &&
        courseChapter.map((topic, index) => (
          <>
            <div
              className="flex accordion my-0 text-break"
              id="accordionFlushExample"
            >
              <div
                className="chapterAccordion accordionitem position-relative accHeader p-1 border border-2 border-warnin text-dark"
                style={style}
              >
                <p
                  className=" collapsed chaptText fs-1 mx-4 my-3"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapseOne${topic.id}`}
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  <span className="chapterTitle">
                    {index + 1}.{"  "}
                    {topic.title}
                  </span>
                </p>
                <div
                  id={`flush-collapseOne${topic.id}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <ul className="accordion-body">
                    {dataIsAvailable ? (
                      <>
                        {/* to={`/notes/${topic.title}/${course_id}/${topic.id}/${note.id}`}  */}
                        {notes &&
                          notes.map((note, index) => (
                            <div className="mt-3 p-0">
                              {topic.title == note.topic.title && (
                                <div
                                  className="flex accordion my-0 text-break"
                                  id="accordionExample"
                                  >
                                  <div className="chapterAccordio accordionitem position-relative accHeader p-1 border border-2 border-warnin text-dark mt- p-">
                                    <p
                                      className=" collapsed chaptText fs-1 mx-4 my-3"
                                      data-bs-toggle="collapse"
                                      data-bs-target={`#note-${note.id}`}
                                      aria-expanded="false"
                                      aria-controls={`note-${note.id}`}
                                      >
                                      <p className="fs-2 mb-0">
                                      {note.title}
                                        <span className="bi-book float-end"></span>
                                      </p>
                                    </p>

                                    <div
                                      id={`note-${note.id}`}
                                      className="accordion-collapse collapse mt-4"
                                      data-bs-parent="#accordionExample"
                                      >
                                      <ul className="accordion-body">
                                        <Link
                                          to={`/notes/${encodeURIComponent(topic.title)}/${course_id}/${topic.id}/${note.id}`}
                                          className="list-group-item h3 fw-light"
                                          >
                                          Notes
                                        
                                          <span className="bi-book float-end"></span>
                                        </Link>
                                        <Link
                                          to={`/summary/${topic.title}/${course_id}/${topic.id}`}
                                          className="list-group-item h3 fw-light"
                                        >
                                          Summary
                                          <span className="bi-body-text float-end"></span>
                                        </Link>
                                        <Link
                                          to={`${topic.video}`}
                                          target="blank"
                                          className="list-group-item h3"
                                        >
                                          Video
                                          <span className="bi-youtube float-end"></span>
                                        </Link>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                      </>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  );
}
