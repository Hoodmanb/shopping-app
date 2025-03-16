// paystack actions require a user to be looged in
import paystack from '../services/payStack.js'
import crypto from 'crypto'
import { webhookEvent } from './utils.js'

import user from '../model/user.js'

const userHandler = user

const secret = process.env.SECRET_KEY || 'sk_test_c78431620094f6a005a49fc19aa596f563f5d70a';

export const initializeTransaction = async (req, res) => {
  // a function to initialize a transactio, require the data below to be passed in the request body
  const { email, amount, productsInfo } = req.body
  try {
    // return the response body returned by paystack
    const response = await paystack.initializeTransaction(email, amount, productsInfo)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const verifyTransaction = async (req, res) => {
  // verifies a transaction that matches the reference passed to the request body
  const reference = req.body.reference
  try {
    // return the responce object sent by paystack
    const response = await paystack.verifyTransaction(reference)
    res.status(response.code).json(response)
  } catch (error) {
    res.status(error.code).json(error)
  }
}

export const paystackWebhook = async (req, res) => {
  // web hook for paystack events triggers
  const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
  if (hash == req.headers['x-paystack-signature']) {
    // Retrieve the request's body
    const event = req.body;
    // Do something with event
    webhookEvent(event.event)
  }
  res.send(200);
}