import firebaseAdmin from "../config/firebase-admin.js";

const isAdmin = async (req, res, next) => {
  // checks if a user is admin
  const uid = req.userId;

  try {
    // goes to the next route if user is admin, returns a 401 if user is not
    const userRecord = await firebaseAdmin.auth().getUser(uid);
    const customClaims = userRecord.customClaims;

    if (customClaims && customClaims.role === "admin") {
      console.log(customClaims);
      return next();
      
    } else {
      return res.status(401).json({
        message: "error",
        info: "You are unauthorized"
      });
    }

  } catch (error) {
    console.error('Error retrieving user custom claims:', error);
    return res.status(500).json({
      message: "error",
      info: "Error retrieving user custom claims "
    });
  }
};

export default isAdmin;