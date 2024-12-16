// functions in this file can only be carried out by an admin or the currently logged in user on their own oaccount
import firebaseAdmin from "../config/firebase-admin.js"
import isAdmin from "../admin/adminCheck.js"
import product from "../model/products.js"
import mongoClient from "../config/mongodb.js"

const productHandler = product
await mongoClient.connect()

export const deleteUser = async (req, res) => {
  // ecpects the userId whose account this action is to be fired upon
  const uid = req.body.id
  const userId = req.userId
  const admin = await isAdmin(userId)
  
  try {
    // only successful if the user logged in has same id as the on passed to the request body or if the user is an admin
    if(uid !== userId || admin !== true) {
      return res.status(401).json({info:'you are not authorised', message:'error'})
    } else {
      // Delete the user from Firebase Authentication
      await firebaseAdmin.auth().deleteUser(uid);
      console.log(`Successfully deleted user with UID: ${uid}`);
      
      // Delete the user's data from Firestore
      await firebaseAdmin.firestore().collection('users').doc(uid).delete();
      console.log(`Successfully deleted Firestore data for user with UID: ${uid}`);
      
      // delete all product owned by the user if any
      await productHandler.deleteProduct(uid);
      console.log(`Successfully deleted mongodb data for user with UID: ${uid}`);
      
      res.status(200).json({info: 'user and associated data deleted Successfully', message:'successful'})
    }
    
  } catch (error) {
    console.error('Error deleting user or their Firestore data:', error);
  }
}