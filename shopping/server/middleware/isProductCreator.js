import mongoClient from '../config/mongodb.js';
import product from '../model/products.js';

const productHandler = product;

// Ensure MongoDB client connects before processing requests
await mongoClient.connect();

const productCreator = async (req, res, next) => {
  // goes to the next route if the logged in user is trying to access thier own product, returns a 401 if not
  const userId = req.userId
  const id = req.body.id
  try {
    const isProductCreator = await productHandler.isCreator(id, userId);
    if (isProductCreator) {
      return next();
    } 
    return res.status(401).json({ message: "You don't have permission for this action" });
  } catch (error) {
    console.error('Error in productCreator middleware:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default productCreator;