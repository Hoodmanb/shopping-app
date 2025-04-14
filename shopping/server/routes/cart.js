import express from 'express'
const cartRouter = express.Router()

import { addToCart, deleteCartItem, getCarts, deleteAllCarts, modifyCartItem } from '../controller/cart.js'
import cartCreator from "../middleware/isCartCreator.js"

cartRouter.get('/api/cart', getCarts);

cartRouter.delete('/api/cart/item', cartCreator, deleteCartItem);

cartRouter.post('/api/cart/:id', addToCart)

cartRouter.put('/api/cart/:id', cartCreator, modifyCartItem)

cartRouter.delete('/api/cart', deleteAllCarts)

export default cartRouter;