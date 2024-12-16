import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/api'
function PopularInstructors(){
    const [teacher, setTeacher] = useState(null);
    useEffect(()=>{
        axios.get(baseUrl + '/instructor').then((res)=>{
            setTeacher(res.data)
        }).then((error)=>console.log(error));
    }, []);
    console.log(teacher)
    return(
        <div className="">
            <header id="fh5co-header" className="fh5co-cover fh5co-cover-sm" role="banner" style={{backgroundImage: 'url(../../assets/images/banner3.jpg)'}} data-stellar-background-ratio="0.5">
    <div className="overlay" />
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2 text-center">
          <div className="display-t">
            <div className="display-tc animate-box" data-animate-effect="fadeIn">
              <h1 className='fw-bold'>Popular Teachers</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">Teachers</h6>
            <h1 className="mb-5">Popular Teachers</h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-4 col-xs-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item bg-light">
                <div className="overflow-hidden">
                  <img className="img-fluid" src="../../assets/images/banner5.jpg" alt />
                </div>
                <div className="position-relative d-flex justify-content-center" style={{marginTop: '-23px'}}>
                  <div className="bg-light d-flex justify-content-center pt-2 px-1">
                    <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-facebook-f" /></a>
                    <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-twitter" /></a>
                    <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-instagram" /></a>
                  </div>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Instructor Name</h5>
                  <small>Designation</small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="team-item bg-light">
                <div className="overflow-hidden">
                  <img className="img-fluid" src="../../assets/images/banner2.jpg" alt />
                </div>
                <div className="position-relative d-flex justify-content-center" style={{marginTop: '-23px'}}>
                  <div className="bg-light d-flex justify-content-center pt-2 px-1">
                    <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-facebook-f" /></a>
                    <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-twitter" /></a>
                    <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-instagram" /></a>
                  </div>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Instructor Name</h5>
                  <small>Designation</small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="team-item bg-light">
                <div className="overflow-hidden">
                  <img className="img-fluid" src="../../assets/images/banner5.jpg" alt />
                </div>
                <div className="position-relative d-flex justify-content-center" style={{marginTop: '-23px'}}>
                  <div className="bg-light d-flex justify-content-center pt-2 px-1">
                    <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-facebook-f" /></a>
                    <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-twitter" /></a>
                    <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-instagram" /></a>
                  </div>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Instructor Name</h5>
                  <small>Designation</small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="team-item bg-light">
                <div className="overflow-hidden">
                  <img className="img-fluid" src="../../assets/images/banner5.jpg" alt />
                </div>
                <div className="position-relative d-flex justify-content-center" style={{marginTop: '-23px'}}>
                  <div className="bg-light d-flex justify-content-center pt-2 px-1">
                    <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-facebook-f" /></a>
                    <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-twitter" /></a>
                    <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-instagram" /></a>
                  </div>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Instructor Name</h5>
                  <small>Designation</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
export default PopularInstructors