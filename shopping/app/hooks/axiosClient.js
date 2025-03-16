import axios from 'axios';

/**
 * Reusable Axios Client
 * @param {string} url - The request URL
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param {object} [data={}] - Request payload (for POST, PUT, PATCH)
 * @param {string} [token=null] - Optional authorization token
 * @returns {Promise<object>} - Response data or error
 */
const axiosClient = async (url, method = 'GET', data = {}, token = null) => {
  try {
    const environment = process.env.NODE_ENV;
    let baseURL = '';

    if (environment === 'production') {
      baseURL = 'https://shopping-app-0ig3.onrender.com';
    }

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await axios({
      baseURL, // Use baseURL instead of baseUrl
      url, // Separate url key instead of combining it with baseURL
      method,
      data: ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) ? data : undefined, // Only include data when necessary
      headers,
    });

    return response.data; // Return only the data
  } catch (error) {
    console.error('Axios Request Error:', error?.response?.data || error.message);
    throw error?.response?.data || error.message; // Throw error for handling
  }
};

export default axiosClient;
