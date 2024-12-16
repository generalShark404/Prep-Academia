import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import axiosInstance from '../axios';

const baseUrl= "http://127.0.0.1:8000/api";

function Contact(){
  const [contactData, setContactData]=useState({
    first_name:'',
    last_name:'',
    email:'',
    message:'',
  });
  
  useEffect(()=>{
    document.title="Contact Us";
  });

  const handleChange = (event)=>{
    setContactData({
      ...contactData,
      [event.target.name]:event.target.value
    });

  }

  const formSubmit = ()=>{
    const _contactFormData = new FormData();
    _contactFormData.append('first_name', contactData.first_name)
    _contactFormData.append('last_name', contactData.last_name)
    _contactFormData.append('email', contactData.email)
    _contactFormData.append('message', contactData.message)

    const {first_name, last_name, email, message} = contactData;
    try {
      if(!first_name || !last_name || !email || !message){
        Swal.fire({
          icon:'warning',
          html:'<h3>All fields are required !</h3>'
        });
      }else{
        axios.post(`${process.env.REACT_APP_API_URL}/contact-us`,  _contactFormData)
        .then((res)=>{ 
          if(res.status==200 || res.status==201){
            Swal.fire({
              icon:'success',
              html:'<h3>Thank you for contacting us, we will get back to you</h3>',
            });
            
            setContactData({
              first_name:'',
              last_name:'',
              email:'',
              message:'',
            });
          }
        });
      };
    } catch (error) {
      console.log(error)
    }
  }

  return(
  <div>
  
  <div id="fh5co-contact ">
    <div className="container">
      <div className="row mt-50">
        <h2 className='text-center fw-bold mb-5'>Contact Us</h2>
        <div className="col-md-5 col-md-push-1 animate-box">
          <div className="fh5co-contact-info">
            <h3 className='fw-bold'>Contact Information</h3>
            <ul>
              <li className="address">Guzape Asokoro extension Abuja</li>
              <li className="phone"><Link to="tel://1234567920">+ 1235 2355 98</Link></li>
              <li className="email"><Link to="mailto:info@yoursite.com">prepacademia@gmail.com</Link></li>
            </ul>
          </div>
        </div>
        <div className="col-md-6 animate-box">
          <h3 className='fw-bold '>
              <span className='text-warning'>Get In Touch with us!</span><br/> 
              <span className='fs-3'> we would love to hear from you.</span>
          </h3>
            <div className="row form-group">
              
              {/* First Name */}
              <div className="col-md-6 my-3"> 
               <input 
                type="text" 
                name='first_name' 
                id="fname" 
                className="form-control" 
                placeholder="Your firstname" 
                onChange={handleChange} 
                value={contactData.first_name}
               />
              </div>
              
              {/* Last name */}
              <div className="col-md-6">
                {/* <label for="lname">Last Name</label> */}
                <input 
                  type="text" 
                  name='last_name' 
                  id="lname" 
                  className="form-control" 
                  placeholder="Your lastname" 
                  onChange={handleChange} 
                  value={contactData.last_name}
                />
              </div>
            </div>
            
            {/* Email address */}
            <div className="row form-group">
              <div className="col-md-12">
                {/* <label for="email">Email</label> */}
                <input 
                  type={"email"} 
                  name='email' 
                  id="email" 
                  className="form-control" 
                  placeholder="Your email address" 
                  onChange={handleChange} 
                  value={contactData.email}
                />
              </div>
            </div>

            {/* Message */}
            <div className="row form-group">
              <div className="col-md-12">
                {/* <label for="message">Message</label> */}
                <textarea 
                  name="message" 
                  id="message" 
                  cols={30} 
                  rows={10} 
                  className="form-control" 
                  placeholder="Message" 
                  defaultValue={""} 
                  onChange={handleChange} 
                  value={contactData.message}
                />
              </div>
            </div>
            <div className="form-group">
              <button type="button" defaultValue="Send Message" className="btn btn-primary" onClick={formSubmit}>Submit</button>
            </div>
        </div>
      </div>
    </div>
  </div>
 </div>

    )
}
export default Contact;