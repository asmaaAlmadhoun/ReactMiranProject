import axios from "axios";
import  {toast} from 'react-toasts';
axios.defaults.baseURL = "http://miranapp.com/api";  //base url.

try{
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
    axios.defaults.headers.common['Device'] = "device";
}
catch{
}



axios.interceptors.response.use((response) => {
    // TODO : Log response.
}, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
        toast.error("Error has been happened!" , error);
    }
    return Promise.reject(error);
})

// bind the following process into each request to the server.
axios.interceptors.request.use(request => {
    request.headers.Authorization = 'Bearer ' + localStorage.getItem("token");
    request.headers.Xcode = 'MIRAN APP';
    request.headers.Version = '0.0.1';
    return request;
})

const HTTP_REQUEST = {
    get:axios.get,
    post:axios.post,
    put:axios.put,
    delete:axios.delete
};
export default HTTP_REQUEST;