import axios from 'axios';
const authBase = axios.create({
    baseUrl: process.env.REACT_APP_URL_BASE_API 
})

//configurar interceptores



export default authBase;