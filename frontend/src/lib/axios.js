import axios from "axios";
const api = axios.create({
    baseURL: 'https://lost-and-found-backend-zf98.onrender.com/'
})
export default api
