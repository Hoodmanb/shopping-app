import mongoose from 'mongoose';

// Define the schema with an array of ids
const Schema = mongoose.Schema;
const SuspendedUserSchema = new Schema({
  ids: { type: [String], required: true }  // Array of suspended user IDs
});

// Check if the model already exists before creating it
const SuspendedUser = mongoose.models.SuspendedUser || mongoose.model('SuspendedUser', SuspendedUserSchema);

class Suspend {
  constructor() {
    this.model = SuspendedUser;
  }

  // Add an ID to the suspended list if it doesn't exist
  async suspend(id) {
    try {
      // Find the document (or create one if it doesn't exist)
      const suspend = await this.model.findOne({}); // Assuming there's only one document for the suspended list
      
      if (!suspend) {
        // If no document exists, create a new one with the id in an array
        const newSuspend = new this.model({ ids: [id] });
        await newSuspend.save();
        return { message: 'ID added and user suspended' };
      } else {
        // If the ID does not exist in the array, add it
        if (!suspend.ids.includes(id)) {
          suspend.ids.push(id);
          await suspend.save();
          return { message: 'ID added to suspended users' };
        } else {
          return { message: 'ID already suspended' };
        }
      }
    } catch (error) {
      console.error('Error suspending user:', error);
      throw error;
    }
  }

  // Remove an ID from the suspended list if it exists
  async unsuspend(id) {
    try {
      // Find the document
      const suspend = await this.model.findOne({});
      
      if (suspend && suspend.ids.includes(id)) {
        // Remove the ID from the array
        suspend.ids = suspend.ids.filter(existingId => existingId !== id);
        await suspend.save();
        return { message: 'ID removed from suspended users' };
      } else {
        return { message: 'ID not found in suspended users' };
      }
    } catch (error) {
      console.error('Error unsuspending user:', error);
      throw error;
    }
  }
  
  async isSuspended(id) {
    try {
      const suspend = await this.model.findOne({});
      
      return suspend && suspend.ids.includes(id);
      
    } catch (error) {
      console.error('Error checking if user is suspended:', error);
      throw error;
    }
  }
}

const suspend = new Suspend()
export default suspend;