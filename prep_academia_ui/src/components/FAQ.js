import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import {useState,useEffect} from 'react'

const baseUrl = 'http://127.0.0.1:8000/api'

function FAQ(){
  const [faqData, setFaqData] = useState([]);

  useEffect(()=>{
    try {
      axios.get(baseUrl + `/faq/`)
      .then((res)=>{
        setFaqData(res.data);
      })
    } catch (error) {
      console.log(error);
    }
  },[]);

    
  console.log(faqData)

    return(
  <div>
     <header id="fh5co-header" className="fh5co-cover fh5co-cover-sm" role="banner" style={{backgroundImage: 'url(../../assets/images/img_bg_2.jpg)'}} data-stellar-background-ratio="0.5">
     <div className="overlay" />
     <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2 text-center">
          <div className="display-t">
            <div className="display-tc animate-box" data-animate-effect="fadeIn">
                <h1>FAQs</h1>
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
        <h3 className="m-5 section-title bg-white text-center text-primary px-3">Frequently asked questions</h3>
      </div>
    <div className='accordion' id='accordionExample'>
      {faqData && faqData.map((data, index)=>
      <div className='accordion-item mt-4'>
        <h2 className='accordion-header' id='headingOne'>
          <button className='accordion-button'  type='button' data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls='collapseOne'>
            <p className='h4'>{data.question}</p>
          </button>
        </h2>
        
        {index ==0 &&
        <div id='collapseOne'
        className='accordion-collapse collapse show' aria-labelledby='headingOne'  data-bs-parent="#accordionExample">
            <div className='accordion-body'>
                <strong>{data.answer}</strong>
            </div>
        </div>
        }

        {index > 0 &&
        <div id='collapseOne'
        className='accordion-collapse collapse' aria-labelledby='headingOne'  data-bs-parent="#accordionExample">
            <div className='accordion-body'>
                <strong>{data.answer}</strong>
            </div>
        </div>
        } 
      </div>
      )}
       {/*  */}
    </div>
    </div>
  </div>
  {/* pagination start */}
  <div className='m-1 row justify-content-center float-center'>
    <nav aria-label='justify-content-center Page navigation example' className='d-flex justify-content-center'>
        <ul className='d-flex pagination m-5   justify-content-center col-6 m-5'>
            <li className='page-item'><Link className='page-link' to={''}>Previous</Link></li>
            <li className='page-item'><Link className='page-link' to={''}>Next</Link></li>
        </ul>
    </nav>
      </div>
  {/* pagination end */}
  {/* Courses End */} 
        </div>
    )
}
export default FAQ;