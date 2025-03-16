import express from 'express'
import cors from "cors";

//middlewares
import verifyToken from './middleware/firebase-admin-auth.js'
import isAdmin from "./middleware/isAdmin.js"

//routes
import productRouter from './routes/products.js'
import chartRouter from './routes/chart.js'
import previlagedroutes from './routes/previlagedActions.js'
import paystackRouter from './routes/paystack.js'

// controller
import { getProduct, getProducts, getCartItems } from "./controller/products.js"

const app = express()

// Connect to MongoDB only when the function is invoked, not at build time
// We'll handle this connection differently

const corsOptions = {
    origin: ['https://hawk-mart.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json())

app.get("/api/products", getProducts)

app.get("/api/product/:id", getProduct)

app.post("/api/cart-items", getCartItems)

app.use("/api", verifyToken)

app.use(paystackRouter)

app.use(productRouter)

app.use(chartRouter)

app.use("/api/admin", isAdmin)

app.use(previlagedroutes)

// Don't include Next.js handling here - Vercel will handle that separately

// For Vercel, export the Express app as a module
export default app;