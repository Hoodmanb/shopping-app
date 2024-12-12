import firebaseAdmin from "../config/firebase-admin.js"

const verifyToken = async (req, res, next) => {
  // verify the firebase id token sent with the authorization header from the backend
  const idToken = req.headers.authorization;

  if (!idToken) {
    // returns if no authorization header is set
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = idToken;

  try {
    // decode the sent authorization header
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    
    // Attach userId (uid), user email to the request object for use in other routes
    req.userId = uid;
    req.email = decodedToken.email
    
    const userId = req.userId
    console.log('userId', userId)
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token', error: error });
  }
};

export default verifyToken;