import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";



const checkAuthentication = () => {
    return axios
    .get(`${process.env.REACT_APP_API_URL}/is-authenticated`)
    .then((res) =>{
        return res.data;
    }).catch((error) => {
        return false;
    })
};

export const displayDate = (date) => {
    const dateObj = dayjs(date);
    const formattedDate = dateObj.format('D MMMM YYYY, h:mm:ss A');
    return formattedDate;
};

export const showPassword = (id) => {
    const new_password = document.getElementById(`${id}`);
    const visible_icon = document.getElementById(`visibleIcon-${id}`);
     new_password.type == 'password'
     ?  new_password.type = 'text'
     : new_password.type = 'password';

     const icon = visible_icon.classList[1];

     
     if(icon == 'bi-eye-fill'){
         visible_icon.classList.remove('bi-eye-fill');
         visible_icon.classList.add('bi-eye-slash-fill');
     }else{
        visible_icon.classList.remove('bi-eye-slash-fill');
        visible_icon.classList.add('bi-eye-fill');
     };
};

export const timeOutErrorFunc = (func,errorCont, item) => {
    setTimeout(
     func(errorCont, item)
    , 3000);
}; 

export const displayError = (error, error_msg) => {
    error.classList.remove(error_msg);
};

export const hideError = (error, error_msg) => {
    error.classList.add(error_msg);
};

export const setLocalStorage = (item_name, item_value) =>{
    localStorage.setItem(`${item_name}`, item_value);
};
export const getLocalStorage = (item_name) => {
    return localStorage.getItem(`${item_name}`);
};

export const removeLocalStorage = (item_name) => {
    return localStorage.removeItem(`${item_name}`);
};

export const useRedirect = (path) => {

    const navigate = useNavigate();
    const redirectTo = (url) => {
        navigate(url);
    }
    return redirectTo;
};

// noIdLogoutUser (user/instructor id,user is authenticated, redirect function)
export const noIdLogoutUser = (id, is_authenticated, redirect) => {
    if(is_authenticated == 'True' && id == null || id == undefined){
        redirect('/logout');
        console.log("authenticated == True")
    }else{
        if(id == undefined || id == null){
            redirect('/login');
            console.log("null || undefined == True")
        }
    }
};

export const options_func = (condition, option1, option2) => {
    
    let conditions = condition ? option1 : option2;
    console.log("cosnditions", conditions)
    return conditions
};

export const CsrfToken = () => {
	const [csrftoken, setCsrfToken] = useState('');
	
    useEffect(() => {
	   const fecthCsrfToken = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/csrftoken`);
            setCsrfToken(response.data);
        } catch (error) {
            console.log('Error:', error);
        }
       };

       fecthCsrfToken();

       return (
        <div>
            {csrftoken}
        </div>
       );
	}, []);	
};

export const ratingStars = (rating) => {
    const stars = [];
    if(rating){
        for(let i =0; i < 5; i++){
           stars.push( 
                <span key={i} className={`bi bi-star${i < rating ? '-fill':''} ${i >= rating ? 'text-warning':''}`} style={{padding:'1px'}}>
                </span>
           );
        };
        return stars;
    };
};

export const DifficultyChoices = (props) => {
    switch(props.choices){
      case 'B':
        return <span className="text-white difficulty rounded p-2" style={{background:'rgb(0, 157, 255)'}}>
          Beginner
        </span>;
      case 'I':
        return <span className="text-white difficulty rounded p-2" style={{background:'orange'}}>
          Intermediate
        </span>;
      case 'A':
        return <span className="text-white difficulty rounded p-2" style={{background:'rgb(242, 80, 80)'}}>
          Advanced
        </span>;
      default:
        return 'null';
    }
  };

export default checkAuthentication;