import axios from "axios";
import { StoreContext } from "../store";

const API_URL = 'http://localhost:3000';

const instance = axios.create({
    baseURL: API_URL,
    validateStatus: function (status) {
      return status < 500;
    },
});

const requiringEndPoints  = [
    'login',
  ]

instance.interceptors.request.use(async function (config) {  
    const {currentUser} = StoreContext();
    if(requiringEndPoints.some(endpoint => !config.url.includes(endpoint))) {
        config.headers['X-Auth-Token'] = currentUser.authToken;
        config.headers['X-User-Id'] = currentUser.userId;
    }
    return config;
  }, function (error) {
    return Promise.reject(error)
  })


instance.interceptors.response.use(function (response) {
    if(response.status < 500) {
        return response.data;
    }else {
        return Promise.reject('Request failed with status code is ' + response.status)
    }
    }, function (error) {
return Promise.reject(error)
});

export default instance;