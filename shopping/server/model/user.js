import mongoose from 'mongoose'
import paystack from '../services/payStack.js'

const payStackHandler = paystack
// Define the User schema
const userSchema = new mongoose.Schema({
  firebaseUserId: { type: String, required: true },
  paystackCustomerId: { type: String, required: true },
  // Other user-related data
});

// Create the User model
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

class User {
  constructor() {
    this.User = UserModel;
  }

// Add a new user if they don't already exist
addUser = async (userId, email) => {
  try {
    // Check if the user already exists
    const user = await this.User.findOne({ firebaseUserId: userId });
    
    if (!user) {
      try {
        // Create a new customer on Paystack
        const newCustomer = await paystack.createCustomer(userId, email);
        const customerId = newCustomer.data.customer_code;

        // Create a new user in the database
        const newUser = new this.User({
          firebaseUserId: userId,
          paystackCustomerId: customerId,
        });

        await newUser.save(); // Save the user to the database
        console.log(newUser.paystackCustomerId)
        return {newUser, message:'successful'}
        
      } catch (error) {
        console.error('Error creating Paystack customer:', error);
        throw error;
      }
    } else {
      return {newUser, message: 'successful', info:'User already created'}
    }
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

  // Example function to delete a user (not implemented)
  deleteUser = async (userId) => {
    try {
      const result = await this.User.deleteOne({ firebaseUserId: userId });
      if (result.deletedCount > 0) {
        return `User with ID ${userId} deleted`;
      } else {
        return `No user found with ID ${userId}`;
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  // Get a reference document based on userId
  getUser = async (userId) => {
    try {
      const user = await this.User.findOne({ firebaseUserId: userId });
      
      if (user) {
        return user.paystackCustomerId;
      } else {
        throw new Error('No references found for the user')
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      throw error;
    }
  };
}

const user = new User();
export default user;