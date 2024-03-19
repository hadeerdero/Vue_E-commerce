import axios from 'axios';
const api = axios.create({
    baseURL: 'http://thor8.com:8000', // Your API base URL
   
      headers: {
        'Content-Type': 'application/json',
        "access-control-allow-origin": "*",
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': "GET, PUT, POST, DELETE, HEAD",
      }, // Allow requests from any origin
      // Add other required headers if necessary
    
  });
  export {api};