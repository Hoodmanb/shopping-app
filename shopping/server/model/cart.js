import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const CartItemSchema = new Schema({
  cartItemId: { type: String, required: true, unique: true }, // Unique item identifier
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true }
});

const CartSchema = new Schema({
  createdBy: { type: String, required: true, unique: true }, // User-specific cart
  items: [CartItemSchema], // Array of cart items
});

// Check if the model already exists before creating it
const CartModel = mongoose.models.Cart || mongoose.model('Cart', CartSchema);

class Cart {
  constructor() { }

  async isCreator(cartId, userId) {
    try {
      const cart = await CartModel.findOne({ createdBy: userId });
      if (cart) {
        return true;
      } return false
    } catch (error) {
      console.error('Error in isCreator:', error);
      return false; // Return false in case of an error
    }
  }

  // async createChart(object) {
  //   try {
  //     const newChart = new ChartModel(object);
  //     const savedChart = await newChart.save();
  //     return savedChart;
  //   } catch (error) {
  //     console.error('Error creating chart:', error); // Fixed log message typo
  //     throw error;
  //   }
  // }

  async deleteCartItem(userId, cartId) {
    try {
      // Find the chart belonging to the user
      const cart = await CartModel.findOne({ createdBy: userId });

      if (!cart) {
        throw new Error("Cart not found for the user");
      }

      // Filter out the item with the matching `chartId`
      cart.items = cart.items.filter(item => item.cartItemId !== cartId);

      // Save the updated chart
      await cart.save();

      return { status: "successful", message: "Item deleted successfully" };
    } catch (error) {
      console.error("Error deleting chart item:", error);
      throw error;
    }
  }


  async addToCart(userId, updatedFields) {
    try {
      // Find the cart for this user
      let cart = await CartModel.findOne({ createdBy: userId });

      if (!cart) {
        // If the chart doesn't exist, create a new one
        cart = new CartModel({
          createdBy: userId,
          items: [updatedFields]
        });
        await cart.save();
        return { status: "successful", message: 'item added successfully', data: cart };
      }

      // Ensure chartItemId is unique before adding
      const existingItemIndex = cart.items.findIndex(
        (item) => item.cartItemId === updatedFields.cartItemId
      );

      if (existingItemIndex !== -1) {
        // If the item exists, update it
        cart.items[existingItemIndex] = { ...cart.items[existingItemIndex], ...updatedFields };
        await cart.save();
        return { status: "exist", message: 'item already in cart', data: cart };
      }

      // Otherwise, add the new item
      cart.items.push(updatedFields);
      await cart.save();

      return { status: "successful", message: 'item added successfully', data: cart };
    } catch (error) {
      console.error('Error modifying cart:', error);
      return { status: "error", message: error.message };
    }
  }

  async modifyCartItem(userId, updatedFields) {
    try {
      // Find the cart for this user
      let cart = await CartModel.findOne({ createdBy: userId });

      if (!cart) {
        return { status: "unfound", message: "You don't have any item in your cart" };
      }

      // Find the index of the item to update
      const existingItemIndex = chart.items.findIndex(
        (item) => item.cartItemId === updatedFields.cartItemId
      );

      if (existingItemIndex !== -1) {
        // Update only the matching item
        cart.items[existingItemIndex] = {
          ...cart.items[existingItemIndex],
          ...updatedFields
        };

        await cart.save();

        return {
          status: "successful",
          message: "Item updated successfully",
          data: cart.items[existingItemIndex] // Return only the updated item
        };
      }

      return { status: "not_found", message: "item not found in your cart" };
    } catch (error) {
      console.error("Error modifying cart:", error);
      return { status: "error", message: error.message };
    }
  }



  async getCart(userId) {
    try {
      let carts = await CartModel.findOne({ createdBy: userId });
      if (!carts) {

        return { status: "empty", message: 'nothing in your chart' };
      }
      return { status: "successful", message: 'successfully fetched cart', data: carts };
    } catch (err) {
      console.error('Error fetching carts:', err); // Added log message
      return { status: "error", message: err.message, error: err.message };; // Return null instead of undefined
    }
  }

  async deleteAll(userId) {
    CartModel.deleteMany({})
      .then(() => console.log('All documents deleted'))
      .catch((err) => console.error('Error deleting documents:', err));
  }
}

const cart = new Cart();
export default cart;