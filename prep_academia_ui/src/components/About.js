import { useEffect } from "react";
import { Link } from "react-router-dom";


function About() {
  useEffect(() => {
    document.title = `About Us`
  }, []);
  
  return (
    <div>
      
      <div className="container-xxl mt-50 z-Index-2  mb-50 ">
        <h1 className="fw-bold text-center mt-5g-dark text-liht -5 rounded-4">
            <span className="bi bi-info-circle me-3"></span>
            About Us
        </h1>

        {/* About Start */}
        <div className="container-xxl py-5 mt-5">
          <div className="container">
            <div className="row g-5">
              <div
                className="col-lg-6 wow fadeInUp"
                data-wow-delay="0.1s"
                style={{ minHeight: 400 }}
              >
                <div className="position-relative h-100">
                  <img
                    className="img-fluid position-absolute w-100 h-100 shaow-lg "
                    src="../../assets/images/welcome3.png "
                    alt
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
              <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                <h1 className="mb-0 fw-bold">Welcome to Prep Academia</h1>
                <i>Your Pathway to Excellence in Learning !</i>
                <p className="mb-4"></p>
                <p className="mb-4 text-dark fs-3">
                We are a Learner Management System  designed to demystify complex subjects by breaking them down into fundamental principles. Our mission is to make learning accessible and engaging for individuals from all walks of life, regardless of their prior knowledge or expertise. By simplifying complex concepts and building a strong foundation, we empower learners to progress to more advanced topics with confidence and ease.<br/>
                Our platform is built on the principles of clarity, simplicity, and progression, ensuring that learners can absorb and retain information effectively.
                </p>
              </div>

              {/* <div></div> */}

              <div>
                <p className="text-center mb-5 fs-3">
                    <span className="bi bi-people me-2 "></span>
                    Together, let us kindle the flame of understanding, illuminating the world, one mind at a time.
                </p>
                <div className="d-lg-flex justify-content-center">
                    
                    <div className="col-lg-5 bg-success text-light wow text-center fadeInUp  rounded-3 p-4 me-3 mb-3" data-wow-delay="0.3s">
                        <h2 className="mb-0 fw-bold">
                           <span className="bi bi-bullseye me-2 "></span>
                            Our Goal
                        </h2>
                        <p className="mb-4"></p>
                        <p className="mb-4 ">
                        Our goal is to help learners develop a deep understanding of complex subjects, not just memorize facts and figures. By focusing on fundamental principles and building a strong foundation, we enable learners to apply their knowledge in practical ways, solving real-world problems and making a meaningful impact.
                        </p>
                    </div>
                    
                    <div className="col-lg-5 wow bg-danger text-light text-center fadeInUp border  p-4 me-3 mb-3" data-wow-delay="0.3s">
                        <h2 className="mb-0 fw-bold">
                            <span className="bi bi-info-circle-fill me-2"></span>
                            Our Mission
                        </h2>
                        <p className="mb-4"></p>
                        <p className="mb-4 ">
                        Our goal is to help learners develop a deep understanding of complex subjects, not just memorize facts and figures. By focusing on fundamental principles and building a strong foundation, we enable learners to apply their knowledge in practical ways, solving real-world problems and making a meaningful impact.
                        </p>
                    </div>
                    
                </div>
                    <div className="justify-content-center d-flex">
                        <div className="col-lg-6 bg-primary text-light wow text-center fadeInUp rounded-3 p-4 me-3 mb-3" data-wow-delay="0.3s">
                            <h2 className="mb-0 fw-bold">
                                <span className="bi bi-eye me-2"></span>
                                Our Vission
                            </h2>
                            <p className="mb-4"></p>
                            <p className="mb-4 ">
                            Our goal is to help learners develop a deep understanding of complex subjects, not just memorize facts and figures. By focusing on fundamental principles and building a strong foundation, we enable learners to apply their knowledge in practical ways, solving real-world problems and making a meaningful impact.
                            </p>
                        </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
        {/* About End */}
        <div className="row mt-lg-5">
          <div className="col-12">
            <div className="col-lg-2 col-xs-0"></div>
            {/* --------------------------- */}
            {/* --------------------------- */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;
