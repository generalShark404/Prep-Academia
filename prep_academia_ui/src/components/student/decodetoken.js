import { jwtDecode } from 'jwt-decode';
// console.log(rawToken);

// console.log(token.token);
export default function decodedToken(){
    try {
        const raw_token = localStorage.getItem('access_token');;        
        let token = jwtDecode(raw_token);
        return token;
    } catch (error) {
        console.log(error)
    }
};
