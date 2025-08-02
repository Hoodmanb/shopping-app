"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  quantity: number
  inStock: boolean
  category: string
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    image: "/placeholder.svg?height=200&width=200&text=Headphones",
    quantity: 1,
    inStock: true,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199,
    image: "/placeholder.svg?height=200&width=200&text=Watch",
    quantity: 2,
    inStock: true,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Laptop Backpack Pro",
    price: 89,
    originalPrice: 120,
    image: "/placeholder.svg?height=200&width=200&text=Backpack",
    quantity: 1,
    inStock: false,
    category: "Accessories",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const total = subtotal + shipping

  const EmptyCart = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="text-center py-16"
    >
      <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
      </div>
      <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
      </p>
      <Button size="lg" asChild>
        <Link href="/dashboard">
          <ShoppingBag className="mr-2 h-5 w-5" />
          Start Shopping
        </Link>
      </Button>
    </motion.div>
  )

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyCart />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100, height: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                layout
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        {item.originalPrice && (
                          <Badge className="absolute -top-2 -right-2 bg-red-500">
                            Save ${item.originalPrice - item.price}
                          </Badge>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                            <Badge variant={item.inStock ? "default" : "destructive"} className="mt-1">
                              {item.inStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors self-start"
                          >
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold">${item.price}</span>
                            {item.originalPrice && (
                              <span className="text-lg text-muted-foreground line-through">${item.originalPrice}</span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium">Quantity:</span>
                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="px-3"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={!item.inStock}
                                className="px-3"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <span className="text-lg font-semibold">
                            Total: ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-1"
        >
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-semibold">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <Truck className="h-4 w-4 mr-1" />
                    Shipping
                  </span>
                  <span>{shipping === 0 ? <Badge variant="secondary">Free</Badge> : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && <p className="text-xs text-muted-foreground">Free shipping on orders over $100</p>}
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="w-full text-lg py-6" disabled={cartItems.some((item) => !item.inStock)}>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Proceed to Checkout
                </Button>
              </motion.div>

              {cartItems.some((item) => !item.inStock) && (
                <p className="text-sm text-destructive text-center">Please remove out of stock items to continue</p>
              )}

              <div className="text-center">
                <Button variant="outline" asChild>
                  <Link href="/dashboard">Continue Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
