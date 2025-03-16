import express from 'express'
import mongoClient from './config/mongodb.js'

//middlewares
import verifyToken from './middleware/firebase-admin-auth.js'
import isAdmin from "./middleware/isAdmin.js"
// import isSuspended from "./middleware/isSuspended.js"
// import isPaystackCustomer from './middleware/paystack.js'

//routes
import productRouter from './routes/products.js'
import chartRouter from './routes/chart.js'
import previlagedroutes from './routes/previlagedActions.js'
import paystackRouter from './routes/paystack.js'

// controller
import { getProduct, getProducts, getCartItems } from "./controller/products.js"

// environment configuration
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

const startServer = async () => {
  const server = express()

  await mongoClient.connect()

  server.use(express.json())

  server.get("/api/products", getProducts)

  server.get("/api/product/:id", getProduct)

  server.post("/api/cart-items", getCartItems)

  // server.use("/api", verifyToken, isSuspended, isPaystackCustomer)

  server.use("/api", verifyToken)

  server.use(paystackRouter)

  server.use(productRouter)

  server.use(chartRouter)

  server.use("/api/admin", isAdmin)

  server.use(previlagedroutes)

  if (dev) {
    const next = await import('next');
    const app = next.default({ dev });
    const handle = app.getRequestHandler();
    await app.prepare();

    server.all('*', (req, res) => {
      return handle(req, res);
    });
  }

  // Start the server
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
};

startServer();
