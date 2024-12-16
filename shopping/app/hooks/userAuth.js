"use client";
import { useState } from "react";

// firebase imports
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../lib/firebaseClient.js";

// custom func to handle firebase error
import handleSignupError from "./firebaseError.js"

export const storeIdToken = async (token) => {
  // const token = await userCredential.user.getIdToken()
  sessionStorage.setItem("clientIdToken", token)
  const savedToken = sessionStorage.getItem("clientIdToken")
  return savedToken
}

// A custom hook for authentication logic
export default function useUserAuth() {

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const returnedToken = await userCredential.user.getIdTokenResult()
      console.log('frontend token:', returnedToken)
      const stored = await storeIdToken(returnedToken.token)
      
      return {token, message: 'sucessful'}
      
    } catch (err) {
      return {message: handleSignupError(err.code)}
    }
  };

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const returnedToken = await userCredential.user.getIdTokenResult()
      console.log('frontend token:', returnedToken)
      const stored = await storeIdToken(returnedToken.token)
      
      return {token, stored, message: token}
    } catch (err) {
      return {message: handleSignupError(err.code)}
    }
  };
  
  const logout = async () => {
    
  }
  
  return { login, signup, logout};
}