"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Share2, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const product = {
  id: 1,
  name: "Premium Wireless Headphones",
  price: 299,
  originalPrice: 399,
  rating: 4.8,
  reviews: 1247,
  description:
    "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding for all-day wear.",
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Premium comfort padding",
    "Bluetooth 5.0 connectivity",
    "Quick charge: 5 min = 2 hours playback",
  ],
  specifications: {
    "Driver Size": "40mm",
    "Frequency Response": "20Hz - 20kHz",
    Impedance: "32 Ohm",
    Weight: "250g",
    Connectivity: "Bluetooth 5.0, 3.5mm jack",
    "Battery Life": "30 hours",
    "Charging Time": "2 hours",
    "Noise Cancellation": "Active ANC",
  },
  images: [
    "/placeholder.svg?height=600&width=600&text=Headphones+Front",
    "/placeholder.svg?height=600&width=600&text=Headphones+Side",
    "/placeholder.svg?height=600&width=600&text=Headphones+Back",
    "/placeholder.svg?height=600&width=600&text=Headphones+Case",
  ],
  inStock: true,
  category: "Electronics",
  brand: "AudioTech",
  availability: "In Stock",
  tags: ["wireless", "bluetooth", "premium", "noise-cancelling"],
}

const reviews = [
  {
    id: 1,
    user: "John D.",
    rating: 5,
    date: "2024-01-15",
    comment: "Excellent sound quality and comfort. The noise cancellation works perfectly!",
    verified: true,
  },
  {
    id: 2,
    user: "Sarah M.",
    rating: 4,
    date: "2024-01-12",
    comment: "Great headphones, but the price is a bit high. Overall satisfied with the purchase.",
    verified: true,
  },
  {
    id: 3,
    user: "Mike R.",
    rating: 5,
    date: "2024-01-10",
    comment: "Best headphones I've ever owned. The battery life is incredible!",
    verified: false,
  },
]

// All available products for recommendations
const allProducts = [
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    price: 199,
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=200&text=Earbuds",
    tags: ["wireless", "bluetooth", "portable", "premium"],
  },
  {
    id: 3,
    name: "Gaming Headset",
    price: 149,
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=200&text=Gaming",
    tags: ["gaming", "noise-cancelling", "premium", "professional"],
  },
  {
    id: 4,
    name: "Studio Monitor Headphones",
    price: 249,
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=200&text=Studio",
    tags: ["professional", "high-quality", "premium", "noise-cancelling"],
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 89,
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=200&text=Speaker",
    tags: ["wireless", "bluetooth", "portable", "stylish"],
  },
  {
    id: 6,
    name: "Noise Cancelling Earphones",
    price: 129,
    rating: 4.4,
    image: "/placeholder.svg?height=200&width=200&text=Earphones",
    tags: ["noise-cancelling", "premium", "portable", "wireless"],
  },
  {
    id: 7,
    name: "Smart Watch Pro",
    price: 299,
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=200&text=SmartWatch",
    tags: ["smart", "premium", "fitness", "bluetooth"],
  },
  {
    id: 8,
    name: "Wireless Charging Station",
    price: 79,
    rating: 4.3,
    image: "/placeholder.svg?height=200&width=200&text=ChargingStation",
    tags: ["wireless", "fast-charging", "stylish", "multi-functional"],
  },
]

// Function to get recommended products based on tags
const getRecommendedProducts = (currentProductTags: string[], currentProductId: number) => {
  return allProducts
    .filter((p) => p.id !== currentProductId) // Exclude current product
    .map((p) => ({
      ...p,
      matchScore: p.tags.filter((tag) => currentProductTags.includes(tag)).length,
    }))
    .filter((p) => p.matchScore > 0) // Only products with at least one matching tag
    .sort((a, b) => b.matchScore - a.matchScore) // Sort by match score
    .slice(0, 4) // Take top 4 recommendations
}

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [quantity, setQuantity] = useState(1)

  // Get recommended products based on current product's tags
  const recommendedProducts = getRecommendedProducts(product.tags, product.id)

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center space-x-2 text-sm text-muted-foreground"
        >
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1 inline" />
            Back to Products
          </Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative overflow-hidden rounded-xl bg-muted">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
              </motion.div>
              {product.originalPrice > product.price && (
                <Badge className="absolute top-4 left-4 bg-red-500">
                  Save ${product.originalPrice - product.price}
                </Badge>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 p-3 bg-background/80 backdrop-blur-sm rounded-full shadow-lg"
              >
                <Share2 className="h-5 w-5" />
              </motion.button>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent hover:border-muted-foreground/20"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    width={120}
                    height={120}
                    className="w-full h-20 object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant="outline">{product.brand}</Badge>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-primary">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-2xl text-muted-foreground line-through">${product.originalPrice}</span>
              )}
              <Badge variant={product.inStock ? "default" : "destructive"} className="text-sm px-3 py-1">
                {product.availability}
              </Badge>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Product Tags */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Key Features:</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mr-4 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="flex items-center space-x-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3"
                >
                  -
                </Button>
                <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="px-3">
                  +
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                <Button size="lg" className="w-full text-lg py-6" disabled={!product.inStock}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`px-6 py-6 ${isFavorite ? "text-red-500 border-red-500 bg-red-50" : ""}`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                </Button>
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-8 w-8 mx-auto mb-3 text-primary" />
                <p className="font-semibold">Free Shipping</p>
                <p className="text-sm text-muted-foreground">On orders over $50</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-3 text-primary" />
                <p className="font-semibold">2 Year Warranty</p>
                <p className="text-sm text-muted-foreground">Full coverage</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 mx-auto mb-3 text-primary" />
                <p className="font-semibold">30-Day Returns</p>
                <p className="text-sm text-muted-foreground">No questions asked</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-muted">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-semibold">{review.user}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Shipping Information</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Free standard shipping on orders over $50</li>
                      <li>• Express shipping available for $9.99</li>
                      <li>• Orders placed before 2 PM ship same day</li>
                      <li>• Delivery within 3-5 business days</li>
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Return Policy</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• 30-day return window</li>
                      <li>• Items must be in original condition</li>
                      <li>• Free return shipping</li>
                      <li>• Refund processed within 5-7 business days</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Recommended Products Based on Tags */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Recommended for You</h2>
              <p className="text-muted-foreground mt-2">Based on similar features and tags</p>
            </div>
            <div className="flex flex-wrap gap-1">
              <span className="text-sm text-muted-foreground mr-2">Matching tags:</span>
              {product.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              >
                <Link href={`/product/${item.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="relative overflow-hidden rounded-lg mb-4">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={200}
                            height={200}
                            className="w-full h-40 object-cover"
                          />
                        </motion.div>
                        <Badge className="absolute top-2 right-2 bg-primary text-xs">
                          {item.matchScore} match{item.matchScore > 1 ? "es" : ""}
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground ml-2">({item.rating})</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags
                          .filter((tag) => product.tags.includes(tag))
                          .slice(0, 2)
                          .map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold">${item.price}</span>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
