import mongoClient from '../config/mongodb.js'
import subscriptionService from '../model/subscribe.js'

const subscribeHandler = subscriptionService;
await mongoClient.connect();

const isSubscribed = async (req, res, next) => {
   // goes to the next route if the logged in user is suscribed,  returns a 401 if not
  const id = req.userId
  try{
    const isSubscriber = await subscribeHandler.isSubscribed(id);
    if(isSubscriber === true){
      next()
    } 
    return res.status(401).json({message:"error", info:'you need to be subscribed to do this'})
  }catch(error){
    return res.status(500).json({message:"error", info:'server error'})
  }
}

export default isSubscribed