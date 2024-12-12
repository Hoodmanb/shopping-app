import firebaseAdmin from "../config/firebase-admin.js"

export default async function isAdmin(uid) {
  // a function to check if a user has admin previlages, takes the userId from firebase as parameter and returns a boolean
  try {
    const userRecord = await firebaseAdmin.auth().getUser(uid);
    const customClaims = userRecord.customClaims;
    
    if (customClaims && customClaims.role === "admin"){
      console.log(customClaims)
      return true
    } return false

  } catch (error) {
    console.error('Error retrieving user custom claims:', error);
  }
}