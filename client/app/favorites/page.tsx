"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star, Trash2, Grid3X3, List } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const initialFavorites = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 1247,
    image: "/placeholder.svg?height=300&width=300&text=Headphones",
    inStock: true,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199,
    originalPrice: null,
    rating: 4.6,
    reviews: 892,
    image: "/placeholder.svg?height=300&width=300&text=Watch",
    inStock: true,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Laptop Backpack Pro",
    price: 89,
    originalPrice: 120,
    rating: 4.9,
    reviews: 456,
    image: "/placeholder.svg?height=300&width=300&text=Backpack",
    inStock: false,
    category: "Accessories",
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    price: 49,
    originalPrice: null,
    rating: 4.7,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=300&text=Charger",
    inStock: true,
    category: "Electronics",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 129,
    originalPrice: 159,
    rating: 4.5,
    reviews: 789,
    image: "/placeholder.svg?height=300&width=300&text=Speaker",
    inStock: true,
    category: "Electronics",
  },
  {
    id: 6,
    name: "Gaming Mouse",
    price: 79,
    originalPrice: null,
    rating: 4.8,
    reviews: 567,
    image: "/placeholder.svg?height=300&width=300&text=Mouse",
    inStock: true,
    category: "Electronics",
  },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(initialFavorites)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const removeFromFavorites = (id: number) => {
    setFavorites(favorites.filter((item) => item.id !== id))
  }

  const addToCart = (id: number) => {
    // Add to cart logic here
    console.log(`Added item ${id} to cart`)
  }

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="text-center py-16"
    >
      <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
        <Heart className="h-16 w-16 text-muted-foreground" />
      </div>
      <h2 className="text-3xl font-bold mb-4">No favorites yet</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Start adding products to your favorites to keep track of items you love and want to purchase later.
      </p>
      <Button size="lg" asChild>
        <Link href="/dashboard">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Start Shopping
        </Link>
      </Button>
    </motion.div>
  )

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState />
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
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
          <p className="text-muted-foreground">
            {favorites.length} {favorites.length === 1 ? "item" : "items"} saved
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-red-500 fill-current" />
            <span className="text-lg font-semibold">{favorites.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Favorites Grid/List */}
      <div
        className={`grid gap-6 ${
          viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
        }`}
      >
        <AnimatePresence>
          {favorites.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              layout
            >
              <Card className="group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                <CardContent className="p-0">
                  {viewMode === "grid" ? (
                    <>
                      {/* Remove Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromFavorites(product.id)}
                        className="absolute top-2 right-2 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>

                      {/* Product Image */}
                      <div className="relative overflow-hidden">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="w-full h-48 object-cover"
                          />
                        </motion.div>

                        {/* Badges */}
                        <div className="absolute top-2 left-2 space-y-1">
                          {product.originalPrice && (
                            <Badge className="bg-red-500">Save ${product.originalPrice - product.price}</Badge>
                          )}
                          {!product.inStock && <Badge variant="secondary">Out of Stock</Badge>}
                        </div>

                        {/* Favorite Heart */}
                        <div className="absolute top-2 right-12">
                          <Heart className="h-5 w-5 text-red-500 fill-current" />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4 space-y-3">
                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>

                        {/* Rating */}
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">({product.reviews})</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2">
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                            <Button
                              size="sm"
                              className="w-full"
                              disabled={!product.inStock}
                              onClick={() => addToCart(product.id)}
                            >
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              {product.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* List View */
                    <div className="flex p-4 space-x-4">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover rounded"
                        />
                        <Heart className="absolute -top-1 -right-1 h-4 w-4 text-red-500 fill-current" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-semibold group-hover:text-primary transition-colors">{product.name}</h3>
                        </Link>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                          </div>
                          <Badge variant={product.inStock ? "default" : "secondary"}>
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" disabled={!product.inStock} onClick={() => addToCart(product.id)}>
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Add to Cart
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => removeFromFavorites(product.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Favorites Summary</h3>
                <p className="text-muted-foreground">
                  Total value: ${favorites.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">Share List</Button>
                <Button
                  onClick={() => favorites.forEach((item) => item.inStock && addToCart(item.id))}
                  disabled={!favorites.some((item) => item.inStock)}
                >
                  Add All to Cart
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
