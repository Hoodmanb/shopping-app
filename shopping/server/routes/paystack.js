import express from 'express'
const paystackRouter = express.Router();

import {initializeTransaction, verifyTransaction, paystackWebhook} from '../controller/paysyack.js'

paystackRouter.post('/api/paystack/initialize', initializeTransaction)

paystackRouter.post('/api/paystack/verify', verifyTransaction)

paystackRouter.post('/api/paystack/webhook', paystackWebhook)

export default paystackRouter
