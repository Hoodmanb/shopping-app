import suspend from '../model/suspend.js'

const suspendHandler = suspend;

const isSuspended = async (req, res, next) => {
  // restrict a user if they are suspend , moves to next route if they are not
  try {
    const userId = req.userId
    const isSuspend = await suspendHandler.isSuspended(userId);

    if (isSuspend) {
      return res.json({ message: "You are not authorised", info: "Suspended" });
    } else {
      return next();
    }
  } catch (error) {
    console.error('Error checking if user is suspended:', error);

    return res.status(500).json({ message: "Internal Server Error", info: "Failed to check suspension status" });
  }
};

export default isSuspended