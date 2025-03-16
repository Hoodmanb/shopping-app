import axios from 'axios';

/**
 * Reusable Axios Client
 * @param {string} url - The request URL
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param {object} [data={}] - Request payload (for POST, PUT)
 * @param {string} [token=null] - Optional authorization token
 * @returns {Promise<object>} - Response data or error
 */
const axiosClient = async (url, method = 'GET', data = {}, token = null) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await axios({
      url,
      method,
      data: ['POST', 'PUT', 'PATCH', 'GET', 'DELETE'].includes(method.toUpperCase()) ? data : null,
      headers,
    });

    return response.data; // Return only the data
  } catch (error) {
    console.error('Axios Request Error:', error?.response?.data || error.message);
    throw error?.response?.data || error.message; // Throw error for handling
  }
};

export default axiosClient;
