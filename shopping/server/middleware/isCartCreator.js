import cart from '../model/cart.js';

const CartHandler = cart;

// Ensure MongoDB client connects before processing requests

const cartCreator = async (req, res, next) => {
  // goes to the next route if the logged in user is trying to access thier own cart, returns a 401 if not
  const userId = req.userId
  const id = req.body.id
  try {
    // Assuming the user ID or relevant data is passed in the request
    const isCartCreator = await CartHandler.isCreator(id, userId);

    if (isCartCreator) {
      return next();
    }

    return res.status(401).json({ message: "You don't have permission for this action" });
  } catch (error) {
    console.error('Error in cart Creator middleware:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default cartCreator;