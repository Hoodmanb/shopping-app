import {
  initialiseRequest, optionFunction, createCustomerFunction
} from "./utils.js"
import https from 'https'

import subscriptionService from '../model/subscribe.js'


import user from '../model/user.js'

const subscribeHandler = subscriptionService;
// const userHandler = user
// const referenceHandler = reference

class Paystack {
  constructor() { }

  createCustomer = async (userId, email) => {
    const options = optionFunction('/customer', 'POST')
    const params = JSON.stringify({
      "email": email,
      "metadata": {
        "userId": userId
      }
    })

    try {
      const response = await createCustomerFunction(options, params);
      if (response.status === true) {
        const customerId = response.customer_code
        await user.addUser(userId, customerId)
        return {
          code: 200,
          info: 'user created successfully',
          message: 'successful',
          data: response
        };
      } else {
        return {
          code: 200,
          data: response
        }
      }
    } catch (error) {
      console.error('Error:', error);
      return {
        code: 500,
        info: error,
        message: 'error'
      };
    }
  }

  initializeTransaction = async (email, amount, productsInfo) => {
    const options = optionFunction('/transaction/initialize', 'POST');

    try {
      const paystackCustomer = req.customerId || await user.getUser(userId)

      // Prepare the payload for the Paystack request
      const params = JSON.stringify({
        "email": email,
        "amount": amount,
        "callback_url": "https://example.com",
        "customer": paystackCustomer,
        "metadata": {
          "products": productsInfo,
          "cancel_action": "https://your-cancel-url.com"
        }
      });

      const response = await initialiseRequest(options, params);
      const ref = {
        reference: response.data.reference
      };
      const url = response.data.authorization_url;
      console.log(ref);
      console.log(url);
      console.log(response);

      return {
        code: 200,
        info: 'Transaction initialization successful',
        message: 'successful',
        url: url,
        data: response
      };
    } catch (error) {
      console.error('Error:', error);
      return {
        code: 500,
        info: error,
        message: 'error'
      };
    }
  }

  verifyTransaction = async (reference) => {
    const options = optionFunction(`/transaction/verify/${reference}`, 'GET');

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            if (response.data) {
              // Handle successful verification
              console.log(response.data);
              resolve({
                code: 200,
                info: 'Transaction verification successful',
                message: 'successful',
                data: response.data
              });
            } else {
              // Handle failed verification
              resolve({
                code: 400,
                info: 'Transaction verification request failed',
                message: 'error'
              });
            }
          } catch (err) {
            console.error('Parsing error:', err);
            reject({
              code: 500,
              info: 'Transaction verification request failed',
              message: 'error'
            });
          }
        });
      });

      req.on('error', (error) => {
        console.error('Request error:', error);
        reject({
          code: 500,
          info: 'Transaction verification request failed',
          message: 'error'
        });
      });

      req.end();
    });
  }
}

const paystack = new Paystack();
export default paystack;