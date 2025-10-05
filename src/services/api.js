import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:9000',
    withCredentials: false
});

 api.interceptors.response.use(function (response) {
     return response;
   }, function (error) {
    if (error.response && error.response.status === 401) {
         //Swal.fire('Entre na sua conta novamente');
        //console.log('O status 401 foi encontrado, você foi redirecionado para a página de login');
         window.location.href = '/auth/sign-in';
     }
     return Promise.reject(error);
});