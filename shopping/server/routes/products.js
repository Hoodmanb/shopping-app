import express from 'express'
const productRouter = express.Router()

import { putProduct, deleteProduct, addProduct, deleteAllProducts} from '../controller/products.js'

import isSubscribed from "../middleware/isSubscribe.js"

import productCreator from "../middleware/isProductCreator.js"

productRouter.put('/api/product/:id', isSubscribed, productCreator, putProduct);

productRouter.delete('/api/product/:id', isSubscribed, productCreator, deleteProduct);

productRouter.post('/api/product', isSubscribed, addProduct)

productRouter.delete('/api/products', isSubscribed, deleteAllProducts)

export default productRouter