import axios from "axios";

const api = axios.create({
    // baseURL: 'http://172.16.0.7:3333' //pc fag
    // baseURL: 'http://192.168.1.120:3333' //pc casa
    baseURL: 'http://10.0.1.137:3333' //pc binar
})

export default api;