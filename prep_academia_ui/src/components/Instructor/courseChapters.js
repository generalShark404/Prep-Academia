import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TeacherSidebar from "./sidebar";
import {useParams} from 'react-router-dom'
import Swal from 'sweetalert2';

const baseUrl = "http://127.0.0.1:8000/api";

function AllChapters() {
    const [chapterData, setChapterData]=useState([]);
    const [totalResult, setTotalResult]=useState(0);
    const {course_id} = useParams();
    useEffect(()=>{
     try {
       axios.get(baseUrl + `/course-chapters/${course_id }`)
       .then((res)=>{
        console.log(res)
        setChapterData(res.data)
        setTotalResult(res.data.length)
       }).then((err)=>console.log(err))
     } catch (error) {
       console.log(error)
     }
    }, []);
    const handleDeleteClick = (chapter_id)=>{
       Swal.fire({
        title:'Confirm',
        text:'Are you sure you want to delete this data?',
        icon:'info',
        confirmButtonText:'Continue',
        showCancelButton:true
       }).then((result)=>{
        if(result.isConfirmed){
          try {
            axios.delete(baseUrl + `/chapter/${chapter_id}`).then((res)=>{
              Swal.fire('success', 'Chapter has been deleted !')
              console.log(res)
              setTotalResult(res.data.length)
              window.location.reload()
            })
          } catch (error) {
            Swal.fire('error', 'Chapter not deleted')
          }
        }
       })
    }
  return (
    <div className="container mt-5 card">
        <div className="row">
            <aside className="col-md-3">
                <TeacherSidebar />
            </aside>
            <section className="col-md-9">
                <div className="card-header">
                    <h3>All Chapters ({totalResult})</h3>
                    <div>
                    <table className="table table-bordered">
              <thead>
                  <tr>
                      <th>Title</th>
                      <th>Video</th>
                      <th>Remarks</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                {chapterData.map((chapter, index)=>
                <tr>
                  <td><Link  to={`#`}>{chapter.title}</Link></td>

                  <td><Link to="" className="justify-content-center">
                     <video controls width={'200'}>
                        <source src={chapter.video.url}/>
                        sorry your browser doesn't support embedded video
                    </video>  
                  </Link></td>
                  <td><Link to="" className="justify-content-center"></Link></td>
                  <td>
                   <Link to={`/edit-chapter/${chapter.id}`} className='btn btn-info  btn-sm'>
                    <span className="bi bi-pencil-square mx-1"></span>
                    </Link>
                    <button onClick={()=>handleDeleteClick(chapter.id)} to={`/delete-chapter/${chapter.id}`} className="btn btn-danger btn-sm">
                     <span className="bi bi-trash mx-1"></span>
                    </button>
                  </td>
                </tr>
                )}
              </tbody>
          </table>
                    </div>
                </div>
            </section>
        </div>
    </div>
  );
}
export default AllChapters;
