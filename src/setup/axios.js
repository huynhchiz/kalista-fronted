import axios from 'axios';
import { dispatchRefreshToken } from '../dispatchs/dispatchAccount';
// import { dispatchGetUserAvt, dispatchRefreshToken } from '../dispatchFunctions/dispatchFunctions';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3333';

const instance = axios.create({
   baseURL: BACKEND_URL,
});

// Alter defaults after instance has been created
// gán thêm 1 header là Authorization có giá trị là 'Bearer 'jwt'' vào request Header
// instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;

// Add a request interceptor
instance.interceptors.request.use(
   function (config) {
      // Do something before request is sent
      return config;
   },
   function (error) {
      // Do something with request error
      return error.request.data;
   },
);

// Add a response interceptor
instance.interceptors.response.use(
   function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response.data;
   },
   function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      // get status error from server
      const status = (error && error.response && error.response.status) || 500;

      switch (status) {
         // authentication (token related issues)
         case 401: {
            console.log('Unauthorizaed user...');
            console.log('401 err: ', error.response.data);
            return error.response.data;
         }

         // forbidden (permission related issues)
         case 403: {
            console.log(`You don't have permission to access...`);

            // token expired => refresh token user
            if (+error.response.data.EC === -100) {
               // dispatchRefreshToken()
               dispatchRefreshToken()
               return error.response.data;
            }

            // refresh token expired => logout
            if (+error.response.data.EC === -101) {
               // logout user
               console.log('expired refToken!');
               return error.response.data;
            }

            return error.response.data;
         }

         // bad request
         case 400: {
            console.log('400 err: ', error.response.data);
            return error.response.data;
         }

         // not found
         case 404: {
            console.log('404 err: ', error.response.data);
            return error.response.data;
         }

         // conflict
         case 409: {
            console.log('409 err: ', error.response.data);
            return error.response.data;
         }

         // unprocessable
         case 422: {
            console.log('422 err: ', error.response.data);
            return error.response.data;
         }

         // generic api error (server related) unexpected
         default: {
            return error;
         }
      }
   },
);

// allow set jwt on cookie (react axios)
instance.defaults.withCredentials = true;

export default instance;
