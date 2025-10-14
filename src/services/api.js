import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



export const api = axios.create({
    baseURL: 'http://localhost:9000',
    withCredentials: false
});

api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    
    if (error.response && error.response.status === 401) {
        Swal.fire({ text: 'Sessão expirada', icon: 'info', position: 'center', iconColor: '#1f57cf' }).then((result) => {
            if (result.isConfirmed || result.isDenied || result.isDismissed) {
              window.location.href = '/auth/sign-in';
            };
        })
    }
    return Promise.reject(error);
});