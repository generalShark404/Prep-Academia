"use strict";
import { useEffect, useState } from "react";
import axios from "axios";
import { compose } from "redux";
import {jwtDecode} from 'jwt-decode';
import dayjs from 'dayjs';

const baseUrl = process.env.REACT_APP_API_URL

const token = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : "";
const refresh_token = localStorage.getItem('refresh') ? JSON.parse(localStorage.getItem('refresh')) : "";

const axiosInstance = axios.create({
	baseURL:baseUrl,
	'Content-type':'application/json',
	headers:{
		'Authorization':localStorage.getItem('access') ? `Bearer ${token}` : null
	}
})

axiosInstance.interceptors.request.use(async req => {
   if(token){
	req.headers.Authorization = `Bearer ${token}`;
	const user = jwtDecode(token);
	const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
	
	if(!isExpired){
		return req;
	}else{
		try {

			const res = await axios.post(`${baseUrl}/auth/v1/token/refresh/`, {'refresh':refresh_token});
			console.log("Axios inter res",res)
			if(res.status == 200){
				localStorage.setItem('access', JSON.stringify(res.data.access))
				req.headers.Authorization = `Bearer ${res.data.access}`
				return req
			}else{
				const res = await axios.post(`${baseUrl}/auth/v1/user/logout/`, {'refresh_token':refresh_token})
				if(res.status == 200){
					localStorage.removeItem('access');	
					localStorage.removeItem('refresh');	
					localStorage.removeItem('student');	
					localStorage.removeItem('instructor');	
					localStorage.removeItem('user');	
					window.location.href = '/login';
				}
			}
	
		} catch (error) {
			if(error.response.status == 401){
				if(error.response.data.detail == 'Token is invalid or expired'){
					localStorage.removeItem('access');	
					localStorage.removeItem('refresh');	
					localStorage.removeItem('student');	
					localStorage.removeItem('instructor');
					localStorage.removeItem('user');
					window.location.href = '/login';
				}
			}
			
		}
	};
   }
})

export  default axiosInstance;