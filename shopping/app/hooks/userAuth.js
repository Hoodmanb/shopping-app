import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebaseClient.js';

// custom func to handle firebase error
import handleSignupError from './firebaseError.js';

// A custom hook for authentication logic
export default function useUserAuth() {
  const login = async (email, password) => {

    console.log(email, password)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential)
      return { message: 'success' };
    } catch (err) {
      let errorCode = handleSignupError(err.code)
      // console.log("Hi", errorCode)
      return { message: errorCode };
    }
  };

  const signup = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser
      if (user) {
        updateProfile(user, {
          displayName: displayName,
        })
          .then(() => {
            // Profile updated successfully!
            console.log("Display name updated.");
          })
          .catch((error) => {
            // An error occurred
            console.error("Error updating display name:", error);
          });
      } else {
        // No user is signed in.
        console.log("No user is signed in.");
      }
      return { message: 'success' };
    } catch (err) {
      return { message: handleSignupError(err.code) };
    }
  };

  return { login, signup };
}
