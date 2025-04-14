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
    // Determine the base URL based on environment
    const isProduction = process.env.NODE_ENV === 'production';

    // Use environment variables if available, otherwise fallback to hardcoded values
    const baseURL = isProduction
      ? process.env.NEXT_PUBLIC_API_URL || 'https://apihawk-mart.vercel.app'
      : process.env.NEXT_PUBLIC_API_URL || 'https://musical-spoon-pxq9qwv9gv5f699j-3000.app.github.dev';

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await axios({
      baseURL,
      url,
      method,
      data: ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) ? data : undefined,
      headers,
    });

    return response.data;
  } catch (error) {
    console.error('Axios Request Error:', error?.response?.data || error.message);
    throw error?.response?.data || error.message;
  }
};

export default axiosClient;