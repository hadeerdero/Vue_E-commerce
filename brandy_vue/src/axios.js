// src/axios.js

import axios from 'axios';

// Create an Axios instance
// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8000', // Replace with your API base URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add a request interceptor to include the token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); // Retrieve token from localStorage or any other storage
//     if (token) {
//       config.headers['Authorization'] = `Token ${token}`;
//     }
//     console.log(config)
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
