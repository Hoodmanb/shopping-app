// // server.js
// import express from 'express'
// import next from 'next'
// import { parse } from 'url'
// import path from 'path'

// import mongoClient from './config/mongodb.js'

// //middlewares
// import verifyToken from './middleware/firebase-admin-auth.js'
// import isAdmin from "./middleware/isAdmin.js"
// // import isSuspended from "./middleware/isSuspended.js"
// // import isPaystackCustomer from './middleware/paystack.js'

// //routes
// import productRouter from './routes/products.js'
// import cartRouter from './routes/cart.js'
// import previlagedroutes from './routes/previlagedActions.js'
// import paystackRouter from './routes/paystack.js'

// // controller
// import { getProduct, getProducts, getCartItems } from "./controller/products.js"

// // environment configuration
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();
// const port = process.env.PORT || 3000

// app.prepare().then(async () => {
//   const server = express()

//   await mongoClient.connect()

//   server.use(express.json())

//   server.get("/api/products", getProducts)

//   server.get("/api/product/:id", getProduct)

//   server.post("/api/cart-items", getCartItems)

//   // server.use("/api", verifyToken, isSuspended, isPaystackCustomer)

//   server.use("/api", verifyToken)

//   server.use(paystackRouter)

//   server.use(productRouter)

//   server.use(cartRouter)

//   server.use("/api/admin", isAdmin)

//   server.use(previlagedroutes)

//   // Handling all other requests with Next.js' built-in handler
//   server.all('*', (req, res) => {
//     // const parsedUrl = parse(req.url, true);
//     handle(req, res);
//   });

//   // Start the server
//   server.listen(port, (err) => {
//     if (err) throw err;
//     console.log(`> Ready on http://localhost:${port}`);
//   });
// });


import express from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const server = express()
const port = process.env.PORT || 3000

server.use(express.json())

// Define your API routes here if needed
server.get("/api/ping", (_, res) => {
  res.json({ message: "pong" });
})

// Let Next handle all frontend routes like /, /cart, /products etc.
server.all('*', (req, res) => {
  return handle(req, res)
})

app.prepare().then(() => {
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})