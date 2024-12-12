import mongoClient from '../config/mongodb.js'
import user from '../model/user.js'

await mongoClient.connect()

const isPaystackCustomer = (req, res, next) => {
  // 
  const {email, userId} = req
  try{
    const addUser = await user.addUser(userId, email)
    if(addUser.message && addUser.message === 'successful'){
      req.customerId = addUser.newUser.paystackCustomerId
      next()
    } else{
      res.status(500).json(message:'error', info:'unable to set paystack customer')
    }
  }catch(error){
    res.status(500).json(error)
  }
}

default export isPaystackCustomer