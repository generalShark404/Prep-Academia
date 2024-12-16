
function Loader() {
  return (
    <div>
      <div id="fh5co-contact ">
        <div className="container">
          <div className="row mt-50">
            <h2 className="text-center fw-bold mb-5"></h2>
            <div className="-push-1 animate-box">
              <div className="fh5co-contact-info">
                <h3 className="fw-bold ">
                   <div className="d-flex justify-content-center" style={{height:'100vh'}}>

                    <img
                        className="img-fluid position-absolute w-100 h-100"
                        src="../../assets/images/loader1.gif"
                        alt
                        style={{ objectFit: "cover" }}
                        />
                   </div>

                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
