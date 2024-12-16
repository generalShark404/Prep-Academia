import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import axios from "axios";
import Cookies from "js-cookie";
import { removeLocalStorage } from "../utilities";

export default function Logout(){
    const navigate = useNavigate();
    useEffect(()=>{
        axiosInstance.post(`${process.env.REACT_APP_API_URL}/user-logout`,
        {}).then((res)=>{
            if(res.status == 200 || res.status == 201){
                Cookies.remove('csrftoken');
                removeLocalStorage('user');
                removeLocalStorage('instructor');
                window.location.href = "/login";
            }
        }).catch((error)=>{
            console.log(error)
        });
    })
}

// function StudentLogout(){
//     localStorage.removeItem('studentLoginStatus');
//     localStorage.removeItem('studentId');
//     window.location.href = '/student-login';
// }
// export default StudentLogout
