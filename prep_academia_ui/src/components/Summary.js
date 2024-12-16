import { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import SecondNavBar from "./secondNavBar";
import { NavLink } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/api";

export default function Summary() {
  const [summary, setSummary] = useState([]);
  const { chapter_id, note_id} = useParams();
  const [sideContents, setSideContents] = useState([]);
  console.log(useParams())

  useEffect(() => {
    try {
      axios.get(`${baseUrl}/side-chapters/${chapter_id}`).then((res) => {
        setSideContents(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(`${baseUrl}/summary/${note_id}`).then((res) => {
      
        setSummary(...res.data);
      });
    } catch (error) {
      console.log(error);
    }

    document.title = "Summary";
  }, [note_id]);

  console.log(summary)
  return (
<div className="fon">
      <SecondNavBar colorStyle="" className="" />
      <div className="container-xxl note z-3 font fs-1">
        <span className="m-5 p-5"></span>
        {/* Contents and Note Start End*/}
        <div className="row">
          <div className="col-2">
            <div
              className="p- mb-5 sideChapter position-fixed"
              // ref={side_chapter}
            >
              {/* Chapter Start */}
              <div
                className="offcanvas sideChapterCont offcanvas-start sidebar-nav text-white p-3 pt-5 mt-0 s bg-dark"
                tabindex="-1"
                id="sideBarCanvas"
                aria-labelledby="offcanvasExampleLabel"
                style={{background:'rgb(255, 98, 0)'}}
                >
                <div className="text-muted small fw-bold text-uppercase px3 t-4 mb-0">
                {/* <hr className="bg-warning hr"/> */}
                  <div className="offcanvas-header">
                    <span className="contentsText ">Contents</span>
                  </div>
                  <input className="col-12 px-3 border-none outline-none text-dark" placeholder="search"/>
                </div>
                <div className="offcanvas-body">
                  {sideContents.map((content, number) => (
                    <>
                      <NavLink
                        exact to={`/summary/${content.title}/${chapter_id}/${content.id}`}
                        className=" sideChapterItems nav-link px-1 sidebar-link  mt-2"
                        style={{fontSize:'18px'}}
                        >
                        <span>
                          {`${number + 1}. `}
                          {content.title}
                        </span>
                      </NavLink>
                    </>
                  ))}
                  <p className="mb-5"></p>
                </div>
              </div>
            </div>
          </div>

          {/* ------------- */}
          <div className="col-lg-10 col-md-8 col-sm-12 col-xs-12 mt-0 notesContaier  overflow-scroll font">
          <div className="text-cener mx-3 mt-3">
            <span className="text-secondary text-center border-botto fw-bold border-warnin h2 mb-5">
              <span className="bi bi-card-text me-2"></span>
              Summary
            </span><br />
            <span className="border-botto fw-bold border-warnin h2 ">
              {summary.title}
            </span>
         </div>
            <span className="mt-5"></span>
            <div className="container mt-lg-0 mt-md-0 mt-xs-5 mt-sm-5">
              {/* -------- */}
              <div className="borde col-11 p-2">
                    {/* By */}
                      <div className=" small">
                        <span className="">Tags: </span> 
                        <Link>{summary.course ? summary.course.tags : ''}</Link>
                      </div>
                      <div className="text-secondary small">
                        <span className="bi bi-align-end me-2 "></span>
                        <span className=""> 
                        By  
                        <Link className="ms-2" to={`/instructor/page/${summary.course ? summary.course.instructor.id:''}`}>
                          {summary.course ? summary.course.instructor.first_name:''}
                        </Link>
                        </span> 
                      </div>
                    {/*End By */}
              </div>
              {/* -------- */}
                      <div className="mt-2 mb-0"></div>
                    
                    {/*End By */}
              {/* <div className="">
                {/* By: <span>{notes.course.instructor.first_name}</span> */}
              {/* </div> */} 
            </div>
            <div className="text-break  mt-0 justify-content-center p-4">
              <h2 className="text-muted  text-start fs-3 mb-4 mt-3"></h2>
              {/* <h1 className="fs-1 fw-bold mb-0">{notes.title}</h1> */}
              {/* <hr className="r mt-0 " /> */}
              <div
                className={`notesBody col-lg-10 col-md-10 col-sm-12 col-xs-12  overflow-visible bg-dar`}
                dangerouslySetInnerHTML={{ __html: summary.summary }}
                style={{fontSize: "21px" }}
              ></div>
            </div>
        {/* By */}
        
          {/*End By */}
          </div>
          {/* ------------- */}
        </div>
        {/* Contents and Note End*/}
      </div>
    </div>
  );
}
