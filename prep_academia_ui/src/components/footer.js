import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { getLocalStorage } from './utilities';
import { options_func } from './utilities';

const baseUrl = "http://127.0.0.1:8000/api";

function Footer(){
  const [footerData,setFooterData] = useState([]); 
  const student = getLocalStorage('student');
  const [instructorLoginStatus, setInstructorLoginStatus]= useState(localStorage.getItem('instructor'));

  useEffect(()=>{ 
    const status = localStorage.getItem('instructor');

   try {
      axios.get(`${baseUrl}/page`)
      .then((res)=>{
        setFooterData(res.data);
      });
    } catch (error) {
      console.log(error);
    };

    setInstructorLoginStatus(localStorage.getItem('instructor'));
  }, [instructorLoginStatus]);

    return(
    <div >
    <footer id="fh5co-footer" role="contentinfo" 
    style={{background: instructorLoginStatus ? 'rgb(9, 20, 20)' : '#212529'}} 
    > 
    <div className="container">
      <div className="row row-pb-md justify-content-center p-4">
      <div className="col-md-3 fh5co-widget bg-light footerItems m-2 my-4 p-3">
          <h4 className='fw-bold'>Contact Us</h4>
          <p>Have questions or feedback? Feel free to reach out to our dedicated support team via email or our contact form.We're here to assist you.</p>
        </div>
        <div className="col-md-3 fh5co-widget bg-light footerItems m-2 my-4 p-3">
          <h4 className='fw-bold'>Frequently asked Questions (FAQs)</h4>
          <p>Explore our FAQ section to find answers to comon questions about our programs and services and more. If you can't find what you're looking for, don't hesitate to contact us.</p>
        </div>
        <div className="col-md-3 fh5co-widget bg-light footerItems m-2 my-4 p-3">
          <h4 className='fw-bold'>About Us</h4>
          <p>We are dedicated and committed to empowering learners of all stages to achieve understanding of what they are learning.Our mission is to provide high-quality educational resources, content that inspire innovation, foster creativity and support lifelong learning.</p>
        </div>       
        <br/>
        <hr className=''/>
        <div className="">
          <ul className="fh5co-footer-links text-center row justify-content-center">
            <Link to="/" className='text-light col-lg-2 col-2 mx-2'>Home</Link>
            <Link to="/contact-us" className='col-lg-2 col-3 text-light'>Contact
              </Link>
            {footerData && footerData.map((pageData, index) =>
                <Link className='col-3 text-light ' to={`/page/${pageData.id}${pageData.url}`}>
                  {pageData.title}
                </Link>
            )}

            
            <Link to='/faqs' className='col-2 text-light' >
              FAQs
            </Link>
            <p>Want to be an instructor ? <Link to={'/instructor/register'}>click</Link></p>
          </ul>
        </div>
      </div>
      <div className="row copyright">
        <div className="col-md-12 text-center">
          <p>
            <small className="block">© 2023 Prep Academia.
            </small>
          </p>
          <p>
          </p><ul className="fh5co-social-icons">
            <li><Link to="#"><i className="icon-twitter" /></Link></li>
            <li><Link to="#"><i className="icon-facebook" /></Link></li>
            <li><Link to="#"><i className="icon-linkedin" /></Link></li>
            <li><Link to="#"><i className="icon-dribbble" /></Link></li>
          </ul>
          <p />
        </div>
      </div>
    </div>
  </footer>
  <div className="gototop js-top">
    <Link to="#" className="js-gotop"><i className="icon-arrow-up" /></Link>
  </div>
  </div>
    )
}
export default Footer