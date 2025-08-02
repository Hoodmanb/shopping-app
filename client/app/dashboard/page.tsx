"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Search,
  Filter,
  Star,
  ShoppingCart,
  Heart,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "High-quality sound with active noise cancellation",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 1247,
    image: "/placeholder.svg?height=300&width=300&text=Headphones",
    category: "Electronics",
    availability: "In Stock",
    brand: "AudioTech",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Track your health and fitness with advanced sensors",
    price: 199,
    originalPrice: null,
    rating: 4.6,
    reviews: 892,
    image: "/placeholder.svg?height=300&width=300&text=Watch",
    category: "Electronics",
    availability: "In Stock",
    brand: "FitTech",
  },
  {
    id: 3,
    name: "Laptop Backpack Pro",
    description: "Durable backpack with laptop compartment and USB port",
    price: 89,
    originalPrice: 120,
    rating: 4.9,
    reviews: 456,
    image: "/placeholder.svg?height=300&width=300&text=Backpack",
    category: "Accessories",
    availability: "Low Stock",
    brand: "TravelGear",
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    description: "Fast wireless charging for all compatible devices",
    price: 49,
    originalPrice: null,
    rating: 4.7,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=300&text=Charger",
    category: "Electronics",
    availability: "In Stock",
    brand: "PowerTech",
  },
  {
    id: 5,
    name: "Gaming Mouse RGB",
    description: "Precision gaming mouse with customizable RGB lighting",
    price: 79,
    originalPrice: 99,
    rating: 4.8,
    reviews: 567,
    image: "/placeholder.svg?height=300&width=300&text=Mouse",
    category: "Electronics",
    availability: "In Stock",
    brand: "GameTech",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    description: "Portable speaker with 360-degree sound",
    price: 129,
    originalPrice: 159,
    rating: 4.5,
    reviews: 789,
    image: "/placeholder.svg?height=300&width=300&text=Speaker",
    category: "Electronics",
    availability: "In Stock",
    brand: "SoundWave",
  },
  {
    id: 7,
    name: "Cotton T-Shirt",
    description: "Comfortable 100% organic cotton t-shirt",
    price: 29,
    originalPrice: null,
    rating: 4.3,
    reviews: 123,
    image: "/placeholder.svg?height=300&width=300&text=T-Shirt",
    category: "Clothing",
    availability: "In Stock",
    brand: "ComfortWear",
  },
  {
    id: 8,
    name: "Running Shoes",
    description: "Lightweight running shoes with advanced cushioning",
    price: 149,
    originalPrice: 199,
    rating: 4.7,
    reviews: 345,
    image: "/placeholder.svg?height=300&width=300&text=Shoes",
    category: "Clothing",
    availability: "In Stock",
    brand: "RunFast",
  },
  {
    id: 9,
    name: "Coffee Maker",
    description: "Programmable coffee maker with thermal carafe",
    price: 89,
    originalPrice: null,
    rating: 4.4,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=300&text=Coffee",
    category: "Home",
    availability: "Out of Stock",
    brand: "BrewMaster",
  },
  {
    id: 10,
    name: "Desk Lamp LED",
    description: "Adjustable LED desk lamp with touch controls",
    price: 59,
    originalPrice: 79,
    rating: 4.6,
    reviews: 167,
    image: "/placeholder.svg?height=300&width=300&text=Lamp",
    category: "Home",
    availability: "In Stock",
    brand: "LightTech",
  },
  {
    id: 11,
    name: "Yoga Mat Premium",
    description: "Non-slip yoga mat with alignment guides",
    price: 39,
    originalPrice: null,
    rating: 4.8,
    reviews: 456,
    image: "/placeholder.svg?height=300&width=300&text=Yoga",
    category: "Sports",
    availability: "In Stock",
    brand: "ZenFit",
  },
  {
    id: 12,
    name: "Water Bottle Steel",
    description: "Insulated stainless steel water bottle",
    price: 25,
    originalPrice: 35,
    rating: 4.5,
    reviews: 289,
    image: "/placeholder.svg?height=300&width=300&text=Bottle",
    category: "Sports",
    availability: "In Stock",
    brand: "HydroTech",
  },
]

