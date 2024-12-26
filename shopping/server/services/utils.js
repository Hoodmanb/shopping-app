import https from 'https';

const SECRET_KEY = process.env.SECRET_KEY || 'sk_test_c78431620094f6a005a49fc19aa596f563f5d70a'

// Example for initialiseRequest function in utils.js
export const initialiseRequest = (options, params) => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(`Parsing error: ${error}`);
        }
      });
    });

    req.on('error', (error) => {
      reject(`Request error: ${error}`);
    });

    req.write(params);
    req.end();
  });
};

// Example for creating a customer function in utils.js
export const createCustomerFunction = (options, params) => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(`Parsing error: ${error}`);
        }
      });
    });

    req.on('error', (error) => {
      reject(`Request error: ${error}`);
    });

    req.write(params);
    req.end();
  });
};

export const optionFunction = (path, method) => {
  return {
    hostname: 'api.paystack.co',
    port: 443,
    path: path,
    method: method,
    headers: {
      Authorization: `Bearer ${SECRET_KEY}`,
      'Content-Type': 'application/json'
    }
  };
}