// controller functions for cart activities, a user must be logged in to user any of this fumctions
import cart from '../model/cart.js'

const cartHandler = cart

export const getCarts = async (req, res) => {
  //this fumction returns all cart items associated with the user with the authenticated userId
  const userId = req.userId
  try {
    // return the chart
    const carts = await cartHandler.getCart(userId)
    return res.json({ carts })
  } catch (err) {
    return res.json({
      err
    });
  }
}

export const addToCart = async (req, res) => {
  // function to modify a cart item
  const data = req.body;
  data.cartItemId = req.params.id
  const id = req.userId
  try {
    // Update the product
    const updatedCart = await cartHandler.addToCart(id, { ...data });
    console.log(updatedCart)
    return res.json(updatedCart);

  } catch (err) {
    console.log(err);
    return res.json({ message: 'Error adding cart', err });
  }
}

export const modifyCartItem = async (req, res) => {
  // function to modify a cart item
  const data = req.body;
  console.log(data)
  data.cartItemId = req.params.id
  const id = req.userId
  try {
    // Update the product
    const updatedCart = await cartHandler.modifyCartItem(id, { ...data });
    // console.log(updatedCart)
    return res.json(updatedCart);

  } catch (err) {
    console.log(err);
    return res.json({ message: 'Error updating cart', err });
  }
}

export const deleteCartItem = async (req, res) => {
  // function to delete a cart item with the id passed to the request body
  const id = req.body.id
  const userId = req.userId

  try {
    //delete cart item
    const deletedData = await cartHandler.deleteCartItem(userId, id);
    return res.json(deletedData)
  } catch (err) {
    return res.json({ message: "error deleting data", err })
  }
}

// export const createChart = async (req, res) => {
//   // function to create a chart
//   const data = req.body
//   const userId = req.userId
//   data['createdBy'] = userId;

//   try {
//     // chart created and item added
//     const newChart = await chartHandler.createChart({ ...data });
//     console.log(newChart);
//     return res.json({ message: 'Chart created!', newChart });
//   } catch (err) {
//     console.log(err);
//     return res.json({ message: 'Error creating product', err });
//   }
// }

export const deleteAllCarts = async (req, res) => {
  const userId = req.userId
  // function to delete a cart (and all items in it)
  try {
    //chart deleted
    const deletedCarts = await cartHandler.deleteAll(userId)
    return res.json({ message: 'deleted all cart successfully' })
  } catch (err) {
    return res.json({ message: 'Error deleting all carts', error })
  }
}