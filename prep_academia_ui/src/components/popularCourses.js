import {Link} from 'react-router-dom';
function PopularCourses(){
    return(
        <div>
             <header id="fh5co-header" className="fh5co-cover fh5co-cover-sm" role="banner" style={{backgroundImage: 'url(../../assets/images/banner3.jpg)'}} data-stellar-background-ratio="0.5">
    <div className="overlay" />
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2 text-center">
          <div className="display-t">
            <div className="display-tc animate-box" data-animate-effect="fadeIn">
              <h1 className='fw-bold'>Popular Courses</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
   {/* Courses Start */}
   <div className="container-xxl py-5">
    <div className="container">
      <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
        <h2 className="m-5 section-title bg-white text-center text-primary px-3">All Courses</h2>
      </div>
      <div className="row g-4 justify-content-center">
        <div className="col-lg-3 col-xs-6 col-sm-6 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="course-item bg-light">
            <div className="position-relative overflow-hidden">
                <Link to='/detail/1'>
              <img className="img-fluid" src="../../assets/images/banner5.jpg" alt />
                </Link>
              <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{borderRadius: '30px 0 0 30px'}}>Read More</a>
                <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3" style={{borderRadius: '0 30px 30px 0'}}>Join Now</a>
              </div>
            </div>
            <div className="text-center p-4 pb-0">
              <h3 className="mb-0">$149.00</h3>
              <div className="mb-3">
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small>(123)</small>
              </div>
              <h5 className="mb-4">Web Design &amp; Development Course for Beginners</h5>
            </div>
            <div className="d-flex border-top">
              <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2" />John Doe</small>
              <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2" />1.49 Hrs</small>
              <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2" />30 Students</small>
            </div>
          </div>
        </div>
        {/* start */}
        <div className="col-lg-3 col-xs-6 col-sm-6 col-md-6wow fadeInUp" data-wow-delay="0.3s">
          <div className="course-item bg-light">
            <div className="position-relative overflow-hidden">
              <img className="img-fluid" src="../../assets/images/banner5.jpg" alt />
              <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{borderRadius: '30px 0 0 30px'}}>Read More</a>
                <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3" style={{borderRadius: '0 30px 30px 0'}}>Join Now</a>
              </div>
            </div>
            <div className="text-center p-4 pb-0">
              <h3 className="mb-0">$149.00</h3>
              <div className="mb-3">
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small>(123)</small>
              </div>
              <h5 className="mb-4">Web Design &amp; Development Course for Beginners</h5>
            </div>
            <div className="d-flex border-top">
              <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2" />John Doe</small>
              <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2" />1.49 Hrs</small>
              <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2" />30 Students</small>
            </div>
          </div>
        </div>
        {/* end */}
        {/* start */}
        <div className="col-lg-3 col-xs-6 col-sm-6 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
          <div className="course-item bg-light">
            <div className="position-relative overflow-hidden">
              <img className="img-fluid" src="../../assets/images/banner5.jpg" alt />
              <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{borderRadius: '30px 0 0 30px'}}>Read More</a>
                <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3" style={{borderRadius: '0 30px 30px 0'}}>Join Now</a>
              </div>
            </div>
            <div className="text-center p-4 pb-0">
              <h3 className="mb-0">$149.00</h3>
              <div className="mb-3">
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small>(123)</small>
              </div>
              <h5 className="mb-4">Web Design &amp; Development Course for Beginners</h5>
            </div>
            <div className="d-flex border-top">
              <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2" />John Doe</small>
              <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2" />1.49 Hrs</small>
              <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2" />30 Students</small>
            </div>
          </div>
        </div>
        {/* end */}
        {/* start */}
        <div className="col-lg-3 col-xs-6 col-sm-6 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
          <div className="course-item bg-light">
            <div className="position-relative overflow-hidden">
              <img className="img-fluid" src="../../assets/images/banner5.jpg" alt />
              <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{borderRadius: '30px 0 0 30px'}}>Read More</a>
                <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3" style={{borderRadius: '0 30px 30px 0'}}>Join Now</a>
              </div>
            </div>
            <div className="text-center p-4 pb-0">
              <h3 className="mb-0">$149.00</h3>
              <div className="mb-3">
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small>(123)</small>
              </div>
              <h5 className="mb-4">Web Design &amp; Development Course for Beginners</h5>
            </div>
            <div className="d-flex border-top">
              <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2" />John Doe</small>
              <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2" />1.49 Hrs</small>
              <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2" />30 Students</small>
            </div>
          </div>
        </div>
        {/* end */}
        {/* start */}
        <div className="col-lg-3 col-xs-6 col-sm-6 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
          <div className="course-item bg-light">
            <div className="position-relative overflow-hidden">
              <img className="img-fluid" src="../../assets/images/banner5.jpg" alt />
              <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{borderRadius: '30px 0 0 30px'}}>Read More</a>
                <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3" style={{borderRadius: '0 30px 30px 0'}}>Join Now</a>
              </div>
            </div>
            <div className="text-center p-4 pb-0">
              <h3 className="mb-0">$149.00</h3>
              <div className="mb-3">
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small>(123)</small>
              </div>
              <h5 className="mb-4">Web Design &amp; Development Course for Beginners</h5>
            </div>
            <div className="d-flex border-top">
              <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2" />John Doe</small>
              <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2" />1.49 Hrs</small>
              <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2" />30 Students</small>
            </div>
          </div>
        </div>
        {/* end */}
        {/* start */}
        <div className="col-lg-3 col-xs-6 col-sm-6 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
          <div className="course-item bg-light">
            <div className="position-relative overflow-hidden">
              <img className="img-fluid" src="../../assets/images/banner5.jpg" alt />
              <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{borderRadius: '30px 0 0 30px'}}>Read More</a>
                <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3" style={{borderRadius: '0 30px 30px 0'}}>Join Now</a>
              </div>
            </div>
            <div className="text-center p-4 pb-0">
              <h3 className="mb-0">$149.00</h3>
              <div className="mb-3">
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small>(123)</small>
              </div>
              <h5 className="mb-4">Web Design &amp; Development Course for Beginners</h5>
            </div>
            <div className="d-flex border-top">
              <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2" />John Doe</small>
              <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2" />1.49 Hrs</small>
              <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2" />30 Students</small>
            </div>
          </div>
        </div>
        {/* end */}
        {/* start */}
        <div className="col-lg-3 col-xs-6 col-sm-6 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
          <div className="course-item bg-light">
            <div className="position-relative overflow-hidden">
              <img className="img-fluid" src="../../assets/images/banner5.jpg" alt />
              <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{borderRadius: '30px 0 0 30px'}}>Read More</a>
                <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3" style={{borderRadius: '0 30px 30px 0'}}>Join Now</a>
              </div>
            </div>
            <div className="text-center p-4 pb-0">
              <h3 className="mb-0">$149.00</h3>
              <div className="mb-3">
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small>(123)</small>
              </div>
              <h5 className="mb-4">Web Design &amp; Development Course for Beginners</h5>
            </div>
            <div className="d-flex border-top">
              <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2" />John Doe</small>
              <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2" />1.49 Hrs</small>
              <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2" />30 Students</small>
            </div>
          </div>
        </div>
        {/* end */}
        <div className="col-lg-3 col-xs-6 col-sm-6 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
          <div className="course-item bg-light">
            <div className="position-relative overflow-hidden">
              <img className="img-fluid" src="../../assets/images/banner5.jpg" alt />
              <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{borderRadius: '30px 0 0 30px'}}>Read More</a>
                <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3" style={{borderRadius: '0 30px 30px 0'}}>Join Now</a>
              </div>
            </div>
            <div className="text-center p-4 pb-0">
              <h3 className="mb-0">$149.00</h3>
              <div className="mb-3">
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small>(123)</small>
              </div>
              <h5 className="mb-4">Web Design &amp; Development Course for Beginners</h5>
            </div>
            <div className="d-flex border-top">
              <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2" />John Doe</small>
              <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2" />1.49 Hrs</small>
              <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2" />30 Students</small>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  </div>
  {/* pagination start */}
  <div className='m-1 row justify-content-center float-center'>
    <nav aria-label='Page navigation example'>
        <ul className='pagination m-5   justiy-content-center col-6 m-5'>
            <li className='page-item'><Link className='page-link' to={''}>Previous</Link></li>
            <li className='page-item'><Link className='page-link' to={''}>1</Link></li>
            <li className='page-item'><Link className='page-link' to={''}>2</Link></li>
            <li className='page-item'><Link className='page-link' to={''}>3</Link></li>
            <li className='page-item'><Link className='page-link' to={''}>Next</Link></li>
        </ul>
    </nav>
      </div>
  {/* pagination end */}
  {/* Courses End */} 
        </div>
    )
}
export default PopularCourses