const categories = ["All", "Electronics", "Clothing", "Home", "Sports", "Accessories"]
const availabilityOptions = ["In Stock", "Low Stock", "Out of Stock"]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const itemsPerPage = 8

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesAvailability = selectedAvailability.length === 0 || selectedAvailability.includes(product.availability)
    const matchesRating = product.rating >= minRating

    return matchesSearch && matchesPrice && matchesCategory && matchesAvailability && matchesRating
  })

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, priceRange, selectedCategories, selectedAvailability, minRating])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleAvailability = (availability: string) => {
    setSelectedAvailability((prev) =>
      prev.includes(availability) ? prev.filter((a) => a !== availability) : [...prev, availability],
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Search Bar */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for gadgets, clothes, etc..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg border-2 focus:border-primary transition-all duration-300"
              />
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block w-80 space-y-6 sticky top-24 h-fit">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </h3>

                {/* Price Range */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left font-medium hover:text-primary transition-colors">
                    Price Range
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 pt-2">
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={500}
                        min={0}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Category */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left font-medium hover:text-primary transition-colors">
                    Category
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 pt-2">
                    {categories
                      .filter((cat) => cat !== "All")
                      .map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`desktop-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <Label htmlFor={`desktop-${category}`} className="text-sm cursor-pointer">
                            {category}
                          </Label>
                        </div>
                      ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Rating */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left font-medium hover:text-primary transition-colors">
                    Minimum Rating
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 pt-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`desktop-rating-${rating}`}
                          checked={minRating === rating}
                          onCheckedChange={() => setMinRating(minRating === rating ? 0 : rating)}
                        />
                        <Label htmlFor={`desktop-rating-${rating}`} className="flex items-center cursor-pointer">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="ml-2 text-sm">& up</span>
                        </Label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Availability */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left font-medium hover:text-primary transition-colors">
                    Availability
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 pt-2">
                    {availabilityOptions.map((availability) => (
                      <div key={availability} className="flex items-center space-x-2">
                        <Checkbox
                          id={`desktop-${availability}`}
                          checked={selectedAvailability.includes(availability)}
                          onCheckedChange={() => toggleAvailability(availability)}
                        />
                        <Label htmlFor={`desktop-${availability}`} className="text-sm cursor-pointer">
                          {availability}
                        </Label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full mt-4 bg-transparent"
                  onClick={() => {
                    setSelectedCategories([])
                    setSelectedAvailability([])
                    setMinRating(0)
                    setPriceRange([0, 500])
                    setSearchQuery("")
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Filter Modal - Mobile & Tablet */}
            <div className="lg:hidden mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="lg" className="w-full mb-4 bg-transparent">
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                    {(selectedCategories.length > 0 ||
                      selectedAvailability.length > 0 ||
                      minRating > 0 ||
                      priceRange[0] > 0 ||
                      priceRange[1] < 500) && (
                      <Badge variant="secondary" className="ml-2">
                        {selectedCategories.length +
                          selectedAvailability.length +
                          (minRating > 0 ? 1 : 0) +
                          (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:w-96 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="flex items-center">
                      <Filter className="mr-2 h-5 w-5" />
                      Filters
                    </SheetTitle>
                  </SheetHeader>

                  <div className="space-y-6 mt-6">
                    {/* Price Range */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Price Range</h4>
                      <div className="px-2">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={500}
                          min={0}
                          step={10}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-2">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Category</h4>
                      <div className="space-y-3">
                        {categories
                          .filter((cat) => cat !== "All")
                          .map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox
                                id={`mobile-${category}`}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => toggleCategory(category)}
                              />
                              <Label htmlFor={`mobile-${category}`} className="text-sm cursor-pointer">
                                {category}
                              </Label>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Minimum Rating</h4>
                      <div className="space-y-3">
                        {[4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-rating-${rating}`}
                              checked={minRating === rating}
                              onCheckedChange={() => setMinRating(minRating === rating ? 0 : rating)}
                            />
                            <Label htmlFor={`mobile-rating-${rating}`} className="flex items-center cursor-pointer">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                />
                              ))}
                              <span className="ml-2 text-sm">& up</span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Availability</h4>
                      <div className="space-y-3">
                        {availabilityOptions.map((availability) => (
                          <div key={availability} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-${availability}`}
                              checked={selectedAvailability.includes(availability)}
                              onCheckedChange={() => toggleAvailability(availability)}
                            />
                            <Label htmlFor={`mobile-${availability}`} className="text-sm cursor-pointer">
                              {availability}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => {
                        setSelectedCategories([])
                        setSelectedAvailability([])
                        setMinRating(0)
                        setPriceRange([0, 500])
                        setSearchQuery("")
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-between mb-6"
            >
              <div>
                <h2 className="text-2xl font-bold">Products</h2>
                <p className="text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of{" "}
                  {filteredProducts.length} results
                </p>
              </div>
              {/* View Mode Toggle - Mobile */}
              <div className="flex md:hidden items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Product Grid */}
            <div
              className={`grid gap-6 mb-8 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              }`}
            >
              <AnimatePresence>
                {paginatedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    layout
                  >
                    <Link href={`/product/${product.id}`}>
                      <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                        <CardContent className="p-0">
                          {viewMode === "grid" ? (
                            <>
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
                                  <Badge
                                    variant={
                                      product.availability === "In Stock"
                                        ? "default"
                                        : product.availability === "Low Stock"
                                          ? "secondary"
                                          : "destructive"
                                    }
                                  >
                                    {product.availability}
                                  </Badge>
                                </div>

                                {/* Favorite Button */}
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                  }}
                                >
                                  <Heart className="h-4 w-4" />
                                </motion.button>
                              </div>

                              {/* Product Info */}
                              <div className="p-4 space-y-3">
                                <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                  {product.name}
                                </h3>
                                <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>

                                {/* Rating */}
                                <div className="flex items-center">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${
                                          i < Math.floor(product.rating)
                                            ? "text-yellow-400 fill-current"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-muted-foreground ml-2">({product.reviews})</span>
                                </div>

                                {/* Price */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-lg font-bold">${product.price}</span>
                                    {product.originalPrice && (
                                      <span className="text-sm text-muted-foreground line-through">
                                        ${product.originalPrice}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Add to Cart Button */}
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                  <Button
                                    size="sm"
                                    className="w-full"
                                    disabled={product.availability === "Out of Stock"}
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                    }}
                                  >
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    {product.availability === "Out of Stock" ? "Out of Stock" : "Add to Cart"}
                                  </Button>
                                </motion.div>
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
                              </div>
                              <div className="flex-1 space-y-2">
                                <h3 className="font-semibold group-hover:text-primary transition-colors">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${
                                          i < Math.floor(product.rating)
                                            ? "text-yellow-400 fill-current"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                    <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                                  </div>
                                  <Badge
                                    variant={
                                      product.availability === "In Stock"
                                        ? "default"
                                        : product.availability === "Low Stock"
                                          ? "secondary"
                                          : "destructive"
                                    }
                                  >
                                    {product.availability}
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
                                  <Button
                                    size="sm"
                                    disabled={product.availability === "Out of Stock"}
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                    }}
                                  >
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Add to Cart
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center justify-center space-x-2"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    )
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="px-2">
                        ...
                      </span>
                    )
                  }
                  return null
                })}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </motion.div>
            )}

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategories([])
                    setSelectedAvailability([])
                    setMinRating(0)
                    setPriceRange([0, 500])
                  }}
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
