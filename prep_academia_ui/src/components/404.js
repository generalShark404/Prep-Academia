function NotFound(){
    return(
        <div>
    <header id="fh5co-header" className="fh5co-cover fh5co-cover-sm" role="banner" style={{backgroundImage: 'url(../../assets/images/img_bg_2.jpg)'}} data-stellar-background-ratio="0.5">
    <div className="overlay" />
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2 text-center">
          <div className="display-t">
            <div className="display-tc animate-box" data-animate-effect="fadeIn">
              <h1 className="">
                <span className="bi bi-emoji-frown me-3"></span>
                Ooops Page Not Found!
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
        </div>
    )
}

export default NotFound;