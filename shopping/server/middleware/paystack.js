import user from '../model/user.js'


const isPaystackCustomer = async (req, res, next) => {

  const { email, userId } = req
  try {
    const addUser = await user.addUser(userId, email)
    if (addUser.message && addUser.message === 'successful') {
      req.customerId = addUser.newUser.paystackCustomerId
      next()
    } else {
      res.status(500).json({ message: 'error', info: 'unable to set paystack customer' })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export default isPaystackCustomer