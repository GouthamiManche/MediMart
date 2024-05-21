// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.postalpincode.in', // Base URL for the pin code API
});

export default instance;
