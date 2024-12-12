import firebaseAdmin from "../config/firebase-admin.js"
import isAdmin from "./adminCheck.js"

import mongoClient from '../config/mongodb.js'
import suspend from '../model/suspend.js'

const suspendHandler = suspend
await mongoClient.connect()

export const makeAdmin = async (req, res) => {
  const uid = req.body.id
  const userId = req.userId
  const admin = await isAdmin(userId)

  try {
    if (admin === true) {
      await admin.auth().setCustomUserClaims(uid, {
        role: 'admin'
      });
      console.log(`User ${uid} set as admin`);
      return res.status(200).json({
        info: `user with id ${uid}, set as admin`, message: 'succussful'
      })
    } else {
      return res.status(401).json({
        info: "you are unautorized", message: 'error'
      })
    }

  } catch(error) {}
}

export const suspendUser = async (req, res){
  const uid = req.body.id
  
  try{
    const suspendthis = await suspendHandler.suspend(uid)
    console.log(`user with id: ${uid}` have being suspendend)
    return res.status(200).json({message:"successful", info:`user with id ${uid} suspendend`})
  } catch(error){
    return res.status(500).json({message:"error", info:`error suspending user: ${uid}`})
  }
}

export const unsuspend = async (req, res) {
  const uid = req.body.id
  
  try{
    const unsuspendthis = await suspendHandler.unsuspend(uid)
    console.log(`user with id: ${uid} have being unsuspendend`)
    return res.status(200).json({message:"successful", info:`user with id ${uid} unsuspendend`})
  } catch(error){
    return res.status(500).json({message:"error", info:`error unsuspending user: ${uid}`, error})
  }
}