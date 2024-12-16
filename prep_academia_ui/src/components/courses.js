import {Link} from 'react-router-dom'
function Courses(){
   return ( 
<div>
  <header id="fh5co-header" className="fh5co-cover fh5co-cover-sm" role="banner" style={{backgroundImage: 'url(../../assets/images/img_bg_2.jpg)'}} data-stellar-background-ratio="0.5">
    <div className="overlay" />
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2 text-center">
          <div className="display-t">
            <div className="display-tc animate-box" data-animate-effect="fadeIn">
              <h1>Courses</h1>
              <h2>Free html5 templates Made by <Link to="http://freehtml5.co" target="_blank">freehtml5.co</Link></h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div id="fh5co-blog">
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-4">
          <div className="fh5co-blog animate-box">
            <Link to="#"><img className="img-responsive" src="../../assets/images/english_communication.jpeg" width='100%/9' alt="img" /></Link>
            <div className="blog-text">
              <h3><Link to="">45 Minimal Workspace Rooms for Web Savvys</Link></h3>
              <span className="posted_on">Nov. 15th</span>
              <span className="comment"><Link to>21<i className="icon-speech-bubble" /></Link></span>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              <Link to="#" className="btn btn-primary">Read More</Link>
            </div> 
          </div>
        </div>
        <div className="col-lg-4 col-md-4">
          <div className="fh5co-blog animate-box">
            <Link to="#"><img className="img-responsive" src="../../assets/images/flag1.jpg" width='100%/9' alt="img" /></Link>
            <div className="blog-text">
              <h3><Link to="">45 Minimal Worksspace Rooms for Web Savvys</Link></h3>
              <span className="posted_on">Nov. 15th</span>
              <span className="comment"><Link to>21<i className="icon-speech-bubble" /></Link></span>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              <Link to="#" className="btn btn-primary">Read More</Link>
            </div> 
          </div>
        </div>
        <div className="col-lg-4 col-md-4">
          <div className="fh5co-blog animate-box">
            <Link to="#"><img className="img-responsive" src="../../assets/images/ints105.jpeg" width='100%/9' alt="img" /></Link>
            <div className="blog-text">
              <h3><Link to="">45 Minimal Workspace Rooms for Web Savvys</Link></h3>
              <span className="posted_on">Nov. 15th</span>
              <span className="comment"><Link to>21<i className="icon-speech-bubble" /></Link></span>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              <Link to="#" className="btn btn-primary">Read More</Link>
            </div> 
          </div>
        </div>
        <div className="col-lg-4 col-md-4">
          <div className="fh5co-blog animate-box">
            <Link to="#"><img className="img-responsive" src="../../assets/images/ints101.jpeg" alt="img" /></Link>
            <div className="blog-text">
              <h3><Link to="">45 Minimal Workspace Rooms for Web Savvys</Link></h3>
              <span className="posted_on">Nov. 15th</span>
              <span className="comment"><Link to>21<i className="icon-speech-bubble" /></Link></span>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              <Link to="#" className="btn btn-primary">Read More</Link>
            </div> 
          </div>
        </div>
        <div className="col-lg-4 col-md-4">
          <div className="fh5co-blog animate-box">
            <Link to="#"><img className="img-responsive" src="../../assets/images/stats165.jpeg" alt="img" /></Link>
            <div className="blog-text">
              <h3><Link to="">45 Minimal Worksspace Rooms for Web Savvys</Link></h3>
              <span className="posted_on">Nov. 15th</span>
              <span className="comment"><Link to>21<i className="icon-speech-bubble" /></Link></span>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              <Link to="#" className="btn btn-primary">Read More</Link>
            </div> 
          </div>
        </div>
        <div className="col-lg-4 col-md-4">
          <div className="fh5co-blog animate-box">
            <Link to="#"><img className="img-responsive" src="../../assets/images/solg101.jpeg" alt="img" /></Link>
            <div className="blog-text">
              <h3><Link to="">45 Minimal Workspace Rooms for Web Savvys</Link></h3>
              <span className="posted_on">Nov. 15th</span>
              <span className="comment"><Link to>21<i className="icon-speech-bubble" /></Link></span>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              <Link to="#" className="btn btn-primary">Read More</Link>
            </div> 
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
   )
}
export default Courses