import {useState, useEffect}  from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useParams, useNavigate} from 'react-router-dom';

const baseUrl = "http://127.0.0.1:8000/api";

function VerifyTeacher(){
   const navigate=useNavigate()
    const [verificationData, setVerificationData]=useState({
        otp_digit:""
    });
    const {teacher_id} = useParams();

    const handleChange=(event)=>{
        setVerificationData({
            ...verificationData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const _formData = new FormData();
        _formData.append('otp_digit', verificationData.otp_digit)
        try {
            axios.post(`${baseUrl}/verify-teacher/${teacher_id}`, _formData)
            .then((res)=>{
              if(res.data.bool){
                Swal.fire({
                    icon:"success",
                    title:"Success",
                    text:"Verified Successfully !!"
                });
                localStorage.setItem("teacherLoginStatus", true);
                localStorage.setItem("teacherId", res.data.teacher_id);
                window.location.href='/teacher-dashboard';
              }
            });
        } catch (error) {
            console.log(error)
        }
    }

  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
  console.log(teacherLoginStatus)
  if(teacherLoginStatus === 'true'){
    navigate('/teacher-dashboard');
  }


    useEffect(()=>{
        document.title = "Verify Teacher";
    });
    return(
        <div>
    <header id="fh5co-header" className="fh5co-cover my-5 fh5co-cover-sm" role="banner" style={{backgroundImage: 'url(../../assets/images/img_bg_2.jpg)'}} data-stellar-background-ratio="0.5">
    <div className="overlay" />
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2 text-center">
          <div className="display-t">
            <div className="display-tc animate-box" data-animate-effect="fadeIn">
              <h1 className="">Verify Teacher</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div className="col-md-6 animate-box my-5">
          {/* <h3>Get In Touch</h3> */}
            <div className="card ">
              <div className='card-header fw-bold'>
                Enter 6 digit Otp
              </div>
              {/* First Name */}
              <div className="col-md-6 my-3"> 
                <input type="text" name='otp_digit' id="fname" className="form-control" placeholder="Your firstname" onChange={handleChange} />
              </div>
              <div>
                <button className='btn-sm  btn-primary m-4' onClick={submitForm}>Verify</button>
              </div>

          </div>          
        </div>
        </div>
    )
}

export default VerifyTeacher;