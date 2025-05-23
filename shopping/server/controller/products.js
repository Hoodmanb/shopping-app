import product from '../model/products.js'

const productHandler = product

export const getProducts = async (req, res) => {
  // access to all users
  // gets all products avaible in the db regardless of who created it
  try {
    // returns all products
    const products = await productHandler.getAllProducts()
    return res.json({ message: 'successful', products })
  } catch (err) {
    return res.json({
      message: 'Unable to get products', err
    });
  }
}

export const putProduct = async (req, res) => {
  // access to admins and vendors, modify a product with the passed id. must be created by the logged in user
  const { data, id } = req.body;
  try {
    // Update the product
    const updatedProduct = await productHandler.modifyProduct(id, { ...data });
    return res.json({ message: 'Data updated!', data });

  } catch (err) {
    console.log(err);
    return res.json({ message: 'Error updating product', err });
  }
}

export const deleteProduct = async (req, res) => {
  // access to admins and vendors, deletes a product with the passed id. must be created by the logged in user
  const id = req.body.id

  try {
    // delete product
    const deletedData = await productHandler.deleteProduct(id);
    return res.json({ message: 'Data deleted successfully' })
  } catch (err) {
    return res.json({ message: "error deleting data", err })
  }
}

export const addProduct = async (req, res) => {
  // access to admins and vendors, create a new product
  const userId = req.userId
  console.log('userId@', userId)
  const data = req.body
  data.createdBy = userId
  console.log(data)
  try {
    // create a product
    const newProduct = await productHandler.createProduct({ ...data });
    console.log(newProduct);
    return res.json({ message: 'Product created!', newProduct });
  } catch (err) {
    console.log(err);
    return res.json({ message: 'Error creating product', err });
  }
}

export const getProduct = async (req, res) => {
  // access to all users, get a product with the id passed to the request body
  const { id } = req.params;
  try {
    // returns a single product
    const product = await productHandler.getSingleProduct(id);
    // console.log(product)
    return res.json({ message: 'successful', product })
  } catch (error) {
    return res.json({ message: 'Error getting product', error })
  }
}

export const getCartItems = async (req, res) => {
  try {
    const cartItems = req.body; // Expecting an array of { id, quantity }
    console.log(cartItems.length)

    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ message: "Invalid data format, expected an array" });
    }

    // Extract all product IDs from the cartItems array
    const productIds = cartItems.map(item => item.id);

    // Fetch all matching products in one query
    const products = await productHandler.getProductsByIds(productIds);

    // Filter and add quantity to only found products
    const updatedProducts = products
      .map(product => {
        const matchingItem = cartItems.find(item => item.id === product._id.toString());
        if (!matchingItem) return null; // Skip if no matching cart item
        return {
          ...product.toObject(),
          quantity: matchingItem.quantity
        };
      })
      .filter(Boolean); // Remove null values (skipped items)
    console.log(updatedProducts.length)
    return res.json({ message: 'successful', products: updatedProducts });
  } catch (error) {
    console.error("Error getting products:", error);
    return res.status(500).json({ message: 'Error getting products', error: error.message });
  }
};


export const deleteAllProducts = async (req, res) => {
  // access to admins and vendors, delete all product creted by the user
  try {
    // delete all products
    const deletedProducts = await productHandler.deleteAll()
    return res.json({ message: 'deleted all product successfully' })
  } catch (err) {
    return res.json({ message: 'Error deleting all products', error })
  }
}