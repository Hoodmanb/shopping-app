import mongoose from 'mongoose';

// Define the schema with an expiration field
const SubscribeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  plan: { type: String, required: true },
  expireAt: { type: Date, default: null } // Field to track expiration
});

// Check if the model already exists before creating it
const SubscribedUser = mongoose.models.SubscribedUser || mongoose.model('SubscribedUser', SubscribeSchema);

class SubscriptionService {
  constructor() {
    this.model = SubscribedUser;
  }
  
  setExpiry() {
    const now = new Date();
    // Add 30 days to the current date
    const expiryDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    return expiryDate.toISOString(); // Store as a string for easy comparison
  }

  // Subscribe a user with a 30-day expiration time
  async subscribe(id, plan) {
    try {
      const expireAt = this.setExpiry();

      let subscribe = await this.model.findOne({ id });

      if (!subscribe) {
        const newSubscription = new this.model({
          id, plan, expireAt
        });
        await newSubscription.save();

        // this.scheduleUpdate(id, expireAt);

        return {
          message: 'ID added as subscribed user'
        };
      } else {
        subscribe.plan = plan;
        subscribe.expireAt = expireAt;
        await subscribe.save();

        // this.scheduleUpdate(id, expireAt);

        return {
          message: 'ID reactivated as subscribed user'
        };
      }
    } catch (error) {
      console.error('Error subscribing user:', error);
      throw error;
    }
  }

  // Unsubscribe a user
  async unSubscribe(id) {
    try {
      const unsubscribe = await this.model.findOne({ id });

      if (unsubscribe) {
        unsubscribe.expireAt = null;
        await unsubscribe.save();
        return {
          message: 'ID unsubscribed'
        };
      } else {
        return {
          message: 'ID not found'
        };
      }
    } catch (error) {
      console.error('Error unsubscribing user:', error);
      throw error;
    }
  }
  
  async isExpired(expiryDateStr) {
    const now = new Date();
    const expiryDate = new Date(expiryDateStr);
    return now >= expiryDate;
  }

  async isSubscribed(id) {
    try {
      const subscriber = await this.model.findOne({ id });
      if (subscriber) {
        const expireAt = subscriber.expireAt;
        const active = await this.isExpired(expireAt);
        return !active;
      } else {
        return {
          message: 'ID not found'
        };
      }
    } catch (error) {
      console.error('Error checking subscription status:', error);
      throw error;
    }
  }
}

const subscriptionService = new SubscriptionService();
export default subscriptionService;